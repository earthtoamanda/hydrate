import { useState } from 'react'
import { getNotifPrefs, saveNotifPrefs } from '../../storage'
import { useNotifications } from '../../hooks/useNotifications'

function Toggle({ checked, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  )
}

export default function NotifSettings() {
  const [prefs, setPrefs] = useState(() => getNotifPrefs())
  const { requestPermission, permission } = useNotifications()

  function update(path, value) {
    const next = { ...prefs }
    if (path.includes('.')) {
      const [key, sub] = path.split('.')
      next[key] = { ...next[key], [sub]: value }
    } else {
      next[path] = value
    }
    setPrefs(next)
    saveNotifPrefs(next)
  }

  async function handleEnable(checked) {
    if (checked && permission !== 'granted') {
      const result = await requestPermission()
      if (result !== 'granted') return
    }
    update('enabled', checked)
  }

  if (permission === 'unsupported') {
    return <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Notifications are not supported in this browser.</p>
  }

  if (permission === 'denied') {
    return (
      <div className="notif-blocked">
        Notifications are blocked for this site. To enable them, click the lock icon in your browser's address bar and allow notifications, then refresh.
      </div>
    )
  }

  return (
    <div>
      <div className="card">
        <div className="toggle-row">
          <div className="toggle-info">
            <div className="toggle-label">Enable reminders</div>
            <div className="toggle-sub">Daily check-ins via browser notification</div>
          </div>
          <Toggle checked={prefs.enabled} onChange={handleEnable} />
        </div>

        {prefs.enabled && (
          <>
            {[
              { key: 'morning', label: 'Morning reminder', sub: 'Start your hydration day' },
              { key: 'midday', label: 'Midday check-in', sub: 'How much have you had so far?' },
              { key: 'evening', label: 'Evening update', sub: "Last call — don't fall short" },
            ].map(({ key, label, sub }) => (
              <div key={key}>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="toggle-label">{label}</div>
                    <div className="toggle-sub">{sub}</div>
                  </div>
                  <Toggle
                    checked={prefs[key]?.enabled ?? true}
                    onChange={v => update(`${key}.enabled`, v)}
                  />
                </div>
                {prefs[key]?.enabled && (
                  <div className="time-row">
                    <span className="time-label">Time</span>
                    <input
                      type="time"
                      value={prefs[key]?.time || '08:00'}
                      onChange={e => update(`${key}.time`, e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.5 }}>
        Notifications require the app to be open in your browser. For best results, keep a tab open during the day.
      </p>
    </div>
  )
}
