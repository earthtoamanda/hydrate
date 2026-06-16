const PROFILE_KEY = 'wt_profile'
const NOTIF_KEY = 'wt_notif_prefs'
const MODIFIERS_KEY = 'wt_daily_modifiers'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function getProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY)) } catch { return null }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function getNotifPrefs() {
  try {
    return JSON.parse(localStorage.getItem(NOTIF_KEY)) || defaultNotifPrefs()
  } catch { return defaultNotifPrefs() }
}

export function saveNotifPrefs(prefs) {
  localStorage.setItem(NOTIF_KEY, JSON.stringify(prefs))
}

function defaultNotifPrefs() {
  return {
    enabled: false,
    morning: { enabled: true, time: '08:00' },
    midday: { enabled: true, time: '13:00' },
    evening: { enabled: true, time: '19:30' },
  }
}

export function getTodayModifiers() {
  try {
    const stored = JSON.parse(localStorage.getItem(MODIFIERS_KEY))
    if (stored?.date === todayStr()) return stored.ids || []
    return []
  } catch { return [] }
}

export function saveTodayModifiers(ids) {
  localStorage.setItem(MODIFIERS_KEY, JSON.stringify({ date: todayStr(), ids }))
}
