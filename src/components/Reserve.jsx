import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import MPesaPayment from './MPesaPayment'

const DEPOSIT = 5000

function Steps({ current }) {
  const steps = ['Details', 'Payment', 'Confirmed']
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((label, i) => {
        const idx = i + 1
        const done = current > idx
        const active = current === idx
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-semibold transition-all duration-500 ${
                  done
                    ? 'bg-emerald-600 text-white'
                    : active
                    ? 'border-2 border-gold-500 text-gold-400 bg-transparent'
                    : 'border border-stone-700 text-stone-600 bg-transparent'
                }`}
              >
                {done ? '✓' : idx}
              </div>
              <span
                className={`mt-1.5 font-sans text-[10px] tracking-wider uppercase ${
                  active ? 'text-gold-400' : done ? 'text-emerald-500' : 'text-stone-600'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-16 h-px mb-5 mx-1 transition-all duration-500 ${
                  done ? 'bg-emerald-600/50' : 'bg-stone-800'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

const inputClass =
  'w-full bg-transparent border border-gold-500/15 px-4 py-3 font-sans text-sm text-stone-200 placeholder-stone-700 focus:outline-none focus:border-gold-500/50 rounded-sm transition-colors duration-200'

const selectClass =
  'w-full bg-charcoal-900 border border-gold-500/15 px-4 py-3 font-sans text-sm text-stone-200 focus:outline-none focus:border-gold-500/50 rounded-sm transition-colors duration-200'

const labelClass = 'block font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2'

export default function Reserve() {
  const ref = useReveal()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' })

  const times = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '18:00', '19:00', '20:00', '21:00', '22:00',
  ]

  const handleDetailsSubmit = (e) => {
    e.preventDefault()
    setStep(2)
    setTimeout(() => {
      const el = document.getElementById('reserve')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <section id="reserve" className="py-28 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-950/20 rounded-full blur-[160px]" />
      </div>

      <div ref={ref} className="reveal max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-gold-500/40" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400/70">Make a Reservation</p>
            <div className="w-6 h-px bg-gold-500/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-100 mb-5 font-normal">
            Reserve Your Table
            <br />
            <em className="text-gradient-gold not-italic">Tonight</em>
          </h2>
          <p className="font-sans font-light text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
            Secure your seat before peak hours fill up. Confirm with a quick M-Pesa deposit — deductible from your bill.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto mt-6" />

          {/* Payment badges */}
          <div className="flex items-center justify-center gap-2.5 mt-6">
            <span className="font-sans text-[9px] text-stone-600 tracking-widest uppercase">Accepted:</span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/30 border border-red-900/30 font-sans text-xs text-red-300 font-semibold tracking-wider rounded-sm">
              M-PESA
            </span>
            <span className="px-3 py-1.5 bg-stone-900/60 border border-stone-800 font-sans text-xs text-stone-400 tracking-wider rounded-sm">
              CASH
            </span>
            <span className="px-3 py-1.5 bg-blue-950/30 border border-blue-900/30 font-sans text-xs text-blue-300 tracking-wider rounded-sm">
              TIGOPESA
            </span>
          </div>
        </div>

        {/* ── STEP 1: DETAILS ── */}
        {step === 1 && (
          <form onSubmit={handleDetailsSubmit} className="glass-card p-8 md:p-12 space-y-6 rounded-sm">
            <Steps current={1} />

            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phone / WhatsApp</label>
                <input
                  required
                  type="tel"
                  placeholder="+255 ..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Date</label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={selectClass}
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label className={labelClass}>Time</label>
                <select
                  required
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className={selectClass}
                >
                  <option value="">Select time</option>
                  {times.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className={labelClass}>Number of Guests</label>
              <div className="flex gap-2 flex-wrap mt-1">
                {['1', '2', '3', '4', '5', '6', '7+'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm({ ...form, guests: g })}
                    className={`w-11 h-11 font-sans text-sm border transition-all duration-200 rounded-sm ${
                      form.guests === g
                        ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                        : 'border-stone-800 text-stone-600 hover:border-stone-600 hover:text-stone-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className={labelClass}>Special Requests <span className="normal-case text-stone-700">(optional)</span></label>
              <textarea
                rows={3}
                placeholder="Dietary requirements, occasion, preferred seating..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Deposit notice */}
            <div className="flex items-start gap-3 bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-sm">
              <span className="text-emerald-500 text-lg mt-0.5 flex-shrink-0">📱</span>
              <p className="font-sans text-xs text-stone-400 leading-relaxed">
                A <strong className="text-emerald-400">TZS {DEPOSIT.toLocaleString()} M-Pesa deposit</strong> is required to hold your table. It will be deducted from your final bill.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 text-white font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:bg-emerald-500 active:scale-[0.99] transition-all duration-300 shadow-lg shadow-emerald-900/30 rounded-sm flex items-center justify-center gap-3"
            >
              <span>Continue to M-Pesa Payment</span>
              <span className="text-base">→</span>
            </button>

            <p className="text-center font-sans text-xs text-stone-700 tracking-wider">
              Powered by Vodacom M-Pesa · Secure · Instant confirmation
            </p>
          </form>
        )}

        {/* ── STEP 2: M-PESA ── */}
        {step === 2 && (
          <MPesaPayment
            reservation={form}
            onBack={() => setStep(1)}
            onComplete={() => setStep(3)}
          />
        )}

        {/* ── STEP 3: CONFIRMED ── */}
        {step === 3 && (
          <div className="glass-card p-8 md:p-12 rounded-sm">
            <Steps current={3} />
            <div className="text-center space-y-6">
              <div className="font-serif text-5xl text-gradient-gold">✦</div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-emerald-500/80 mb-2">
                  Reservation Confirmed
                </p>
                <h3 className="font-serif text-3xl text-stone-100 mb-3 font-normal">
                  Welcome,{' '}
                  <em className="text-gradient-gold not-italic">{form.name}</em>
                </h3>
                <p className="font-sans font-light text-stone-500 text-sm leading-relaxed max-w-sm mx-auto">
                  Your table at The Kaffeehaus is confirmed for{' '}
                  <strong className="text-stone-300">{form.date}</strong> at{' '}
                  <strong className="text-stone-300">{form.time}</strong> for{' '}
                  <strong className="text-stone-300">{form.guests} guest{form.guests !== '1' ? 's' : ''}</strong>.
                </p>
              </div>

              {/* Summary card */}
              <div className="bg-stone-900/60 border border-gold-500/10 p-6 text-left space-y-3 max-w-sm mx-auto rounded-sm">
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-stone-500">Deposit paid</span>
                  <span className="text-emerald-400">TZS {DEPOSIT.toLocaleString()} ✓</span>
                </div>
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-stone-500">Payment method</span>
                  <span className="text-stone-300">M-Pesa</span>
                </div>
                {form.notes && (
                  <div className="flex justify-between font-sans text-sm gap-4">
                    <span className="text-stone-500 flex-shrink-0">Special request</span>
                    <span className="text-stone-300 text-right">{form.notes}</span>
                  </div>
                )}
              </div>

              <p className="font-sans text-xs text-stone-600 italic">
                A confirmation SMS has been sent to {form.phone}. We look forward to welcoming you.
              </p>

              <button
                onClick={() => {
                  setStep(1)
                  setForm({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' })
                }}
                className="font-sans text-xs text-gold-400/50 hover:text-gold-400 tracking-[0.2em] uppercase transition-colors duration-200"
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
