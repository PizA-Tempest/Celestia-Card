import { useState } from 'react'
import TarotCard from './TarotCard.jsx'
import { deck, suitLabel } from '../utils/reading.js'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'major', label: 'Major Arcana' },
  { key: 'wands', label: 'Wands' },
  { key: 'cups', label: 'Cups' },
  { key: 'swords', label: 'Swords' },
  { key: 'pentacles', label: 'Pentacles' },
]

export default function Encyclopedia({ onBack }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = deck.filter((card) => {
    const inArcana =
      filter === 'all' ||
      (filter === 'major' ? card.arcana === 'major' : card.suit === filter)
    if (!inArcana) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      card.name.toLowerCase().includes(q) ||
      card.keywords.some((k) => k.toLowerCase().includes(q))
    )
  })

  if (selected) {
    const meta = selected.arcana === 'major'
      ? `Major Arcana · ${selected.element}`
      : `${suitLabel(selected.suit)} · ${selected.element}`
    return (
      <section className="ency">
        <button
          type="button"
          className="btn btn-ghost ency-back"
          onClick={() => setSelected(null)}
        >
          ← Back to all cards
        </button>
        <div className="ency-detail">
          <div className="ency-detail-card">
            <TarotCard card={selected} />
          </div>
          <div className="ency-detail-info">
            <h2 className="ency-detail-name">{selected.name}</h2>
            <p className="ency-detail-meta">
              {selected.number} · {meta}
            </p>
            <p className="ency-detail-keywords">
              {selected.keywords.join(' · ')}
            </p>
            <div className="ency-meaning">
              <h4>Upright</h4>
              <p>{selected.upright}</p>
            </div>
            <div className="ency-meaning">
              <h4>Reversed</h4>
              <p>{selected.reversed}</p>
            </div>
            <div className="ency-meaning">
              <h4>General</h4>
              <p>{selected.general}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="ency">
      <div className="ency-controls">
        <input
          type="search"
          className="ency-search"
          placeholder="Search cards or keywords…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="ency-filters">
          {FILTERS.map((f) => (
            <button
              type="button"
              key={f.key}
              className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="ency-empty">No cards match your search.</p>
      ) : (
        <div className="ency-grid">
          {filtered.map((card) => (
            <button
              type="button"
              key={card.id}
              className="ency-grid-item"
              onClick={() => setSelected(card)}
              aria-label={card.name}
            >
              <TarotCard card={card} />
            </button>
          ))}
        </div>
      )}

      <button type="button" className="btn btn-ghost ency-back" onClick={onBack}>
        ← Back to readings
      </button>
    </section>
  )
}