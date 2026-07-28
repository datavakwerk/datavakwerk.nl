import { MAILTO_KENNISMAKING } from '../config.js'

export default function DienstPage({ dienst }) {
  return (
    <article className="blog-post dienst-page">
      <div className="container">
        <a href="#top" className="blog-post-back">
          <span aria-hidden="true">←</span> Terug naar home
        </a>
        <header className="blog-post-header">
          <span className="tag">Dienst</span>
          <h1>
            <span aria-hidden="true">{dienst.icon}</span> {dienst.title}
          </h1>
          <p className="dienst-lead">{dienst.lead}</p>
        </header>
        <div className="blog-post-content">
          {dienst.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.items && (
                <ul>
                  {s.items.map((it) => (
                    <li key={it.t}>
                      <strong>{it.t}.</strong> {it.d}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <h2>Gereedschap</h2>
          <div className="case-stack">
            {dienst.tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="dienst-cta">
            <a href={MAILTO_KENNISMAKING} className="btn btn-primary">
              Bespreek jouw opgave <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
