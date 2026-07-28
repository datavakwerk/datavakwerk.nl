import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { LINKEDIN_URL, MAILTO_KENNISMAKING } from '../config.js'

const LINKS = ['Diensten', 'Projecten', 'Werkwijze', 'Blog', 'Over mij']

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
        <a href="#top" className="nav-logo">
          <Logo />
          Datavakwerk
        </a>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`}>
              {l}
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
