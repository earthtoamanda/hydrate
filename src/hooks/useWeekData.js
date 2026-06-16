import { useState, useEffect } from 'react'
import { getSummariesForDates } from '../db'

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })
}

export function useWeekData(refreshKey = 0) {
  const [weekData, setWeekData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const dates = getLast7Days()
      const summaries = await getSummariesForDates(dates)
      const data = dates.map((date, i) => ({
        date,
        label: new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short' }),
        totalOz: summaries[i]?.totalOz || 0,
        goalOz: summaries[i]?.goalOz || 0,
        goalMet: summaries[i]?.goalMet || false,
      }))
      setWeekData(data)
      setLoading(false)
    }
    load()
  }, [refreshKey])

  return { weekData, loading }
}
