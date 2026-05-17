import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import { useDarkMode } from './hooks/useDarkMode'
import { trackPageView } from './utils/analytics'

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    trackPageView(location.pathname + location.search)
  }, [location])
  return null
}

export default function App() {
  const [dark, setDark] = useDarkMode()

  return (
    <div className="bg-chalk dark:bg-ink text-ink dark:text-chalk min-h-screen transition-colors duration-300 font-body">
      <ScrollToTop />
      <Navbar dark={dark} setDark={setDark} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
<Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}
