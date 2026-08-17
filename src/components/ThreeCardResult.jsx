import TarotCard from './TarotCard.jsx'
import { combineReading, POSITION_3 } from '../utils/reading.js'

export default function ThreeCardResult({ draws, onAgain, onNewReading }) {
  return (
    <section className="result" aria-live="polite">
      <p className="result-eyebrow">Three Card Reading</p>

      <div className="spread result-spread">
        {POSITION_3.map((pos, i) => {
          const d = draws[i]
          return (
            <div className="spread-slot" key={pos.key}>
              <span className="spread-label">{pos.label}</span>
              <div className="spread-card">
                <TarotCard card={d.card} />
              </div>
              <span className={`orientation-badge ${d.orientation}`}>
                {d.orientation}
              </span>
            </div>
          )
        })}
      </div>

      <div className="spread-meanings">
        {POSITION_3.map((pos, i) => {
          const d = draws[i]
          const meaning =
            d.orientation === 'upright' ? d.card.upright : d.card.reversed
          return (
            <div className="spread-meaning" key={pos.key}>
              <h3 className="spread-meaning-title">{d.card.name}</h3>
              <p className="spread-meaning-keywords">
                {d.card.keywords.join(' · ')}
              </p>
              <p>{meaning}</p>
            </div>
          )
        })}
      </div>

      <div className="combined">
        <h3 className="combined-title">The Whole Story</h3>
        <p>{combineReading(draws)}</p>
      </div>

      <div className="result-actions">
        <button type="button" className="btn" onClick={onAgain}>
          Draw Again
        </button>
        <button type="button" className="btn btn-ghost" onClick={onNewReading}>
          New Reading
        </button>
      </div>
    </section>
  )
}