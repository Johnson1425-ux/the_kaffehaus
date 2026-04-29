import { useReveal } from '../hooks/useReveal'
import signatureDish from '../assets/images/signature_dish.jpg'
import interiorDesign from '../assets/images/interior_design.jpg'
import moreInterior from '../assets/images/more_interior.jpg'
import vegetablePizza from '../assets/images/vegetable_pizza.jpg'
import coffee from '../assets/images/coffee.png'

const moods = [
  {
    time: 'Morning',
    numeral: 'I',
    label: '07:00 – 11:00',
    desc: 'Start your day with artisan coffee, fresh pastries, and the gentlest morning light.',
  },
  {
    time: 'Brunch',
    numeral: 'II',
    label: '11:00 – 15:00',
    desc: 'Leisurely weekend spreads, group tables, and the buzz of great conversations.',
  },
  {
    time: 'Dinner',
    numeral: 'III',
    label: '18:00 – 23:00',
    desc: 'When the candles are lit and the atmosphere deepens — our most captivating hour.',
  },
]

const photos = [
  { img: interiorDesign, label: 'The Interior', span: 'md:col-span-2 md:row-span-2', tall: true },
  { img: vegetablePizza, label: 'Warm Table Setting', span: '' },
  { img: coffee, label: 'Coffee Craft', span: '' },
  { img: signatureDish, label: 'Signature Dish', span: '' },
  { img: moreInterior, label: 'Evening Atmosphere', span: '' },
]

export default function Ambience() {
  const ref = useReveal()

  return (
    <section id="ambience" className="py-28 px-6 relative" style={{ background: '#faf6ed' }}>

      {/* Top divider */}
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
            The Ambience
          </p>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: '#2a1c0b',
            marginBottom: '0.4rem',
          }}>
            Every Hour Has
          </h2>
          <h2 style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontStyle: 'italic',
            color: '#6b4c23',
            marginBottom: '1.5rem',
          }}>
            Its Own Mood
          </h2>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #9a7a3a, transparent)', margin: '0 auto' }} />
        </div>

        {/* Time-of-day cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {moods.map((m) => (
            <div
              key={m.time}
              className="card-classic p-10 cursor-default transition-all duration-400 group"
            >
              <div style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '2.5rem',
                fontWeight: 300,
                color: 'rgba(154,122,58,0.25)',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}>
                {m.numeral}
              </div>

              <p style={{
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#a08c6b',
                marginBottom: '0.75rem',
              }}>
                {m.label}
              </p>

              <h3 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.8rem',
                fontWeight: 400,
                color: '#3d2a12',
                marginBottom: '0.5rem',
              }}>
                {m.time}
              </h3>

              <div style={{ width: '24px', height: '1px', background: 'rgba(154,122,58,0.4)', marginBottom: '0.75rem' }} />

              <p style={{
                fontFamily: '"Crimson Text", Georgia, serif',
                fontSize: '1.05rem',
                color: '#7d6640',
                lineHeight: 1.6,
              }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {photos.map((box, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group cursor-pointer ${box.span}`}
              style={{
                minHeight: i === 0 ? '300px' : '140px',
                aspectRatio: i !== 0 ? '1/1' : undefined,
                border: '1px solid rgba(139,115,85,0.2)',
              }}
            >
              <img
                src={box.img}
                alt={box.label}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                style={{ opacity: 0.88, transform: 'scale(1.0)' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.0)' }}
              />
              {/* Vintage sepia overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(61,42,18,0.65) 0%, rgba(61,42,18,0.1) 50%, transparent 100%)', mixBlendMode: 'multiply' }}
              />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span style={{
                  fontFamily: '"Libre Baskerville", Georgia, serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,246,237,0.85)',
                }}>
                  {box.label}
                </span>
              </div>
              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '12px',
                height: '12px',
                borderTop: '1px solid rgba(196,168,130,0.5)',
                borderRight: '1px solid rgba(196,168,130,0.5)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                width: '12px',
                height: '12px',
                borderBottom: '1px solid rgba(196,168,130,0.5)',
                borderLeft: '1px solid rgba(196,168,130,0.5)',
              }} />
            </div>
          ))}
        </div>

      </div>

      <div className="section-divider max-w-4xl mx-auto mt-20" />
    </section>
  )
}