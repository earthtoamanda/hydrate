import { useState, useEffect, useCallback } from 'react'
import { getLogsForDate, addLog as dbAddLog, deleteLog as dbDeleteLog, upsertDailySummary } from '../db'
import { calculateDailyGoal } from '../waterCalc'
import { getProfile, getTodayModifiers } from '../storage'

function todayStr() { return new Date().toISOString().slice(0, 10) }
function monthStr() { return new Date().toISOString().slice(0, 7) }

async function buildSummary(logs) {
  const profile = getProfile()
  if (!profile) return
  const modifierIds = getTodayModifiers()
  const { totalGoalOz } = calculateDailyGoal(profile, modifierIds)
  const totalOz = logs.reduce((sum, l) => sum + l.amountOz, 0)
  await upsertDailySummary({
    date: todayStr(),
    month: monthStr(),
    totalOz,
    goalOz: totalGoalOz,
    goalMet: totalOz >= totalGoalOz,
    entryCount: logs.length,
  })
}

export function useTodayLog() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const entries = await getLogsForDate(todayStr())
    setLogs(entries)
    setLoading(false)
    await buildSummary(entries)
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const addEntry = useCallback(async (oz) => {
    await dbAddLog(oz, 'quick')
    await refresh()
  }, [refresh])

  const removeEntry = useCallback(async (id) => {
    await dbDeleteLog(id)
    await refresh()
  }, [refresh])

  const totalOz = logs.reduce((sum, l) => sum + l.amountOz, 0)

  return { logs, totalOz, loading, addEntry, removeEntry, refresh }
}
