import { useState, useCallback } from 'react'
import WaterSpirit from '../components/creature/WaterSpirit'
import QuickAdd from '../components/logger/QuickAdd'
import CustomInput from '../components/logger/CustomInput'
import IntakeLog from '../components/logger/IntakeLog'
import ActivityModifiers from '../components/logger/ActivityModifiers'
import { useTodayLog } from '../hooks/useTodayLog'
import { useProfile } from '../hooks/useProfile'
import { getTodayModifiers, saveTodayModifiers } from '../storage'
import { calculateDailyGoal } from '../waterCalc'

function RainDrop({ left, size, duration, delay }) {
  return (
    <div
      className="rain-drop"
      style={{ left: `${left}%`, width: size, height: size, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    />
  )
}

function RainEffect() {
  const drops = Array.from({ length: 28 }, (_, i) => ({
    left: (i * 3.7) % 100,
    size: 8 + (i % 5) * 4,
    duration: 1.4 + (i % 6) * 0.2,
    delay: (i * 0.08) % 1,
  }))
  return (
    <div className="rain-container">
      {drops.map((d, i) => <RainDrop key={i} {...d} />)}
    </div>
  )
}

export default function HomePage() {
  const { profile } = useProfile()
  const { logs, totalOz, addEntry, removeEntry, refresh } = useTodayLog()
  const [activeModifiers, setActiveModifiers] = useState(() => getTodayModifiers())
  const [showRain, setShowRain] = useState(false)
  const [prevMet, setPrevMet] = useState(false)

  const { totalGoalOz, baseGoalOz, bonusOz } = calculateDailyGoal(profile || {}, activeModifiers)
  const pct = totalGoalOz > 0 ? totalOz / totalGoalOz : 0
  const goalMet = totalOz >= totalGoalOz && totalGoalOz > 0

  if (goalMet && !prevMet) {
    setPrevMet(true)
    setShowRain(true)
    setTimeout(() => setShowRain(false), 3200)
  } else if (!goalMet && prevMet) {
    setPrevMet(false)
  }

  const handleModifiersChange = useCallback(async (newIds) => {
    saveTodayModifiers(newIds)
    setActiveModifiers(newIds)
    await refresh()
  }, [refresh])

  const dateLabel = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  const barPct = Math.min(pct, 1) * 100

  return (
    <div className="stagger">
      {showRain && <RainEffect />}

      <div className="page-header">
        <h1 className="page-title">Pour Decisions</h1>
        <p className="page-subtitle">{dateLabel}</p>
      </div>

      <div className="section">
        <div className="spirit-card">
          <WaterSpirit pct={pct} />

          <div className="spirit-oz-row">
            <span className="spirit-oz-value">{Math.round(totalOz)}</span>
            <div>
              <div className="spirit-oz-unit">oz today</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                goal: {totalGoalOz}oz
              </div>
            </div>
          </div>

          <div className="spirit-goal-bar-wrap">
            <div className="spirit-goal-bar-bg">
              <div
                className="spirit-goal-bar-fill"
                style={{ width: `${barPct}%`, background: goalMet ? 'linear-gradient(90deg, var(--success), #4aad80)' : undefined }}
              />
            </div>
            <div className="spirit-goal-label">
              <span>{Math.round(pct * 100)}% of daily goal</span>
              {bonusOz > 0 && <span style={{ color: 'var(--primary)' }}>+{bonusOz}oz activity</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Today's activities</div>
        <ActivityModifiers active={activeModifiers} onChange={handleModifiersChange} />
      </div>

      <div className="section">
        <div className="section-title">Add water</div>
        <div className="card">
          <QuickAdd onAdd={addEntry} />
          <CustomInput onAdd={addEntry} />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Today's log</div>
        <div className="card">
          <IntakeLog logs={logs} onDelete={removeEntry} />
        </div>
      </div>
    </div>
  )
}
