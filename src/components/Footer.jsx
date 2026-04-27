import mpesaLogo from '../assets/images/mpesa_logo.png'
import yasLogo from '../assets/images/mixx_by_yas.png'
import airtelMoneyLogo from '../assets/images/airtelmoney.png'

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="border-t border-gold-500/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-serif text-xl tracking-widest text-gradient-gold mb-4">
              The Kaffeehaus & Restaurant
            </div>
            <p className="font-sans font-light text-xs text-stone-600 leading-relaxed max-w-xs mb-6">
              A sanctuary of flavour and atmosphere in the heart of Mwanza. Premium experience without premium pretension.
            </p>
            {/* Social links */}
            <div className="flex gap-2.5">
              {['Instagram', 'Facebook', 'TripAdvisor'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-sans text-[10px] tracking-widest uppercase text-stone-600 hover:text-gold-400 transition-colors border border-stone-800 hover:border-gold-500/25 px-2.5 py-1.5 rounded-sm"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-5">Opening Hours</h4>
            <ul className="space-y-2.5 font-sans text-xs text-stone-600">
              <li className="flex justify-between gap-4">
                <span>Mon – Fri</span>
                <span className="text-stone-400">07:00 – 23:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Saturday</span>
                <span className="text-stone-400">08:00 – 00:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="text-stone-400">09:00 – 22:00</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-5">Contact</h4>
            <ul className="space-y-3 font-sans text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <span className="text-gold-400/50 flex-shrink-0 mt-px">📍</span>
                <span>Kirumba, Mwanza<br />Tanzania</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold-400/50 flex-shrink-0">📞</span>
                <a href="tel:+255792975601" className="hover:text-gold-400 transition-colors duration-200">
                  +255 792 975 601
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold-400/50 flex-shrink-0">📱</span>
                <span>WhatsApp reservations available</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold-400/50 flex-shrink-0">💳</span>
                <span>Cash &amp; mobile money accepted</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment strip */}
        <div className="border border-gold-500/10 p-5 mb-10 flex flex-wrap items-center justify-between gap-4 rounded-sm">
          <p className="font-sans text-[10px] text-stone-600 tracking-widest uppercase">We Accept</p>
          <div className="flex flex-wrap gap-2.5 items-center">
            <div className="flex items-center gap-2 px-3 py-2 rounded-sm">
              <img
                src={mpesaLogo}
                alt="M-Pesa"
                className="h-9 w-9 rounded-full object-cover ring-1 ring-gold-500/30 group-hover:ring-gold-500/60 transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-2 px-1 py-2 rounded-sm">
              <img 
                src={yasLogo}
                alt="TigoPesa" 
                className="h-9 w-9 rounded-full object-cover ring-1 ring-gold-500/30 group-hover:ring-gold-500/60 transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-sm">
              <img
                src={airtelMoneyLogo}
                alt="AirtelMoney"
                className="h-9 w-9 rounded-full object-cover ring-1 ring-gold-500/30 group-hover:ring-gold-500/60 transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-stone-900/60 border border-stone-800 rounded-sm">
              <span className="font-sans text-xs text-stone-400 tracking-wider">CASH (TZS)</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-500/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-stone-700 tracking-wider">
            © {new Date().getFullYear()} The Kaffeehaus & Restaurant. All rights reserved.
          </p>
          <p className="font-sans text-xs text-stone-700 tracking-wider">
            Kirumba · Mwanza · Tanzania
          </p>
        </div>
      </div>
    </footer>
  )
}
