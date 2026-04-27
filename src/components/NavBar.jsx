import { useState, useEffect } from 'react'
import logo from '../assets/images/logo.jpg'

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-charcoal-900/96 backdrop-blur-xl border-b border-gold-500/10 shadow-2xl shadow-black/40'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="#" onClick={(e) => scrollTo(e, 'body')} className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logo}
                alt="The Kaffeehaus"
                className="h-9 w-9 rounded-full object-cover ring-1 ring-gold-500/30 group-hover:ring-gold-500/60 transition-all duration-300"
              />
            </div>
            <span className="font-serif text-lg tracking-widest text-gradient-gold">
              The Kaffeehaus
            </span>
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
                  className={`relative font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300 pb-0.5 ${
                    isActive ? 'text-gold-400' : 'text-stone-400 hover:text-stone-100'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold-500 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              )
            })}

            <a
              href="#reserve"
              onClick={(e) => scrollTo(e, '#reserve')}
              className="ml-2 px-6 py-2.5 border border-gold-500/50 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-charcoal-900 hover:border-gold-500 transition-all duration-300 rounded-sm"
            >
              Reserve
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-px bg-gold-400 transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-5'}`} />
            <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          } bg-charcoal-900/98 backdrop-blur-xl border-t border-gold-500/10`}
        >
          <div className="flex flex-col px-6 py-6 gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="font-sans text-sm text-stone-300 hover:text-gold-400 tracking-[0.2em] uppercase transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            <div className="border-t border-gold-500/10 pt-4">
              <a
                href="#reserve"
                onClick={(e) => scrollTo(e, '#reserve')}
                className="inline-block px-6 py-3 border border-gold-500/40 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300 rounded-sm"
              >
                Reserve a Table
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
