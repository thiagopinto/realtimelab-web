import { API_URL } from './api';

// Interface que espelha exatamente a classe SystemMetric do nosso Java
export interface SystemMetric {
  id: string;
  name: string;
  value: number;
  timestamp: string;
}

/**
 * Faz a chamada Long Polling para o backend.
 * Essa promessa pode demorar alguns segundos para resolver, 
 * pois o Spring Boot segura a resposta (DeferredResult) até gerar a métrica.
 */
export async function fetchCpuMetrics(since?: string): Promise<SystemMetric[]> {
  try {
    const response = await fetch(`${API_URL}/api/metrics/long${since ? `?since=${encodeURIComponent(since)}` : ''}`);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha no Long Polling de Métricas:", error);
    throw error;
  }
}