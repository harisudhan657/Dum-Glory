# 🍛 Dum & Glory — Luxury Restaurant Website

> A fully production-ready dark luxury restaurant portfolio website for Hyderabad's finest biryani restaurant.

![Dum & Glory Preview](https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200)

---

## ✨ Features

- **Dark Luxury UI** — Deep black, gold, saffron, and maroon palette
- **Framer Motion Animations** — Page loader, scroll reveals, stagger effects
- **Custom Golden Cursor** — Dot + slow trailing ring
- **Parallax Hero** — Cinematic biryani background with parallax scroll
- **Full Menu** — Tab-filtered grid with card hover effects
- **Gallery + Lightbox** — Masonry layout with click-to-expand
- **Testimonials Carousel** — Horizontal scroll with maroon/gold cards
- **Reservation Form** — Full backend integration with email via Resend
- **Scroll Progress Bar** — Gold gradient at top of page
- **SEO Optimized** — Meta tags, OG tags, semantic HTML
- **Fully Responsive** — Mobile, tablet, desktop

---

## 🗂 Project Structure

```
restaurent/
├── client/           # Vite + React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Signature.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Story.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Reservation.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   └── ScrollProgress.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── server/           # Node.js + Express backend
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── vercel.json
```

---

## 🚀 Local Setup

### 1. Clone & Install

```bash
# Install client deps
cd client
npm install

# Install server deps
cd ../server
npm install
```

### 2. Configure Environment Variables

```bash
# In server/ — copy the example and fill in your values
cp .env.example .env
```

**Required `.env` values:**

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Get from [resend.com](https://resend.com/api-keys) |
| `EMAIL_FROM` | Sender email (must be verified in Resend) |
| `RECIPIENT_EMAIL` | Where reservation emails go |
| `FRONTEND_URL` | Frontend origin (for CORS) |

### 3. Run Development Servers

**Terminal 1 — Frontend:**
```bash
cd client
npm run dev
# → http://localhost:5173
```

**Terminal 2 — Backend:**
```bash
cd server
npm run dev
# → http://localhost:4000
```

---

## 📧 Email Setup (Resend)

1. Create a free account at [resend.com](https://resend.com)
2. Add and verify your domain
3. Create an API key
4. Set `RESEND_API_KEY` in `server/.env`
5. Set `EMAIL_FROM` to your verified domain email

---

## ☁️ Vercel Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Set **Root Directory** to `client`
4. Set **Build Command** to `npm run build`
5. Add environment variable: `VITE_API_URL=https://your-api.vercel.app`

### Backend (Vercel Serverless)
1. Deploy `server/` separately or use the `vercel.json` at root
2. Add all `server/.env` variables in Vercel > Settings > Environment Variables
3. Update `FRONTEND_URL` to your deployed client URL

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Vanilla CSS3 (custom design system) |
| Animations | Framer Motion |
| Backend | Node.js + Express.js |
| Email | Resend API |
| Security | Helmet.js + express-rate-limit |
| Deployment | Vercel |

---

## 📝 License

MIT — Free to use and customize.

---

*Crafted with passion in Hyderabad. 🍛*
# Dum-Glory
