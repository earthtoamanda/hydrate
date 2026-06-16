import MonthlyScore from '../components/score/MonthlyScore'

export default function ScorePage() {
  const monthName = new Date().toLocaleDateString('en-GB', { month: 'long' })

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Score</h1>
        <p className="page-subtitle">{monthName} report card</p>
      </div>

      <div className="section">
        <MonthlyScore />
      </div>
    </div>
  )
}
