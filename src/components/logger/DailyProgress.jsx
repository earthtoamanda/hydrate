import { useState, useEffect, useRef } from 'react'
import ProgressRing from '../charts/ProgressRing'
import { getMotivationalLine } from '../../waterCalc'

function RainDrop({ left, size, duration, delay }) {
  return (
    <div
      className="rain-drop"
      style={{ left: `${left}%`, width: size, height: size, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    />
  )
}

function RainEffect() {
  const drops = Array.from({ length: 30 }, (_, i) => ({
    left: (i * 3.4) % 100,
    size: 8 + (i % 5) * 4,
    duration: 1.2 + (i % 6) * 0.2,
    delay: (i * 0.07) % 0.9,
  }))
  return (
    <div className="rain-container">
      {drops.map((d, i) => <RainDrop key={i} {...d} />)}
    </div>
  )
}

export default function DailyProgress({ totalOz, goalOz, bonusOz = 0, baseGoalOz = 0 }) {
  const pct = goalOz > 0 ? totalOz / goalOz : 0
  const [showRain, setShowRain] = useState(false)
  const prevGoalMet = useRef(false)

  useEffect(() => {
    const goalMet = totalOz >= goalOz && goalOz > 0
    if (goalMet && !prevGoalMet.current) {
      setShowRain(true)
      setTimeout(() => setShowRain(false), 3000)
    }
    prevGoalMet.current = goalMet
  }, [totalOz, goalOz])

  return (
    <div className="card progress-wrap">
      {showRain && <RainEffect />}
      <ProgressRing current={totalOz} goal={goalOz} size={220} />
      {bonusOz > 0 && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, textAlign: 'center' }}>
          {baseGoalOz}oz base + {bonusOz}oz activity bonus
        </p>
      )}
      <p className="progress-motivational">{getMotivationalLine(pct)}</p>
    </div>
  )
}
