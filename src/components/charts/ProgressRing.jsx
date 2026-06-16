import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip } from 'chart.js'

Chart.register(ArcElement, Tooltip)

export default function ProgressRing({ current, goal, size = 220 }) {
  const pct = goal > 0 ? Math.min(current / goal, 1) : 0
  const done = pct >= 1

  const data = {
    datasets: [{
      data: [Math.min(current, goal), Math.max(goal - current, 0)],
      backgroundColor: [done ? '#10b981' : '#3b82f6', '#e2e8f0'],
      borderWidth: 0,
      cutout: '80%',
    }],
  }

  const options = {
    responsive: false,
    animation: { animateRotate: true, duration: 900, easing: 'easeOutCubic' },
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
  }

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <Doughnut data={data} options={options} width={size} height={size} />
      <div className="progress-ring-label">
        <span className="progress-oz-value">{Math.round(current)}</span>
        <span className="progress-oz-unit">oz</span>
        <span className="progress-goal-text">of {goal}oz</span>
      </div>
    </div>
  )
}
