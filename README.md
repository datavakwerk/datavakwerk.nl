# Datavakwerk

[![CI](https://github.com/datavakwerk/datavakwerk.nl/actions/workflows/ci.yml/badge.svg)](https://github.com/datavakwerk/datavakwerk.nl/actions/workflows/ci.yml)
[![Live](https://img.shields.io/badge/live-datavakwerk.nl-1d4ed8)](https://datavakwerk.nl)

Broncode van **[datavakwerk.nl](https://datavakwerk.nl)** — de website van Ruud Juffermans,
freelance business- en data-analist voor de publieke sector. De site presenteert het
dienstenaanbod rond stuurinformatie, procesanalyse en businesscases bij de (rijks)overheid,
en bevat een blog over datawerk in overheidsorganisaties.

## Stack

| | |
| --- | --- |
| Framework | React 19 |
| Build | Vite 8 |
| Content | MDX (`@mdx-js/rollup`) |
| Routing | History API, eigen mini-router (`src/router.js`) |
| Rendering | statisch geprerenderd per route, daarna gehydrateerd |
| Styling | één handgeschreven stylesheet (`src/styles.css`), geen CSS-framework |
| Fonts | zelf gehost (`public/fonts/`) |
| Linting | oxlint |
| Serveren | nginx in een container (`Dockerfile`, `nginx.conf`) |

Bewust klein gehouden: drie runtime-dependencies, geen router-library, geen
componentbibliotheek, geen CSS-framework.

## Ontwikkelen

```bash
npm install
npm run dev      # ontwikkelserver op http://localhost:5173
npm run lint     # oxlint
npm run build    # volledige productiebuild (zie hieronder)
npm run preview  # bekijk de productiebuild lokaal
```

## Bouwen

`npm run build` draait drie stappen achter elkaar:

| Stap | Wat het doet |
| --- | --- |
| `build:client` | gewone Vite-build naar `dist/` |
| `build:ssr` | server-bundel naar `dist-ssr/` (`src/entry-server.jsx`) |
| `prerender` | rendert elke route naar een echt `.html`-bestand |

Het resultaat is een map met statische bestanden — één per URL, inclusief
`sitemap.xml` en een `404.html`:

```
dist/
├── index.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── blog/index.html
├── blog/<slug>/index.html
└── diensten/<slug>/index.html
```

`npm run verify` controleert daarna of elke route daadwerkelijk inhoud bevat en
een eigen titel, description, canonical, `og:image` en JSON-LD heeft. Die check
draait ook in CI, samen met een smoketest die de container start en alle routes
opvraagt.

## Structuur

```
src/
├── App.jsx           # routing tussen homepage, blog en dienstpagina's
├── router.js         # History-API routing + link-interceptie
├── routes.js         # routetabel en SEO-metadata per pagina
├── entry-server.jsx  # entry voor het prerenderen
├── config.js         # centrale contact- en profiel-links
├── styles.css        # volledige stylesheet
├── fonts.css         # gegenereerd — niet met de hand aanpassen
├── components/       # secties van de homepage + blog/dienst-weergave
├── diensten/         # inhoud van de dienstpagina's (/diensten/<slug>)
├── hooks/            # useReveal — scroll-animaties
└── posts/            # blogartikelen in MDX (/blog/<slug>)

scripts/
├── prerender.mjs     # rendert routes naar statische HTML + sitemap
├── verify-build.mjs  # controleert de build op SEO-regressies
├── fetch-fonts.mjs   # haalt de webfonts op voor self-hosting
└── make-images.sh    # genereert og.jpg en het touch-icon uit de SVG's
```

## Content toevoegen

**Een blogartikel.** Maak `src/posts/<slug>.mdx` met een `meta`-export en registreer het
in `src/posts/index.js` (de volgorde in de `posts`-array bepaalt de volgorde op de site):

```mdx
export const meta = {
  slug: 'mijn-artikel',
  tag: 'Project',
  title: 'Titel van het artikel',
  date: '26 jul 2026',
  excerpt: 'Eén of twee zinnen die op de overzichtspagina verschijnen.',
}

De inhoud van het artikel, in markdown.
```

De route, de `<title>`, de meta description, de canonical, de OG-tags, het
JSON-LD en de sitemap-regel volgen automatisch uit die `meta`.

**Een dienst.** Voeg een object toe aan de `diensten`-array in `src/diensten/index.js`,
met een `slug`, `icon`, `title`, `lead` en een lijst `sections`. Ook hier komt de
rest vanzelf mee.

## Deployen

De site draait als container achter Dokploy op een VPS. Dokploy bouwt de
`Dockerfile` (applicatietype **Dockerfile**) en serveert `dist/` met nginx.

```bash
docker build -t datavakwerk .
docker run --rm -p 8080:80 datavakwerk
```

`nginx.conf` mapt schone URL's op hun `index.html`, geeft een echte 404 voor
onbekende paden (geen SPA-fallback, zodat Google geen soft-404 indexeert), cachet
de gehashte assets en fonts een jaar, en HTML juist niet.

## Assets verversen

Beide zijn eenmalige stappen; de resultaten staan in git.

```bash
npm run fonts           # webfonts opnieuw ophalen -> public/fonts + src/fonts.css
./scripts/make-images.sh  # og.jpg en apple-touch-icon.png uit scripts/*.svg
```

## Licentie

Alle rechten voorbehouden. Zie [LICENSE](LICENSE) — de broncode is in te zien, maar niet
vrijgegeven voor hergebruik.

## Contact

[datavakwerk@ruudjuffermans.nl](mailto:datavakwerk@ruudjuffermans.nl) · [LinkedIn](https://www.linkedin.com/in/r-j3)
