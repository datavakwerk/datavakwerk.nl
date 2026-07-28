import useReveal from '../hooks/useReveal.js'

const ITEMS = [
  {
    icon: '🤝',
    title: 'Eén aanspreekpunt',
    desc: 'Direct contact met degene die het werk doet. Geen accountmanagers, geen ruis, korte lijnen.',
  },
  {
    icon: '🎯',
    title: 'Flexibel inzetbaar',
    desc: 'Van een paar dagen per week naast je team tot een volledig traject op interim-basis — op locatie of remote.',
  },
  {
    icon: '📚',
    title: 'Kennisoverdracht standaard',
    desc: 'Documentatie, KPI-woordenboeken en inwerksessies horen bij elke opdracht. Je team kan zelfstandig verder.',
  },
  {
    icon: '💶',
    title: 'Transparante tarieven',
    desc: 'Helder uurtarief of vaste projectprijs, vooraf afgesproken. Geen verrassingen achteraf op de factuur.',
  },
  {
    icon: '🔒',
    title: 'AVG & security bewust',
    desc: 'Privacy by design, BIO en de rijksbrede kaders netjes geregeld — met ervaring met screenings zoals VOG en veiligheidsonderzoek.',
  },
  {
    icon: '🎓',
    title: 'Gecertificeerd',
    desc: 'Certificeringen voor business-analyse, agile/scrum en de moderne BI-stack, en elk jaar bijgeschoold.',
  },
]

export default function Enterprise() {
  const ref = useReveal()
  return (
    <section className="enterprise" id="werkwijze" ref={ref}>
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Waarom een zzp&apos;er</span>
          <h2 className="section-title">Senior slagkracht, zonder overhead</h2>
          <p className="section-sub">
            De kennis van een consultancybureau, de snelheid en betrokkenheid
            van één toegewijde professional.
          </p>
        </div>
        <div className="ent-grid">
          {ITEMS.map((it, i) => (
            <div
              className="ent-card reveal"
              style={{ '--reveal-delay': `${(i % 3) * 90}ms` }}
              key={it.title}
            >
              <div className="icon">{it.icon}</div>
              <h4>{it.title}</h4>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
