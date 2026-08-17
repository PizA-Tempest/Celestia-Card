import { useState } from 'react'
import CardReveal from './CardReveal.jsx'
import TarotCard from './TarotCard.jsx'
import { deck, drawCards, randomOrientation } from '../utils/reading.js'

const GRID_SIZE = 8

export default function CardDeck({ onPick }) {
  const [picked, setPicked] = useState(null)

  const handleClick = (index) => {
    if (picked) return
    const card = drawCards(1)[0]
    setPicked({ index, card })
    setTimeout(() => {
      onPick({ card, orientation: randomOrientation() })
    }, 850)
  }

  return (
    <div className="deck" role="group" aria-label="Choose your card">
      {Array.from({ length: GRID_SIZE }, (_, i) => (
        <CardReveal
          key={i}
          card={picked && picked.index === i ? picked.card : null}
          flipped={picked && picked.index === i}
          onClick={() => handleClick(i)}
        />
      ))}
    </div>
  )
}