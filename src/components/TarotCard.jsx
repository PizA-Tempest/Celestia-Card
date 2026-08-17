import { useLang, localizeCard } from '../i18n.jsx'
import { suitGlyph } from '../utils/reading.js'

export default function TarotCard({ card }) {
  const { lang, t } = useLang()
  if (!card) return null
  const c = localizeCard(card, lang)
  const arcana =
    c.arcana === 'major'
      ? t('arcana.major')
      : `${t('suit.' + c.suit)} · ${c.number}`
  return (
    <div className="tarot-face" data-arcana={c.arcana}>
      <div className="tarot-face-ornament">{suitGlyph(c.suit)}</div>
      <div className="tarot-face-number">{c.number}</div>
      <div className="tarot-face-name">{c.name}</div>
      <div className="tarot-face-arcana">{arcana}</div>
    </div>
  )
}