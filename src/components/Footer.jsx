import Logo from './Logo.jsx'
import { GITHUB_URL, LINKEDIN_URL, MAILTO, MAILTO_KENNISMAKING } from '../config.js'

const COLS = [
  {
    h: 'Diensten',
    links: [
      { label: 'Stuur- & managementinformatie', href: '/diensten/stuurinformatie' },
      { label: 'Procesanalyse & herontwerp', href: '/diensten/procesanalyse' },
      { label: 'Businesscases & advies', href: '/diensten/businesscases' },
      { label: 'Interim informatieanalyse', href: '/#diensten' },
      { label: 'Advies & audits', href: '/#diensten' },
    ],
  },
  {
    h: 'Kennis',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Projecten', href: '/#projecten' },
      { label: 'Werkwijze', href: '/#werkwijze' },
    ],
  },
  {
    h: 'Contact',
    links: [
      { label: 'Plan een kennismaking', href: MAILTO_KENNISMAKING },
      { label: 'E-mail', href: MAILTO },
      LINKEDIN_URL && { label: 'LinkedIn', href: LINKEDIN_URL, external: true },
      GITHUB_URL && { label: 'GitHub', href: GITHUB_URL, external: true },
    ].filter(Boolean),
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="nav-logo">
              <Logo />
              Datavakwerk
            </a>
            <p>
              Freelance business- en data-analyse voor de publieke sector — van
              stuurinformatie tot procesverbetering, van werkvloer tot
              bestuurstafel.
            </p>
          </div>
          {COLS.map((c) => (
            <div className="footer-col" key={c.h}>
              <h5>{c.h}</h5>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 Datavakwerk · KvK 00000000 · Btw-id NL000000000B00 —
            demosite, vul je eigen gegevens in
          </span>
          <span className="footer-status">
            <span className="dot" />
            Beschikbaar vanaf oktober
          </span>
        </div>
      </div>
    </footer>
  )
}
