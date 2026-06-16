import { useState } from 'react'
import { calculateBaseGoal, ozToLiters, ozToGlasses } from '../../waterCalc'

const DEFAULT = { gender: '', weightLbs: '', heightFt: '', heightIn: '' }

export default function ProfileSetup({ initial, onSave, submitLabel = 'Save' }) {
  const [form, setForm] = useState(() => initial
    ? {
        gender: initial.gender || '',
        weightLbs: initial.weightLbs || '',
        heightFt: initial.heightFt || '',
        heightIn: initial.heightIn || '',
      }
    : DEFAULT)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const isValid = form.gender && form.weightLbs > 0

  const preview = isValid
    ? calculateBaseGoal({ gender: form.gender, weightLbs: Number(form.weightLbs) })
    : null

  function handleSubmit(e) {
    e.preventDefault()
    if (!isValid) return
    onSave({
      gender: form.gender,
      weightLbs: Number(form.weightLbs),
      heightFt: Number(form.heightFt) || 0,
      heightIn: Number(form.heightIn) || 0,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Gender</label>
        <div className="gender-grid">
          {[['female', 'Female'], ['male', 'Male'], ['other', 'Other']].map(([val, label]) => (
            <button
              key={val}
              type="button"
              className={`gender-btn${form.gender === val ? ' selected' : ''}`}
              onClick={() => set('gender', val)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Weight</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            className="form-input"
            type="number"
            min="50"
            max="500"
            placeholder="e.g. 145"
            value={form.weightLbs}
            onChange={e => set('weightLbs', e.target.value)}
          />
          <span style={{ color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>lbs</span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Height (optional)</label>
        <div className="measure-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                className="form-input"
                type="number"
                min="0"
                max="8"
                placeholder="5"
                value={form.heightFt}
                onChange={e => set('heightFt', e.target.value)}
              />
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>ft</span>
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                className="form-input"
                type="number"
                min="0"
                max="11"
                placeholder="5"
                value={form.heightIn}
                onChange={e => set('heightIn', e.target.value)}
              />
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>in</span>
            </div>
          </div>
        </div>
        <p className="form-hint">Height is optional — it's used as additional context but doesn't change the calculation significantly.</p>
      </div>

      {preview && (
        <div className="goal-preview" style={{ marginBottom: 20 }}>
          <div className="goal-preview-value">{preview}</div>
          <div className="goal-preview-unit">oz / day</div>
          <div className="goal-preview-label">
            {ozToGlasses(preview)} glasses &middot; {ozToLiters(preview)}L &middot; your personalised goal
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-full" disabled={!isValid}>
        {submitLabel}
      </button>
    </form>
  )
}
