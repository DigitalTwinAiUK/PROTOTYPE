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
        <div className="logo-large">🤖</div>
        <h1>Cognitive Twin Demo</h1>
        <p className="subtitle">AI Teaching Assistant for CNC Education</p>
        
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

        <p className="footer-text">Digital Twin AI Ltd. | Confidential</p>
      </div>
    </div>
  )
}

export default Login
