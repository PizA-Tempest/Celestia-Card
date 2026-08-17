import { useState } from 'react'
import CardReveal from './CardReveal.jsx'
import { useLang } from '../i18n.jsx'
import { drawCards, randomOrientation } from '../utils/reading.js'

export default function CardSpread({ positions, onComplete }) {
  const { t } = useLang()
  const [draws, setDraws] = useState(Array(positions.length).fill(null))
  const isWide = positions.length > 4

  const handlePick = (index) => {
    if (draws[index]) return
    const entry = { card: drawCards(1)[0], orientation: randomOrientation() }
    const next = draws.map((d, i) => (i === index ? entry : d))
    setDraws(next)
    if (next.every(Boolean)) {
      setTimeout(() => onComplete(next), 900)
    }
  }

  return (
    <div
      className={`spread${isWide ? ' spread-5' : ''}`}
      role="group"
      aria-label="Card spread"
    >
      {positions.map((pos, i) => (
        <div className="spread-slot" key={pos.key}>
          <span className="spread-label">{t('position.' + pos.key)}</span>
          <CardReveal
            card={draws[i] ? draws[i].card : null}
            flipped={!!draws[i]}
            onClick={() => handlePick(i)}
          />
        </div>
      ))}
    </div>
  )
}