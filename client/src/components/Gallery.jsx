import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80', alt: 'Hyderabadi Dum Biryani served in traditional handi' },
  { id: 2, src: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80', alt: 'Aromatic biryani with saffron garnish' },
  { id: 3, src: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80', alt: 'Seekh kebabs on a grill with charcoal smoke' },
  { id: 4, src: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=900&q=80', alt: 'Prawn biryani with golden saffron threads' },
  { id: 5, src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80', alt: 'Head chef seasoning biryani in professional kitchen' },
  { id: 6, src: 'https://images.unsplash.com/photo-1606787364406-a3cdf06c6d0c?w=600&q=80', alt: 'Fine dining table setup with ambient candlelight' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="gallery" id="gallery" aria-label="Photo gallery">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="accent-label">Visual Story</span>
          <div className="gold-divider" aria-hidden="true" />
          <h2>A Feast for the Eyes</h2>
        </motion.div>

        <div className="gallery-grid" ref={ref}>
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              className="gallery-item"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: 'easeOut' }}
              onClick={() => setLightbox(img)}
              role="button"
              tabIndex={0}
              aria-label={`View: ${img.alt}`}
              id={`gallery-item-${img.id}`}
              onKeyDown={(e) => e.key === 'Enter' && setLightbox(img)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            id="gallery-lightbox"
          >
            <motion.img
              src={lightbox.src.replace('w=800', 'w=1400').replace('w=600', 'w=1200').replace('w=900', 'w=1600')}
              alt={lightbox.alt}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
              id="lightbox-close-btn"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
