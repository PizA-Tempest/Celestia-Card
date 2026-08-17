import { useState } from 'react'
import CardDeck from './components/CardDeck.jsx'
import ReadingResult from './components/ReadingResult.jsx'

export default function App() {
  const [phase, setPhase] = useState('intro')
  const [draw, setDraw] = useState(null)

  const startDailyCard = () => setPhase('choose')

  const handlePick = (result) => {
    setDraw(result)
    setPhase('result')
  }

  const drawAgain = () => {
    setDraw(null)
    setPhase('choose')
  }

  const newReading = () => {
    setDraw(null)
    setPhase('intro')
  }

  return (
    <div className="app">
      <div className="cosmos" aria-hidden="true">
        <div className="cosmos-layer cosmos-far" />
        <div className="cosmos-layer cosmos-near" />
        <div className="cosmos-nebula" />
      </div>

      <header className="header">
        <span className="header-brand">✦ Celestia Card</span>
      </header>

      <main className="main">
        {phase === 'intro' && (
          <section className="intro">
            <h1 className="intro-title">Celestia Card</h1>
            <p className="intro-tagline">Choose a card. Reveal your path.</p>
            <p className="intro-sub">
              No questions. No forms. Trust your intuition and let the cards speak.
            </p>
            <button type="button" className="mode" onClick={startDailyCard}>
              <span className="mode-symbol">☀</span>
              <span className="mode-name">Daily Card</span>
              <span className="mode-desc">A one-card message for your day</span>
            </button>
          </section>
        )}

        {phase === 'choose' && (
          <section className="choose">
            <h2 className="section-title">Choose a card</h2>
            <p className="section-hint">Trust your intuition.</p>
            <CardDeck onPick={handlePick} />
          </section>
        )}

        {phase === 'result' && draw && (
          <ReadingResult
            draw={draw}
            onDrawAgain={drawAgain}
            onNewReading={newReading}
          />
        )}
      </main>

      <footer className="footer">
        <p className="disclaimer">
          Celestia Card is intended for entertainment, reflection, and personal
          exploration. Readings are not guaranteed predictions or professional
          advice — do not use them as the sole basis for medical, financial,
          legal, or other high-stakes decisions.
        </p>
      </footer>
    </div>
  )
}