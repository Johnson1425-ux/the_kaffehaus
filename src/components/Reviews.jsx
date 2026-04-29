import { useReveal } from '../hooks/useReveal'

const reviews = [
  {
    name: 'Amani K.',
    origin: 'Dar es Salaam',
    stars: 5,
    text: 'The atmosphere is like nothing else in the city. Warm, intentional, unhurried. I came for coffee and stayed for three hours. Worth every shilling.',
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
    <section id="reviews" className="py-28 px-6 relative" style={{ background: '#f2ebda' }}>

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
            What Guests Say
          </p>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: '#2a1c0b',
            marginBottom: '0.4rem',
          }}>
            Trusted by Locals,
          </h2>
          <h2 style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontStyle: 'italic',
            color: '#6b4c23',
            marginBottom: '1.5rem',
          }}>
            Loved by the World
          </h2>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #9a7a3a, transparent)', margin: '0 auto' }} />
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="card-classic p-8 flex flex-col"
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1.25rem' }}>
                {Array.from({ length: r.stars }).map((_, idx) => (
                  <span key={idx} style={{ color: '#9a7a3a', fontSize: '0.8rem' }}>★</span>
                ))}
              </div>

              {/* Large opening quote — vintage style */}
              <div style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '5rem',
                color: 'rgba(154,122,58,0.15)',
                lineHeight: 0.7,
                marginBottom: '0.5rem',
                userSelect: 'none',
              }}>
                "
              </div>

              {/* Quote text */}
              <p style={{
                fontFamily: '"Crimson Text", Georgia, serif',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: '#3d2a12',
                lineHeight: 1.7,
                flex: 1,
                marginBottom: '1.5rem',
              }}>
                {r.text}
              </p>

              {/* Closing flourish */}
              <div style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to right, rgba(154,122,58,0.4), transparent)',
                marginBottom: '1rem',
              }} />

              {/* Author */}
              <div style={{
                borderTop: '1px solid rgba(139,115,85,0.15)',
                paddingTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                {/* Initials circle — vintage stamp style */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(154,122,58,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  background: 'rgba(154,122,58,0.06)',
                }}>
                  <span style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#9a7a3a',
                  }}>
                    {r.name[0]}
                  </span>
                </div>
                <div>
                  <div style={{
                    fontFamily: '"Libre Baskerville", Georgia, serif',
                    fontSize: '0.75rem',
                    color: '#3d2a12',
                    fontWeight: 700,
                  }}>
                    {r.name}
                  </div>
                  <div style={{
                    fontFamily: '"Crimson Text", Georgia, serif',
                    fontSize: '0.9rem',
                    color: '#a08c6b',
                    fontStyle: 'italic',
                  }}>
                    {r.origin}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div style={{
          border: '1px solid rgba(139,115,85,0.2)',
          background: '#faf6ed',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            inset: '4px',
            border: '1px solid rgba(139,115,85,0.1)',
            pointerEvents: 'none',
          }} />
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { heading: 'M-Pesa & Cash', sub: 'Payments Accepted' },
              { heading: 'Freshly Prepared', sub: 'Every Meal, Every Time' },
              { heading: 'Groups Welcome', sub: 'Private Tables Available' },
            ].map((item, i) => (
              <div
                key={item.heading}
                className="text-center py-8 px-6"
                style={{
                  borderRight: i < 2 ? '1px solid rgba(139,115,85,0.15)' : 'none',
                  borderBottom: '0',
                }}
              >
                <div style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#6b4c23',
                  marginBottom: '0.4rem',
                }}>
                  {item.heading}
                </div>
                <div style={{
                  fontFamily: '"Libre Baskerville", Georgia, serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#a08c6b',
                }}>
                  {item.sub}
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