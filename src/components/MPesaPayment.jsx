import { useState, useEffect } from 'react'

const DEPOSIT_AMOUNT = 5000 // TZS

// M-Pesa logo as inline SVG
function MPesaLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#E31837" />
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">
        M-PESA
      </text>
    </svg>
  )
}

// Animated spinner
function Spinner() {
  return (
    <div className="w-12 h-12 rounded-full border-2 border-stone-700 border-t-[#4CAF50] animate-spin mx-auto" />
  )
}

// Step indicator
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
                    ? 'bg-[#4CAF50] text-white'
                    : active
                    ? 'border-2 border-gold-500 text-gold-400 bg-transparent'
                    : 'border border-stone-700 text-stone-600 bg-transparent'
                }`}
              >
                {done ? '✓' : idx}
              </div>
              <span className={`mt-1.5 font-sans text-[10px] tracking-wider uppercase ${active ? 'text-gold-400' : done ? 'text-[#4CAF50]' : 'text-stone-600'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 h-px mb-5 mx-1 transition-all duration-500 ${done ? 'bg-[#4CAF50]/60' : 'bg-stone-800'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function MPesaPayment({ reservation, onBack, onComplete }) {
  // phase: 'enter' | 'pushing' | 'waiting' | 'success' | 'failed'
  const [phase, setPhase] = useState('enter')
  const [mpesaPhone, setMpesaPhone] = useState(reservation.phone || '')
  const [phoneError, setPhoneError] = useState('')
  const [countdown, setCountdown] = useState(60)
  const [transactionId, setTransactionId] = useState('')

  // Countdown during 'waiting' phase
  useEffect(() => {
    if (phase !== 'waiting') return
    if (countdown <= 0) {
      setPhase('failed')
      return
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, countdown])

  // Simulate STK push sequence
  const handleInitiate = () => {
    const cleaned = mpesaPhone.replace(/\s+/g, '').replace(/^\+255/, '0').replace(/^255/, '0')
    if (!/^07\d{8}$/.test(cleaned)) {
      setPhoneError('Enter a valid Tanzanian M-Pesa number (07XXXXXXXX)')
      return
    }
    setPhoneError('')
    setPhase('pushing')

    // Simulate API call delay (STK push sent)
    setTimeout(() => {
      setPhase('waiting')
      setCountdown(60)
    }, 2000)

    // Simulate customer approving on phone after ~6s
    setTimeout(() => {
      const txId = 'TZ' + Math.random().toString(36).substring(2, 10).toUpperCase()
      setTransactionId(txId)
      setPhase('success')
    }, 6500)
  }

  const formattedPhone = mpesaPhone.replace(/\s+/g, '') || reservation.phone

  return (
    <div className="glass-card p-8 md:p-12 rounded-lg">
      <Steps current={2} />

      {/* ── ENTER PHONE ── */}
      {phase === 'enter' && (
        <div className="space-y-7">
          {/* M-Pesa branding header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <MPesaLogo size={36} />
            <div>
              <div className="font-sans font-bold text-white text-base tracking-wide">M-PESA</div>
              <div className="font-sans text-[10px] text-stone-500 tracking-widest uppercase">Secure Mobile Payment</div>
            </div>
          </div>

          {/* Booking summary */}
          <div className="bg-[#4CAF50]/5 border border-[#4CAF50]/20 p-5 space-y-2 rounded-lg">
            <p className="font-sans text-xs tracking-widest uppercase text-[#4CAF50]/70 mb-3">Reservation Summary</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-sans text-sm">
              <span className="text-stone-500">Guest</span>
              <span className="text-stone-200">{reservation.name}</span>
              <span className="text-stone-500">Date</span>
              <span className="text-stone-200">{reservation.date}</span>
              <span className="text-stone-500">Time</span>
              <span className="text-stone-200">{reservation.time}</span>
              <span className="text-stone-500">Guests</span>
              <span className="text-stone-200">{reservation.guests}</span>
            </div>
            <div className="border-t border-[#4CAF50]/15 mt-3 pt-3 flex justify-between items-center">
              <span className="font-sans text-xs text-stone-500 tracking-wider">Reservation Deposit</span>
              <span className="font-serif text-lg text-[#4CAF50]">TZS {DEPOSIT_AMOUNT.toLocaleString()}</span>
            </div>
            <p className="font-sans text-[10px] text-stone-600 italic">Deductible from your final bill</p>
          </div>

          {/* Phone input */}
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-stone-500 mb-2">
              M-Pesa Phone Number
            </label>
            <div className="flex gap-0">
              <div className="flex items-center px-4 border border-r-0 border-gold-500/20 bg-[#4CAF50]/5 text-stone-400 font-sans text-sm rounded-lg whitespace-nowrap">
                🇹🇿 +255
              </div>
              <input
                type="tel"
                placeholder="07X XXX XXXX"
                value={mpesaPhone}
                onChange={(e) => { setMpesaPhone(e.target.value); setPhoneError('') }}
                className="flex-1 bg-transparent border border-gold-500/20 px-4 py-3 font-sans text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#4CAF50]/50 rounded-lg transition-colors"
              />
            </div>
            {phoneError && (
              <p className="mt-1.5 font-sans text-xs text-red-400">{phoneError}</p>
            )}
            <p className="mt-1.5 font-sans text-[11px] text-stone-600">
              You'll receive an M-Pesa prompt on this number to approve TZS {DEPOSIT_AMOUNT.toLocaleString()}
            </p>
          </div>

          {/* M-Pesa security note */}
          <div className="flex items-start gap-3 bg-stone-900/60 border border-stone-800 rounded-lg p-4">
            <span className="text-[#4CAF50] text-lg mt-0.5">🔒</span>
            <p className="font-sans text-xs text-stone-500 leading-relaxed">
              Payment is processed securely via <strong className="text-stone-400">Vodacom M-Pesa</strong>. You will receive an STK push notification on your phone. Enter your M-Pesa PIN to confirm. Lumière never stores your PIN.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleInitiate}
              className="w-full py-4 bg-[#4CAF50] text-white font-sans font-semibold text-sm tracking-widest uppercase hover:bg-[#43a047] rounded-lg transition-all duration-300 shadow-lg shadow-[#4CAF50]/20 flex items-center justify-center gap-3"
            >
              <MPesaLogo size={20} />
              Pay TZS {DEPOSIT_AMOUNT.toLocaleString()} via M-Pesa
            </button>
            <button
              onClick={onBack}
              className="w-full py-3 border border-stone-700 text-stone-500 font-sans text-xs tracking-widest uppercase hover:border-stone-600 hover:text-stone-400 rounded-lg transition-all duration-300"
            >
              Back to Details
            </button>
          </div>
        </div>
      )}

      {/* ── PUSHING (sending STK) ── */}
      {phase === 'pushing' && (
        <div className="text-center py-8 space-y-6">
          <Spinner />
          <div>
            <h3 className="font-serif text-xl text-stone-100 mb-2">Sending Payment Request…</h3>
            <p className="font-sans text-sm text-stone-400">
              Initiating M-Pesa STK push to <strong className="text-stone-300">{formattedPhone}</strong>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MPesaLogo size={18} />
            <span className="font-sans text-xs text-stone-600 tracking-wider">Vodacom M-Pesa · Secure</span>
          </div>
        </div>
      )}

      {/* ── WAITING (customer must approve on phone) ── */}
      {phase === 'waiting' && (
        <div className="text-center py-6 space-y-7">
          {/* Animated phone prompt graphic */}
          <div className="relative mx-auto w-24 h-40 border-2 border-[#4CAF50]/40 rounded-2xl flex flex-col items-center justify-center bg-stone-950 shadow-lg shadow-[#4CAF50]/10">
            <div className="absolute top-2 w-8 h-1 bg-stone-700 rounded-full" />
            <div className="text-3xl mb-1">📲</div>
            <div className="font-sans text-[9px] text-[#4CAF50] tracking-wider text-center px-2 leading-tight">
              M-Pesa<br />Prompt Sent
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-[#4CAF50]/30 animate-ping" />
          </div>

          <div>
            <h3 className="font-serif text-xl text-stone-100 mb-2">Check Your Phone</h3>
            <p className="font-sans text-sm text-stone-400 max-w-xs mx-auto leading-relaxed">
              An M-Pesa prompt has been sent to <strong className="text-stone-300">{formattedPhone}</strong>.<br />
              Enter your <strong className="text-[#4CAF50]">M-Pesa PIN</strong> to confirm TZS {DEPOSIT_AMOUNT.toLocaleString()}.
            </p>
          </div>

          {/* Countdown */}
          <div className="mx-auto w-20 h-20 rounded-full border-2 border-stone-800 flex flex-col items-center justify-center relative">
            <span className="font-serif text-2xl text-[#4CAF50]">{countdown}</span>
            <span className="font-sans text-[9px] text-stone-600 tracking-wider uppercase">secs left</span>
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="38" fill="none" stroke="#4CAF50" strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - countdown / 60)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
          </div>

          <div className="bg-stone-900/60 border border-stone-800 p-4">
            <p className="font-sans text-xs text-stone-500">
              <span className="text-amber-500">⚠</span> Do not close this page. Your reservation will be held for <strong className="text-stone-400">{countdown} seconds</strong>.
            </p>
          </div>
        </div>
      )}

      {/* ── SUCCESS ── */}
      {phase === 'success' && (
        <div className="text-center py-6 space-y-7">
          {/* Success icon */}
          <div className="relative mx-auto w-20 h-20 rounded-full bg-[#4CAF50]/10 border-2 border-[#4CAF50]/50 flex items-center justify-center">
            <svg className="w-10 h-10 text-[#4CAF50]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-[#4CAF50]/10 animate-ping" />
          </div>

          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#4CAF50]/70 mb-2">Payment Confirmed</p>
            <h3 className="font-serif text-3xl text-stone-100 mb-2">You're All Set!</h3>
            <p className="font-sans text-sm text-stone-400 max-w-xs mx-auto leading-relaxed">
              TZS {DEPOSIT_AMOUNT.toLocaleString()} received via M-Pesa. Your table at <strong className="text-gold-400">The Kaffeehaus</strong> is confirmed.
            </p>
          </div>

          {/* Transaction details */}
          <div className="bg-[#4CAF50]/5 border border-[#4CAF50]/20 p-5 text-left rounded-lg space-y-2.5">
            <p className="font-sans text-xs tracking-widest uppercase text-[#4CAF50]/70 mb-3">Transaction Receipt</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-sans text-sm">
              <span className="text-stone-500">Transaction ID</span>
              <span className="text-stone-200 font-mono">{transactionId}</span>
              <span className="text-stone-500">Amount Paid</span>
              <span className="text-[#4CAF50]">TZS {DEPOSIT_AMOUNT.toLocaleString()}</span>
              <span className="text-stone-500">Method</span>
              <span className="text-stone-200">M-Pesa</span>
              <span className="text-stone-500">Phone</span>
              <span className="text-stone-200">{formattedPhone}</span>
              <span className="text-stone-500">Date / Time</span>
              <span className="text-stone-200">{reservation.date} · {reservation.time}</span>
              <span className="text-stone-500">Guest</span>
              <span className="text-stone-200">{reservation.name}</span>
            </div>
          </div>

          <p className="font-sans text-xs text-stone-500 italic">
            An SMS confirmation will be sent to {formattedPhone}. Your deposit is deductible from the final bill.
          </p>

          <button
            onClick={onComplete}
            className="w-full py-4 bg-gold-500 text-charcoal-900 font-sans font-semibold text-sm tracking-widest uppercase hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/20 rounded-lg"
          >
            View Reservation Details
          </button>
        </div>
      )}

      {/* ── FAILED ── */}
      {phase === 'failed' && (
        <div className="text-center py-6 space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-red-900/20 border-2 border-red-700/40 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-stone-100 mb-2">Payment Timed Out</h3>
            <p className="font-sans text-sm text-stone-400 max-w-xs mx-auto leading-relaxed">
              The M-Pesa prompt expired without a response. Please try again or call us to reserve by phone.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setPhase('enter'); setCountdown(60) }}
              className="w-full py-4 bg-[#4CAF50] text-white font-sans font-semibold text-sm tracking-widest uppercase hover:bg-[#43a047] transition-all duration-300 flex items-center justify-center gap-3 rounded-lg"
            >
              <MPesaLogo size={18} />
              Try Again
            </button>
            <button
              onClick={onBack}
              className="w-full py-3 border border-stone-700 text-stone-500 font-sans text-xs tracking-widest uppercase hover:border-stone-600 hover:text-stone-400 transition-all duration-300 rounded-lg"
            >
              Back to Details
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
