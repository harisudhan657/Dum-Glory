import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (del = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: del, ease: [0.25, 0.46, 0.45, 0.94] } }),
}

export default function Hero() {
  const bgRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" id="home" aria-label="Hero section">
      <div className="hero-bg" ref={bgRef} aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container">
        <div className="hero-content">
          <motion.span
            className="hero-label"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
          >
            Est. 2018 · Hyderabad
          </motion.span>

          <motion.div
            className="hero-divider"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            aria-hidden="true"
          />

          <motion.h1
            className="hero-title"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.5}
          >
            Where Every <em>Grain</em><br />Tells a Story.
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.75}
          >
            Hand-crafted dum biryani, slow-cooked with saffron,
            aged basmati, and generations of tradition.
          </motion.p>

          <motion.div
            className="hero-ctas"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.95}
          >
            <a
              href="#menu"
              className="btn btn-gold"
              id="hero-explore-btn"
              onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Explore Menu
            </a>
            <a
              href="#story"
              className="btn btn-ghost"
              id="hero-story-btn"
              onClick={(e) => { e.preventDefault(); document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Our Story
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        aria-hidden="true"
      >
        <span>Scroll</span>
        <svg className="scroll-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  )
}
