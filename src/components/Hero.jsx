import { useEffect, useState } from 'react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Atmospheric background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a04] via-[#111008] to-[#0c0a04]" />

        {/* Warm glows */}
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-900/18 rounded-full blur-[130px]" />
        <div className="absolute top-[20%] right-[15%] w-[300px] h-[300px] bg-yellow-900/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[250px] bg-amber-800/10 rounded-full blur-[90px]" />

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,168,23,0.6) 1px, transparent 0)`,
            backgroundSize: '44px 44px',
          }}
        />

        {/* Edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a04]/60 via-transparent to-[#0c0a04]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a04]/80 via-transparent to-[#0c0a04]" />
      </div>

      {/* Rule lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Headline */}
        <div className={`pt-8 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h1 className="font-serif font-normal text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-stone-100 mb-4 tracking-tight">
            Where Every Meal
            <br />
            <em className="text-gradient-gold not-italic">Becomes a Memory</em>
          </h1>
        </div>

        {/* Divider */}
        <div className={`transition-all duration-700 delay-300 ${loaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent mx-auto my-8" />
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-700 delay-[350ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-sans font-light text-base md:text-lg text-stone-400 max-w-lg mx-auto mb-10 leading-relaxed tracking-wide">
            A sanctuary of flavour and atmosphere — from morning coffee to candlelit dinners, crafted for those who appreciate the finer things.
          </p>
        </div>

        {/* Pricing note */}
        <div className={`transition-all duration-700 delay-[400ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <p className="font-sans text-xs text-gold-400/60 tracking-[0.25em] uppercase mb-10">
            Premium experience · From TZS 10,000
          </p>
        </div>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={() => scrollTo('#reserve')}
            className="group relative px-10 py-4 bg-gold-500 text-charcoal-900 font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:bg-gold-400 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-gold-500/20 rounded-sm overflow-hidden"
          >
            <span className="relative z-10">Reserve Your Table</span>
            <div className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
          </button>

          <button
            onClick={() => scrollTo('#menu')}
            className="px-10 py-4 border border-stone-600/80 text-stone-300 font-sans font-light text-xs tracking-[0.2em] uppercase hover:border-gold-500/50 hover:text-gold-400 active:scale-[0.98] transition-all duration-300 rounded-sm"
          >
            View Menu
          </button>
        </div>

        {/* Live indicator */}
        <div className={`mt-8 transition-all duration-700 delay-[600ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-sans text-[11px] text-stone-600 tracking-wider">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500/80 mr-2 animate-pulse align-middle" />
            Limited seating during peak hours — book ahead to secure your table
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-[800ms] ${loaded ? 'opacity-35' : 'opacity-0'}`}>
        <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone-500">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold-500/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
