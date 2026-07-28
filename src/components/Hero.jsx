import { CV_URL, MAILTO_KENNISMAKING } from '../config.js'

// Character-staggered typing entrance.
function TypeText({ text, startDelay = 0, step = 0.035 }) {
  let i = 0
  return text.split(' ').map((word, w) => (
    <span className="type-word" key={w}>
      {(w > 0 ? ' ' + word : word).split('').map((ch, c) => (
        <span
          className="type-char"
          key={c}
          style={{ '--char-delay': `${startDelay + step * i++}s` }}
        >
          {ch}
        </span>
      ))}
    </span>
  ))
}

const FRONDS = [
  { top: '12%', left: '4%', size: 130, rot: '-14deg', delay: '0s' },
  { top: '30%', right: '3%', size: 170, rot: '18deg', delay: '-3s' },
  { bottom: '18%', left: '10%', size: 90, rot: '8deg', delay: '-6s' },
]

const CLIENTS = [
  { name: 'Gemeente Rivierstad', color: '#0e3f7e' },
  { name: 'Agentschap Basisregisters', color: '#1d4ed8' },
  { name: 'Uitvoeringsdienst Sociaal', color: '#f28d1a' },
  { name: 'Waterschap De Dijken', color: '#4c4cff' },
  { name: 'Provincie Middenland', color: '#76b900' },
  { name: 'Veiligheidsregio Delta', color: '#171717' },
  { name: 'Inspectie Omgeving', color: '#f9997a' },
  { name: 'PensioenPlus', color: '#0a1f44' },
]

// abstract mini-chart ornament, floating like the leaves did
function ChartGlyph({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M15 85 H 85 M15 85 V 15" stroke="#1d4ed8" strokeWidth="1.5" opacity="0.35" />
      <rect x="26" y="58" width="12" height="27" rx="2" fill="#93c5fd" opacity="0.6" />
      <rect x="44" y="44" width="12" height="41" rx="2" fill="#93c5fd" opacity="0.6" />
      <rect x="62" y="30" width="12" height="55" rx="2" fill="#93c5fd" opacity="0.6" />
      <path d="M20 62 L 44 46 L 62 34 L 82 22" stroke="#1d4ed8" strokeWidth="1.5" opacity="0.35" />
      <circle cx="82" cy="22" r="5" fill="#ffe099" opacity="0.7" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid-lines" />
        {FRONDS.map((f, i) => (
          <div
            key={i}
            className="hero-frond"
            style={{
              top: f.top,
              left: f.left,
              right: f.right,
              bottom: f.bottom,
              '--rot': f.rot,
              animationDelay: f.delay,
            }}
          >
            <ChartGlyph size={f.size} />
          </div>
        ))}
      </div>

      <div className="container hero-inner">
        <span className="hero-badge">
          <span className="dot" />
          Beschikbaar voor nieuwe opdrachten vanaf oktober
        </span>

        <h1>
          <TypeText text="Freelance business & data analist voor" startDelay={0.15} />
          <br />
          <span className="hero-accent">
            <TypeText text="grip op de uitvoering" startDelay={1.35} />
          </span>
          <span className="hero-caret" />
        </h1>

        <p className="hero-sub">
          Ik lever stuur- en managementinformatie, procesanalyses en
          businesscases voor uitvoeringsorganisaties — van meelopen op de
          werkvloer tot advies aan de bestuurstafel. Binnen de kaders van
          privacy, beveiliging en architectuur, en met behoud van de menselijke
          maat.
        </p>

        <div className="hero-ctas">
          <a href={MAILTO_KENNISMAKING} className="btn btn-primary">
            Plan een kennismaking <span className="arrow">→</span>
          </a>
          <a href="#projecten" className="btn btn-ghost">
            Bekijk projecten
          </a>
          {CV_URL && (
            <a href={CV_URL} download className="btn btn-ghost">
              Download CV <span aria-hidden="true">↓</span>
            </a>
          )}
        </div>

        <div className="hero-metrics">
          <div className="hero-metric">
            <div className="num">
              12<em>+</em>
            </div>
            <div className="label">jaar ervaring in business- & data-analyse</div>
          </div>
          <div className="hero-metric">
            <div className="num">
              10<em>+</em>
            </div>
            <div className="label">directies en programma&apos;s ondersteund</div>
          </div>
          <div className="hero-metric">
            <div className="num">
              100<em>%</em>
            </div>
            <div className="label">kennisoverdracht bij afronding</div>
          </div>
        </div>

        <div className="hero-logos">
          <p>Eerder gewerkt voor opdrachtgevers zoals</p>
          <div className="marquee">
            <div className="marquee-track">
              {[...CLIENTS, ...CLIENTS].map((c, i) => (
                <span className="marquee-logo" key={i}>
                  <span className="glyph" style={{ background: c.color }}>
                    {c.name[0]}
                  </span>
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
