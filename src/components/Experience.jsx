import { useReveal } from '../hooks/useReveal'

const pillars = [
  {
    numeral: 'I',
    title: 'Atmosphere First',
    desc: 'Warm, deliberate, and unhurried. Our space is designed to let you breathe — away from the noise, into the moment.',
  },
  {
    numeral: 'II',
    title: 'Relaxed Dining',
    desc: "Freshly prepared meals worth every second of anticipation. We don't rush perfection — and neither should you.",
  },
  {
    numeral: 'III',
    title: 'Global & Local',
    desc: 'A menu that speaks to every palate — beloved by Mwanza locals and international guests alike.',
  },
  {
    numeral: 'IV',
    title: 'Attentive Service',
    desc: 'Our team is present when you need us and gracefully absent when you do not. Presence without intrusion.',
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
    <section id="experience" className="py-28 px-6 relative" style={{ background: '#faf6ed' }}>
      {/* Top section divider */}
      <div className="section-divider max-w-4xl mx-auto mb-20" />

      <div ref={ref} className="reveal max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p style={{
            fontFamily: '"Libre Baskerville", Georgia, serif',
            fontSize: '0.62rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#9a7a3a',
            marginBottom: '1rem',
          }}>
            The Experience
          </p>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: '#2a1c0b',
            lineHeight: 1.15,
            marginBottom: '0.5rem',
          }}>
            More Than a Restaurant.
          </h2>
          <h2 style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontStyle: 'italic',
            color: '#6b4c23',
            marginBottom: '1.5rem',
          }}>
            A Destination.
          </h2>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #9a7a3a, transparent)', margin: '0 auto' }} />
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="card-classic p-8 group transition-all duration-500 cursor-default"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Roman numeral */}
              <div style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '2rem',
                fontWeight: 300,
                color: 'rgba(154,122,58,0.4)',
                lineHeight: 1,
                marginBottom: '1rem',
              }}>
                {p.numeral}
              </div>

              <div style={{ width: '24px', height: '1px', background: 'rgba(154,122,58,0.4)', marginBottom: '1rem' }} />

              <h3 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#3d2a12',
                marginBottom: '0.75rem',
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: '"Crimson Text", Georgia, serif',
                fontSize: '1.05rem',
                color: '#7d6640',
                lineHeight: 1.6,
              }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{
          border: '1px solid rgba(139,115,85,0.2)',
          background: '#f2ebda',
          position: 'relative',
        }}>
          {/* Inner rule */}
          <div style={{
            position: 'absolute',
            inset: '4px',
            border: '1px solid rgba(139,115,85,0.1)',
            pointerEvents: 'none',
          }} />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {badges.map((b, i) => (
              <div
                key={b.stat}
                className="text-center py-8 px-4"
                style={{
                  borderRight: i < badges.length - 1 ? '1px solid rgba(139,115,85,0.15)' : 'none',
                }}
              >
                <div style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '2.2rem',
                  fontWeight: 300,
                  color: '#6b4c23',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>
                  {b.stat}
                </div>
                <div style={{
                  fontFamily: '"Libre Baskerville", Georgia, serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#a08c6b',
                }}>
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="section-divider max-w-4xl mx-auto mt-20" />
    </section>
  )
}