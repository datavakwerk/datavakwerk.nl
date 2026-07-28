import useReveal from '../hooks/useReveal.js'
import { POSTS, BlogCard } from './Blog.jsx'

export default function BlogIndex() {
  const ref = useReveal()
  return (
    <section className="blog blog-index" ref={ref}>
      <div className="container">
        <a href="#top" className="blog-post-back">
          <span aria-hidden="true">←</span> Terug naar home
        </a>
        <div className="reveal">
          <span className="eyebrow">Blog</span>
          <h1 className="section-title">Alle blogposts</h1>
          <p className="section-sub">
            Lessen uit de praktijk: analyses, stuurinformatie en de projecten
            waar ik aan bouw. Tegels zonder link volgen binnenkort.
          </p>
        </div>
        <div className="blog-grid">
          {POSTS.map((p, i) => (
            <BlogCard post={p} index={i} key={p.title} />
          ))}
        </div>
      </div>
    </section>
  )
}
