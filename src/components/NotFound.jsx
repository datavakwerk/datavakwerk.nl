export default function NotFound() {
  return (
    <section className="blog blog-index">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1 className="section-title">Deze pagina bestaat niet</h1>
        <p className="section-sub">
          De link is verlopen of er staat een typefout in het adres. Vanaf de
          homepage of het blogoverzicht kom je verder.
        </p>
        <p className="blog-more">
          <a href="/" className="btn btn-primary">
            Naar de homepage
          </a>{' '}
          <a href="/blog" className="btn btn-ghost">
            Naar het blog
          </a>
        </p>
      </div>
    </section>
  )
}
