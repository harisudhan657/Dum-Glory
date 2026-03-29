import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const MENU_ITEMS = [
  // Biryani
  { id: 1, name: 'Hyderabadi Dum Chicken Biryani', desc: 'Slow-cooked chicken with aged basmati and whole spices', price: '₹349', category: 'Biryani', bestseller: true, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=75' },
  { id: 2, name: 'Mutton Dum Biryani', desc: 'Tender mutton slow-braised with royal Mughal spice blend', price: '₹449', category: 'Biryani', bestseller: true, img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=75' },
  { id: 3, name: 'Prawn Biryani', desc: 'Coastal-style prawns with aromatic saffron basmati', price: '₹499', category: 'Biryani', img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=75' },
  { id: 4, name: 'Paneer Biryani', desc: 'Silken paneer, caramelised onions, and fragrant dum rice', price: '₹299', category: 'Biryani', veg: true, img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=75' },

  // Starters
  { id: 5, name: 'Seekh Kebab', desc: 'Minced lamb on skewers, chargrilled over live coal', price: '₹249', category: 'Starters', bestseller: true, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=75' },
  { id: 6, name: 'Shammi Kebab', desc: 'Slow-cooked minced beef kebabs with mint chutney', price: '₹199', category: 'Starters', img: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=75' },

  // Breads
  { id: 7, name: 'Sheermal', desc: 'Saffron flatbread baked in the tandoor, mildly sweet', price: '₹79', category: 'Breads', veg: true, img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=75' },

  // Desserts
  { id: 8, name: 'Double Ka Meetha', desc: 'Hyderabadi bread pudding drenched in saffron milk', price: '₹149', category: 'Desserts', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=75' },
  { id: 9, name: 'Shahi Tukda', desc: 'Royal fried bread soaked in reduced rabri and nuts', price: '₹179', category: 'Desserts', bestseller: true, img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&q=75' },

  // Drinks
  { id: 10, name: 'Rose Sharbat', desc: 'Chilled rose-petal cordial with basil seeds', price: '₹99', category: 'Drinks', veg: true, img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=500&q=75' },
  { id: 11, name: 'Masala Chai', desc: 'Spiced Darjeeling tea steeped with cardamom and ginger', price: '₹69', category: 'Drinks', veg: true, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=75' },
]

const TABS = ['All', 'Biryani', 'Starters', 'Breads', 'Desserts', 'Drinks']

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function MenuCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      className="menu-card"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      custom={index}
      aria-label={item.name}
      id={`menu-card-${item.id}`}
    >
      <div className="menu-card-img">
        <img src={item.img} alt={item.name} loading="lazy" />
        <div className="menu-card-overlay" aria-hidden="true" />
        {item.bestseller && <span className="bestseller-badge" aria-label="Bestseller">Bestseller</span>}
        <div className="menu-card-hover" aria-hidden="true">Add to Order →</div>
      </div>
      <div className="menu-card-body">
        <h3 className="menu-card-name">{item.name}</h3>
        <p className="menu-card-desc">{item.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="menu-card-price">{item.price}</span>
          {item.veg && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: '0.65rem', color: '#4CAF50', fontFamily: 'var(--font-accent)',
              letterSpacing: '0.1em', border: '1px solid #4CAF5040', padding: '3px 8px', borderRadius: '50px',
            }}>
              🌿 Veg
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('All')
  const filtered = activeTab === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === activeTab)

  return (
    <section className="menu-section" id="menu" aria-label="Restaurant menu">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="accent-label">Culinary Journey</span>
          <div className="gold-divider" aria-hidden="true" />
          <h2>The Royal Menu</h2>
        </motion.div>

        <div className="menu-tabs" role="tablist" aria-label="Menu categories">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`menu-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              id={`menu-tab-${tab.toLowerCase()}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="menu-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="tabpanel"
          >
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
