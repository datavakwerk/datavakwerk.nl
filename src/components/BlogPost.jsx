export default function BlogPost({ post }) {
  const { Component } = post
  return (
    <article className="blog-post">
      <div className="container blog-post-inner">
        <a href="#/blog" className="blog-post-back">
          <span aria-hidden="true">←</span> Terug naar het overzicht
        </a>
        <header className="blog-post-header">
          <span className="tag">{post.tag}</span>
          <h1>{post.title}</h1>
          <div className="date">{post.date}</div>
        </header>
        <div className="blog-post-content">
          <Component />
        </div>
      </div>
    </article>
  )
}
