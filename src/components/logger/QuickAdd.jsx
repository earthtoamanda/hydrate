const PRESETS = [
  { oz: 8, label: 'Small glass' },
  { oz: 12, label: 'Medium' },
  { oz: 16, label: 'Large glass' },
  { oz: 32, label: 'Water bottle' },
]

export default function QuickAdd({ onAdd }) {
  return (
    <div className="quick-add-grid">
      {PRESETS.map(({ oz, label }) => (
        <button key={oz} className="quick-add-btn" onClick={() => onAdd(oz)} type="button">
          <span className="quick-add-oz">{oz}</span>
          <span className="quick-add-label">{label}</span>
        </button>
      ))}
    </div>
  )
}
