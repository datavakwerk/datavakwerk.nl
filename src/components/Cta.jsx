import useReveal from '../hooks/useReveal.js'
import { MAILTO, MAILTO_KENNISMAKING } from '../config.js'

export default function Cta() {
  const ref = useReveal()
  return (
    <section className="cta" ref={ref}>
      <div className="container cta-inner reveal">
        <h2>Klaar voor grip op de uitvoering?</h2>
        <p>
          Een kennismaking is vrijblijvend. Binnen een uur weet je of het klikt
          en wat een realistische aanpak voor jouw opgave is.
        </p>
        <div className="hero-ctas">
          <a href={MAILTO_KENNISMAKING} className="btn btn-primary">
            Plan een kennismaking <span className="arrow">→</span>
          </a>
          <a href={MAILTO} className="btn btn-dark-ghost">
            Stuur een e-mail
          </a>
        </div>
      </div>
    </section>
  )
}
