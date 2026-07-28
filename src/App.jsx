import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StatsDashboard from './components/StatsDashboard.jsx'
import Products from './components/Products.jsx'
import AiEra from './components/AiEra.jsx'
import CaseStudies from './components/CaseStudies.jsx'
import Enterprise from './components/Enterprise.jsx'
import Integration from './components/Integration.jsx'
import Testimonials from './components/Testimonials.jsx'
import Blog from './components/Blog.jsx'
import BlogIndex from './components/BlogIndex.jsx'
import BlogPost from './components/BlogPost.jsx'
import Cta from './components/Cta.jsx'
import DienstPage from './components/DienstPage.jsx'
import Footer from './components/Footer.jsx'
import { findPost } from './posts/index.js'
import { findDienst } from './diensten/index.js'

function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()
  const slug = hash.match(/^#\/blog\/(.+)$/)?.[1]
  const post = slug ? findPost(slug) : null
  // #/blog (of een onbekende slug) toont het blogoverzicht
  const blogIndex = !post && /^#\/blog(\/|$)/.test(hash)
  const dienstSlug = hash.match(/^#\/diensten\/(.+)$/)?.[1]
  const dienst = dienstSlug ? findDienst(dienstSlug) : null

  useEffect(() => {
    if (post || blogIndex || dienst) window.scrollTo(0, 0)
  }, [post, blogIndex, dienst])

  return (
    <>
      <Navbar />
      <main>
        {post ? (
          <BlogPost post={post} />
        ) : blogIndex ? (
          <BlogIndex />
        ) : dienst ? (
          <DienstPage dienst={dienst} />
        ) : (
          <>
            <Hero />
            <StatsDashboard />
            <Products />
            <AiEra />
            <CaseStudies />
            <Enterprise />
            <Integration />
            <Testimonials />
            <Blog />
            <Cta />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
