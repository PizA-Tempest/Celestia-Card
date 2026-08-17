import { useState } from 'react'
import CardDeck from './components/CardDeck.jsx'
import CardSpread from './components/CardSpread.jsx'
import Encyclopedia from './components/Encyclopedia.jsx'
import HistoryView from './components/HistoryView.jsx'
import LuckyDraw from './components/LuckyDraw.jsx'
import ReadingResult from './components/ReadingResult.jsx'
import SpreadResult from './components/SpreadResult.jsx'
import { addHistoryEntry } from './utils/history.js'
import { POSITION_3, POSITION_5 } from './utils/reading.js'

export default function App() {
  const [phase, setPhase] = useState('intro')
  const [draw, setDraw] = useState(null)
  const [spread, setSpread] = useState(null)

  const startDailyCard = () => setPhase('choose')
  const startThreeCard = () => setPhase('choose3')
  const startFiveCard = () => setPhase('choose5')
  const startLuckyDraw = () => setPhase('lucky')
  const startEncyclopedia = () => setPhase('ency')
  const startHistory = () => setPhase('history')

  const handlePick = (result) => {
    addHistoryEntry('daily', [result])
    setDraw(result)
    setPhase('result')
  }

  const handleLuckyDraw = (result) => {
    addHistoryEntry('lucky', [result])
    setDraw(result)
    setPhase('resultLucky')
  }

  const handleSpreadComplete = (resultPhase, mode) => (draws) => {
    addHistoryEntry(mode, draws)
    setSpread(draws)
    setPhase(resultPhase)
  }

  const drawAgain = () => {
    setDraw(null)
    setPhase('choose')
  }

  const spreadAgain = (choosePhase) => {
    setSpread(null)
    setPhase(choosePhase)
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
              <button type="button" className="mode" onClick={startFiveCard}>
                <span className="mode-symbol">✧</span>
                <span className="mode-name">Five Card Reading</span>
                <span className="mode-desc">
                  Situation · Challenge · Energy · Advice · Outcome
                </span>
              </button>
              <button type="button" className="mode" onClick={startLuckyDraw}>
                <span className="mode-symbol">❖</span>
                <span className="mode-name">Lucky Draw</span>
                <span className="mode-desc">A completely open reading</span>
              </button>
              <button type="button" className="mode" onClick={startEncyclopedia}>
                <span className="mode-symbol">◈</span>
                <span className="mode-name">Tarot Encyclopedia</span>
                <span className="mode-desc">Browse all 78 cards and their meanings</span>
              </button>
              <button type="button" className="mode" onClick={startHistory}>
                <span className="mode-symbol">☾</span>
                <span className="mode-name">Reading History</span>
                <span className="mode-desc">Revisit your past readings</span>
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
            <CardSpread
              positions={POSITION_3}
              onComplete={handleSpreadComplete('result3', 'three')}
            />
          </section>
        )}

        {phase === 'choose5' && (
          <section className="choose">
            <h2 className="section-title">Five Card Reading</h2>
            <p className="section-hint">
              Reveal each card — Current Situation, Challenge, Main Energy,
              Advice, Possible Outcome.
            </p>
            <CardSpread
              positions={POSITION_5}
              onComplete={handleSpreadComplete('result5', 'five')}
            />
          </section>
        )}

        {phase === 'lucky' && (
          <section className="choose">
            <h2 className="section-title">Lucky Draw</h2>
            <LuckyDraw onComplete={handleLuckyDraw} />
          </section>
        )}

        {phase === 'ency' && <Encyclopedia onBack={newReading} />}

        {phase === 'history' && <HistoryView onBack={newReading} />}

        {phase === 'result' && draw && (
          <ReadingResult
            draw={draw}
            onDrawAgain={drawAgain}
            onNewReading={newReading}
          />
        )}

        {phase === 'resultLucky' && draw && (
          <ReadingResult
            title="Lucky Draw"
            draw={draw}
            onDrawAgain={() => setPhase('lucky')}
            onNewReading={newReading}
          />
        )}

        {phase === 'result3' && spread && (
          <SpreadResult
            title="Three Card Reading"
            draws={spread}
            positions={POSITION_3}
            onAgain={() => spreadAgain('choose3')}
            onNewReading={newReading}
          />
        )}

        {phase === 'result5' && spread && (
          <SpreadResult
            title="Five Card Reading"
            draws={spread}
            positions={POSITION_5}
            onAgain={() => spreadAgain('choose5')}
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