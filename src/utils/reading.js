import deck from '../data/tarot.json'

export { deck }

export function drawCards(count) {
  const shuffled = [...deck].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function randomOrientation() {
  return Math.random() < 0.5 ? 'upright' : 'reversed'
}

export function suitGlyph(suit) {
  return { wands: '✶', cups: '☾', swords: '✦', pentacles: '◈' }[suit] || '✧'
}

export function suitLabel(suit) {
  return { wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' }[suit]
}

export function arcanaLabel(card) {
  return card.arcana === 'major' ? 'Major Arcana' : `${suitLabel(card.suit)} · ${card.number}`
}

export const POSITION_3 = [
  { key: 'past', label: 'Past' },
  { key: 'present', label: 'Present' },
  { key: 'future', label: 'Future' },
]

export const POSITION_5 = [
  { key: 'situation', label: 'Current Situation' },
  { key: 'challenge', label: 'Challenge' },
  { key: 'energy', label: 'Main Energy' },
  { key: 'advice', label: 'Advice' },
  { key: 'outcome', label: 'Possible Outcome' },
]

export function combineReading(draws, positions) {
  const brief = (d) =>
    d.orientation === 'upright' ? d.card.upright : d.card.reversed
  const parts = draws.map(
    (d, i) => `${positions[i].label} · ${d.card.name} — ${brief(d)}`
  )
  const flow = draws
    .map((d) => d.card.keywords[0].toLowerCase())
    .join(' → ')
  return `${parts.join(' ')} As one thread, the reading flows through ${flow} — hold the full picture, not just a single card.`
}