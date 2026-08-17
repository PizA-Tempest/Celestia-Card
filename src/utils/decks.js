export const DECKS = [
  { id: 'celestial', nameKey: 'deck.celestial', accent: '#d9b56a' },
  { id: 'ember', nameKey: 'deck.ember', accent: '#e07a4a' },
  { id: 'emerald', nameKey: 'deck.emerald', accent: '#6fce9a' },
  { id: 'moonlight', nameKey: 'deck.moonlight', accent: '#c9b8ff' },
]

export const DECK_STYLES = {
  celestial: {},
  ember: {
    '--card-accent': '#e07a4a',
    '--face-bg-a': '#33202a',
    '--face-bg-b': '#1c1219',
    '--face-bg-major-a': '#3a2330',
    '--face-bg-major-b': '#211521',
    '--face-text': '#f3c9a8',
    '--card-back-a': '#2b1a22',
    '--card-back-b': '#190f15',
  },
  emerald: {
    '--card-accent': '#6fce9a',
    '--face-bg-a': '#0f2a26',
    '--face-bg-b': '#0a1c1a',
    '--face-bg-major-a': '#13332d',
    '--face-bg-major-b': '#0b201d',
    '--face-text': '#c9f0da',
    '--card-back-a': '#122821',
    '--card-back-b': '#0a1814',
  },
  moonlight: {
    '--card-accent': '#c9b8ff',
    '--face-bg-a': '#241d45',
    '--face-bg-b': '#161034',
    '--face-bg-major-a': '#2b2152',
    '--face-bg-major-b': '#1a123c',
    '--face-text': '#e6ddff',
    '--card-back-a': '#231b40',
    '--card-back-b': '#140f2c',
  },
}

export function loadDeck() {
  try {
    return localStorage.getItem('celestia-deck') || 'celestial'
  } catch {
    return 'celestial'
  }
}

export function storeDeck(id) {
  try {
    localStorage.setItem('celestia-deck', id)
  } catch {
    // storage unavailable — ignore
  }
}