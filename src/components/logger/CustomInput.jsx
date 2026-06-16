import { useState } from 'react'

export default function CustomInput({ onAdd }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const oz = parseFloat(value)
    if (!oz || oz <= 0) return
    onAdd(oz)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="custom-input-row">
      <input
        className="form-input"
        type="number"
        min="1"
        max="256"
        step="0.5"
        placeholder="Custom amount (oz)"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit" className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap' }}>
        + Add
      </button>
    </form>
  )
}
