import { useEffect, useState } from 'react'
import CardDeck from './components/CardDeck.jsx'
import CardSpread from './components/CardSpread.jsx'
import Encyclopedia from './components/Encyclopedia.jsx'
import HistoryView from './components/HistoryView.jsx'
import LuckyDraw from './components/LuckyDraw.jsx'
import ReadingResult from './components/ReadingResult.jsx'
import SpreadResult from './components/SpreadResult.jsx'
import { LangContext } from './i18n.jsx'
import { translations } from './translations.js'
import { addHistoryEntry } from './utils/history.js'
import { DECKS, DECK_STYLES, loadDeck, storeDeck } from './utils/decks.js'
import { POSITION_3, POSITION_5 } from './utils/reading.js'

function loadLang() {
  try {
    return localStorage.getItem('celestia-lang') || 'th'
  } catch {
    return 'th'
  }
}

function storeLang(lang) {
  try {
    localStorage.setItem('celestia-lang', lang)
  } catch {
    // storage unavailable — ignore
  }
}

function loadTheme() {
  try {
    return localStorage.getItem('celestia-theme') || 'dark'
  } catch {
    return 'dark'
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem('celestia-theme', theme)
  } catch {
    // storage unavailable — ignore
  }
}

const QA_PHASES = ['intro', 'choose', 'choose3', 'choose5', 'lucky', 'ency', 'history']

function initialPhase() {
  try {
    const phase = new URLSearchParams(window.location.search).get('phase')
    return QA_PHASES.includes(phase) ? phase : 'intro'
  } catch {
    return 'intro'
  }
}

export default function App() {
  const [phase, setPhase] = useState(initialPhase)
  const [draw, setDraw] = useState(null)
  const [spread, setSpread] = useState(null)
  const [lang, setLangState] = useState(loadLang)
  const [theme, setThemeState] = useState(loadTheme)
  const [deck, setDeckState] = useState(loadDeck)

  const setLang = (next) => {
    setLangState(next)
    storeLang(next)
  }

  const setTheme = (next) => {
    setThemeState(next)
    storeTheme(next)
  }

  const setDeck = (next) => {
    setDeckState(next)
    storeDeck(next)
  }

  const t = (key) => translations[lang][key] ?? translations.en[key] ?? key

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

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
    <LangContext.Provider value={{ lang, setLang, t }}>
      <div className="app" style={DECK_STYLES[deck]}>
        <div className="cosmos" aria-hidden="true">
          <div className="cosmos-layer cosmos-far" />
          <div className="cosmos-layer cosmos-near" />
          <div className="cosmos-nebula" />
        </div>

        <header className="header">
          <span className="header-brand">✦ Celestia Card</span>
          <div className="header-actions">
            <button
              type="button"
              className="lang-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <button
              type="button"
              className="lang-toggle"
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
            >
              {lang === 'th' ? 'EN' : 'ไทย'}
            </button>
          </div>
        </header>

        <main className="main">
          {phase === 'intro' && (
            <section className="intro">
              <h1 className="intro-title">Celestia Card</h1>
              <p className="intro-tagline">{t('tagline')}</p>
              <p className="intro-sub">{t('introSub')}</p>
              <div className="modes">
                <button type="button" className="mode" onClick={startDailyCard}>
                  <span className="mode-symbol">☀</span>
                  <span className="mode-name">{t('mode.daily.name')}</span>
                  <span className="mode-desc">{t('mode.daily.desc')}</span>
                </button>
                <button type="button" className="mode" onClick={startThreeCard}>
                  <span className="mode-symbol">✦</span>
                  <span className="mode-name">{t('mode.three.name')}</span>
                  <span className="mode-desc">{t('mode.three.desc')}</span>
                </button>
                <button type="button" className="mode" onClick={startFiveCard}>
                  <span className="mode-symbol">✧</span>
                  <span className="mode-name">{t('mode.five.name')}</span>
                  <span className="mode-desc">{t('mode.five.desc')}</span>
                </button>
                <button type="button" className="mode" onClick={startLuckyDraw}>
                  <span className="mode-symbol">❖</span>
                  <span className="mode-name">{t('mode.lucky.name')}</span>
                  <span className="mode-desc">{t('mode.lucky.desc')}</span>
                </button>
                <button type="button" className="mode" onClick={startEncyclopedia}>
                  <span className="mode-symbol">◈</span>
                  <span className="mode-name">{t('mode.ency.name')}</span>
                  <span className="mode-desc">{t('mode.ency.desc')}</span>
                </button>
                <button type="button" className="mode" onClick={startHistory}>
                  <span className="mode-symbol">☾</span>
                  <span className="mode-name">{t('mode.history.name')}</span>
                  <span className="mode-desc">{t('mode.history.desc')}</span>
                </button>
              </div>
              <div className="deck-picker">
                <span className="deck-picker-label">{t('deck.label')}</span>
                <div className="deck-options">
                  {DECKS.map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      className={`deck-option${deck === d.id ? ' active' : ''}`}
                      onClick={() => setDeck(d.id)}
                    >
                      <span
                        className="deck-dot"
                        style={{ background: d.accent }}
                      />
                      {t(d.nameKey)}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {phase === 'choose' && (
            <section className="choose">
              <h2 className="section-title">{t('choose.title')}</h2>
              <p className="section-hint">{t('choose.hint')}</p>
              <CardDeck onPick={handlePick} />
            </section>
          )}

          {phase === 'choose3' && (
            <section className="choose">
              <h2 className="section-title">{t('mode.three.name')}</h2>
              <p className="section-hint">{t('choose3.hint')}</p>
              <CardSpread
                positions={POSITION_3}
                onComplete={handleSpreadComplete('result3', 'three')}
              />
            </section>
          )}

          {phase === 'choose5' && (
            <section className="choose">
              <h2 className="section-title">{t('mode.five.name')}</h2>
              <p className="section-hint">{t('choose5.hint')}</p>
              <CardSpread
                positions={POSITION_5}
                onComplete={handleSpreadComplete('result5', 'five')}
              />
            </section>
          )}

          {phase === 'lucky' && (
            <section className="choose">
              <h2 className="section-title">{t('mode.lucky.name')}</h2>
              <LuckyDraw onComplete={handleLuckyDraw} />
            </section>
          )}

          {phase === 'ency' && <Encyclopedia onBack={newReading} />}

          {phase === 'history' && <HistoryView onBack={newReading} />}

          {phase === 'result' && draw && (
            <ReadingResult
              titleKey="mode.daily"
              draw={draw}
              onDrawAgain={drawAgain}
              onNewReading={newReading}
            />
          )}

          {phase === 'resultLucky' && draw && (
            <ReadingResult
              titleKey="mode.lucky"
              draw={draw}
              onDrawAgain={() => setPhase('lucky')}
              onNewReading={newReading}
            />
          )}

          {phase === 'result3' && spread && (
            <SpreadResult
              titleKey="mode.three"
              draws={spread}
              positions={POSITION_3}
              onAgain={() => spreadAgain('choose3')}
              onNewReading={newReading}
            />
          )}

          {phase === 'result5' && spread && (
            <SpreadResult
              titleKey="mode.five"
              draws={spread}
              positions={POSITION_5}
              onAgain={() => spreadAgain('choose5')}
              onNewReading={newReading}
            />
          )}
        </main>

        <footer className="footer">
          <p className="disclaimer">{t('disclaimer')}</p>
        </footer>
      </div>
    </LangContext.Provider>
  )
}