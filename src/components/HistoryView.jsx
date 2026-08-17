import { useState } from 'react'
import ReadingResult from './ReadingResult.jsx'
import SpreadResult from './SpreadResult.jsx'
import {
  loadHistory,
  clearHistory,
  MODE_LABELS,
} from '../utils/history.js'
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
  const [history, setHistory] = useState(loadHistory)
  const [selected, setSelected] = useState(null)

  const handleClear = () => {
    if (window.confirm('Clear all saved readings?')) {
      clearHistory()
      setHistory([])
    }
  }

  if (selected) {
    const positions = MODE_POSITIONS[selected.mode]
    const title = MODE_LABELS[selected.mode]
    return (
      <section className="result-wrap">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setSelected(null)}
        >
          ← Back to history
        </button>
        {positions ? (
          <SpreadResult
            title={title}
            draws={selected.draws}
            positions={positions}
            actions={false}
          />
        ) : (
          <ReadingResult
            title={title}
            draw={selected.draws[0]}
            actions={false}
          />
        )}
      </section>
    )
  }

  return (
    <section className="history">
      <h2 className="section-title">Reading History</h2>

      {history.length === 0 ? (
        <p className="section-hint">
          No readings yet — complete a reading and it will be saved here.
        </p>
      ) : (
        <>
          <button
            type="button"
            className="btn btn-ghost history-clear"
            onClick={handleClear}
          >
            Clear history
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
                    {MODE_LABELS[entry.mode]}
                  </span>
                  <span className="history-cards">
                    {entry.draws
                      .map((d) => `${d.card.name} (${d.orientation})`)
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
        ← Back to readings
      </button>
    </section>
  )
}