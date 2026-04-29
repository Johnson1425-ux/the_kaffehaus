import { useEffect, useState } from 'react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f2ebda 0%, #faf6ed 40%, #f2ebda 100%)' }}
    >
      {/* Radial warm glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(196,168,130,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Vintage cross-hatch pattern — top & bottom */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(139,115,85,0.12) 20px),
                            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(139,115,85,0.08) 20px)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(139,115,85,0.12) 20px),
                            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(139,115,85,0.08) 20px)`,
        }}
      />

      {/* Top ornate border rule */}
      <div className="absolute top-20 left-0 right-0 flex items-center justify-center pointer-events-none px-12">
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(139,115,85,0.3))' }} />
        <div style={{ margin: '0 1.5rem', color: 'rgba(139,115,85,0.5)', fontSize: '0.7rem', fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
          ❧ Est. Mwanza ❧
        </div>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(139,115,85,0.3))' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">

        {/* Eyebrow label */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease 0.1s',
          }}
        >
          <p style={{
            fontFamily: '"Libre Baskerville", Georgia, serif',
            fontSize: '0.62rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#9a7a3a',
            marginBottom: '1.5rem',
          }}>
            A Classic Coffeehouse & Restaurant · Kirumba, Mwanza
          </p>
        </div>

        {/* Masthead */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.7s ease 0.2s',
          }}
        >
          {/* Top rule */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(154,122,58,0.5))' }} />
            <span style={{ color: 'rgba(154,122,58,0.7)', fontSize: '0.6rem', fontFamily: '"Cormorant Garamond", Georgia, serif', letterSpacing: '0.1em' }}>✦ ✦ ✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(154,122,58,0.5))' }} />
          </div>

          <h1 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 1.0,
            color: '#2a1c0b',
            letterSpacing: '-0.01em',
            marginBottom: '0.5rem',
          }}>
            Where Every Meal
          </h1>
          <h1 style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#6b4c23',
            letterSpacing: '0.01em',
            marginBottom: '1.5rem',
          }}>
            Becomes a Memory
          </h1>

          {/* Bottom rule */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(154,122,58,0.5))' }} />
            <span style={{ color: 'rgba(154,122,58,0.7)', fontSize: '0.6rem', fontFamily: '"Cormorant Garamond", Georgia, serif', letterSpacing: '0.1em' }}>✦ ✦ ✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(154,122,58,0.5))' }} />
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.7s ease 0.35s',
          }}
        >
          <p style={{
            fontFamily: '"Crimson Text", Georgia, serif',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: '#8b7355',
            maxWidth: '520px',
            margin: '0 auto 0.75rem',
            lineHeight: 1.7,
          }}>
            A sanctuary of flavour and atmosphere — from morning coffee to candlelit dinners, crafted for those who appreciate the finer things.
          </p>
          <p style={{
            fontFamily: '"Libre Baskerville", Georgia, serif',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#9a7a3a',
            marginBottom: '2.5rem',
          }}>
            Premium Experience · From TZS 10,000
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.7s ease 0.45s',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          <button
            onClick={() => scrollTo('#reserve')}
            className="btn-primary px-10 py-4"
          >
            Reserve Your Table
          </button>
          <button
            onClick={() => scrollTo('#menu')}
            className="btn-outline px-10 py-4"
          >
            View Menu
          </button>
        </div>

        {/* Live indicator */}
        <div style={{
          opacity: loaded ? 0.8 : 0,
          transition: 'opacity 0.7s ease 0.6s',
        }}>
          <p style={{
            fontFamily: '"Libre Baskerville", Georgia, serif',
            fontSize: '0.65rem',
            color: '#a08c6b',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%', background: '#5a8a3a',
              display: 'inline-block', animation: 'pulse 2s infinite',
            }} />
            Limited seating during peak hours — book ahead to secure your table
          </p>
        </div>
      </div>

      {/* Bottom decorative ornament */}
      <div
        className="absolute bottom-12 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)', opacity: loaded ? 0.4 : 0, transition: 'opacity 1s ease 0.8s' }}
      >
        <span style={{
          fontFamily: '"Libre Baskerville", Georgia, serif',
          fontSize: '0.55rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#8b7355',
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, rgba(154,122,58,0.6), transparent)',
          animation: 'pulse 2s ease infinite',
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}