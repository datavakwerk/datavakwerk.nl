import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Rendert elke route naar een echt .html-bestand met de inhoud in de body en
// route-eigen head-tags. Draait na `vite build` en `vite build --ssr`; zie het
// build-script in package.json.

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')
const DIST = path.join(ROOT, 'dist')

const {
  render,
  allRoutes,
  metaForPath,
  SITE_URL,
  SITE_NAME,
  AUTHOR,
  DEFAULT_DESCRIPTION,
  OG_IMAGE,
} = await import(path.join(ROOT, 'dist-ssr', 'entry-server.js'))

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')

const SEO_BLOCK = /<!--seo-start-->[\s\S]*?<!--\/seo-end-->/

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// JSON-LD staat in een <script>-blok, dus alleen </script> hoeft onschadelijk.
function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(
    /<\//g,
    '<\\/',
  )}</script>`
}

const publisher = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#datavakwerk`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}${OG_IMAGE}`,
  description: DEFAULT_DESCRIPTION,
  email: 'datavakwerk@ruudjuffermans.nl',
  areaServed: { '@type': 'Country', name: 'Nederland' },
  founder: { '@id': `${SITE_URL}/#ruud` },
  knowsLanguage: ['nl-NL', 'en'],
}

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#ruud`,
  name: AUTHOR,
  url: `${SITE_URL}/`,
  jobTitle: 'Freelance business- en data-analist',
  email: 'datavakwerk@ruudjuffermans.nl',
  sameAs: ['https://www.linkedin.com/in/r-j3', 'https://github.com/datavakwerk'],
}

function breadcrumbs(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

function structuredData(route, meta) {
  const graph = [person, publisher]

  if (route === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'nl-NL',
      publisher: { '@id': `${SITE_URL}/#datavakwerk` },
    })
  } else if (route === '/blog') {
    graph.push({
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#blog`,
      url: `${SITE_URL}/blog`,
      name: `${SITE_NAME} — blog`,
      inLanguage: 'nl-NL',
      publisher: { '@id': `${SITE_URL}/#datavakwerk` },
    })
    graph.push(breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]))
  } else if (route.startsWith('/blog/')) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${meta.canonical}#article`,
      mainEntityOfPage: meta.canonical,
      url: meta.canonical,
      headline: meta.headline ?? meta.title,
      description: meta.description,
      image: meta.image,
      inLanguage: 'nl-NL',
      ...(meta.published ? { datePublished: meta.published } : {}),
      author: { '@id': `${SITE_URL}/#ruud` },
      publisher: { '@id': `${SITE_URL}/#datavakwerk` },
    })
    graph.push(
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: meta.headline ?? meta.title, path: route },
      ]),
    )
  } else if (route.startsWith('/diensten/')) {
    graph.push({
      '@type': 'Service',
      '@id': `${meta.canonical}#service`,
      url: meta.canonical,
      name: meta.headline ?? meta.title,
      description: meta.description,
      serviceType: meta.headline ?? meta.title,
      inLanguage: 'nl-NL',
      areaServed: { '@type': 'Country', name: 'Nederland' },
      provider: { '@id': `${SITE_URL}/#datavakwerk` },
    })
    graph.push(
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: meta.headline ?? meta.title, path: route },
      ]),
    )
  }

  return jsonLd({ '@context': 'https://schema.org', '@graph': graph })
}

function headFor(route, meta) {
  // og:site_name draagt de merknaam al; in og:title zou '| Datavakwerk' hem
  // dubbel tonen in de linkpreview.
  const socialTitle = meta.headline ?? meta.title

  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(meta.canonical)}" />`,
    meta.noindex
      ? `<meta name="robots" content="noindex,follow" />`
      : `<meta name="robots" content="index,follow,max-image-preview:large" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="nl_NL" />`,
    `<meta property="og:url" content="${esc(meta.canonical)}" />`,
    `<meta property="og:title" content="${esc(socialTitle)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${esc(meta.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Datavakwerk — business- en data-analyse voor de publieke sector" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(socialTitle)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(meta.image)}" />`,
    `<meta name="author" content="${esc(AUTHOR)}" />`,
  ]

  if (meta.published) {
    tags.push(`<meta property="article:published_time" content="${meta.published}" />`)
    tags.push(`<meta property="article:author" content="${esc(AUTHOR)}" />`)
  }

  tags.push(structuredData(route, meta))

  return `<!--seo-start-->\n    ${tags.join('\n    ')}\n    <!--/seo-end-->`
}

function pageFor(route) {
  const meta = metaForPath(route)
  const body = render(route)
  return template
    .replace(SEO_BLOCK, () => headFor(route, meta))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

async function writePage(route, html) {
  const target =
    route === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, route.slice(1), 'index.html')
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, html)
  return path.relative(DIST, target)
}

const routes = allRoutes()

for (const { path: route } of routes) {
  const written = await writePage(route, pageFor(route))
  console.log(`  ${route.padEnd(48)} -> dist/${written}`)
}

// Losse 404-pagina zodat de server een echte 404 kan teruggeven in plaats van
// een soft-404 met de homepage erin.
const notFound = pageFor('/deze-pagina-bestaat-niet')
await writeFile(path.join(DIST, '404.html'), notFound)
console.log(`  ${'404'.padEnd(48)} -> dist/404.html`)

// sitemap.xml
const urls = routes
  .map(({ path: route, changefreq, priority, lastmod }) =>
    [
      '  <url>',
      `    <loc>${SITE_URL}${route === '/' ? '/' : route}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n')

await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`\n${routes.length} routes geprerenderd, sitemap.xml geschreven.`)
