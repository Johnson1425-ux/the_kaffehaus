import { useState, useEffect } from 'react'
import logo from '../assets/images/logo.JPG'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const links = [
    { label: 'Experience', href: '#experience' },
    { label: 'Menu', href: '#menu' },
    { label: 'Ambience', href: '#ambience' },
    { label: 'Reviews', href: '#reviews' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = ['experience', 'menu', 'ambience', 'reviews', 'reserve']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav
        style={{
          backgroundColor: scrolled ? 'rgba(250,246,237,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(139,115,85,0.25)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 24px rgba(61,42,18,0.08)' : 'none',
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4"
      >
        {/* Top decorative rule — only when scrolled */}
        {scrolled && (
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(154,122,58,0.4), transparent)' }} />
        )}

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => scrollTo(e, 'body')} className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="The Kaffeehaus"
              className="h-9 w-9 rounded-full object-cover transition-all duration-300"
              style={{ border: '2px solid rgba(154,122,58,0.5)' }}
            />
            <div className="flex flex-col leading-none">
              <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.15rem', letterSpacing: '0.12em', color: '#3d2a12', fontWeight: 600 }}>
                The Kaffeehaus
              </span>
              <span style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: '0.55rem', letterSpacing: '0.3em', color: '#8b7355', textTransform: 'uppercase', marginTop: '1px' }}>
                & Restaurant
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const isActive = activeSection === l.href.replace('#', '')
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  style={{
                    fontFamily: '"Libre Baskerville", Georgia, serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: isActive ? '#6b4c23' : '#8b7355',
                    borderBottom: isActive ? '1px solid #9a7a3a' : '1px solid transparent',
                    paddingBottom: '2px',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                  }}
                >
                  {l.label}
                </a>
              )
            })}
            <a
              href="#reserve"
              onClick={(e) => scrollTo(e, '#reserve')}
              className="btn-primary px-6 py-2.5 ml-2"
              style={{ textDecoration: 'none' }}
            >
              Reserve
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ background: '#6b4c23', height: '1px', width: '24px', display: 'block', transition: 'all 0.3s', transformOrigin: 'center', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ background: '#6b4c23', height: '1px', width: '18px', display: 'block', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ background: '#6b4c23', height: '1px', width: '24px', display: 'block', transition: 'all 0.3s', transformOrigin: 'center', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          style={{
            maxHeight: menuOpen ? '320px' : '0',
            opacity: menuOpen ? 1 : 0,
            overflow: 'hidden',
            transition: 'all 0.4s ease',
            background: 'rgba(250,246,237,0.98)',
            borderTop: menuOpen ? '1px solid rgba(139,115,85,0.2)' : 'none',
          }}
          className="md:hidden"
        >
          <div className="flex flex-col px-6 py-6 gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                style={{
                  fontFamily: '"Libre Baskerville", Georgia, serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#6b4c23',
                  textDecoration: 'none',
                }}
              >
                {l.label}
              </a>
            ))}
            <div style={{ borderTop: '1px solid rgba(139,115,85,0.2)', paddingTop: '1rem' }}>
              <a
                href="#reserve"
                onClick={(e) => scrollTo(e, '#reserve')}
                className="btn-primary inline-block px-6 py-3"
                style={{ textDecoration: 'none' }}
              >
                Reserve a Table
              </a>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(61,42,18,0.3)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}