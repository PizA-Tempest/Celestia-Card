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

export function combineReading(draws) {
  const [past, present, future] = draws
  const brief = (d) =>
    d.orientation === 'upright' ? d.card.upright : d.card.reversed
  return `Your Past is shaped by ${past.card.name} — ${brief(past)}. In the Present, ${present.card.name} carries ${brief(present)}. Looking ahead, ${future.card.name} promises ${brief(future)}. Read as one story, the momentum of your past flows into the choices of today and opens the way for what is coming.`
}