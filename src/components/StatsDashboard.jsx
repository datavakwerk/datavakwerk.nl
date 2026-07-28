import { useEffect, useRef, useState } from 'react'
import useReveal from '../hooks/useReveal.js'

const DATA = {
  analyse: [
    { value: 250, unit: '+', name: "KPI's eenduidig gedefinieerd", spark: 'M0,30 C40,26 70,18 110,14 S200,6 260,2' },
    { value: 40, unit: '+', name: 'dashboards met stuurinformatie live', spark: 'M0,32 C50,30 90,22 130,18 S210,8 260,4' },
    { value: 30, unit: '+', name: 'uitvoeringsprocessen doorgelicht', spark: 'M0,28 C40,30 80,20 120,16 S200,10 260,3' },
    { value: 15, unit: '+', name: 'businesscases opgesteld', spark: 'M0,33 C50,28 100,24 140,15 S220,7 260,2' },
  ],
  impact: [
    { value: 90, unit: '%', name: 'dashboard-adoptie na drie maanden', spark: 'M0,31 C40,27 80,20 120,17 S210,7 260,3' },
    { value: 600, unit: '+', name: 'ambtenaren werken met mijn rapportages', spark: 'M0,30 C50,29 90,21 140,16 S220,9 260,4' },
    { value: -50, unit: '%', name: 'doorlooptijd van rapportageprocessen', spark: 'M0,32 C40,28 90,23 130,14 S200,8 260,2' },
    { value: 0, unit: '', name: 'bevindingen bij audits', spark: 'M0,29 C50,27 100,19 150,15 S220,6 260,2' },
  ],
}

function AnimatedNumber({ value, active }) {
  const [display, setDisplay] = useState(0)
  const raf = useRef()

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const dur = 900
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [value, active])

  const isInt = Number.isInteger(value)
  return <>{isInt ? Math.round(display) : display.toFixed(1)}</>
}

export default function StatsDashboard() {
  const [mode, setMode] = useState('analyse')
  const [seen, setSeen] = useState(false)
  const sectionRef = useReveal()
  const analyseBtn = useRef(null)
  const impactBtn = useRef(null)
  const [thumb, setThumb] = useState({ left: 4, width: 0 })

  useEffect(() => {
    const btn = mode === 'analyse' ? analyseBtn.current : impactBtn.current
    if (btn) setThumb({ left: btn.offsetLeft, width: btn.offsetWidth })
  }, [mode])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [sectionRef])

  return (
    <section className="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-head reveal">
          <div>
            <span className="eyebrow">In cijfers</span>
            <h2 className="section-title">Inzicht dat zich bewijst in de uitvoering</h2>
            <p className="section-sub">
              Geen rapporten voor de la maar stuurinformatie waar directies en
              teams elke dag mee werken — gevalideerd, herleidbaar en
              auditproof.
            </p>
          </div>
          <div className="stats-toggle">
            <span className="thumb" style={{ left: thumb.left, width: thumb.width }} />
            <button
              ref={analyseBtn}
              className={mode === 'analyse' ? 'active' : ''}
              onClick={() => setMode('analyse')}
            >
              Analyse
            </button>
            <button
              ref={impactBtn}
              className={mode === 'impact' ? 'active' : ''}
              onClick={() => setMode('impact')}
            >
              Impact
            </button>
          </div>
        </div>

        <div className="stats-grid" key={mode}>
          {DATA[mode].map((s, i) => (
            <div className="stat-card" style={{ '--i': i }} key={s.name}>
              <div className="value">
                <AnimatedNumber value={s.value} active={seen} />
                <span className="unit">{s.unit}</span>
              </div>
              <div className="name">{s.name}</div>
              <svg className="spark" viewBox="0 0 260 36" preserveAspectRatio="none">
                <path d={s.spark} />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
