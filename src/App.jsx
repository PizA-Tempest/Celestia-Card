import { useState } from 'react'
import CardDeck from './components/CardDeck.jsx'
import ReadingResult from './components/ReadingResult.jsx'
import ThreeCardSpread from './components/ThreeCardSpread.jsx'
import ThreeCardResult from './components/ThreeCardResult.jsx'

export default function App() {
  const [phase, setPhase] = useState('intro')
  const [draw, setDraw] = useState(null)
  const [spread, setSpread] = useState(null)

  const startDailyCard = () => setPhase('choose')
  const startThreeCard = () => setPhase('choose3')

  const handlePick = (result) => {
    setDraw(result)
    setPhase('result')
  }

  const handleSpreadComplete = (draws) => {
    setSpread(draws)
    setPhase('result3')
  }

  const drawAgain = () => {
    setDraw(null)
    setPhase('choose')
  }

  const spreadAgain = () => {
    setSpread(null)
    setPhase('choose3')
  }

  const newReading = () => {
    setDraw(null)
    setSpread(null)
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
            <div className="modes">
              <button type="button" className="mode" onClick={startDailyCard}>
                <span className="mode-symbol">☀</span>
                <span className="mode-name">Daily Card</span>
                <span className="mode-desc">A one-card message for your day</span>
              </button>
              <button type="button" className="mode" onClick={startThreeCard}>
                <span className="mode-symbol">✦</span>
                <span className="mode-name">Three Card Reading</span>
                <span className="mode-desc">Past · Present · Future</span>
              </button>
            </div>
          </section>
        )}

        {phase === 'choose' && (
          <section className="choose">
            <h2 className="section-title">Choose a card</h2>
            <p className="section-hint">Trust your intuition.</p>
            <CardDeck onPick={handlePick} />
          </section>
        )}

        {phase === 'choose3' && (
          <section className="choose">
            <h2 className="section-title">Three Card Reading</h2>
            <p className="section-hint">
              Reveal each card — Past, Present, Future.
            </p>
            <ThreeCardSpread onComplete={handleSpreadComplete} />
          </section>
        )}

        {phase === 'result' && draw && (
          <ReadingResult
            draw={draw}
            onDrawAgain={drawAgain}
            onNewReading={newReading}
          />
        )}

        {phase === 'result3' && spread && (
          <ThreeCardResult
            draws={spread}
            onAgain={spreadAgain}
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