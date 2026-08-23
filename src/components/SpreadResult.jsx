import { useState } from 'react'
import TarotCard from './TarotCard.jsx'
import { useLang, localizeCard } from '../i18n.jsx'
import { combineReading } from '../utils/reading.js'
import { buildShareText, shareText } from '../utils/share.js'

export default function SpreadResult({
  titleKey,
  draws,
  positions,
  onAgain,
  onNewReading,
  actions = true,
}) {
  const { lang, t } = useLang()
  const isWide = positions.length > 4
  const [shared, setShared] = useState(null)

  const localizedDraws = draws.map((d) => ({
    ...d,
    card: localizeCard(d.card, lang),
  }))
  const localizedPositions = positions.map((p) => ({
    ...p,
    label: t('position.' + p.key),
  }))

  const handleShare = async () => {
    const result = await shareText(
      buildShareText(t(titleKey + '.name'), localizedDraws, localizedPositions)
    )
    setShared(result === 'copied' ? t('result.copied') : null)
    if (result === 'copied') setTimeout(() => setShared(null), 2500)
  }

  return (
    <section className="result" aria-live="polite">
      <p className="result-eyebrow">{t(titleKey + '.name')}</p>

      <div className={`spread result-spread${isWide ? ' spread-5' : ''}`}>
        {localizedPositions.map((pos, i) => {
          const d = localizedDraws[i]
          return (
            <div className="spread-slot" key={pos.key}>
              <span className="spread-label">{pos.label}</span>
              <div className="spread-card">
                <TarotCard card={d.card} />
              </div>
              <span className={`orientation-badge ${d.orientation}`}>
                {d.orientation === 'upright'
                  ? t('orientation.upright')
                  : t('orientation.reversed')}
              </span>
            </div>
          )
        })}
      </div>

      <div className="spread-meanings">
        {localizedPositions.map((pos, i) => {
          const d = localizedDraws[i]
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
        <h3 className="combined-title">{t('combined.title')}</h3>
        <p>
          {combineReading(localizedDraws, localizedPositions, lang)}
        </p>
      </div>

      {actions && (
        <div className="result-actions">
          <button type="button" className="btn" onClick={onAgain}>
            {t('result.drawAgain')}
          </button>
          <button type="button" className="btn btn-ghost" onClick={onNewReading}>
            {t('result.newReading')}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleShare}
            disabled={shared === t('result.copied')}
          >
            {shared || t('result.share')}
          </button>
        </div>
      )}
    </section>
  )
}