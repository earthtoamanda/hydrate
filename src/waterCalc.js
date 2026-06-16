export const ACTIVITY_MODIFIERS = [
  { id: 'walk', label: 'Light exercise (walk, yoga, ~30 min)', addOz: 12 },
  { id: 'gym', label: 'Moderate exercise (gym, cycling, 45–60 min)', addOz: 24 },
  { id: 'intense', label: 'Intense exercise (running, HIIT, 60+ min)', addOz: 40 },
  { id: 'hot_indoors', label: 'Hot day indoors (25°C+)', addOz: 8 },
  { id: 'hot_outdoors', label: 'Hot day outdoors / beach / direct sun', addOz: 20 },
  { id: 'humid', label: 'Humid environment', addOz: 12 },
  { id: 'illness', label: 'Illness (fever, vomiting, etc.)', addOz: 24 },
  { id: 'alcohol', label: 'Alcohol (+8oz per drink, tap multiple times)', addOz: 8 },
  { id: 'altitude', label: 'High altitude (2,500m+)', addOz: 16 },
  { id: 'breastfeeding', label: 'Breastfeeding', addOz: 26 },
  { id: 'pregnancy', label: 'Pregnancy', addOz: 10 },
]

// National Academies baselines: men 125oz, women 91oz
// Formula: weight(lbs) × 0.67, gender-adjusted, clamped 64–128oz
export function calculateBaseGoal({ gender, weightLbs }) {
  let oz = weightLbs * 0.67
  if (gender === 'female') oz *= 0.9
  if (gender === 'other') oz *= 0.95
  return Math.round(Math.min(Math.max(oz, 64), 128))
}

export function calculateDailyGoal(profile, activeModifierIds = []) {
  const baseGoalOz = calculateBaseGoal(profile)
  const bonusOz = activeModifierIds.reduce((sum, id) => {
    const mod = ACTIVITY_MODIFIERS.find(m => m.id === id)
    return sum + (mod ? mod.addOz : 0)
  }, 0)
  return { baseGoalOz, bonusOz, totalGoalOz: baseGoalOz + bonusOz }
}

export function ozToLiters(oz) {
  return (oz * 0.0295735).toFixed(1)
}

export function ozToGlasses(oz) {
  return Math.round(oz / 8)
}

export function getMotivationalLine(pct) {
  if (pct === 0) return 'Start your day with a glass of water.'
  if (pct < 0.25) return 'Good start — keep it going!'
  if (pct < 0.5) return "You're on your way. Don't stop now."
  if (pct < 0.75) return "Over halfway! You're doing great."
  if (pct < 1) return "Almost there — one more glass!"
  return "Goal reached! You actually did it."
}
