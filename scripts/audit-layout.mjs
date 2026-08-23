// Layout audit: renders every screen at standard desktop, laptop, tablet, and
// mobile resolutions and reports any horizontal overflow. Uses the app's
// ?phase= deep-link (see QA_PHASES in src/App.jsx). Result screens need drawn
// card state and are not deep-linkable; they were verified with a seeded QA
// build and share their layout CSS (.spread, .result) with the screens here.
//
//   1) npm.cmd run build
//   2) npm.cmd run preview   (leave running)
//   3) node scripts/audit-layout.mjs
//
// Screenshots are written to .layout-shots/ for visual review. Exits 1 on any
// overflow so it can be used as a quick regression gate.

import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = process.env.AUDIT_BASE || 'http://localhost:4173'
const OUT = '.layout-shots'
const PHASES = [
  'intro',
  'choose',
  'choose3',
  'choose5',
  'lucky',
  'ency',
  'history',
]
const SIZES = [
  ['d1920', 1920, 1080],
  ['lap1366', 1366, 768],
  ['t1024', 1024, 768],
  ['t768', 768, 1024],
  ['m390', 390, 844],
  ['s360', 360, 640],
]

mkdirSync(OUT, { recursive: true })
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--disable-gpu', '--hide-scrollbars'],
})
const page = await browser.newPage()
page.on('pageerror', (err) => console.log(`[pageerror] ${err.message}`))
let failures = 0

for (const [name, width, height] of SIZES) {
  await page.setViewport({ width, height })
  for (const phase of PHASES) {
    await page.goto(`${BASE}/?phase=${phase}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })
    await new Promise((r) => setTimeout(r, 300))
    const { vw, sw } = await page.evaluate(() => ({
      vw: document.documentElement.clientWidth,
      sw: document.documentElement.scrollWidth,
    }))
    const ok = sw <= vw
    if (!ok) failures++
    console.log(`[${name}] ${phase}: ${ok ? 'ok' : `OVERFLOW sw=${sw} vw=${vw}`}`)
    await page.screenshot({ path: `${OUT}\\${phase}-${name}.png` })
  }
}

await browser.close()
console.log(failures ? `${failures} overflow failure(s)` : 'all clean')
process.exit(failures ? 1 : 0)
