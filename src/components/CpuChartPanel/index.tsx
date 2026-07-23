import React, { useEffect, useState, useRef } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { fetchCpuMetrics } from '../../services/metricService';
import type { SystemMetric } from '../../services/metricService';

import './style.css';

export default function CpuChartPanel() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [currentCpu, setCurrentCpu] = useState<number>(0);

  // Usamos um ref para controlar se o componente ainda está na tela,
  // evitando memory leaks se o usuário mudar de página durante o request
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    // Variável para armazenar a data/hora do último registro recebido
    let lastTimestamp: string | undefined = undefined;

    // A nossa função recursiva assíncrona
    const pollMetrics = async () => {
      if (!isMounted.current) return;

      try {
        const newMetrics = await fetchCpuMetrics(lastTimestamp);

        if (isMounted.current && newMetrics.length > 0) {
          // Pega o último registro para atualizar o número gigante na tela
          const latestMetric = newMetrics[newMetrics.length - 1];
          setCurrentCpu(latestMetric.value);
          lastTimestamp = latestMetric.timestamp;

          // Adiciona os novos dados ao gráfico, mantendo apenas os últimos 20 pontos
          // para criar aquele efeito de "esteira rolante" no gráfico temporal
          setMetrics((prevData) => {
            const combined = [...prevData, ...newMetrics];
            return combined.slice(-20);
          });
        }

        // Requisição finalizada com sucesso! Dispara a próxima imediatamente.
        if (isMounted.current) {
          pollMetrics();
        }

      } catch (error) {
        console.warn("Conexão perdida ou timeout. Tentando novamente em 3s...");
        // Se der erro (ex: servidor reiniciando), esperamos 3s para não afogar a rede
        if (isMounted.current) {
          setTimeout(pollMetrics, 3000);
        }
      }
    };

    // Dá o pontapé inicial no loop!
    pollMetrics();

    // Cleanup function: quando o componente for destruído, paramos o loop
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Formata a data (ex: 2026-07-22T19:43:34Z) para mostrar apenas "19:43:34" no eixo X
  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('pt-BR', { hour12: false });
  };

  return (
    <section className="chart-container">
      <div className="chart-header">
        <div>
          <h2 className="chart-title">3. CPU Monitor (Long Polling)</h2>
          <p className="chart-subtitle">Assíncrono via DeferredResult</p>
        </div>
        <span className="chart-value">
          {/* Mostra o valor formatado com 2 casas decimais */}
          {currentCpu.toFixed(2)}<span className="chart-unit">%</span>
        </span>
      </div>

      {/* Container flexível do gráfico */}
      <div className="flex-1 w-full mt-2 min-h-[200px]">
        {metrics.length === 0 ? (
          <div className="chart-placeholder h-full">
            Aguardando primeiro ponto do gráfico...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                {/* O degradê da cor amarela para o preenchimento do gráfico */}
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />

              <XAxis
                dataKey="timestamp"
                tickFormatter={formatTime}
                stroke="#64748b"
                fontSize={12}
                tickMargin={10}
              />

              <YAxis
                domain={[0, 100]}
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ color: '#fbbf24' }}
                labelFormatter={(label) => formatTime(label as string)}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#fbbf24"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCpu)"
                isAnimationActive={false} // Desligamos a animação nativa para o polling parecer mais "vivo" e mecânico
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}