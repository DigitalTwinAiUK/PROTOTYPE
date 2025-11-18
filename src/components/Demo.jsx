import { useState } from 'react'
import './Demo.css'
import { demoQA } from '../data/demoQA'

function Demo() {
  const [selectedMachine, setSelectedMachine] = useState('SIMPLY 4')
  const [selectedRole, setSelectedRole] = useState('Student')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to Cognitive Twin, your AI teaching assistant for CNC machining.\n\nI can help you learn about different Simply Technologies machines. Select a machine and your role above to get started!\n\nI provide tailored responses for:\n\n• Students - Learning CNC basics\n• Teachers - Teaching CNC concepts\n• Engineers - Technical implementation\n\nTry the suggested questions below!'
    }
  ])
  const [input, setInput] = useState('')

  const machines = ['SIMPLY 4', 'DISCOVERY 8', 'Performance 8', 'Academy 1', 'Performance 16ATC']
  const roles = ['Student', 'Teacher', 'Engineer']

  const handleSend = (question = input) => {
    if (!question.trim()) return

    const userMessage = { role: 'user', content: question }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Find matching answer from demo data
    const answer = demoQA[question] || "I don't have a pre-programmed answer for that question. This is a demo mode with scripted responses."
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: answer
      }])
    }, 500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestedQuestions = [
    'What is G54?',
    'How do I set tool offset?',
    'How do I start the spindle?',
    'Why did the machine stop?',
    'What does F mean in G-code?'
  ]

  return (
    <div className="demo-container">
      <div className="demo-sidebar">
        <div className="sidebar-section">
          <label htmlFor="machine">MACHINE:</label>
          <select
            id="machine"
            value={selectedMachine}
            onChange={(e) => setSelectedMachine(e.target.value)}
          >
            {machines.map(machine => (
              <option key={machine} value={machine}>{machine}</option>
            ))}
          </select>
        </div>

        <div className="sidebar-section">
          <label htmlFor="role">YOUR ROLE:</label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="sidebar-section">
          <h3>Features Demonstrated:</h3>
          <ul className="features-list">
            <li>Role-specific responses</li>
            <li>Machine-specific knowledge</li>
            <li>Natural language understanding</li>
            <li>Step-by-step guidance</li>
            <li>Code examples</li>
            <li>Safety tips</li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Try These Questions:</h3>
          <div className="suggested-questions">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="suggested-btn"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="demo-chat">
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'assistant' ? 'AI' : 'YOU'}
              </div>
              <div className="message-content">
                {msg.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about CNC machining..."
          />
          <button onClick={() => handleSend()}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Demo
