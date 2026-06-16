import { useMonthData } from '../../hooks/useMonthData'

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year, month) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

export default function MonthlyChart() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`
  const todayStr = now.toISOString().slice(0, 10)

  const { summaries, loading } = useMonthData(monthStr)

  if (loading) return <div className="empty-state">Loading...</div>

  const summaryMap = {}
  summaries.forEach(s => { summaryMap[s.date] = s })

  const daysInMonth = getDaysInMonth(year, month)
  const firstDow = getFirstDayOfWeek(year, month)

  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push({ empty: true, day: null })
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${monthStr}-${String(d).padStart(2, '0')}`
    const summary = summaryMap[dateStr]
    const isToday = dateStr === todayStr
    const isFuture = dateStr > todayStr

    let status = 'no-data'
    if (summary) {
      const pct = summary.totalOz / summary.goalOz
      if (summary.goalMet) status = 'goal-met'
      else if (pct >= 0.6) status = 'partial'
      else status = 'missed'
    }

    cells.push({ empty: false, day: d, dateStr, status: isFuture ? 'no-data' : status, isToday })
  }

  const monthName = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  const metCount = summaries.filter(s => s.goalMet).length
  const trackedCount = summaries.filter(s => s.date <= todayStr).length

  return (
    <div>
      <p style={{ fontWeight: 700, marginBottom: 16, color: 'var(--text)' }}>{monthName}</p>
      <div className="calendar-grid">
        {DAY_LABELS.map(l => <div key={l} className="calendar-day-label">{l}</div>)}
        {cells.map((cell, i) => (
          <div
            key={i}
            className={[
              'calendar-day',
              cell.empty ? 'empty' : cell.status,
              cell.isToday ? 'today' : '',
            ].join(' ')}
          >
            {cell.empty ? '' : cell.day}
          </div>
        ))}
      </div>
      <div className="stats-row" style={{ marginTop: 20 }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>{metCount}</div>
          <div className="stat-label">Goals met</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{trackedCount}</div>
          <div className="stat-label">Days tracked</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {trackedCount > 0 ? Math.round((metCount / trackedCount) * 100) : 0}%
          </div>
          <div className="stat-label">Success rate</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: '#d1fae5', display: 'inline-block' }} /> Goal met
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: '#fef3c7', display: 'inline-block' }} /> Partial
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: '#fee2e2', display: 'inline-block' }} /> Missed
        </span>
      </div>
    </div>
  )
}
