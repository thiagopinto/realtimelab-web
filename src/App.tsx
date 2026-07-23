import './App.css'
import AlertsPanel from './components/AlertsPanel'
import ChatPanel from './components/ChatPanel'
import CpuChartPanel from './components/CpuChartPanel'
import Header from './components/Header'

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        {/* Grid Principal: 1 coluna no mobile, 2 colunas no desktop */}
        <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChatPanel />
          <AlertsPanel />
          <CpuChartPanel />
        </main>
      </div>
    </>
  )
}

export default App
