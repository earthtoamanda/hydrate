import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { useWeekData } from '../../hooks/useWeekData'

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function WeeklyChart() {
  const { weekData, loading } = useWeekData()

  if (loading) return <div className="empty-state">Loading...</div>

  const avgGoal = weekData.length > 0
    ? Math.round(weekData.reduce((s, d) => s + (d.goalOz || 0), 0) / weekData.filter(d => d.goalOz > 0).length || 0)
    : 0

  const data = {
    labels: weekData.map(d => d.label),
    datasets: [
      {
        label: 'Water (oz)',
        data: weekData.map(d => d.totalOz),
        backgroundColor: weekData.map(d =>
          d.goalMet ? '#10b981' : d.totalOz > 0 ? '#3b82f6' : '#e2e8f0'
        ),
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.raw}oz`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9' },
        ticks: { callback: v => `${v}oz`, font: { size: 11 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, weight: '600' } },
      },
    },
    animation: { duration: 600 },
  }

  const goalLine = avgGoal > 0 ? (
    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
      Goal line: ~{avgGoal}oz/day &nbsp;&middot;&nbsp;
      Green = goal met &nbsp;&middot;&nbsp; Blue = partial
    </p>
  ) : null

  return (
    <div>
      <div style={{ height: 220 }}>
        <Bar data={data} options={options} />
      </div>
      {goalLine}
    </div>
  )
}
