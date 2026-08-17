import { useState } from 'react'
import CardReveal from './CardReveal.jsx'
import { drawCards, randomOrientation, POSITION_3 } from '../utils/reading.js'

export default function ThreeCardSpread({ onComplete }) {
  const [draws, setDraws] = useState([null, null, null])

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
    <div className="spread" role="group" aria-label="Three card spread">
      {POSITION_3.map((pos, i) => (
        <div className="spread-slot" key={pos.key}>
          <span className="spread-label">{pos.label}</span>
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