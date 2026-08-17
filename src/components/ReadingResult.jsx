import { useState } from 'react'
import TarotCard from './TarotCard.jsx'
import { useLang, localizeCard } from '../i18n.jsx'
import { buildShareText, shareText } from '../utils/share.js'

export default function ReadingResult({
  titleKey = 'mode.daily',
  draw,
  onDrawAgain,
  onNewReading,
  actions = true,
}) {
  const { lang, t } = useLang()
  const { card, orientation } = draw
  const c = localizeCard(card, lang)
  const meaning = orientation === 'upright' ? c.upright : c.reversed
  const [shared, setShared] = useState(null)

  const handleShare = async () => {
    const localized = { card: c, orientation }
    const result = await shareText(
      buildShareText(t(titleKey), [localized], null)
    )
    setShared(result === 'copied' ? t('result.copied') : null)
    if (result === 'copied') setTimeout(() => setShared(null), 2500)
  }

  return (
    <section className="result" aria-live="polite">
      <p className="result-eyebrow">{t(titleKey)}</p>
      <div className="result-card">
        <TarotCard card={card} />
      </div>
      <div className={`orientation-badge ${orientation}`}>
        {orientation === 'upright'
          ? t('orientation.upright')
          : t('orientation.reversed')}
      </div>
      <h2 className="result-name">{c.name}</h2>
      <p className="result-keywords">{c.keywords.join(' · ')}</p>
      <div className="result-meaning">
        <p>{meaning}</p>
        <p className="result-general">{c.general}</p>
      </div>
      {actions && (
        <div className="result-actions">
          <button type="button" className="btn" onClick={onDrawAgain}>
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