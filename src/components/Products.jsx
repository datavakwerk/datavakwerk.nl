import useReveal from '../hooks/useReveal.js'

// dashboard mock: growing bars
function DashboardVisual() {
  return (
    <div className="mini-docs">
      <div className="bar title" style={{ '--i': 0 }} />
      <div className="bar" style={{ '--i': 1, width: '92%', background: 'var(--blue-300)' }} />
      <div className="bar" style={{ '--i': 2, width: '70%', background: 'var(--blue-300)' }} />
      <div className="bar" style={{ '--i': 3, width: '84%', background: 'var(--cream)' }} />
      <div className="bar" style={{ '--i': 4, width: '48%' }} />
    </div>
  )
}

function MethodsVisual() {
  const methods = ['meelopen', 'interviews', 'bpmn', 'knelpuntenanalyse', 'pilots', 'scrum']
  return (
    <div className="mini-sdk">
      {methods.map((t, i) => (
        <span className="sdk-chip" style={{ '--i': i }} key={t}>
          {t}
        </span>
      ))}
    </div>
  )
}

function AnalysisVisual() {
  return (
    <div className="mini-term">
      <div className="term-head">
        <i />
        <i />
        <i />
      </div>
      <div className="term-body">
        <div className="term-line" style={{ '--d': '0.2s' }}>
          <span className="prompt">$</span> python scenario_analyse.py
        </div>
        <div className="term-ok" style={{ '--d': '1.3s' }}>
          ✓ 3 scenario&apos;s doorgerekend, 1 helder advies
        </div>
        <div>
          <span className="prompt">$</span> <span className="term-caret" />
        </div>
      </div>
    </div>
  )
}

const SERVICES = [
  {
    slug: 'stuurinformatie',
    icon: '📊',
    title: 'Stuur- en managementinformatie',
    desc: 'Dashboards en rapportages in Power BI, SAS of SAP Analytics Cloud waarmee directie en lijnmanagement dagelijks kunnen sturen — één definitie, één bron, gevalideerd.',
    visual: <DashboardVisual />,
  },
  {
    slug: 'procesanalyse',
    icon: '🧭',
    title: 'Procesanalyse & herontwerp',
    desc: 'Ik loop mee op de werkvloer, breng processen en knelpunten in kaart en vertaal observaties naar verbetervoorstellen die uitvoerbaar zijn — met behoud van zorgvuldigheid en menselijke maat.',
    visual: <MethodsVisual />,
  },
  {
    slug: 'businesscases',
    icon: '📋',
    title: 'Businesscases & advies',
    desc: "Kwalitatieve en kwantitatieve businesscases: impact, kosten, baten en risico's onderbouwd — inclusief toets aan de kaders voor privacy, informatiebeveiliging, architectuur en AI.",
    visual: <AnalysisVisual />,
  },
]

export default function Products() {
  const ref = useReveal()
  return (
    <section className="products" id="diensten" ref={ref}>
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Diensten</span>
          <h2 className="section-title">Van werkvloer tot bestuurstafel, uit één hand</h2>
          <p className="section-sub">
            Eén aanspreekpunt voor het hele traject: van observatie in de
            uitvoering tot onderbouwd advies aan het management. Ik analyseer,
            adviseer en draag over — geen losse eindjes.
          </p>
        </div>

        <div className="products-grid">
          {SERVICES.map((p, i) => (
            <a
              href={`/diensten/${p.slug}`}
              className="product-card reveal"
              style={{ '--reveal-delay': `${i * 110}ms` }}
              key={p.title}
            >
              <div className="product-visual">{p.visual}</div>
              <div className="product-body">
                <h3>
                  <span>{p.icon}</span> {p.title}
                </h3>
                <p>{p.desc}</p>
                <span className="product-more">
                  Meer over deze dienst <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
