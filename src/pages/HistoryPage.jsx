import { useState } from 'react'
import WeeklyChart from '../components/charts/WeeklyChart'
import MonthlyChart from '../components/charts/MonthlyChart'

export default function HistoryPage() {
  const [tab, setTab] = useState('week')

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">History</h1>
        <p className="page-subtitle">Your hydration over time</p>
      </div>

      <div className="section">
        <div className="tabs">
          <button className={`tab-btn${tab === 'week' ? ' active' : ''}`} onClick={() => setTab('week')}>
            This week
          </button>
          <button className={`tab-btn${tab === 'month' ? ' active' : ''}`} onClick={() => setTab('month')}>
            This month
          </button>
        </div>

        <div className="card fade-up">
          {tab === 'week' ? <WeeklyChart /> : <MonthlyChart />}
        </div>
      </div>
    </div>
  )
}
