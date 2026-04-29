import mpesaLogo from '../assets/images/mpesa_logo.png'
import yasLogo from '../assets/images/mixx_by_yas.png'
import airtelMoneyLogo from '../assets/images/airtelmoney.png'

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer style={{ background: '#2a1c0b', color: '#c4a882' }}>

      {/* Top ornate border */}
      <div style={{
        height: '4px',
        background: 'linear-gradient(to right, #2a1c0b, #9a7a3a 25%, #c9a84c 50%, #9a7a3a 75%, #2a1c0b)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>

        {/* Top divider with ornament */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(154,122,58,0.25)' }} />
          <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1rem', color: 'rgba(154,122,58,0.5)', letterSpacing: '0.2em' }}>
            ❧ ✦ ❧
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(154,122,58,0.25)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-2">
            <div style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.5rem',
              fontWeight: 300,
              letterSpacing: '0.15em',
              color: '#c9a84c',
              marginBottom: '0.25rem',
            }}>
              The Kaffeehaus
            </div>
            <div style={{
              fontFamily: '"Libre Baskerville", Georgia, serif',
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(154,122,58,0.6)',
              marginBottom: '1.25rem',
            }}>
              & Restaurant · Est. Mwanza
            </div>

            <p style={{
              fontFamily: '"Crimson Text", Georgia, serif',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: 'rgba(196,168,130,0.6)',
              lineHeight: 1.7,
              maxWidth: '320px',
              marginBottom: '1.5rem',
            }}>
              A sanctuary of flavour and atmosphere in the heart of Mwanza. Premium experience without premium pretension.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { name: 'Instagram', href: 'https://instagram.com/thekaffeehaustz' },
                { name: 'Tiktok', href: 'https://tiktok.com/@thekaffeehaustz' },
                { name: 'Piki', href: 'https://legacy.piki.co.tz/the_kaffeehaus_restaurant' }
              ].map((s) => (
                <a
                  key={s}
                  href={s.href}
                  style={{
                    fontFamily: '"Libre Baskerville", Georgia, serif',
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(196,168,130,0.5)',
                    border: '1px solid rgba(154,122,58,0.2)',
                    padding: '0.4rem 0.75rem',
                    textDecoration: 'none',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#c9a84c'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(196,168,130,0.5)'; e.currentTarget.style.borderColor = 'rgba(154,122,58,0.2)' }}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{
              fontFamily: '"Libre Baskerville", Georgia, serif',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#9a7a3a',
              marginBottom: '1.25rem',
            }}>
              Opening Hours
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                ['Mon – Fri', '07:00 – 23:00'],
                ['Saturday', '08:00 – 00:00'],
                ['Sunday', '09:00 – 22:00'],
              ].map(([day, hours]) => (
                <li key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', color: 'rgba(196,168,130,0.5)' }}>{day}</span>
                  <span style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', color: 'rgba(196,168,130,0.8)' }}>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: '"Libre Baskerville", Georgia, serif',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#9a7a3a',
              marginBottom: '1.25rem',
            }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '◉', content: 'Kirumba, Mwanza\nTanzania' },
                { icon: '◎', content: '+255 792 975 601', href: 'tel:+255792975601' },
                { icon: '◈', content: 'WhatsApp reservations available' },
                { icon: '◇', content: 'Cash & mobile money accepted' },
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: 'rgba(154,122,58,0.5)', fontSize: '0.7rem', marginTop: '3px', flexShrink: 0 }}>{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} style={{
                      fontFamily: '"Crimson Text", Georgia, serif',
                      fontSize: '1rem',
                      color: 'rgba(196,168,130,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(196,168,130,0.6)'}
                    >
                      {item.content}
                    </a>
                  ) : (
                    <span style={{
                      fontFamily: '"Crimson Text", Georgia, serif',
                      fontSize: '1rem',
                      color: 'rgba(196,168,130,0.6)',
                      whiteSpace: 'pre-line',
                    }}>
                      {item.content}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment strip */}
        <div style={{
          border: '1px solid rgba(154,122,58,0.15)',
          padding: '1.25rem 1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          position: 'relative',
        }}>
          {/* Inner inset line */}
          <div style={{
            position: 'absolute',
            inset: '4px',
            border: '1px solid rgba(154,122,58,0.06)',
            pointerEvents: 'none',
          }} />
          <p style={{
            fontFamily: '"Libre Baskerville", Georgia, serif',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(154,122,58,0.5)',
            margin: 0,
          }}>
            We Accept
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            {[
              { src: mpesaLogo, alt: 'M-Pesa' },
              { src: yasLogo, alt: 'Mixx by Yas' },
              { src: airtelMoneyLogo, alt: 'Airtel Money' },
            ].map(({ src, alt }) => (
              <div key={alt} style={{ padding: '0.5rem' }}>
                <img
                  src={src}
                  alt={alt}
                  style={{
                    height: '36px',
                    width: '36px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid rgba(154,122,58,0.3)',
                    display: 'block',
                  }}
                />
              </div>
            ))}
            <div style={{
              padding: '0.4rem 0.75rem',
              border: '1px solid rgba(154,122,58,0.2)',
              background: 'rgba(154,122,58,0.05)',
            }}>
              <span style={{
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(196,168,130,0.6)',
              }}>
                CASH (TZS)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom nav links */}
        <div style={{
          borderTop: '1px solid rgba(154,122,58,0.12)',
          paddingTop: '2rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
        }}>
          {[
            { label: 'Experience', href: '#experience' },
            { label: 'Menu', href: '#menu' },
            { label: 'Ambience', href: '#ambience' },
            { label: 'Reviews', href: '#reviews' },
            { label: 'Reserve', href: '#reserve' },
          ].map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(154,122,58,0.45)',
                transition: 'color 0.2s',
                padding: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(154,122,58,0.45)'}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(154,122,58,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <p style={{
            fontFamily: '"Crimson Text", Georgia, serif',
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: 'rgba(154,122,58,0.3)',
            margin: 0,
          }}>
            © {new Date().getFullYear()} The Kaffeehaus & Restaurant. All rights reserved.
          </p>
          <p style={{
            fontFamily: '"Libre Baskerville", Georgia, serif',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(154,122,58,0.25)',
            margin: 0,
          }}>
            Kirumba · Mwanza · Tanzania
          </p>
        </div>

      </div>
    </footer>
  )
}