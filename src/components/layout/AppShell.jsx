import NavBar from './NavBar'

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <main className="app-main">{children}</main>
      <NavBar />
    </div>
  )
}
