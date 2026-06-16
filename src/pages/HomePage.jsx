import { useState, useCallback } from 'react'
import DailyProgress from '../components/logger/DailyProgress'
import QuickAdd from '../components/logger/QuickAdd'
import CustomInput from '../components/logger/CustomInput'
import IntakeLog from '../components/logger/IntakeLog'
import ActivityModifiers from '../components/logger/ActivityModifiers'
import { useTodayLog } from '../hooks/useTodayLog'
import { useProfile } from '../hooks/useProfile'
import { getTodayModifiers, saveTodayModifiers } from '../storage'
import { calculateDailyGoal } from '../waterCalc'

export default function HomePage() {
  const { profile } = useProfile()
  const { logs, totalOz, addEntry, removeEntry, refresh } = useTodayLog()
  const [activeModifiers, setActiveModifiers] = useState(() => getTodayModifiers())

  const { totalGoalOz, baseGoalOz, bonusOz } = calculateDailyGoal(profile || {}, activeModifiers)

  const handleModifiersChange = useCallback(async (newIds) => {
    saveTodayModifiers(newIds)
    setActiveModifiers(newIds)
    await refresh()
  }, [refresh])

  const dateLabel = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div className="stagger">
      <div className="page-header">
        <h1 className="page-title">Today</h1>
        <p className="page-subtitle">{dateLabel}</p>
      </div>

      <div className="section">
        <DailyProgress
          totalOz={totalOz}
          goalOz={totalGoalOz}
          bonusOz={bonusOz}
          baseGoalOz={baseGoalOz}
        />
      </div>

      <div className="section">
        <div className="section-title">Activities today</div>
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
