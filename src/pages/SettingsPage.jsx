import { useState } from 'react'
import ProfileSetup from '../components/profile/ProfileSetup'
import NotifSettings from '../components/notifications/NotifSettings'
import { useProfile } from '../hooks/useProfile'
import { ozToLiters, ozToGlasses } from '../waterCalc'

export default function SettingsPage() {
  const { profile, updateProfile } = useProfile()
  const [editingProfile, setEditingProfile] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSave(data) {
    updateProfile(data)
    setEditingProfile(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <div className="section">
        <div className="settings-section">
          <div className="settings-section-title">Your profile</div>
          <div className="card">
            {!editingProfile ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Daily goal</div>
                    <div style={{ fontSize: 28, fontWeight: 200 }}>
                      {profile?.dailyGoalOz}<span style={{ fontSize: 14, color: 'var(--text-muted)', marginLeft: 4 }}>oz</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                      {ozToGlasses(profile?.dailyGoalOz || 0)} glasses &middot; {ozToLiters(profile?.dailyGoalOz || 0)}L
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={() => setEditingProfile(true)} type="button">
                    Edit
                  </button>
                </div>

                <div style={{ display: 'flex', gap: 20, fontSize: 14, color: 'var(--text-muted)' }}>
                  <span>
                    Gender: <strong style={{ color: 'var(--text)' }}>
                      {profile?.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : '—'}
                    </strong>
                  </span>
                  <span>
                    Weight: <strong style={{ color: 'var(--text)' }}>
                      {profile?.weightLbs ? `${profile.weightLbs}lbs` : '—'}
                    </strong>
                  </span>
                </div>

                {saved && (
                  <p style={{ fontSize: 13, color: 'var(--success)', marginTop: 12 }}>Saved!</p>
                )}
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>Edit profile</h3>
                  <button className="btn btn-ghost btn-sm" onClick={() => setEditingProfile(false)} type="button">
                    Cancel
                  </button>
                </div>
                <ProfileSetup initial={profile} onSave={handleSave} submitLabel="Save changes" />
              </div>
            )}
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Reminders</div>
          <NotifSettings />
        </div>

        <div className="settings-section">
          <div className="settings-section-title">About</div>
          <div className="card">
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text)' }}>Hydrate</strong> — a personal water tracker.<br />
              All data is stored locally on your device.<br />
              Nothing is sent anywhere.
            </p>
            <p style={{ fontSize: 12, color: 'var(--border)', marginTop: 12 }}>
              Water goal formula sourced from National Academies of Sciences, Mayo Clinic, and NHS recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
