import { ACTIVITY_MODIFIERS } from '../../waterCalc'

export default function ActivityModifiers({ active = [], onChange }) {
  function toggle(id) {
    const next = active.includes(id)
      ? active.filter(x => x !== id)
      : [...active, id]
    onChange(next)
  }

  const totalBonus = active.reduce((sum, id) => {
    const mod = ACTIVITY_MODIFIERS.find(m => m.id === id)
    return sum + (mod ? mod.addOz : 0)
  }, 0)

  return (
    <div>
      <div className="modifier-grid">
        {ACTIVITY_MODIFIERS.map(mod => {
          const isActive = active.includes(mod.id)
          return (
            <button
              key={mod.id}
              type="button"
              className={`modifier-chip${isActive ? ' active' : ''}`}
              onClick={() => toggle(mod.id)}
            >
              {isActive ? '−' : '+'}
              {mod.label}
              {isActive && <span className="modifier-bonus">+{mod.addOz}oz</span>}
            </button>
          )
        })}
      </div>
      {totalBonus > 0 && (
        <p style={{ fontSize: 13, color: 'var(--accent)', marginTop: 10, fontWeight: 600 }}>
          +{totalBonus}oz added to today's goal
        </p>
      )}
    </div>
  )
}
