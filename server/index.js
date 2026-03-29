require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { rateLimit } = require('express-rate-limit')
const { Resend } = require('resend')

const app = express()
const PORT = process.env.PORT || 4000

// ─── Resend Client ───
const resend = new Resend(process.env.RESEND_API_KEY)

// ─── Middleware ───
app.use(helmet())
app.use(express.json({ limit: '10kb' }))
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}))

// ─── Rate Limiting ───
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: { message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', apiLimiter)

// ─── Validation Helpers ───
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isValidPhone = (phone) => /^[\+\d\s\-\(\)]{7,15}$/.test(phone)
const sanitise = (str) => String(str).trim().slice(0, 500)

// ─── POST /api/reservation ───
app.post('/api/reservation', async (req, res) => {
  const { name, email, phone, date, time, guests, requests } = req.body

  // Validation
  if (!name || !email || !phone || !date || !time || !guests) {
    return res.status(400).json({ message: 'All required fields must be filled.' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' })
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ message: 'Please provide a valid phone number.' })
  }

  const sName = sanitise(name)
  const sRequests = requests ? sanitise(requests) : 'None'

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Dum & Glory <reservations@dumandglory.com>',
      to: [process.env.RECIPIENT_EMAIL || 'admin@dumandglory.com'],
      subject: `🍛 New Reservation — ${sName} (${guests} guests on ${date})`,
      html: `
        <div style="font-family: Georgia, serif; background: #080604; color: #F5ECD7; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #C9A84C;">
          <h1 style="color: #C9A84C; font-size: 28px; margin-bottom: 8px;">Dum &amp; Glory</h1>
          <p style="color: #9A7030; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-top: 0;">New Table Reservation</p>
          <hr style="border: none; border-top: 1px solid #C9A84C40; margin: 24px 0;" />

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; color: #9A7030; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; width: 140px;">Guest Name</td><td style="padding: 10px 0; font-size: 16px;">${sName}</td></tr>
            <tr><td style="padding: 10px 0; color: #9A7030; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Email</td><td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td></tr>
            <tr><td style="padding: 10px 0; color: #9A7030; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Phone</td><td style="padding: 10px 0;">${sanitise(phone)}</td></tr>
            <tr><td style="padding: 10px 0; color: #9A7030; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Date</td><td style="padding: 10px 0;">${sanitise(date)}</td></tr>
            <tr><td style="padding: 10px 0; color: #9A7030; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Time</td><td style="padding: 10px 0;">${sanitise(time)}</td></tr>
            <tr><td style="padding: 10px 0; color: #9A7030; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Guests</td><td style="padding: 10px 0;">${parseInt(guests)} guests</td></tr>
            <tr><td style="padding: 10px 0; color: #9A7030; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Requests</td><td style="padding: 10px 0; color: #C8B99A;">${sRequests}</td></tr>
          </table>

          <hr style="border: none; border-top: 1px solid #C9A84C40; margin: 24px 0;" />
          <p style="color: #9A7030; font-size: 12px; text-align: center; letter-spacing: 2px;">DUM &amp; GLORY · HYDERABAD</p>
        </div>
      `,
    })

    // Confirmation to guest
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Dum & Glory <reservations@dumandglory.com>',
      to: [email],
      subject: `Your reservation at Dum & Glory is confirmed ✨`,
      html: `
        <div style="font-family: Georgia, serif; background: #080604; color: #F5ECD7; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #C9A84C;">
          <h1 style="color: #C9A84C; font-size: 28px; margin-bottom: 4px;">Dum &amp; Glory</h1>
          <p style="color: #9A7030; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">The Art of Biryani</p>
          <hr style="border: none; border-top: 1px solid #C9A84C40; margin: 24px 0;" />
          <h2 style="color: #F5ECD7; font-size: 22px;">Dear ${sName},</h2>
          <p style="line-height: 1.8; color: #C8B99A;">Your table has been reserved. We are honoured to welcome you and we look forward to an exceptional dining experience together.</p>
          <div style="background: rgba(201,168,76,0.06); border: 1px solid #C9A84C40; border-radius: 4px; padding: 20px 24px; margin: 24px 0;">
            <p style="margin: 6px 0; font-size: 15px;"><strong style="color: #C9A84C;">Date:</strong> ${sanitise(date)}</p>
            <p style="margin: 6px 0; font-size: 15px;"><strong style="color: #C9A84C;">Time:</strong> ${sanitise(time)}</p>
            <p style="margin: 6px 0; font-size: 15px;"><strong style="color: #C9A84C;">Guests:</strong> ${parseInt(guests)}</p>
          </div>
          <p style="color: #C8B99A; line-height: 1.8;">12 Banjara Hills Road No. 2, Hyderabad · <a href="tel:+914023456789" style="color: #C9A84C;">+91 40 2345 6789</a></p>
          <hr style="border: none; border-top: 1px solid #C9A84C40; margin: 24px 0;" />
          <p style="color: #9A7030; font-size: 11px; text-align: center; letter-spacing: 2px;">DUM &amp; GLORY · HYDERABAD · EST. 2018</p>
        </div>
      `,
    })

    return res.status(200).json({ message: 'Reservation confirmed.' })
  } catch (err) {
    console.error('Email send error:', err)
    return res.status(500).json({ message: 'Failed to send confirmation. Please call us directly.' })
  }
})

// ─── POST /api/contact ───
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address.' })
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Dum & Glory <no-reply@dumandglory.com>',
      to: [process.env.RECIPIENT_EMAIL || 'admin@dumandglory.com'],
      subject: `Contact Inquiry from ${sanitise(name)}`,
      html: `<p><strong>Name:</strong> ${sanitise(name)}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${sanitise(message)}</p>`,
    })
    return res.status(200).json({ message: 'Message received.' })
  } catch (err) {
    console.error('Contact email error:', err)
    return res.status(500).json({ message: 'Failed to send message.' })
  }
})

// ─── Health Check ───
app.get('/api/health', (_, res) => res.json({ status: 'ok', service: 'Dum & Glory API' }))

// ─── Start ───
app.listen(PORT, () => {
  console.log(`✨ Dum & Glory API running on http://localhost:${PORT}`)
})
