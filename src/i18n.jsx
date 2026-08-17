import { createContext, useContext } from 'react'
import { translations } from './translations.js'
import tarotTh from './data/tarot-th.json'

export const LangContext = createContext(null)

export function useLang() {
  return useContext(LangContext)
}

export function localizeCard(card, lang) {
  if (lang !== 'th' || !card) return card
  const th = tarotTh[card.id]
  if (!th) return card
  return { ...card, name: th.name, keywords: th.keywords }
}