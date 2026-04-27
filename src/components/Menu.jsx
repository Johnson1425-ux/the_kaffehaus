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
    emoji: '🥩',
    featured: true,
  },
  {
    name: 'Tanzanian Coastal Stew',
    category: 'Local',
    tag: 'Local Classic',
    desc: 'Fresh catch of the day, slow-cooked in coconut milk with fragrant coastal spices.',
    price: 'TZS 22,000',
    note: 'Loved by regulars',
    emoji: '🍲',
  },
  {
    name: 'Signature Cold Brew',
    category: 'Beverages',
    tag: 'Beverages',
    desc: 'House-crafted cold brew, steeped 18 hours for a smooth, velvety depth.',
    price: 'TZS 10,000',
    note: 'Premium without the price',
    emoji: '☕',
  },
  {
    name: 'The Kaffeehaus Brunch Board',
    category: 'Brunch',
    tag: 'Brunch',
    desc: 'A curated spread of house-baked bread, seasonal fruits, artisan cheeses and preserves.',
    price: 'TZS 28,000',
    note: 'Perfect for groups',
    emoji: '🧀',
  },
  {
    name: 'Pilau ya Nyama',
    category: 'Local',
    tag: 'Local Favourite',
    desc: 'Fragrant spiced rice with slow-braised meat — a beloved Tanzanian classic elevated.',
    price: 'TZS 18,000',
    note: 'Most ordered dish',
    emoji: '🍛',
    featured: true,
  },
  {
    name: 'Dark Chocolate Mousse',
    category: 'Dessert',
    tag: 'Dessert',
    desc: 'Velvety Belgian chocolate mousse with a hint of cardamom and gold leaf garnish.',
    price: 'TZS 14,000',
    note: 'Worth saving room for',
    emoji: '🍫',
  },
]

export default function Menu() {
  const ref = useReveal()
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? dishes : dishes.filter((d) => d.category === active)

  return (
    <section id="menu" className="py-28 px-6 relative bg-gradient-to-b from-transparent via-[#0f0e08]/60 to-transparent">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/8 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="reveal max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-gold-500/40" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400/70">Signature Dishes</p>
            <div className="w-6 h-px bg-gold-500/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-100 mb-5 font-normal">
            Crafted to <em className="text-gradient-gold not-italic">Captivate</em>
          </h2>
          <p className="font-sans font-light text-stone-500 max-w-sm mx-auto text-sm leading-relaxed">
            Every plate is a conversation between tradition and refinement. Freshly prepared — worth the wait.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto mt-6" />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 rounded-sm ${
                active === cat
                  ? 'border-gold-500 text-gold-400 bg-gold-500/8'
                  : 'border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d) => (
            <div
              key={d.name}
              className={`glass-card p-7 group hover:border-gold-500/35 rounded-sm transition-all duration-500 flex flex-col relative overflow-hidden ${
                d.featured ? 'border-gold-500/20' : ''
              }`}
            >
              {/* Featured badge */}
              {d.featured && (
                <div className="absolute top-0 right-0 bg-gold-500/10 border-l border-b border-gold-500/20 px-3 py-1">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-gold-400/80">Popular</span>
                </div>
              )}

              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{d.emoji}</span>
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gold-400/60 border border-gold-500/15 px-2 py-1 rounded-sm">
                  {d.tag}
                </span>
              </div>

              <h3 className="font-serif text-xl text-stone-100 mb-2 font-normal group-hover:text-gradient-gold transition-all duration-300">
                {d.name}
              </h3>
              <p className="font-sans font-light text-sm text-stone-500 leading-relaxed flex-1 mb-6">
                {d.desc}
              </p>

              <div className="flex items-center justify-between border-t border-gold-500/8 pt-4">
                <span className="font-serif text-xl text-gradient-gold">{d.price}</span>
                <span className="font-sans text-xs text-stone-600 italic">{d.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="font-sans text-sm text-stone-500 mb-5 font-light">
            Full menu available in-house · Cash &amp; mobile payments accepted
          </p>
          <button
            onClick={() => {
              const el = document.querySelector('#reserve')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-block px-8 py-3.5 border border-gold-500/40 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-charcoal-900 hover:border-gold-500 rounded-sm transition-all duration-300"
          >
            Book Your Table
          </button>
        </div>

      </div>
    </section>
  )
}
