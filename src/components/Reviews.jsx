import { useReveal } from '../hooks/useReveal'

const reviews = [
  {
    name: 'Amani K.',
    origin: 'Dar es Salaam',
    stars: 5,
    text: 'The atmosphere is like nothing else in the city. Dark, warm, intentional. I came for coffee and stayed for three hours. Worth every shilling.',
  },
  {
    name: 'Sophie M.',
    origin: 'London, UK',
    stars: 5,
    text: 'I was blown away — the food was extraordinary and the price? Genuinely surprising for this level of experience. Already planning my return.',
  },
  {
    name: 'David T.',
    origin: 'Nairobi, Kenya',
    stars: 5,
    text: 'Brought my whole team for dinner. The setting made it feel like a special occasion without breaking the budget. This place gets it right.',
  },
  {
    name: 'Fatuma A.',
    origin: 'Zanzibar',
    stars: 5,
    text: 'The stew was freshly made and absolutely worth the wait. Attentive staff, beautiful space. A hidden gem that deserves to be known.',
  },
]

export default function Reviews() {
  const ref = useReveal()

  return (
    <section id="reviews" className="py-28 px-6 relative bg-gradient-to-b from-transparent via-[#0d0c07]/80 to-transparent">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="reveal max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-gold-500/40" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400/70">What Guests Say</p>
            <div className="w-6 h-px bg-gold-500/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-100 mb-5 font-normal">
            Trusted by Locals,
            <br />
            <em className="text-gradient-gold not-italic">Loved by the World</em>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto" />
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="glass-card p-8 hover:border-gold-500/30 rounded-sm transition-all duration-500 flex flex-col group"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: r.stars }).map((_, idx) => (
                  <span key={idx} className="text-gold-400 text-xs">★</span>
                ))}
              </div>

              {/* Opening quote mark */}
              <div className="font-serif text-5xl text-gold-500/15 leading-none mb-2 -mt-2 select-none">"</div>

              {/* Quote */}
              <p className="font-serif italic text-stone-300 text-base leading-relaxed mb-6 flex-1">
                {r.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gold-500/8 pt-5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-600/30 to-amber-900/30 flex items-center justify-center text-gold-400 font-serif text-sm font-semibold border border-gold-500/20 flex-shrink-0">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-sans text-sm text-stone-200 font-medium">{r.name}</div>
                  <div className="font-sans text-xs text-stone-600 tracking-wider">{r.origin}</div>
                </div>
                <div className="ml-auto">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.stars }).map((_, idx) => (
                      <span key={idx} className="text-gold-400/40 text-[9px]">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="border border-gold-500/12 rounded-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gold-500/10">
            <div className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-red-950/40 border border-red-900/30 font-sans text-sm text-red-300 font-bold tracking-wider">
                  🔴 M-PESA
                </span>
                <span className="font-sans text-sm text-stone-500">+ Cash</span>
              </div>
              <p className="font-sans text-[10px] text-stone-600 tracking-[0.2em] uppercase">Payments Accepted</p>
            </div>
            <div className="p-8 text-center">
              <div className="font-serif text-2xl text-gradient-gold mb-2 font-normal">Freshly Prepared</div>
              <p className="font-sans text-[10px] text-stone-600 tracking-[0.2em] uppercase">Every Meal, Every Time</p>
            </div>
            <div className="p-8 text-center">
              <div className="font-serif text-2xl text-gradient-gold mb-2 font-normal">Groups Welcome</div>
              <p className="font-sans text-[10px] text-stone-600 tracking-[0.2em] uppercase">Private Tables Available</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
