import { useState } from 'react'
import ProfileSetup from '../components/profile/ProfileSetup'
import { useProfile } from '../hooks/useProfile'
import { useNotifications } from '../hooks/useNotifications'
import { saveNotifPrefs, getNotifPrefs } from '../storage'

export default function OnboardingPage({ onComplete }) {
  const { updateProfile } = useProfile()
  const { requestPermission } = useNotifications()
  const [step, setStep] = useState('profile')
  const [savedProfile, setSavedProfile] = useState(null)

  async function handleProfileSave(data) {
    const profile = updateProfile(data)
    setSavedProfile(profile)
    setStep('notifications')
  }

  async function handleEnableNotifs() {
    const result = await requestPermission()
    if (result === 'granted') {
      const prefs = getNotifPrefs()
      saveNotifPrefs({ ...prefs, enabled: true })
    }
    onComplete()
  }

  if (step === 'profile') {
    return (
      <div className="onboarding-wrap">
        <div className="onboarding-hero">
          <div className="onboarding-drop" />
          <h1 className="onboarding-title">Hydrate</h1>
          <p className="onboarding-subtitle">
            Track your water intake, hit your daily goal, and stay on top of your health.
          </p>
        </div>
        <ProfileSetup onSave={handleProfileSave} submitLabel="Calculate my goal" />
      </div>
    )
  }

  return (
    <div className="onboarding-wrap">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="goal-preview" style={{ marginBottom: 32 }}>
          <div className="goal-preview-value">{savedProfile?.dailyGoalOz}</div>
          <div className="goal-preview-unit">oz / day</div>
          <div className="goal-preview-label">your personalised daily goal</div>
        </div>

        <div className="permission-card">
          <div className="permission-title">Get daily reminders?</div>
          <div className="permission-body">
            Morning, midday, and evening nudges so you actually remember to drink water. You can customise times in Settings.
          </div>
          <button className="btn btn-primary btn-full" onClick={handleEnableNotifs} type="button">
            Yes, remind me
          </button>
        </div>

        <button
          className="btn btn-ghost btn-full"
          style={{ marginTop: 12 }}
          onClick={onComplete}
          type="button"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}
