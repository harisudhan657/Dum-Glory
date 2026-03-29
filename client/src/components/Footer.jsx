import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Our Story', href: '#story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reserve', href: '#reservation' },
]

const handleScroll = (href) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="footer-logo" aria-label="Dum and Glory">Dum &amp; Glory</span>
          <span className="footer-tagline">The Art of Biryani — Hyderabad's Finest</span>
          <div className="gold-divider wide" style={{ marginBottom: '0' }} aria-hidden="true" />
        </motion.div>

        <div className="footer-grid">
          {/* Navigate */}
          <div>
            <span className="footer-col-title">Navigate</span>
            <ul className="footer-links">
              {navLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleScroll(link.href) }}
                    id={`footer-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <span className="footer-col-title">Visit Us</span>
            <div className="footer-info">
              <span><strong>Address</strong></span>
              <span>12 Banjara Hills Road No. 2,</span>
              <span>Hyderabad, Telangana 500034</span>
              <span style={{ marginTop: '0.5rem' }}><strong>Hours</strong></span>
              <span>Lunch: 12:00 PM – 3:00 PM</span>
              <span>Dinner: 7:00 PM – 11:00 PM</span>
              <a
                href="tel:+914023456789"
                style={{ color: 'var(--gold)', textDecoration: 'none', marginTop: '0.5rem', display: 'block' }}
                id="footer-phone-link"
              >
                +91 40 2345 6789
              </a>
            </div>
          </div>

          {/* Follow */}
          <div>
            <span className="footer-col-title">Follow Us</span>
            <p style={{ color: 'var(--cream-muted)', fontSize: '0.88rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
              Join us on social media for behind-the-scenes glimpses of our kitchen, seasonal menus, and exclusive events.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram" id="footer-instagram" title="Follow on Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" aria-label="Zomato" id="footer-zomato" title="View on Zomato">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
              </a>
              <a href="#" aria-label="Google Maps" id="footer-maps" title="Find us on Google Maps">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dum &amp; Glory. All rights reserved. · Crafted with passion in Hyderabad.</p>
        </div>
      </div>
    </footer>
  )
}
