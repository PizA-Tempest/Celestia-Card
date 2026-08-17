import TarotCard from './TarotCard.jsx'

export default function CardReveal({ card, flipped, onClick }) {
  return (
    <button
      type="button"
      className={`flip-card${flipped ? ' flipped' : ''}`}
      onClick={onClick}
      disabled={flipped}
      aria-label="Choose a face-down card"
    >
      <div className="flip-inner">
        <div className="flip-face flip-back">
          <span className="flip-back-star">✦</span>
        </div>
        <div className="flip-face flip-front">
          {card ? <TarotCard card={card} /> : null}
        </div>
      </div>
    </button>
  )
}