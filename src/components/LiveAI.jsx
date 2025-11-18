import { useState } from 'react'
import './LiveAI.css'

function LiveAI() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to Cognitive Twin Live AI! I am powered by DTAI technology and have deep knowledge of Simply Technologies CNC machines and manufacturing education.\n\nI can help you with:\n\n• CNC machining concepts and G-code\n• Simply Technologies machine specifications\n• Teaching strategies for CNC education\n• Technical troubleshooting\n• Curriculum development\n\nAsk me anything!'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = (question = input) => {
    if (!question.trim() || isLoading) return

    const userMessage = { role: 'user', content: question }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'This is a placeholder response. In production, this would connect to a real AI API to provide intelligent answers about CNC machining and Simply Technologies equipment.'
      }])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="live-ai-container">
      <div className="live-ai-sidebar">
        <div className="sidebar-section">
          <h3>Live AI Assistant</h3>
          <p className="sidebar-description">
            Powered by DTAI technology, this is a real AI that can answer any question about CNC machining and Simply Technologies equipment.
          </p>
        </div>

        <div className="sidebar-section">
          <h4>Try asking:</h4>
          <ul className="suggestion-list">
            <li onClick={() => handleSend("What makes Simply Technologies different from other CNC manufacturers?")} style={{cursor: 'pointer'}}>
              What makes Simply Technologies different from other CNC manufacturers?
            </li>
            <li onClick={() => handleSend("How does the iCNC controller work?")} style={{cursor: 'pointer'}}>
              How does the iCNC controller work?
            </li>
            <li onClick={() => handleSend("What is the EMPOWER[ED] ACADEMY curriculum?")} style={{cursor: 'pointer'}}>
              What is the EMPOWER[ED] ACADEMY curriculum?
            </li>
            <li onClick={() => handleSend("Compare the Academy 1 vs Performance 8")} style={{cursor: 'pointer'}}>
              Compare the Academy 1 vs Performance 8
            </li>
            <li onClick={() => handleSend("How do I teach G-code to beginners?")} style={{cursor: 'pointer'}}>
              How do I teach G-code to beginners?
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <div className="feature-badge">
            <strong>Real AI</strong>
            <p>Unlimited questions, natural conversation</p>
          </div>
          <div className="feature-badge">
            <strong>Context Aware</strong>
            <p>Remembers your conversation</p>
          </div>
          <div className="feature-badge">
            <strong>Expert Knowledge</strong>
            <p>CNC + Simply Technologies specialist</p>
          </div>
        </div>
      </div>

      <div className="live-ai-chat">
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
          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">AI</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about CNC machining, Simply Technologies machines, or technical education..."
            disabled={isLoading}
            rows="3"
          />
          <button onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LiveAI
