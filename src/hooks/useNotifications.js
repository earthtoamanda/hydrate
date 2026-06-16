import { useEffect, useCallback, useRef } from 'react'
import { getNotifPrefs } from '../storage'

function getDelayMs(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  const now = new Date()
  const target = new Date()
  target.setHours(h, m, 0, 0)
  if (target <= now) target.setDate(target.getDate() + 1)
  return target.getTime() - now.getTime()
}

export function useNotifications() {
  const timersRef = useRef([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(t => clearTimeout(t))
    timersRef.current = []
  }, [])

  const scheduleAll = useCallback((totalOz, goalOz) => {
    clearTimers()
    if (typeof window === 'undefined') return
    if (!('Notification' in window) || Notification.permission !== 'granted') return
    const prefs = getNotifPrefs()
    if (!prefs.enabled) return

    const show = (title, body) => {
      new Notification(title, { body, icon: '/icon.png', badge: '/icon.png' })
    }

    const configs = [
      {
        key: 'morning',
        pref: prefs.morning,
        title: 'Good morning — time to hydrate!',
        body: "Start your day strong. First glass down?",
      },
      {
        key: 'midday',
        pref: prefs.midday,
        title: 'Midday check-in',
        body: `You've had ${Math.round(totalOz)}oz so far. Goal is ${Math.round(goalOz)}oz.`,
      },
      {
        key: 'evening',
        pref: prefs.evening,
        title: 'Evening update',
        body: totalOz >= goalOz
          ? "Goal crushed today! You actually did it."
          : `${Math.round(goalOz - totalOz)}oz left to hit your goal. Don't quit now.`,
      },
    ]

    configs.forEach(({ key, pref, title, body }) => {
      if (!pref?.enabled) return
      const delay = getDelayMs(pref.time)
      const timer = setTimeout(() => show(title, body), delay)
      timersRef.current.push(timer)
    })
  }, [clearTimers])

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return 'unsupported'
    if (Notification.permission === 'granted') return 'granted'
    return Notification.requestPermission()
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const permission = typeof window !== 'undefined' && 'Notification' in window
    ? Notification.permission
    : 'unsupported'

  return { requestPermission, scheduleAll, permission }
}
