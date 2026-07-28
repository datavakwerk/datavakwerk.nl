import { posts } from './posts/index.js'
import { diensten } from './diensten/index.js'

export const SITE_URL = 'https://datavakwerk.nl'
export const SITE_NAME = 'Datavakwerk'
export const AUTHOR = 'Ruud Juffermans'
export const OG_IMAGE = '/og.jpg'

export const DEFAULT_TITLE =
  'Datavakwerk — freelance business- & data-analist voor de publieke sector'
export const DEFAULT_DESCRIPTION =
  'Zelfstandig business- en data-analist voor de (rijks)overheid. Stuurinformatie die klopt, procesanalyse op de werkvloer en businesscases waarin elk getal herleidbaar is.'

const MONTHS = {
  jan: '01', feb: '02', mrt: '03', maa: '03', apr: '04', mei: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', okt: '10', nov: '11', dec: '12',
}

// '26 jul 2026' -> '2026-07-26', voor <time datetime> en JSON-LD.
export function toIsoDate(dutchDate) {
  const m = /^(\d{1,2})\s+([a-z]{3})[a-z]*\s+(\d{4})$/i.exec(dutchDate?.trim() ?? '')
  if (!m) return null
  const month = MONTHS[m[2].toLowerCase()]
  if (!month) return null
  return `${m[3]}-${month}-${m[1].padStart(2, '0')}`
}

// Google toont ~155 tekens. Kort af op een woordgrens zodat er geen half woord
// in het zoekresultaat belandt.
export function clampDescription(text, max = 155) {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:—-]$/, '')}…`
}

export function blogPath(slug) {
  return `/blog/${slug}`
}

export function dienstPath(slug) {
  return `/diensten/${slug}`
}

// Alle routes die geprerenderd en in de sitemap opgenomen worden.
export function allRoutes() {
  return [
    { path: '/', changefreq: 'monthly', priority: '1.0' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8' },
    ...diensten.map((d) => ({
      path: dienstPath(d.slug),
      changefreq: 'monthly',
      priority: '0.9',
    })),
    ...posts.map((p) => ({
      path: blogPath(p.slug),
      changefreq: 'yearly',
      priority: '0.7',
      lastmod: toIsoDate(p.date),
    })),
  ]
}

export function metaForPath(path) {
  const base = {
    canonical: `${SITE_URL}${path === '/' ? '/' : path}`,
    type: 'website',
    image: `${SITE_URL}${OG_IMAGE}`,
  }

  if (path === '/') {
    return { ...base, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION }
  }

  if (path === '/blog') {
    return {
      ...base,
      title: `Blog — praktijkverhalen over datawerk bij de overheid | ${SITE_NAME}`,
      description: clampDescription(
        'Artikelen over stuurinformatie, procesanalyse, requirements en AI in uitvoeringsorganisaties — geschreven vanuit de praktijk bij de (rijks)overheid.',
      ),
    }
  }

  const postSlug = /^\/blog\/(.+)$/.exec(path)?.[1]
  if (postSlug) {
    const post = posts.find((p) => p.slug === postSlug)
    if (post) {
      return {
        ...base,
        title: `${post.title} | ${SITE_NAME}`,
        headline: post.title,
        description: clampDescription(post.excerpt),
        type: 'article',
        published: toIsoDate(post.date),
      }
    }
  }

  const dienstSlug = /^\/diensten\/(.+)$/.exec(path)?.[1]
  if (dienstSlug) {
    const dienst = diensten.find((d) => d.slug === dienstSlug)
    if (dienst) {
      return {
        ...base,
        title: `${dienst.title} — ${SITE_NAME}`,
        headline: dienst.title,
        description: clampDescription(dienst.lead),
      }
    }
  }

  return {
    ...base,
    title: `Pagina niet gevonden | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    noindex: true,
  }
}
