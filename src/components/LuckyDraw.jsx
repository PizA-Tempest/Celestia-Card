import { useState } from 'react'
import CardReveal from './CardReveal.jsx'
import { useLang } from '../i18n.jsx'
import { drawCards, randomOrientation } from '../utils/reading.js'

export default function LuckyDraw({ onComplete }) {
  const { t } = useLang()
  const [entry, setEntry] = useState(null)

  const handleDraw = () => {
    if (entry) return
    const draw = { card: drawCards(1)[0], orientation: randomOrientation() }
    setEntry(draw)
    setTimeout(() => onComplete(draw), 900)
  }

  return (
    <div className="lucky">
      <p className="section-hint">{t('lucky.hint')}</p>
      <div className="lucky-card">
        <CardReveal
          card={entry ? entry.card : null}
          flipped={!!entry}
          onClick={handleDraw}
        />
      </div>
      <button
        type="button"
        className="btn"
        onClick={handleDraw}
        disabled={!!entry}
      >
        {entry ? t('lucky.drawing') : t('lucky.draw')}
      </button>
    </div>
  )
}