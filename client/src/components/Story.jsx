import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '25+', label: 'Recipes' },
  { value: '10K+', label: 'Guests' },
  { value: '6', label: 'Years' },
  { value: '1', label: 'Tradition' },
]

export default function Story() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="story" id="story" aria-label="Our story">
      <div className="container">
        <div className="story-grid" ref={ref}>
          <motion.div
            className="story-images"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="story-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=700&q=80"
                alt="Chef preparing dum biryani in traditional handi pot"
                loading="lazy"
              />
            </div>
            <div className="story-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=700&q=80"
                alt="Atmospheric Indian spice preparation in a dark kitchen"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            className="story-content"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="section-label">Our Story</span>
            <div className="gold-divider left" aria-hidden="true" />
            <h2>Born in the Kitchens<br />of <em style={{ color: 'var(--gold)' }}>Hyderabad</em></h2>

            <p>
              Our story begins in 1972 — in a modest kitchen in Charminar, where our founder's
              mother would wake at dawn to begin the dum process. The recipe, passed from her
              mother-in-law, and hers before that, carried the weight of Mughal kitchens and
              royal halwai traditions.
            </p>
            <p>
              In 2018, we brought that legacy to the modern table. Every technique — the
              hand-pounded spice pastes, the slow caramelisation of onions over low flame,
              the final monsoon-flower saffron bloom — is preserved exactly as it was taught.
              No shortcuts. No compromises.
            </p>
            <p>
              Dum &amp; Glory is not merely a restaurant. It is a living archive of Hyderabadi
              culinary identity — a place where every plate tells a story of craft, heritage,
              and an uncompromising love for the art of biryani.
            </p>

            <div className="story-stats" role="list">
              {stats.map((s, i) => (
                <div key={s.label} style={{ display: 'contents' }} role="listitem">
                  {i > 0 && <span className="story-stat-divider" aria-hidden="true">◆</span>}
                  <div className="story-stat">
                    <span className="story-stat-value">{s.value}</span>
                    <span className="story-stat-label">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
