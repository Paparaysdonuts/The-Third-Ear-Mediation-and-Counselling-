import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import ModeSelect from './components/ModeSelect'
import Chat from './components/Chat'

export default function App() {
  const [mode, setMode] = useState(null)

  return (
    <div className="app">
      <h1>The Third Ear</h1>
      {!mode ? <ModeSelect setMode={setMode} /> : <Chat mode={mode} />}
      <Analytics />
    </div>
  )
}