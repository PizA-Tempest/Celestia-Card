import { useState } from 'react'
import ReadingResult from './ReadingResult.jsx'
import SpreadResult from './SpreadResult.jsx'
import { useLang, localizeCard } from '../i18n.jsx'
import { loadHistory, clearHistory } from '../utils/history.js'
import { POSITION_3, POSITION_5 } from '../utils/reading.js'

const MODE_POSITIONS = {
  three: POSITION_3,
  five: POSITION_5,
}

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function HistoryView({ onBack }) {
  const { lang, t } = useLang()
  const [history, setHistory] = useState(loadHistory)
  const [selected, setSelected] = useState(null)

  const handleClear = () => {
    if (window.confirm(t('history.confirm'))) {
      clearHistory()
      setHistory([])
    }
  }

  if (selected) {
    const positions = MODE_POSITIONS[selected.mode]
    const titleKey = 'mode.' + selected.mode
    return (
      <section className="result-wrap">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setSelected(null)}
        >
          ← {t('history.back')}
        </button>
        {positions ? (
          <SpreadResult
            titleKey={titleKey}
            draws={selected.draws}
            positions={positions}
            actions={false}
          />
        ) : (
          <ReadingResult
            titleKey={titleKey}
            draw={selected.draws[0]}
            actions={false}
          />
        )}
      </section>
    )
  }

  return (
    <section className="history">
      <h2 className="section-title">{t('history.title')}</h2>

      {history.length === 0 ? (
        <p className="section-hint">{t('history.empty')}</p>
      ) : (
        <>
          <button
            type="button"
            className="btn btn-ghost history-clear"
            onClick={handleClear}
          >
            {t('history.clear')}
          </button>
          <ul className="history-list">
            {history.map((entry) => (
              <li key={entry.id}>
                <button
                  type="button"
                  className="history-item"
                  onClick={() => setSelected(entry)}
                >
                  <span className="history-mode">
                    {t('mode.' + entry.mode)}
                  </span>
                  <span className="history-cards">
                    {entry.draws
                      .map(
                        (d) =>
                          `${localizeCard(d.card, lang).name} (${t(
                            'orientation.' + d.orientation
                          )})`
                      )
                      .join(' · ')}
                  </span>
                  <span className="history-date">
                    {formatDate(entry.date)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <button
        type="button"
        className="btn btn-ghost history-back"
        onClick={onBack}
      >
        {t('history.back')}
      </button>
    </section>
  )
}