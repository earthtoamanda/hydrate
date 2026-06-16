import { useMonthData } from '../../hooks/useMonthData'
import { calculateMonthScore } from '../../scoring'
import { getPun } from '../../puns'

export default function MonthlyScore() {
  const now = new Date()
  const monthStr = now.toISOString().slice(0, 7)
  const { summaries, loading } = useMonthData(monthStr)

  if (loading) return <div className="empty-state">Loading...</div>

  const { score, grade, daysGoalMet, daysElapsed, completionRate } = calculateMonthScore(summaries)

  if (score === null) {
    return (
      <div className="card score-card">
        <div className="score-grade" style={{ color: 'var(--border)', fontSize: 80 }}>?</div>
        <p className="score-pun">No data yet this month. Log some water to get your score!</p>
      </div>
    )
  }

  const monthName = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  const pun = getPun(grade, now.getMonth())

  const avgOz = daysElapsed > 0
    ? Math.round(summaries.filter(s => s.date <= now.toISOString().slice(0, 10)).reduce((s, d) => s + d.totalOz, 0) / daysElapsed)
    : 0

  return (
    <div>
      <div className="card score-card">
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{monthName}</div>
        <div className={`score-grade ${grade}`}>{grade}</div>
        <div className="score-number">{score}/100</div>
        <div className="score-pun">"{pun}"</div>
      </div>

      <div className="score-divider" />

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>{daysGoalMet}</div>
          <div className="stat-label">Goals met</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{daysElapsed}</div>
          <div className="stat-label">Days tracked</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgOz}<span style={{ fontSize: 14, fontWeight: 400 }}>oz</span></div>
          <div className="stat-label">Daily avg</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="section-title" style={{ marginBottom: 12 }}>How scores are calculated</div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          80% of your score is whether you hit your daily goal. 20% is partial credit for days where you tried but fell short.
          An A is 90+ points.
        </p>
      </div>
    </div>
  )
}
