import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REVIEWS = [
  {
    id: 1,
    text: "The mutton biryani is unlike anything I've had in the city. Every grain was perfectly cooked, every bite transported me to old Hyderabad. This is what biryani should taste like.",
    author: 'Arjun M.',
    stars: 5,
  },
  {
    id: 2,
    text: "The ambiance is stunning, the biryani is royal. We booked our anniversary dinner here and it was absolutely perfect. The saffron aroma lingered long after we left.",
    author: 'Priya & Karthik',
    stars: 5,
  },
  {
    id: 3,
    text: "Genuinely the best dum biryani I've had outside of Hyderabad. The saffron aroma hits you the moment they open the handi at the table. Pure theatre, pure flavour.",
    author: 'Ravi S.',
    stars: 5,
  },
  {
    id: 4,
    text: "A revelation. The seekh kebabs melted on the tongue and the biryani was a masterclass in restraint and spice. I will be back every month without question.",
    author: 'Nadia K.',
    stars: 5,
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="testimonials arabesque-bg" id="testimonials" aria-label="Guest testimonials">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="accent-label">Our Guests</span>
          <div className="gold-divider" aria-hidden="true" />
          <h2>Whispers from<br />Our Guests</h2>
        </motion.div>

        <div className="testimonials-track" ref={ref} role="list">
          {REVIEWS.map((review, i) => (
            <motion.article
              key={review.id}
              className="testimonial-card"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: 'easeOut' }}
              role="listitem"
              aria-label={`Review by ${review.author}`}
              id={`testimonial-${review.id}`}
            >
              <div className="testimonial-quote" aria-hidden="true">"</div>
              <blockquote className="testimonial-text" cite="#">
                {review.text}
              </blockquote>
              <div className="testimonial-stars" aria-label={`${review.stars} out of 5 stars`}>
                {Array.from({ length: review.stars }).map((_, j) => (
                  <span key={j} aria-hidden="true">★</span>
                ))}
              </div>
              <div>
                <span className="testimonial-author">— {review.author}</span>
                <span className="testimonial-verified">Verified Guest</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
