import { useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getProfile } from './storage'
import AppShell from './components/layout/AppShell'
import OnboardingPage from './pages/OnboardingPage'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import ScorePage from './pages/ScorePage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  const [ready, setReady] = useState(() => !!getProfile()?.setupComplete)

  if (!ready) {
    return <OnboardingPage onComplete={() => setReady(true)} />
  }

  return (
    <HashRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </HashRouter>
  )
}
