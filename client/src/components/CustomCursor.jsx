import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div ref={cursorRef} className="cursor-legpiece" aria-hidden="true">
      {/* Chicken Leg Piece SVG */}
      <svg
        width="44"
        height="54"
        viewBox="0 0 44 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* ── Bone shaft ── */}
        <rect
          x="18.5" y="26" width="5" height="22"
          rx="2.5"
          fill="#F5ECD7"
          stroke="#C9A84C"
          strokeWidth="0.6"
        />

        {/* ── Bone knob (bottom) ── */}
        <ellipse
          cx="21" cy="49"
          rx="6" ry="4.5"
          fill="#F5ECD7"
          stroke="#C9A84C"
          strokeWidth="0.6"
        />

        {/* ── Meat body (pear shape) ── */}
        <ellipse
          cx="21" cy="17"
          rx="14" ry="16"
          fill="#8B3A0A"
        />

        {/* ── Grilled dark top shadow ── */}
        <ellipse
          cx="21" cy="10"
          rx="10" ry="9"
          fill="#5C2006"
          opacity="0.55"
        />

        {/* ── Gold saffron glaze highlight ── */}
        <ellipse
          cx="16" cy="12"
          rx="5.5" ry="6"
          fill="#E8A020"
          opacity="0.35"
          transform="rotate(-15 16 12)"
        />

        {/* ── Char grill marks ── */}
        <path
          d="M13 9 Q15 14 13 19"
          stroke="#3A1004"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M19 7 Q21 13 19 20"
          stroke="#3A1004"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M25 9 Q27 14 25 19"
          stroke="#3A1004"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* ── Spice dots (saffron/masala) ── */}
        <circle cx="17" cy="15" r="1.2" fill="#C9A84C" opacity="0.8" />
        <circle cx="23" cy="18" r="1" fill="#E8A020" opacity="0.7" />
        <circle cx="20" cy="22" r="0.9" fill="#C9A84C" opacity="0.6" />
        <circle cx="26" cy="14" r="0.8" fill="#E8A020" opacity="0.5" />

        {/* ── Meat-bone join collar ── */}
        <ellipse
          cx="21" cy="28"
          rx="5.5" ry="3"
          fill="#6B2808"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  )
}
