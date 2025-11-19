import { useState, useRef, useEffect } from 'react'
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
  const [selectedMachine, setSelectedMachine] = useState('general')
  const messagesEndRef = useRef(null)

  const machines = [
    { id: 'general', name: 'General CNC Knowledge' },
    { id: 'simply4', name: 'SIMPLY 4' },
    { id: 'discovery8', name: 'DISCOVERY 8' },
    { id: 'performance8', name: 'Performance 8' },
    { id: 'academy1', name: 'Academy 1' },
    { id: 'performance16', name: 'Performance 16ATC' }
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (question = input) => {
    if (!question.trim() || isLoading) return

    const userMessage = { role: 'user', content: question }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Hardcoded API credentials for static deployment
      const apiKey = 'AQTd9QkHCSHHLieEZVCLJ6'
      const apiUrl = 'https://forge.manus.ai'

      // Build context based on selected machine
      const machineContext = selectedMachine !== 'general' 
        ? `The user is asking about the ${machines.find(m => m.id === selectedMachine)?.name} machine. `
        : ''

      // Call Manus Forge API
      const response = await fetch(`${apiUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          messages: [
            {
              role: 'system',
              content: `You are an expert CNC machining instructor and specialist in Simply Technologies equipment. ${machineContext}

Your expertise includes:
- CNC machining fundamentals and G-code programming
- Simply Technologies machine lineup (SIMPLY 4, DISCOVERY 8, Performance series, Academy 1)
- The iCNC controller system
- Manufacturing education and curriculum development
- Technical troubleshooting and best practices
- EMPOWER[ED] ACADEMY training programs

Provide clear, educational responses tailored to the user's question. Use examples and step-by-step explanations when appropriate. Be encouraging and supportive of learning.`
            },
            ...messages.map(msg => ({
              role: msg.role === 'assistant' ? 'assistant' : 'user',
              content: msg.content
            })),
            {
              role: 'user',
              content: question
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `API request failed: ${response.status}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse
      }])
    } catch (error) {
      console.error('Error calling Manus API:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${error.message}\n\nPlease make sure your Manus API key is properly configured in the environment variables.`
      }])
    } finally {
      setIsLoading(false)
    }
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
          <label htmlFor="machine-context">Machine Context:</label>
          <select
            id="machine-context"
            value={selectedMachine}
            onChange={(e) => setSelectedMachine(e.target.value)}
            className="machine-select"
          >
            {machines.map(machine => (
              <option key={machine.id} value={machine.id}>
                {machine.name}
              </option>
            ))}
          </select>
          <p className="help-text">Select a machine for context-specific answers</p>
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
          <div ref={messagesEndRef} />
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
