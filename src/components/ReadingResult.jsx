import TarotCard from './TarotCard.jsx'

export default function ReadingResult({
  title = 'Daily Card',
  draw,
  onDrawAgain,
  onNewReading,
  actions = true,
}) {
  const { card, orientation } = draw
  const meaning = orientation === 'upright' ? card.upright : card.reversed

  return (
    <section className="result" aria-live="polite">
      <p className="result-eyebrow">{title}</p>
      <div className="result-card">
        <TarotCard card={card} />
      </div>
      <div className={`orientation-badge ${orientation}`}>
        {orientation === 'upright' ? 'Upright' : 'Reversed'}
      </div>
      <h2 className="result-name">{card.name}</h2>
      <p className="result-keywords">{card.keywords.join(' · ')}</p>
      <div className="result-meaning">
        <p>{meaning}</p>
        <p className="result-general">{card.general}</p>
      </div>
      {actions && (
        <div className="result-actions">
          <button type="button" className="btn" onClick={onDrawAgain}>
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