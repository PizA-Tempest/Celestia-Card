const KEY = 'celestia-reading-history'
const MAX = 50

export const MODE_LABELS = {
  daily: 'Daily Card',
  lucky: 'Lucky Draw',
  three: 'Three Card Reading',
  five: 'Five Card Reading',
}

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persist(history) {
  try {
    localStorage.setItem(KEY, JSON.stringify(history))
  } catch {
    // storage unavailable — ignore
  }
}

export function addHistoryEntry(mode, draws) {
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    mode,
    date: new Date().toISOString(),
    draws,
  }
  const history = [entry, ...loadHistory()].slice(0, MAX)
  persist(history)
  return history
}

export function clearHistory() {
  persist([])
}