import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import { GITHUB_URL } from '../config.js'

const ROTATE_MS = 8000

const PROJECTS = [
  {
    title: 'Open-data warehouse',
    repo: 'nl-open-data-warehouse',
    label: 'ELT · dbt · Kimball',
    slug: 'open-data-warehouse-met-dbt',
    desc:
      'Een productiewaardig analyseplatform op Nederlandse open data (RDW en CBS): Python-ingestie, een gedocumenteerd Kimball-sterschema in dbt en een CI-pipeline die elke wijziging test. Gebouwd zoals een echt dataplatform-team werkt — versiebeheer, code review en geautomatiseerde tests.',
    stack: ['Python', 'DuckDB', 'dbt', 'SQL', 'GitHub Actions'],
    results: [
      { v: '3', l: 'lagen: staging → ster → marts' },
      { v: '✓', l: 'grain per feittabel gedocumenteerd' },
      { v: 'CI', l: 'dbt-tests bij elke wijziging' },
    ],
  },
  {
    title: 'Bezwaarproces in cijfers',
    repo: 'bezwaarproces-stuurinformatie',
    label: "Procesanalyse · KPI's · businesscase",
    slug: 'bezwaarproces-in-cijfers',
    desc:
      'Van operationeel event-log naar bestuurstafel: een gesimuleerd bezwaarproces geanalyseerd op doorlooptijden en knelpunten, vertaald naar een KPI-dashboard en een gekwantificeerde businesscase waarin elk getal reproduceerbaar is. Het "van uitvoering naar sturing"-verhaal, uitgewerkt in code.',
    stack: ['Python', 'SQL', 'PM4Py', 'Evidence', 'notebooks'],
    results: [
      { v: '300k', l: 'events in het proceslog' },
      { v: 'P50/P90', l: "doorlooptijd-KPI's met definities" },
      { v: '€', l: 'businesscase, elk getal herleidbaar' },
    ],
  },
  {
    title: 'RAG voor beleidsstukken',
    repo: 'beleidsstukken-rag',
    label: 'Python · LangGraph · RAG',
    slug: 'rag-voor-beleidsstukken',
    desc:
      'Vragen stellen aan openbare beleidsstukken en antwoord krijgen mét bronvermelding — of een eerlijk "dat staat niet in de stukken". Een LangGraph RAG-pijplijn met een geautomatiseerde evaluatie in CI die bewaakt dat antwoorden trouw blijven aan de bron, plus een notitie over verantwoorde inzet.',
    stack: ['Python', 'LangGraph', 'Chroma', 'RAGAS', 'Streamlit'],
    results: [
      { v: '100%', l: 'antwoorden met bronvermelding' },
      { v: '25', l: 'gouden testvragen in CI' },
      { v: '✓', l: 'notitie verantwoorde inzet' },
    ],
  },
]

export default function CaseStudies() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useReveal()

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setActive((a) => (a + 1) % PROJECTS.length), ROTATE_MS)
    return () => clearTimeout(id)
  }, [active, paused])

  const p = PROJECTS[active]

  return (
    <section className="cases" id="projecten" ref={ref}>
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Projecten</span>
          <h2 className="section-title">Van ruwe data tot onderbouwde sturing</h2>
          <p className="section-sub">
            Drie open projecten die de hele keten laten zien: data binnenhalen,
            modelleren, analyseren en vertalen naar besluitvorming. Bij elk
            project hoort een blogpost over de aanpak en de keuzes.
          </p>
        </div>

        <div
          className="cases-layout reveal"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="case-tabs">
            {PROJECTS.map((pr, i) => (
              <button
                key={pr.repo}
                className={`case-tab ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="case-tab-inner">
                  <span className="from-to">{pr.label}</span>
                  <span className="company">{pr.title}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="case-detail">
            <div className="case-detail-inner" key={active}>
              <h3 className="case-project-title">{p.title}</h3>
              <div className="case-repo">{p.repo}</div>
              <p className="case-desc">{p.desc}</p>
              <div className="case-stack">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <div className="case-results">
                {p.results.map((r) => (
                  <div className="r" key={r.l}>
                    <div className="v">{r.v}</div>
                    <div className="l">{r.l}</div>
                  </div>
                ))}
              </div>
              <div className="case-links">
                <a href={`#/blog/${p.slug}`}>
                  Lees de blogpost <span aria-hidden="true">→</span>
                </a>
                {GITHUB_URL && (
                  <a
                    href={`${GITHUB_URL}/${p.repo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Code op GitHub <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
