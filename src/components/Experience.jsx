import { useReveal } from '../hooks/useReveal'

const pillars = [
  {
    icon: '✦',
    title: 'Atmosphere First',
    desc: 'Dark, warm, and deliberately calm. Our space is designed to let you breathe — away from the noise, into the moment.',
  },
  {
    icon: '◈',
    title: 'Relaxed Dining',
    desc: 'Freshly prepared meals worth every second of anticipation. We don\'t rush perfection — and neither should you.',
  },
  {
    icon: '◉',
    title: 'Global & Local',
    desc: 'A menu that speaks to every palate — beloved by Mwanza locals and international guests alike.',
  },
  {
    icon: '◇',
    title: 'Attentive Service',
    desc: 'Our team is here when you need us and gracefully out of the way when you don\'t. Presence without intrusion.',
  },
]

const badges = [
  { stat: '4.4★', label: 'Google Rating' },
  { stat: '37+', label: 'Guest Reviews' },
  { stat: '3+', label: 'Years of Excellence' },
  { stat: 'TZS 10K+', label: 'Starting From' },
]

export default function Experience() {
  const ref = useReveal()

  return (
    <section id="experience" className="py-28 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/8 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="reveal max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-gold-500/40" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400/70">The Experience</p>
            <div className="w-6 h-px bg-gold-500/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-100 mb-5 font-normal">
            More Than a Restaurant.
            <br />
            <em className="text-gradient-gold not-italic">A Destination.</em>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto" />
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="glass-card p-8 hover:border-gold-500/40 rounded-sm transition-all duration-500 group cursor-default"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Icon */}
              <div className="text-gold-400/80 text-xl mb-6 group-hover:text-gold-400 group-hover:scale-110 transition-all duration-300 inline-block">
                {p.icon}
              </div>

              {/* Thin top accent line */}
              <div className="w-8 h-px bg-gold-500/20 group-hover:bg-gold-500/50 transition-colors duration-300 mb-5" />

              <h3 className="font-serif text-lg text-stone-100 mb-3 font-normal group-hover:text-gradient-gold transition-all duration-300">
                {p.title}
              </h3>
              <p className="font-sans font-light text-sm text-stone-500 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="border border-gold-500/10 rounded-sm p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((b, i) => (
              <div
                key={b.stat}
                className={`text-center py-2 ${i < badges.length - 1 ? 'lg:border-r border-gold-500/10' : ''}`}
              >
                <div className="font-serif text-3xl text-gradient-gold mb-1 font-normal">{b.stat}</div>
                <div className="font-sans text-[10px] text-stone-500 tracking-[0.2em] uppercase">{b.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
