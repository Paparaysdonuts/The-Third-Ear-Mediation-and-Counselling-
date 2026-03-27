export default function ModeSelect({ setMode }) {
  return (
    <div className="modes">
      <button onClick={() => setMode('mediation')}>Mediation</button>
      <button onClick={() => setMode('clear')}>Clear My Head</button>
    </div>
  )
}