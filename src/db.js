import { openDB } from 'idb'

const DB_NAME = 'WaterTracker'
const DB_VERSION = 1

let _db

async function getDB() {
  if (!_db) {
    _db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const logs = db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true })
        logs.createIndex('by_date', 'date')
        logs.createIndex('by_month', 'month')

        const summaries = db.createObjectStore('daily_summaries', { keyPath: 'date' })
        summaries.createIndex('by_month', 'month')
      },
    })
  }
  return _db
}

function todayStr() { return new Date().toISOString().slice(0, 10) }
function monthStr() { return new Date().toISOString().slice(0, 7) }

export async function addLog(amountOz, source = 'quick') {
  const db = await getDB()
  const now = new Date()
  const date = now.toISOString().slice(0, 10)
  return db.add('logs', { date, month: date.slice(0, 7), timestamp: now.getTime(), amountOz, source })
}

export async function deleteLog(id) {
  const db = await getDB()
  await db.delete('logs', id)
}

export async function getLogsForDate(date) {
  const db = await getDB()
  const all = await db.getAllFromIndex('logs', 'by_date', date)
  return all.sort((a, b) => b.timestamp - a.timestamp)
}

export async function upsertDailySummary(summary) {
  const db = await getDB()
  await db.put('daily_summaries', summary)
}

export async function getDailySummary(date) {
  const db = await getDB()
  return db.get('daily_summaries', date)
}

export async function getSummariesForMonth(month) {
  const db = await getDB()
  return db.getAllFromIndex('daily_summaries', 'by_month', month)
}

export async function getSummariesForDates(dates) {
  const db = await getDB()
  return Promise.all(dates.map(d => db.get('daily_summaries', d)))
}
