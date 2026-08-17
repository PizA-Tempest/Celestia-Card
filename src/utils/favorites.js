const KEY = 'celestia-favorites'

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persist(ids) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    // storage unavailable — ignore
  }
}

export function toggleFavorite(id) {
  const current = loadFavorites()
  const next = current.includes(id)
    ? current.filter((f) => f !== id)
    : [...current, id]
  persist(next)
  return next
}