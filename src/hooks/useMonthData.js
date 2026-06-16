import { useState, useEffect, useCallback } from 'react'
import { getSummariesForMonth } from '../db'

export function useMonthData(monthStr) {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const month = monthStr || new Date().toISOString().slice(0, 7)
    const data = await getSummariesForMonth(month)
    setSummaries(data)
    setLoading(false)
  }, [monthStr])

  useEffect(() => { load() }, [load])

  return { summaries, loading, reload: load }
}
