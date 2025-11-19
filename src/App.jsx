import { useState } from 'react'
import './App.css'

import LiveAI from './components/LiveAI'
import Login from './components/Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo">
            <img src="/assets/DTAI_Icon_Col.svg" alt="DTAI" style={{width: '40px', height: '40px', marginRight: '12px'}} />
            <h1>DTAI Engineering</h1>
          </div>
        </div>
        <div className="header-right">
          <p className="tagline">AI-Powered CNC Manufacturing Intelligence</p>
        </div>
      </header>



      <main className="app-main">
        <LiveAI />
      </main>

      <footer className="app-footer">
        <p>Simply Technologies | Confidential | Powered by DTAI Engineering Model 4.2b</p>
      </footer>
    </div>
  )
}

export default App
