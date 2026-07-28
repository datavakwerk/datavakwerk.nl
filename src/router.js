import { useEffect, useState } from 'react'

// Padgebaseerde routing op de History API. Componenten gebruiken gewone
// <a href="/blog/...">-links; de click-listener hieronder vangt interne links af
// en houdt ze client-side. Daardoor blijven het echte links die crawlers volgen
// en die met middenklik of ctrl+klik in een nieuw tabblad openen.

export function normalizePath(path) {
  if (!path) return '/'
  const clean = path.split('?')[0].split('#')[0]
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1)
  return clean || '/'
}

function isModifiedEvent(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0
}

export function useRoute(initialPath) {
  const [route, setRoute] = useState(() => ({
    path: normalizePath(initialPath),
    hash: '',
    key: 0,
  }))

  useEffect(() => {
    const onPop = () =>
      setRoute((r) => ({
        path: normalizePath(window.location.pathname),
        hash: window.location.hash,
        key: r.key + 1,
      }))

    const onClick = (e) => {
      if (e.defaultPrevented || isModifiedEvent(e)) return

      const anchor = e.target.closest?.('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      // Alleen interne paden onderscheppen. mailto:, http(s): en #anchors
      // houden hun standaardgedrag.
      if (!href || !href.startsWith('/')) return

      const url = new URL(href, window.location.origin)
      const nextPath = normalizePath(url.pathname)

      e.preventDefault()

      if (nextPath === normalizePath(window.location.pathname)) {
        // Zelfde pagina: alleen naar het anker scrollen.
        window.history.replaceState(null, '', href)
        scrollToHash(url.hash)
        return
      }

      window.history.pushState(null, '', href)
      setRoute((r) => ({ path: nextPath, hash: url.hash, key: r.key + 1 }))
    }

    window.addEventListener('popstate', onPop)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return route
}

export function scrollToHash(hash) {
  if (!hash || hash === '#') {
    window.scrollTo(0, 0)
    return
  }
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  else window.scrollTo(0, 0)
}
