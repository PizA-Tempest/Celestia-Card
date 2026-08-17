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