import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.span
          className="loader-title"
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.03em' }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          Dum &amp; Glory
        </motion.span>

        <div className="loader-line" />

        <motion.p
          className="loader-tagline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          The Art of Biryani
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
