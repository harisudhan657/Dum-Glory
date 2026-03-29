import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const ingredients = ['Saffron', 'Aged Basmati', 'Dum Sealed', 'Slow Cooked', 'Whole Spices', 'Handi Pot']

export default function Signature() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="signature" id="signature" aria-label="Signature dish">
      <div className="container">
        <div className="signature-grid" ref={ref}>
          <motion.div
            className="signature-image-wrap"
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <img
              src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80"
              alt="Hyderabadi Dum Biryani — our signature dish"
              className="signature-image"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="signature-content"
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <span className="accent-label">Signature</span>
            <div className="gold-divider left" aria-hidden="true" />
            <h2>The Dum Biryani<br /><em style={{ color: 'var(--gold)' }}>Experience</em></h2>

            <p>
              At the heart of Dum &amp; Glory lies a recipe whispered down four generations —
              long-grain aged basmati, handpicked from the valleys of Dehradun, soaked overnight
              and layered with slow-marinated meat, caramelised onions, and bloomed saffron
              dissolved in warm milk.
            </p>
            <p>
              The handi is then sealed with dough, and the biryani breathes in its own fragrant
              steam for four unhurried hours over a controlled dum flame. What emerges is not
              simply rice — it is memory, artistry, and a century of Hyderabadi soul on a plate.
            </p>

            <div className="ingredient-tags" role="list" aria-label="Key ingredients">
              {ingredients.map(tag => (
                <span key={tag} className="tag" role="listitem">{tag}</span>
              ))}
            </div>

            <a
              href="#menu"
              className="btn btn-gold"
              id="signature-order-btn"
              onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Order Now →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
