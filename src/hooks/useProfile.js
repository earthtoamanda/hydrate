import { useState, useCallback } from 'react'
import { getProfile, saveProfile } from '../storage'
import { calculateBaseGoal } from '../waterCalc'

export function useProfile() {
  const [profile, setProfile] = useState(() => getProfile())

  const updateProfile = useCallback((data) => {
    const dailyGoalOz = calculateBaseGoal(data)
    const updated = { ...data, dailyGoalOz, setupComplete: true }
    saveProfile(updated)
    setProfile(updated)
    return updated
  }, [])

  return { profile, updateProfile }
}
