export function buildShareText(title, draws, positions) {
  const lines = draws.map((d, i) => {
    const pos = positions ? positions[i].label : 'Card'
    const meaning =
      d.orientation === 'upright' ? d.card.upright : d.card.reversed
    return `${pos} · ${d.card.name} (${d.orientation}): ${meaning}`
  })
  return `Celestia Card — ${title}\n\n${lines.join('\n\n')}`
}

export async function shareText(text) {
  const url = window.location.href
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Celestia Card', text })
      return 'shared'
    } catch (err) {
      if (err.name === 'AbortError') return 'cancelled'
    }
  }
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(`${text}\n\n${url}`)
      return 'copied'
    } catch {
      return 'unsupported'
    }
  }
  return 'unsupported'
}