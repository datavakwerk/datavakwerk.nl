import useReveal from '../hooks/useReveal.js'

const QUOTES = [
  {
    quote:
      'Eindelijk iemand die niet vanaf de zijlijn adviseert maar eerst de uitvoering in gaat. De voorstellen klopten daardoor ook voor de mensen die het werk doen.',
    name: 'Peter van Leeuwen',
    role: 'Programmamanager, Uitvoeringsdienst Sociaal',
    color: '#f28d1a',
  },
  {
    quote:
      'Grote bureaus leverden ons vooral rapporten op. Eén goede analist die luistert, meeloopt en zelf bouwt bleek sneller, goedkoper én prettiger samenwerken.',
    name: 'Karin Visser',
    role: 'Directeur Bedrijfsvoering, Agentschap Basisregisters',
    color: '#1d4ed8',
  },
]

export default function Testimonials() {
  const ref = useReveal()
  return (
    <section className="testimonials" id="over-mij" ref={ref}>
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Wat opdrachtgevers zeggen</span>
          <h2 className="section-title">Samenwerking die bevalt</h2>
        </div>
        <div className="testi-grid">
          {QUOTES.map((q, i) => (
            <div
              className="testi-card reveal"
              style={{ '--reveal-delay': `${i * 120}ms` }}
              key={q.name}
            >
              <span className="mark">“</span>
              <blockquote>{q.quote}</blockquote>
              <div className="who" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span
                  className="avatar"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    background: q.color,
                  }}
                >
                  {q.name[0]}
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14.5 }}>{q.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
