import { useState } from 'react'
import TarotCard from './TarotCard.jsx'
import { useLang, localizeCard } from '../i18n.jsx'
import tarotTh from '../data/tarot-th.json'
import { deck } from '../utils/reading.js'
import { loadFavorites, toggleFavorite } from '../utils/favorites.js'

const FILTER_KEYS = [
  'all',
  'favorites',
  'major',
  'wands',
  'cups',
  'swords',
  'pentacles',
]

function searchText(card) {
  const th = tarotTh[card.id]
  const parts = [card.name, ...card.keywords]
  if (th) parts.push(th.name, ...th.keywords)
  return parts.join(' ').toLowerCase()
}

export default function Encyclopedia({ onBack }) {
  const { lang, t } = useLang()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [favorites, setFavorites] = useState(loadFavorites)

  const filtered = deck.filter((card) => {
    const inArcana =
      filter === 'all' ||
      filter === 'favorites' ||
      (filter === 'major' ? card.arcana === 'major' : card.suit === filter)
    if (!inArcana) return false
    if (filter === 'favorites' && !favorites.includes(card.id)) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return searchText(card).includes(q)
  })

  if (selected) {
    const c = localizeCard(selected, lang)
    const fav = favorites.includes(selected.id)
    const handleFav = () => setFavorites(toggleFavorite(selected.id))
    const meta = [
      c.number,
      c.arcana === 'major'
        ? t('arcana.major')
        : t('suit.' + c.suit),
      t('element.' + c.element.toLowerCase()),
    ].join(' · ')
    return (
      <section className="ency">
        <div className="ency-detail-top">
          <button
            type="button"
            className="btn btn-ghost ency-back"
            onClick={() => setSelected(null)}
          >
            {t('ency.backAll')}
          </button>
          <button
            type="button"
            className={`filter-btn${fav ? ' active fav-btn-active' : ''}`}
            onClick={handleFav}
          >
            {fav ? t('ency.favAdded') : t('ency.favAdd')}
          </button>
        </div>
        <div className="ency-detail">
          <div className="ency-detail-card">
            <TarotCard card={selected} />
          </div>
          <div className="ency-detail-info">
            <h2 className="ency-detail-name">{c.name}</h2>
            <p className="ency-detail-meta">{meta}</p>
            <p className="ency-detail-keywords">{c.keywords.join(' · ')}</p>
            <div className="ency-meaning">
              <h4>{t('meaning.upright')}</h4>
              <p>{c.upright}</p>
            </div>
            <div className="ency-meaning">
              <h4>{t('meaning.reversed')}</h4>
              <p>{c.reversed}</p>
            </div>
            <div className="ency-meaning">
              <h4>{t('meaning.general')}</h4>
              <p>{c.general}</p>
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
          placeholder={t('ency.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="ency-filters">
          {FILTER_KEYS.map((key) => (
            <button
              type="button"
              key={key}
              className={`filter-btn${filter === key ? ' active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {t('filter.' + key)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="ency-empty">{t('ency.empty')}</p>
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
        {t('ency.backReadings')}
      </button>
    </section>
  )
}