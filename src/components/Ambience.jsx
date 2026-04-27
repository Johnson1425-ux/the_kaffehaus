import { useReveal } from '../hooks/useReveal'
import signatureDish from '../assets/images/signature_dish.jpg'
import interiorDesign from '../assets/images/interior_design.jpg'
import moreInterior from '../assets/images/more_interior.jpg'
import vegetablePizza from '../assets/images/vegetable_pizza.jpg'
import coffee from '../assets/images/coffee.png'

const moods = [
  {
    time: 'Morning',
    label: '07:00 – 11:00',
    desc: 'Start your day with artisan coffee, fresh pastries, and the gentlest morning light.',
    color: 'from-amber-900/20 to-transparent',
    accent: 'text-amber-400/60',
  },
  {
    time: 'Brunch',
    label: '11:00 – 15:00',
    desc: 'Leisurely weekend spreads, group tables, and the buzz of great conversations.',
    color: 'from-orange-900/20 to-transparent',
    accent: 'text-orange-400/60',
  },
  {
    time: 'Dinner',
    label: '18:00 – 23:00',
    desc: 'When the lights dim and the atmosphere deepens — our most captivating hour.',
    color: 'from-rose-900/20 to-transparent',
    accent: 'text-rose-400/60',
  },
]

const photos = [
  { img: interiorDesign, label: 'Dark Luxury Interior', span: 'md:col-span-2 md:row-span-2', tall: true },
  { img: vegetablePizza, label: 'Warm Table Setting', span: '' },
  { img: coffee, label: 'Coffee Craft', span: '' },
  { img: signatureDish, label: 'Signature Dish', span: '' },
  { img: moreInterior, label: 'Evening Atmosphere', span: '' },
]

export default function Ambience() {
  const ref = useReveal()

  return (
    <section id="ambience" className="py-28 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-950/20 rounded-full blur-[180px]" />
      </div>

      <div ref={ref} className="reveal max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-gold-500/40" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400/70">The Ambience</p>
            <div className="w-6 h-px bg-gold-500/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-100 mb-5 font-normal">
            Every Hour Has
            <br />
            <em className="text-gradient-gold not-italic">Its Own Mood</em>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto" />
        </div>

        {/* Time-of-day cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {moods.map((m) => (
            <div
              key={m.time}
              className={`glass-card p-10 bg-gradient-to-br ${m.color} group hover:border-gold-500/35 rounded-sm transition-all duration-500 cursor-default`}
            >
              <div className={`font-sans text-[10px] tracking-[0.3em] uppercase ${m.accent} mb-3`}>{m.label}</div>
              <h3 className="font-serif text-3xl text-stone-100 mb-4 font-normal group-hover:text-gradient-gold transition-all duration-300">
                {m.time}
              </h3>
              <div className="w-8 h-px bg-gold-500/20 group-hover:bg-gold-500/50 transition-colors duration-300 mb-4" />
              <p className="font-sans font-light text-sm text-stone-500 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {photos.map((box, i) => (
            <div
              key={i}
              className={`relative bg-stone-950 ${box.span} overflow-hidden group cursor-pointer border border-gold-500/8 hover:border-gold-500/30 transition-all duration-500`}
              style={{ minHeight: i === 0 ? '300px' : '140px', aspectRatio: i !== 0 ? '1/1' : undefined }}
            >
              {/* Photo */}
              <img
                src={box.img}
                alt={box.label}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/20 to-transparent" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-sans text-xs text-stone-300 tracking-wider group-hover:text-gold-400 transition-colors duration-300">
                  {box.label}
                </span>
              </div>

              {/* Corner accent */}
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold-500/0 group-hover:border-gold-500/50 transition-all duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
