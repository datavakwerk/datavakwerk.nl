import { useEffect } from 'react'
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
import NotFound from './components/NotFound.jsx'
import Cta from './components/Cta.jsx'
import DienstPage from './components/DienstPage.jsx'
import Footer from './components/Footer.jsx'
import { findPost } from './posts/index.js'
import { findDienst } from './diensten/index.js'
import { useRoute, scrollToHash } from './router.js'
import { metaForPath } from './routes.js'

function resolve(path) {
  if (path === '/') return { kind: 'home' }
  if (path === '/blog') return { kind: 'blogIndex' }

  const postSlug = /^\/blog\/(.+)$/.exec(path)?.[1]
  if (postSlug) {
    const post = findPost(postSlug)
    return post ? { kind: 'post', post } : { kind: 'notFound' }
  }

  const dienstSlug = /^\/diensten\/(.+)$/.exec(path)?.[1]
  if (dienstSlug) {
    const dienst = findDienst(dienstSlug)
    return dienst ? { kind: 'dienst', dienst } : { kind: 'notFound' }
  }

  return { kind: 'notFound' }
}

export default function App({ initialPath = '/' }) {
  const route = useRoute(initialPath)
  const view = resolve(route.path)

  // Bij client-side navigatie de titel en beschrijving bijwerken, zodat de
  // browsertab en gedeelde links kloppen zonder volledige paginalading.
  useEffect(() => {
    const meta = metaForPath(route.path)
    document.title = meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description)
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', meta.canonical)
  }, [route.path])

  // Alleen scrollen na een echte navigatie, niet bij de eerste render van een
  // geprerenderde pagina.
  useEffect(() => {
    if (route.key === 0) return
    scrollToHash(route.hash)
  }, [route.key, route.hash])

  return (
    <>
      <Navbar />
      <main>
        {view.kind === 'post' ? (
          <BlogPost post={view.post} />
        ) : view.kind === 'blogIndex' ? (
          <BlogIndex />
        ) : view.kind === 'dienst' ? (
          <DienstPage dienst={view.dienst} />
        ) : view.kind === 'notFound' ? (
          <NotFound />
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
