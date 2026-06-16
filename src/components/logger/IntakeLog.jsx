export default function IntakeLog({ logs, onDelete }) {
  if (logs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon" />
        No water logged yet today.<br />Tap a button above to get started.
      </div>
    )
  }

  return (
    <ul className="log-list">
      {logs.map(entry => (
        <li key={entry.id} className="log-entry">
          <div className="log-left">
            <div className="log-dot" />
            <div>
              <div className="log-amount">
                {entry.amountOz}<span>oz</span>
              </div>
              <div className="log-time">
                {new Date(entry.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          <button
            className="log-delete"
            onClick={() => onDelete(entry.id)}
            type="button"
            aria-label="Remove entry"
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  )
}
