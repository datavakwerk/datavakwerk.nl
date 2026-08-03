import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { LINKEDIN_URL, MAILTO_KENNISMAKING } from '../config.js'

// Secties staan op de homepage, dus verwijs met /#anker — dan werken ze ook
// vanaf een blog- of dienstpagina. Blog krijgt zijn eigen indexeerbare pagina.
const LINKS = [
  { label: 'Diensten', href: '/#diensten' },
  { label: 'Projecten', href: '/#projecten' },
  { label: 'Werkwijze', href: '/#werkwijze' },
  { label: 'Blog', href: '/blog' },
  { label: 'Over mij', href: '/#over-mij' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`} id="top">
      <div className="container nav-inner">
        <a href="/" className="nav-logo">
          <Logo />
          <span className="nav-logo-word">Datavakwerk</span>
        </a>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          {LINKEDIN_URL && (
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="signin">
              LinkedIn
            </a>
          )}
          <a href={MAILTO_KENNISMAKING} className="btn btn-primary">
            Plan een kennismaking
          </a>
        </div>
      </div>
    </header>
  )
}
