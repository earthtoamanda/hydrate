const CACHE_NAME = 'hydrate-v1'

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()))

const timers = {}

self.addEventListener('message', event => {
  const { type, schedules } = event.data || {}
  if (type !== 'SCHEDULE') return

  Object.values(timers).forEach(t => clearTimeout(t))

  schedules.forEach(({ key, delayMs, title, body }) => {
    timers[key] = setTimeout(() => {
      self.registration.showNotification(title || 'Hydrate reminder', {
        body: body || "Don't forget to drink water!",
        icon: '/icon.png',
        badge: '/icon.png',
        tag: key,
        renotify: true,
      })
    }, delayMs)
  })
})
