import { useState } from 'react'
import axios from 'axios'
import mediationPrompt from '../prompts/mediationPrompt'
import clearPrompt from '../prompts/clearMyHeadPrompt'

export default function Chat({ mode }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const send = async () => {
    if (!input.trim()) return

    const systemPrompt = mode === 'mediation' ? mediationPrompt : clearPrompt

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
            { role: 'user', content: input }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          }
        }
      )
      const reply = res.data.choices?.[0]?.message?.content || ''
      setMessages([
        ...messages,
        { role: 'user', content: input },
        { role: 'assistant', content: reply }
      ])
      setInput('')
    } catch (err) {
      console.error(err)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="chat-container">
      <div className="chat">
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.role}:</strong> {m.content}
          </p>
        ))}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={send}>Send</button>
    </div>
  )
}