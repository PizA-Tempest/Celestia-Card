import { useState } from 'react'
import { useLang, localizeCard } from '../i18n.jsx'
import { suitGlyph } from '../utils/reading.js'
import { cardArtUrl } from '../utils/artwork.js'

export default function TarotCard({ card }) {
  const { lang, t } = useLang()
  const [artFailed, setArtFailed] = useState(false)
  if (!card) return null
  const c = localizeCard(card, lang)
  const arcana =
    c.arcana === 'major'
      ? t('arcana.major')
      : `${t('suit.' + c.suit)} · ${c.number}`

  if (!artFailed) {
    return (
      <div className="tarot-face tarot-face-art" data-arcana={c.arcana}>
        <div className="tarot-face-art-frame">
          <img
            className="tarot-face-art-img"
            src={cardArtUrl(card.id)}
            alt={c.name}
            loading="lazy"
            draggable="false"
            onError={() => setArtFailed(true)}
          />
        </div>
        <div className="tarot-face-plate">
          <span className="tarot-face-number">{c.number}</span>
          <span className="tarot-face-name">{c.name}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="tarot-face" data-arcana={c.arcana}>
      <div className="tarot-face-ornament">{suitGlyph(c.suit)}</div>
      <div className="tarot-face-number">{c.number}</div>
      <div className="tarot-face-name">{c.name}</div>
      <div className="tarot-face-arcana">{arcana}</div>
    </div>
  )
}
