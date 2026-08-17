import TarotCard from './TarotCard.jsx'
import { combineReading } from '../utils/reading.js'

export default function SpreadResult({
  title,
  draws,
  positions,
  onAgain,
  onNewReading,
  actions = true,
}) {
  const isWide = positions.length > 4

  return (
    <section className="result" aria-live="polite">
      <p className="result-eyebrow">{title}</p>

      <div className={`spread result-spread${isWide ? ' spread-5' : ''}`}>
        {positions.map((pos, i) => {
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
        {positions.map((pos, i) => {
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
        <p>{combineReading(draws, positions)}</p>
      </div>

      {actions && (
        <div className="result-actions">
          <button type="button" className="btn" onClick={onAgain}>
            Draw Again
          </button>
          <button type="button" className="btn btn-ghost" onClick={onNewReading}>
            New Reading
          </button>
        </div>
      )}
    </section>
  )
}