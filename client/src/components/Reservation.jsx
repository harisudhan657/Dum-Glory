import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const TIME_SLOTS = ['12:00 PM', '1:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
const GUEST_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1)

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Reservation() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', requests: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/reservation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('✨ Your table is reserved. See you soon.', { duration: 6000 })
        setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', requests: '' })
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Could not connect to server. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section className="reservation" id="reservation" aria-label="Table reservation">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="accent-label">Dine With Us</span>
          <div className="gold-divider" aria-hidden="true" />
          <h2>Reserve Your Table</h2>
          <p style={{ color: 'var(--cream-muted)', marginTop: '0.8rem', fontSize: '1.05rem' }}>
            For an experience worth remembering.
          </p>
        </motion.div>

        <motion.div
          className="reservation-form-wrap"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} noValidate aria-label="Reservation form" id="reservation-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="res-name">Full Name *</label>
                <input
                  id="res-name"
                  className="form-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="res-email">Email Address *</label>
                <input
                  id="res-email"
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="res-phone">Phone Number *</label>
                <input
                  id="res-phone"
                  className="form-input"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  autoComplete="tel"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="res-guests">Number of Guests *</label>
                <select
                  id="res-guests"
                  className="form-select"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  required
                >
                  {GUEST_OPTIONS.map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="res-date">Date *</label>
                <input
                  id="res-date"
                  className="form-input"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={today}
                  required
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="res-time">Preferred Time *</label>
                <select
                  id="res-time"
                  className="form-select"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a time</option>
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" htmlFor="res-requests">Special Requests</label>
              <textarea
                id="res-requests"
                className="form-textarea"
                name="requests"
                value={form.requests}
                onChange={handleChange}
                placeholder="Dietary requirements, celebrations, seating preferences..."
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="btn btn-gold form-submit"
              id="reservation-submit-btn"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Reserving...' : 'Confirm Reservation →'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
