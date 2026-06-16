export function calculateMonthScore(dailySummaries) {
  const todayStr = new Date().toISOString().slice(0, 10)
  const elapsed = dailySummaries.filter(d => d.date <= todayStr && d.totalOz !== undefined)
  if (elapsed.length === 0) return { score: null, grade: null, daysGoalMet: 0, daysElapsed: 0, completionRate: 0 }

  const daysGoalMet = elapsed.filter(d => d.goalMet).length
  const completionRate = daysGoalMet / elapsed.length

  const nonMet = elapsed.filter(d => !d.goalMet)
  const avgPartial = nonMet.length > 0
    ? nonMet.reduce((sum, d) => sum + Math.min(d.totalOz / d.goalOz, 1), 0) / nonMet.length
    : 1.0

  const score = Math.round(Math.min((completionRate * 0.8 + avgPartial * 0.2) * 100, 100))
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'

  return { score, grade, daysGoalMet, daysElapsed: elapsed.length, completionRate }
}
