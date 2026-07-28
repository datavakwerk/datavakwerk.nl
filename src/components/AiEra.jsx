import useReveal from '../hooks/useReveal.js'

const FEATURES = [
  {
    icon: '⎇',
    title: 'Eén definitie per KPI',
    desc: 'Een KPI-woordenboek met één eigenaar, één berekening en één bron per metric — einde aan de cijferdiscussie.',
  },
  {
    icon: '⏱',
    title: 'Herleidbaar naar de bron',
    desc: 'Van dashboardcijfer terug naar brondata in een paar stappen. Elke transformatie gedocumenteerd — 0 bevindingen bij de audit.',
  },
  {
    icon: '✓',
    title: 'Binnen de kaders',
    desc: 'AVG, BIO, architectuur en ethiek worden vanaf dag één meegenomen in elke analyse — niet achteraf gerepareerd.',
  },
  {
    icon: '✦',
    title: 'Klaar voor AI',
    desc: 'Kansen voor AI en automatisering signaleren én toetsen aan de rijksbrede kaders — van idee tot pilot.',
  },
]

const CODE_LINES = [
  { t: [['tok-cmt', '# stuurinformatie/doorlooptijd_per_proces.sql']] },
  { t: [['tok-key', 'select']] },
  { t: [['tok-punc', '  '], ['tok-str', 'proces'], ['tok-punc', ',']] },
  { t: [['tok-punc', '  '], ['tok-key', 'date_trunc'], ['tok-punc', '('], ['tok-str', "'month'"], ['tok-punc', ', afgehandeld_op) '], ['tok-key', 'as'], ['tok-str', ' maand']] },
  { t: [['tok-punc', '  '], ['tok-key', 'count'], ['tok-punc', '(distinct zaak_id) '], ['tok-key', 'as'], ['tok-str', ' afgeronde_zaken']], added: true },
  { t: [['tok-punc', '  '], ['tok-key', 'round'], ['tok-punc', '(avg(doorlooptijd_dagen), 1) '], ['tok-key', 'as'], ['tok-str', ' gem_doorlooptijd']], added: true },
  { t: [['tok-key', 'from'], ['tok-punc', ' '], ['tok-str', "{{ ref('stg_zaken') }}"]] },
  { t: [['tok-key', 'group by'], ['tok-punc', ' 1, 2']], added: true },
]

const TOOLS = ['Power BI', 'SAS', 'SQL', 'SAP Analytics Cloud', 'Excel', 'Python']

export default function AiEra() {
  const ref = useReveal()
  return (
    <section className="ai-era dark" ref={ref}>
      <div className="container">
        <div className="ai-grid">
          <div className="reveal">
            <span className="eyebrow">Werkwijze onder de motorkap</span>
            <h2 className="section-title" style={{ color: '#fff' }}>
              Analyses die standhouden bij de audit
            </h2>
            <p className="section-sub">
              Geen eenmalige spreadsheets die niemand terug kan vinden. Elke
              analyse is gedocumenteerd, herleidbaar en getoetst aan de
              geldende kaders — zodat je organisatie er ook na mijn vertrek op
              kan bouwen.
            </p>
            <div className="ai-features">
              {FEATURES.map((f) => (
                <div className="ai-feature" key={f.title}>
                  <div className="icon">{f.icon}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ '--reveal-delay': '150ms' }}>
            <div className="code-panel-wrap">
              <div className="code-panel">
                <div className="code-head">
                  <span className="tab">doorlooptijd_per_proces.sql</span>
                  <span>· herleidbaar &amp; auditproof</span>
                </div>
                <div className="code-body">
                  {CODE_LINES.map((line, i) => (
                    <code
                      className={`code-line${line.added ? ' added' : ''}`}
                      style={{ '--i': i }}
                      key={i}
                    >
                      {line.added ? '+ ' : '  '}
                      {line.t.map(([cls, txt], j) => (
                        <span className={cls} key={j}>
                          {txt}
                        </span>
                      ))}
                    </code>
                  ))}
                </div>
                <div className="ai-tools">
                  {TOOLS.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
