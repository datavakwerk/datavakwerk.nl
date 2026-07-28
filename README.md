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
| Routing | hash-based, geen router-dependency |
| Styling | één handgeschreven stylesheet (`src/styles.css`), geen CSS-framework |
| Linting | oxlint |

Bewust klein gehouden: drie runtime-dependencies, geen router, geen componentbibliotheek,
geen CSS-framework. De volledige productiebuild is ~88 kB gzipped.

## Ontwikkelen

```bash
npm install
npm run dev      # ontwikkelserver op http://localhost:5173
npm run lint     # oxlint
npm run build    # productiebuild in dist/
npm run preview  # bekijk de productiebuild lokaal
```

## Structuur

```
src/
├── App.jsx           # hash-routing tussen homepage, blog en dienstpagina's
├── config.js         # centrale contact- en profiel-links
├── styles.css        # volledige stylesheet
├── components/       # secties van de homepage + blog/dienst-weergave
├── diensten/         # inhoud van de dienstpagina's (#/diensten/<slug>)
├── hooks/            # useReveal — scroll-animaties
└── posts/            # blogartikelen in MDX (#/blog/<slug>)
```

De site kent drie soorten weergaven, allemaal afgehandeld in `App.jsx`:
de homepage, `#/blog/<slug>` voor een artikel en `#/diensten/<slug>` voor een dienst.

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

**Een dienst.** Voeg een object toe aan de `diensten`-array in `src/diensten/index.js`,
met een `slug`, `icon`, `title`, `lead` en een lijst `sections`.

## Licentie

Alle rechten voorbehouden. Zie [LICENSE](LICENSE) — de broncode is in te zien, maar niet
vrijgegeven voor hergebruik.

## Contact

[datavakwerk@ruudjuffermans.nl](mailto:datavakwerk@ruudjuffermans.nl) · [LinkedIn](https://www.linkedin.com/in/r-j3)
