import { suitGlyph, arcanaLabel } from '../utils/reading.js'

export default function TarotCard({ card }) {
  if (!card) return null
  return (
    <div className="tarot-face" data-arcana={card.arcana}>
      <div className="tarot-face-ornament">{suitGlyph(card.suit)}</div>
      <div className="tarot-face-number">{card.number}</div>
      <div className="tarot-face-name">{card.name}</div>
      <div className="tarot-face-arcana">{arcanaLabel(card)}</div>
    </div>
  )
}