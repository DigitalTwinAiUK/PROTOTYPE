import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === 'demo' || password === 'cognitive2026') {
      onLogin()
    } else {
      setError('Invalid password')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-large">
          <img src="/assets/DTAI_Icon_Col.svg" alt="DTAI Logo" style={{width: '100px', height: '100px'}} />
        </div>
        <h1>DTAI Engineering Demo</h1>
        <p className="subtitle">AI-Powered CNC Manufacturing Assistant</p>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Enter Access Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            autoFocus
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Access Demo</button>
        </form>

        <p className="footer-text">Simply Technologies | Confidential</p>
      </div>
    </div>
  )
}

export default Login
