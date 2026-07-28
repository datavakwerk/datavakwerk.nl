import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Controleert of de geprerenderde build echt bruikbaar is voor zoekmachines.
// Een stille terugval naar een lege <div id="root"></div> is precies het
// probleem dat we hebben opgelost, dus dat willen we in CI zien.
//
//   node scripts/verify-build.mjs

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')
const DIST = path.join(ROOT, 'dist')

const { allRoutes, SITE_URL } = await import(
  path.join(ROOT, 'dist-ssr', 'entry-server.js')
)

const MIN_TEXT = 500 // tekens zichtbare tekst; ruim onder de kleinste pagina

const errors = []
const titles = new Map()
const canonicals = new Map()

function visibleText(html) {
  const start = html.indexOf('<div id="root">')
  if (start === -1) return ''
  const body = html.slice(start)
  return body
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function pick(html, re) {
  return re.exec(html)?.[1]?.trim() ?? null
}

const routes = allRoutes()

for (const { path: route } of routes) {
  const file =
    route === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, route.slice(1), 'index.html')

  try {
    await stat(file)
  } catch {
    errors.push(`${route}: geen HTML-bestand op ${path.relative(ROOT, file)}`)
    continue
  }

  const html = await readFile(file, 'utf8')
  const text = visibleText(html)

  if (text.length < MIN_TEXT) {
    errors.push(
      `${route}: slechts ${text.length} tekens in de body — prerender lijkt leeg`,
    )
  }

  const title = pick(html, /<title>([^<]*)<\/title>/)
  if (!title) errors.push(`${route}: geen <title>`)
  else if (titles.has(title)) errors.push(`${route}: dubbele titel met ${titles.get(title)}`)
  else titles.set(title, route)

  const description = pick(html, /<meta name="description" content="([^"]*)"/)
  if (!description) errors.push(`${route}: geen meta description`)
  else if (description.length > 200)
    errors.push(`${route}: meta description is ${description.length} tekens (max 200)`)

  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/)
  const expected = `${SITE_URL}${route === '/' ? '/' : route}`
  if (canonical !== expected)
    errors.push(`${route}: canonical is ${canonical}, verwacht ${expected}`)
  else if (canonicals.has(canonical))
    errors.push(`${route}: dubbele canonical met ${canonicals.get(canonical)}`)
  else canonicals.set(canonical, route)

  if (!/<meta property="og:image" content="/.test(html))
    errors.push(`${route}: geen og:image`)
  if (!/application\/ld\+json/.test(html))
    errors.push(`${route}: geen JSON-LD`)
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html))
    errors.push(`${route}: verwijst nog naar Google Fonts`)
}

// 404 moet bestaan en expliciet noindex zijn.
const notFound = await readFile(path.join(DIST, '404.html'), 'utf8').catch(() => null)
if (!notFound) errors.push('404.html ontbreekt')
else if (!/<meta name="robots" content="noindex/.test(notFound))
  errors.push('404.html mist noindex')

// Sitemap moet exact de routes bevatten.
const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8').catch(() => null)
if (!sitemap) errors.push('sitemap.xml ontbreekt')
else {
  for (const { path: route } of routes) {
    const loc = `${SITE_URL}${route === '/' ? '/' : route}`
    if (!sitemap.includes(`<loc>${loc}</loc>`)) errors.push(`sitemap mist ${loc}`)
  }
}

if (!(await readFile(path.join(DIST, 'robots.txt'), 'utf8').catch(() => null)))
  errors.push('robots.txt ontbreekt')

if (errors.length) {
  console.error(`\n${errors.length} probleem/problemen in de build:\n`)
  for (const e of errors) console.error(`  ✗ ${e}`)
  process.exit(1)
}

console.log(
  `✓ ${routes.length} routes: inhoud geprerenderd, unieke titels en canonicals, ` +
    `og:image + JSON-LD aanwezig, sitemap en robots.txt compleet.`,
)
