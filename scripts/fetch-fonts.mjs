import { createHash } from 'node:crypto'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Haalt de webfonts eenmalig op zodat we ze zelf kunnen serveren. Dat scheelt
// een render-blokkerende request naar fonts.googleapis.com en voorkomt dat
// bezoekers-IP's naar Google gaan (AVG).
//
//   node scripts/fetch-fonts.mjs
//
// Google levert deze families als variabele fonts: één bestand per subset dekt
// alle gewichten. We ontdubbelen daarom op inhoud en schrijven één @font-face
// met een gewichtsbereik in plaats van één per gewicht.

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')
const OUT_DIR = path.join(ROOT, 'public', 'fonts')
const CSS_OUT = path.join(ROOT, 'src', 'fonts.css')

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const FAMILIES = [
  { name: 'Inter', weights: [400, 500, 600] },
  { name: 'JetBrains Mono', weights: [400, 500, 700] },
  { name: 'Space Grotesk', weights: [400, 500, 600, 700] },
]

const WANT_SUBSETS = new Set(['latin', 'latin-ext'])

await rm(OUT_DIR, { recursive: true, force: true })
await mkdir(OUT_DIR, { recursive: true })

const blocks = []

for (const fam of FAMILIES) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    fam.name,
  )}:wght@${fam.weights.join(';')}&display=swap`

  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`CSS ophalen mislukt voor ${fam.name}: ${res.status}`)
  const css = await res.text()

  const slug = fam.name.toLowerCase().replace(/\s+/g, '-')
  const range = `${Math.min(...fam.weights)} ${Math.max(...fam.weights)}`

  // Per subset houden we één bestand over; Google levert voor elk gewicht
  // hetzelfde variabele bestand.
  const bySubset = new Map()
  const re = /\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g
  let m
  while ((m = re.exec(css))) {
    const subset = m[1]
    if (!WANT_SUBSETS.has(subset) || bySubset.has(subset)) continue

    const body = m[2]
    const src = /src:\s*url\((https:[^)]+\.woff2)\)/.exec(body)?.[1]
    const unicode = /unicode-range:\s*([^;]+);/.exec(body)?.[1]?.trim()
    if (!src) continue

    const bin = await fetch(src, { headers: { 'User-Agent': UA } })
    if (!bin.ok) throw new Error(`font ophalen mislukt: ${src}`)
    const buf = Buffer.from(await bin.arrayBuffer())

    const file = `${slug}-${subset}.woff2`
    await writeFile(path.join(OUT_DIR, file), buf)
    bySubset.set(subset, {
      file,
      unicode,
      hash: createHash('sha256').update(buf).digest('hex').slice(0, 8),
      size: buf.length,
    })
  }

  for (const [subset, info] of bySubset) {
    blocks.push(
      `@font-face {\n` +
        `  font-family: '${fam.name}';\n` +
        `  font-style: normal;\n` +
        `  font-weight: ${range};\n` +
        `  font-display: swap;\n` +
        `  src: url('/fonts/${info.file}') format('woff2');\n` +
        (info.unicode ? `  unicode-range: ${info.unicode};\n` : '') +
        `}`,
    )
    console.log(
      `${fam.name} ${subset}: ${info.file} (${(info.size / 1024).toFixed(1)} kB)`,
    )
  }
}

const header = `/* Zelf-gehoste webfonts — gegenereerd door scripts/fetch-fonts.mjs.
   Niet met de hand aanpassen; draai het script opnieuw om te verversen.

   Dit zijn variabele fonts: één bestand per subset dekt het hele
   gewichtsbereik, vandaar 'font-weight: <min> <max>'. */\n\n`

await writeFile(CSS_OUT, header + blocks.join('\n\n') + '\n')
console.log(`\n${blocks.length} @font-face regels -> src/fonts.css`)
