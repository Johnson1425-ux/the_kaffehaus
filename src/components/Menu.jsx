import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const categories = ['All', 'Signature', 'Local', 'Brunch', 'Beverages', 'Dessert']

const dishes = [
  {
    name: 'Grilled Beef Tenderloin',
    category: 'Signature',
    tag: 'Signature',
    desc: 'Slow-seared to perfection, served with aromatic herbs and a rich reduction sauce.',
    price: 'TZS 35,000',
    note: "Chef's favourite",
    numeral: 'I',
    featured: true,
  },
  {
    name: 'Tanzanian Coastal Stew',
    category: 'Local',
    tag: 'Local Classic',
    desc: 'Fresh catch of the day, slow-cooked in coconut milk with fragrant coastal spices.',
    price: 'TZS 22,000',
    note: 'Loved by regulars',
    numeral: 'II',
  },
  {
    name: 'Signature Cold Brew',
    category: 'Beverages',
    tag: 'Beverages',
    desc: 'House-crafted cold brew, steeped 18 hours for a smooth, velvety depth.',
    price: 'TZS 10,000',
    note: 'Premium without the price',
    numeral: 'III',
  },
  {
    name: 'The Kaffeehaus Brunch Board',
    category: 'Brunch',
    tag: 'Brunch',
    desc: 'A curated spread of house-baked bread, seasonal fruits, artisan cheeses and preserves.',
    price: 'TZS 28,000',
    note: 'Perfect for groups',
    numeral: 'IV',
  },
  {
    name: 'Pilau ya Nyama',
    category: 'Local',
    tag: 'Local Favourite',
    desc: 'Fragrant spiced rice with slow-braised meat — a beloved Tanzanian classic elevated.',
    price: 'TZS 18,000',
    note: 'Most ordered dish',
    numeral: 'V',
    featured: true,
  },
  {
    name: 'Dark Chocolate Mousse',
    category: 'Dessert',
    tag: 'Dessert',
    desc: 'Velvety Belgian chocolate mousse with a hint of cardamom and gold leaf garnish.',
    price: 'TZS 14,000',
    note: 'Worth saving room for',
    numeral: 'VI',
  },
]

export default function Menu() {
  const ref = useReveal()
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? dishes : dishes.filter((d) => d.category === active)

  return (
    <section id="menu" className="py-28 px-6 relative" style={{ background: '#f2ebda' }}>
      <div ref={ref} className="reveal max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p style={{
            fontFamily: '"Libre Baskerville", Georgia, serif',
            fontSize: '0.62rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#9a7a3a',
            marginBottom: '1rem',
          }}>
            Signature Dishes
          </p>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: '#2a1c0b',
            marginBottom: '0.4rem',
          }}>
            Crafted to
          </h2>
          <h2 style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontStyle: 'italic',
            color: '#6b4c23',
            marginBottom: '1rem',
          }}>
            Captivate
          </h2>
          <p style={{
            fontFamily: '"Crimson Text", Georgia, serif',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: '#8b7355',
            maxWidth: '380px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
          }}>
            Every plate is a conversation between tradition and refinement. Freshly prepared — worth the wait.
          </p>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #9a7a3a, transparent)', margin: '0 auto' }} />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '0.5rem 1.25rem',
                border: active === cat ? '1px solid #6b4c23' : '1px solid rgba(139,115,85,0.3)',
                background: active === cat ? '#6b4c23' : 'transparent',
                color: active === cat ? '#faf6ed' : '#8b7355',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d, i) => (
            <div
              key={d.name}
              className="card-classic p-7 flex flex-col relative transition-all duration-300"
              style={{
                border: d.featured ? '1px solid rgba(154,122,58,0.4)' : undefined,
                animationDelay: `${i * 50}ms`,
              }}
            >
              {/* Featured ribbon */}
              {d.featured && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: 'rgba(107,76,35,0.08)',
                  borderLeft: '1px solid rgba(154,122,58,0.3)',
                  borderBottom: '1px solid rgba(154,122,58,0.3)',
                  padding: '0.2rem 0.75rem',
                }}>
                  <span style={{
                    fontFamily: '"Libre Baskerville", Georgia, serif',
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#9a7a3a',
                  }}>Popular</span>
                </div>
              )}

              <div className="flex items-start justify-between mb-5">
                <span style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.8rem',
                  fontWeight: 300,
                  color: 'rgba(154,122,58,0.35)',
                  lineHeight: 1,
                }}>
                  {d.numeral}
                </span>
                <span style={{
                  fontFamily: '"Libre Baskerville", Georgia, serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#9a7a3a',
                  border: '1px solid rgba(154,122,58,0.3)',
                  padding: '0.2rem 0.6rem',
                }}>
                  {d.tag}
                </span>
              </div>

              <div style={{ width: '24px', height: '1px', background: 'rgba(154,122,58,0.35)', marginBottom: '0.75rem' }} />

              <h3 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#2a1c0b',
                marginBottom: '0.5rem',
              }}>
                {d.name}
              </h3>
              <p style={{
                fontFamily: '"Crimson Text", Georgia, serif',
                fontSize: '1.05rem',
                color: '#7d6640',
                lineHeight: 1.6,
                flex: 1,
                marginBottom: '1.5rem',
              }}>
                {d.desc}
              </p>

              <div
                className="flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(139,115,85,0.15)', paddingTop: '1rem' }}
              >
                <span style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.4rem',
                  fontWeight: 500,
                  color: '#6b4c23',
                }}>
                  {d.price}
                </span>
                <span style={{
                  fontFamily: '"Crimson Text", Georgia, serif',
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                  color: '#a08c6b',
                }}>
                  {d.note}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p style={{
            fontFamily: '"Crimson Text", Georgia, serif',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: '#a08c6b',
            marginBottom: '1.25rem',
          }}>
            Full menu available in-house · Cash &amp; mobile payments accepted
          </p>
          <button
            onClick={() => {
              const el = document.querySelector('#reserve')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-outline px-10 py-3.5"
          >
            Book Your Table
          </button>
        </div>

      </div>
    </section>
  )
}