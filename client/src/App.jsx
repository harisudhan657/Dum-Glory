import { useState, useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Signature from './components/Signature'
import Menu from './components/Menu'
import Story from './components/Story'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      document.body.classList.add('loader-active')
    } else {
      document.body.classList.remove('loader-active')
    }
  }, [loading])

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      <ScrollProgress />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'toast-gold',
          duration: 4000,
          style: {
            background: '#080604',
            border: '1px solid #C9A84C',
            color: '#F5ECD7',
            fontFamily: "'Jost', sans-serif",
            padding: '16px 24px',
          },
        }}
      />
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} key="loader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Signature />
            <Menu />
            <Story />
            <Gallery />
            <Testimonials />
            <Reservation />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
