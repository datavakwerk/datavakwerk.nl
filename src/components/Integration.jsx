import useReveal from '../hooks/useReveal.js'
import { MAILTO_KENNISMAKING } from '../config.js'

export default function Integration() {
  const ref = useReveal()
  return (
    <section className="integration" ref={ref}>
      <div className="container integration-inner">
        <div className="reveal">
          <span className="eyebrow">Van uitvoering naar sturing</span>
          <h2 className="section-title" style={{ color: '#fff' }}>
            Van werkvloer naar bestuurstafel
          </h2>
          <p className="section-sub">
            Meelopen in de uitvoering, data uit de systemen, gesprekken met
            stakeholders — ik breng samen wat nodig is voor één onderbouwd
            verhaal. Eén analyse, één advies waar bestuur én werkvloer achter
            staan.
          </p>
          <div className="hero-ctas" style={{ animation: 'none' }}>
            <a href={MAILTO_KENNISMAKING} className="btn btn-primary">
              Bespreek jouw opgave <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <div className="pipe-visual reveal" style={{ '--reveal-delay': '150ms' }}>
          <div className="pipe-node">
            data interviews
            <div className="big">De uitvoering</div>
          </div>
          <div className="pipe-beam" />
          <div className="pipe-node">
            kpi&apos;s businesscase
            <div className="big">Eén analyse</div>
          </div>
          <div className="pipe-beam" />
          <div className="pipe-node">
            dashboard advies
            <div className="big">Sturings rapportage</div>
          </div>
        </div>
      </div>
    </section>
  )
}
