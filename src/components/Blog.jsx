import useReveal from '../hooks/useReveal.js'

function ThumbArt({ variant }) {
  if (variant === 0)
    return (
      <div
        className="thumb-art"
        style={{
          background: 'linear-gradient(135deg, #0a1f44, #1d4ed8 60%, #60a5fa)',
        }}
      >
        <svg viewBox="0 0 300 160" style={{ width: '100%', height: '100%' }}>
          <circle cx="230" cy="80" r="46" fill="#93c5fd" opacity="0.35" />
          <circle cx="230" cy="80" r="28" fill="#ffe099" opacity="0.5" />
        </svg>
      </div>
    )
  if (variant === 1)
    return (
      <div
        className="thumb-art"
        style={{ background: 'linear-gradient(135deg, #101218, #1f1f1f)' }}
      >
        <svg viewBox="0 0 300 160" style={{ width: '100%', height: '100%' }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={40 + i * 46}
              y={120 - i * 18}
              width="26"
              height={20 + i * 18}
              rx="4"
              fill={i === 4 ? '#60a5fa' : '#3a3a3a'}
            />
          ))}
        </svg>
      </div>
    )
  if (variant === 2)
    return (
      <div
        className="thumb-art"
        style={{ background: 'linear-gradient(135deg, #ffe099, #f9997a)' }}
      >
        <svg viewBox="0 0 300 160" style={{ width: '100%', height: '100%' }}>
          <path
            d="M40 120 C 100 40, 200 40, 260 120"
            stroke="#0a1f44"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="260" cy="120" r="10" fill="#0a1f44" />
        </svg>
      </div>
    )
  if (variant === 3)
    return (
      <div
        className="thumb-art"
        style={{ background: 'linear-gradient(135deg, #0a1f44, #12306b)' }}
      >
        <svg viewBox="0 0 300 160" style={{ width: '100%', height: '100%' }}>
          <path
            d="M50 80 H 120 M 150 50 H 220 M 150 110 H 220 M 120 80 C 135 80, 135 50, 150 50 M 120 80 C 135 80, 135 110, 150 110"
            stroke="#60a5fa"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx="50" cy="80" r="10" fill="#93c5fd" />
          <circle cx="220" cy="50" r="10" fill="#ffe099" />
          <circle cx="220" cy="110" r="10" fill="#60a5fa" />
          <circle cx="250" cy="50" r="4" fill="#ffe099" opacity="0.5" />
          <circle cx="250" cy="110" r="4" fill="#60a5fa" opacity="0.5" />
        </svg>
      </div>
    )
  if (variant === 4)
    return (
      <div
        className="thumb-art"
        style={{ background: 'linear-gradient(135deg, #fdf3d8, #ffe099)' }}
      >
        <svg viewBox="0 0 300 160" style={{ width: '100%', height: '100%' }}>
          <ellipse cx="150" cy="46" rx="58" ry="16" fill="#0a1f44" />
          <path
            d="M92 46 V 82 A 58 16 0 0 0 208 82 V 46"
            fill="#0a1f44"
            opacity="0.85"
          />
          <path
            d="M92 82 V 118 A 58 16 0 0 0 208 118 V 82"
            fill="#0a1f44"
            opacity="0.65"
          />
          <ellipse cx="150" cy="82" rx="58" ry="16" fill="none" stroke="#ffe099" strokeWidth="3" />
          <ellipse cx="150" cy="118" rx="58" ry="16" fill="none" stroke="#ffe099" strokeWidth="3" />
        </svg>
      </div>
    )
  if (variant === 5)
    return (
      <div
        className="thumb-art"
        style={{ background: 'linear-gradient(135deg, #101218, #1f1f1f)' }}
      >
        <svg viewBox="0 0 300 160" style={{ width: '100%', height: '100%' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((col) =>
            [0, 1, 2, 3].map((row) => (
              <circle
                key={`${col}-${row}`}
                cx={54 + col * 32}
                cy={32 + row * 32}
                r="5"
                fill={col === row + 1 ? '#60a5fa' : '#3a3a3a'}
              />
            ))
          )}
        </svg>
      </div>
    )
  if (variant === 6)
    return (
      <div
        className="thumb-art"
        style={{ background: 'linear-gradient(135deg, #93c5fd, #60a5fa)' }}
      >
        <svg viewBox="0 0 300 160" style={{ width: '100%', height: '100%' }}>
          <path
            d="M30 125 L 90 95 L 150 105 L 210 55 L 270 40 V 160 H 30 Z"
            fill="#0a1f44"
            opacity="0.15"
          />
          <path
            d="M30 125 L 90 95 L 150 105 L 210 55 L 270 40"
            stroke="#0a1f44"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="210" cy="55" r="8" fill="#ffe099" stroke="#0a1f44" strokeWidth="4" />
        </svg>
      </div>
    )
  if (variant === 7)
    return (
      <div
        className="thumb-art"
        style={{ background: 'linear-gradient(135deg, #0a1f44, #1d4ed8)' }}
      >
        <svg viewBox="0 0 300 160" style={{ width: '100%', height: '100%' }}>
          {[70, 52, 34].map((r, i) => (
            <path
              key={r}
              d={`M ${150 - r} 130 A ${r} ${r} 0 0 1 ${150 + r} 130`}
              stroke={['#93c5fd', '#ffe099', '#60a5fa'][i]}
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              opacity={0.45 + i * 0.25}
            />
          ))}
          <circle cx="150" cy="130" r="9" fill="#ffe099" />
        </svg>
      </div>
    )
  return (
    <div
      className="thumb-art"
      style={{ background: 'linear-gradient(135deg, #f9997a, #ffe099)' }}
    >
      <svg viewBox="0 0 300 160" style={{ width: '100%', height: '100%' }}>
        <rect x="48" y="34" width="60" height="40" rx="8" fill="#0a1f44" />
        <rect x="126" y="60" width="60" height="40" rx="8" fill="#0a1f44" opacity="0.75" />
        <rect x="204" y="86" width="60" height="40" rx="8" fill="#0a1f44" opacity="0.5" />
        <path
          d="M108 54 H 126 M 186 80 H 204"
          stroke="#0a1f44"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export const POSTS = [
  {
    tag: 'Techniek',
    title: 'Nederlandse feestdagen in SQL: een datumdimensie die ook op 5 mei 2016 klopt',
    date: '3 aug 2026',
    slug: 'nederlandse-feestdagen-in-sql',
    variant: 8,
  },
  {
    tag: 'Project',
    title: 'Van event-log naar businesscase: stuurinformatie voor het bezwaarproces',
    date: '27 jul 2026',
    slug: 'bezwaarproces-in-cijfers',
    variant: 6,
  },
  {
    tag: 'Project',
    title: 'Een open-data warehouse zoals het hoort: dbt, tests en een Kimball-sterschema',
    date: '26 jul 2026',
    slug: 'open-data-warehouse-met-dbt',
    variant: 4,
  },
  {
    tag: 'Project',
    title: 'Een RAG-assistent voor beleidsstukken die alleen antwoordt mét bron',
    date: '25 jul 2026',
    slug: 'rag-voor-beleidsstukken',
    variant: 3,
  },
  {
    tag: 'Werkwijze',
    title: 'Scrum in de publieke sector: het ritme is het punt, niet het ritueel',
    date: '21 jul 2026',
    slug: 'scrum-in-de-publieke-sector',
    variant: 2,
  },
  {
    tag: 'Analyse',
    title: 'Requirements voor dataproducten: van "wij willen een dashboard" naar wat er echt nodig is',
    date: '18 jul 2026',
    slug: 'requirements-engineering-voor-dataproducten',
    variant: 8,
  },
  {
    tag: 'Praktijk',
    title: 'Meelopen op de werkvloer: waarom elke analyse daar begint',
    date: '14 jul 2026',
    slug: 'meelopen-op-de-werkvloer',
    variant: 0,
  },
  {
    tag: "KPI's",
    title: 'Een KPI-woordenboek dat cijferdiscussies écht beëindigt',
    date: '2 jul 2026',
    variant: 1,
  },
  {
    tag: 'Sturing',
    title: 'Stuurinformatie voor de publieke sector: wat directies écht nodig hebben',
    date: '19 jun 2026',
    variant: 2,
  },
  {
    tag: 'Techniek',
    title: 'Van SAS naar Power BI: migreren zonder je gebruikers kwijt te raken',
    date: '5 jun 2026',
    variant: 3,
  },
  {
    tag: 'Proces',
    title: 'Procesherontwerp met behoud van de menselijke maat',
    date: '26 mei 2026',
    variant: 4,
  },
  {
    tag: 'AI',
    title: 'AI in de uitvoering: kansen signaleren én toetsen aan de kaders',
    date: '12 mei 2026',
    variant: 5,
  },
  {
    tag: 'Kosten',
    title: 'Wat kost een ZZP business analist écht? Een eerlijke rekensom',
    date: '28 apr 2026',
    variant: 6,
  },
  {
    tag: 'Praktijk',
    title: 'Een businesscase die beslissers écht kunnen wegen',
    date: '15 apr 2026',
    variant: 7,
  },
  {
    tag: 'Sturing',
    title: 'Van 40 lijstjes naar 5 dashboards: saneren bij een uitvoeringsorganisatie',
    date: '31 mrt 2026',
    variant: 8,
  },
]

// posts zonder geschreven artikel (geen slug) zijn een tegel, geen link
export function BlogCard({ post, index }) {
  const Card = post.slug ? 'a' : 'div'
  return (
    <Card
      {...(post.slug ? { href: `/blog/${post.slug}` } : {})}
      className="blog-card reveal"
      style={{ '--reveal-delay': `${index * 100}ms` }}
    >
      <div className="blog-thumb">
        <ThumbArt variant={post.variant ?? index} />
      </div>
      <div className="blog-body">
        <span className="tag">{post.tag}</span>
        <h4>{post.title}</h4>
        <div className="date">{post.date}</div>
      </div>
    </Card>
  )
}

export default function Blog() {
  const ref = useReveal()
  return (
    <section className="blog" id="blog" ref={ref}>
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Blog</span>
          <h2 className="section-title">Lessen uit de praktijk</h2>
        </div>
        <div className="blog-grid">
          {POSTS.slice(0, 3).map((p, i) => (
            <BlogCard post={p} index={i} key={p.title} />
          ))}
        </div>
        <div className="blog-more reveal" style={{ '--reveal-delay': '300ms' }}>
          <a href="/blog" className="btn btn-ghost">
            Bekijk alle blogposts <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
