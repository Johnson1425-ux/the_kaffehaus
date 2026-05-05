import { useState, useEffect, useRef } from 'react'

const DEPOSIT = 5000
const POLL_INTERVAL = 4000
const POLL_TIMEOUT  = 90000

// Safaricom sandbox test number — used automatically in non-production mode
const SANDBOX_TEST_PHONE = '254708374149'
const IS_SANDBOX = import.meta.env.VITE_MPESA_ENV !== 'production'

const STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  WAITING: 'waiting',
  POLLING: 'polling',
  SUCCESS: 'success',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
  TIMEOUT: 'timeout',
}

export default function MPesaPayment({ reservation, onBack, onComplete }) {
  const [phone, setPhone] = useState(reservation.phone || '')
  const [status, setStatus] = useState(STATUS.IDLE)
  const [error, setError] = useState('')
  const [checkoutId, setCheckoutId] = useState(null)
  const [secondsLeft, setSecondsLeft] = useState(90)

  const pollRef = useRef(null)
  const timerRef = useRef(null)
  const countdownRef = useRef(null)

  useEffect(() => {
    return () => {
      clearInterval(pollRef.current)
      clearTimeout(timerRef.current)
      clearInterval(countdownRef.current)
    }
  }, [])

  const initiatePush = async () => {
    setError('')
    setStatus(STATUS.SENDING)

    // In sandbox mode, always use Safaricom's test number
    const phoneToSend = IS_SANDBOX ? SANDBOX_TEST_PHONE : phone

    try {
      const res = await fetch('/api/mpesa-stk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneToSend,
          amount: DEPOSIT,
          accountRef: `KAFFEEHAUS-${reservation.name?.replace(/\s+/g, '').toUpperCase().slice(0, 8)}`,
          description: `Table reservation deposit – ${reservation.date} ${reservation.time}`,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.details?.errorMessage || data.error || 'Failed to send payment request. Please try again.')
        setStatus(STATUS.IDLE)
        return
      }

      setCheckoutId(data.checkoutRequestId)
      setStatus(STATUS.WAITING)
      setSecondsLeft(90)
      startPolling(data.checkoutRequestId)
    } catch (err) {
      setError('Network error. Check your connection and try again.')
      setStatus(STATUS.IDLE)
    }
  }

  const startPolling = (cid) => {
    countdownRef.current = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1))
    }, 1000)

    pollRef.current = setInterval(() => {
      checkStatus(cid)
    }, POLL_INTERVAL)

    timerRef.current = setTimeout(() => {
      stopPolling()
      setStatus(STATUS.TIMEOUT)
    }, POLL_TIMEOUT)
  }

  const stopPolling = () => {
    clearInterval(pollRef.current)
    clearTimeout(timerRef.current)
    clearInterval(countdownRef.current)
  }

  const checkStatus = async (cid) => {
    setStatus(STATUS.POLLING)
    try {
      const res = await fetch('/api/mpesa-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkoutRequestId: cid }),
      })

      const data = await res.json()
      const code = String(data.resultCode)

      if (code === '0') {
        stopPolling()
        setStatus(STATUS.SUCCESS)
        setTimeout(() => onComplete(), 1800)
      } else if (code === '1032') {
        stopPolling()
        setStatus(STATUS.CANCELLED)
      } else if (code === '1037') {
        stopPolling()
        setStatus(STATUS.TIMEOUT)
      } else if (data.resultDesc?.toLowerCase().includes('pending') || code === '1') {
        setStatus(STATUS.WAITING)
      } else {
        stopPolling()
        setError(data.resultDesc || 'Payment failed. Please try again.')
        setStatus(STATUS.FAILED)
      }
    } catch {
      setStatus(STATUS.WAITING)
    }
  }

  const reset = () => {
    stopPolling()
    setStatus(STATUS.IDLE)
    setError('')
    setCheckoutId(null)
    setSecondsLeft(90)
  }

  return (
    <div className="glass-card p-8 md:p-12 rounded-sm">

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {['Details', 'Payment', 'Confirmed'].map((label, i) => {
          const idx = i + 1
          const done = idx < 2
          const active = idx === 2
          return (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-semibold transition-all duration-500 ${
                  done ? 'bg-emerald-600 text-white' : active ? 'border-2 border-gold-500 text-gold-400' : 'border border-stone-700 text-stone-600'
                }`}>
                  {done ? '✓' : idx}
                </div>
                <span className={`mt-1.5 font-sans text-[10px] tracking-wider uppercase ${active ? 'text-gold-400' : done ? 'text-emerald-500' : 'text-stone-600'}`}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div className={`w-16 h-px mb-5 mx-1 transition-all duration-500 ${done ? 'bg-emerald-600/50' : 'bg-stone-800'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* ── IDLE STATE ── */}
      {status === STATUS.IDLE && (
        <div className="space-y-7">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-950/40 border border-red-900/30 mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-serif text-2xl text-stone-100 mb-2 font-normal">M-Pesa Payment</h3>
            <p className="font-sans text-sm text-stone-500 font-light leading-relaxed max-w-xs mx-auto">
              {IS_SANDBOX
                ? 'Sandbox mode — payment will be simulated using Safaricom\'s test number.'
                : 'We\'ll send an STK push to your phone. Enter your PIN to confirm the deposit.'}
            </p>
          </div>

          {/* Sandbox notice banner */}
          {IS_SANDBOX && (
            <div className="flex items-start gap-3 bg-amber-950/20 border border-amber-800/30 p-4 rounded-sm">
              <span className="text-amber-400 flex-shrink-0 text-base mt-px">🧪</span>
              <div>
                <p className="font-sans text-xs text-amber-300 font-medium mb-0.5">Sandbox / Test Mode</p>
                <p className="font-sans text-xs text-stone-500 leading-relaxed">
                  Your phone number is ignored in sandbox. Safaricom test number{' '}
                  <span className="text-stone-300 font-mono">{SANDBOX_TEST_PHONE}</span> will be used automatically.
                  No real money is charged.
                </p>
              </div>
            </div>
          )}

          {/* Reservation summary */}
          <div className="bg-stone-900/50 border border-gold-500/10 p-5 space-y-2.5 rounded-sm">
            <div className="flex justify-between font-sans text-sm">
              <span className="text-stone-500">Reservation</span>
              <span className="text-stone-300">{reservation.name}</span>
            </div>
            <div className="flex justify-between font-sans text-sm">
              <span className="text-stone-500">Date & Time</span>
              <span className="text-stone-300">{reservation.date} at {reservation.time}</span>
            </div>
            <div className="flex justify-between font-sans text-sm">
              <span className="text-stone-500">Guests</span>
              <span className="text-stone-300">{reservation.guests}</span>
            </div>
            <div className="border-t border-gold-500/10 pt-2.5 flex justify-between font-sans text-sm">
              <span className="text-stone-400 font-medium">Deposit Amount</span>
              <span className="text-emerald-400 font-semibold">TZS {DEPOSIT.toLocaleString()}</span>
            </div>
          </div>

          {/* Phone input — shown in production only */}
          {!IS_SANDBOX && (
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                M-Pesa Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-stone-500">+</span>
                <input
                  type="tel"
                  placeholder="2557XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent border border-gold-500/15 pl-8 pr-4 py-3 font-sans text-sm text-stone-200 placeholder-stone-700 focus:outline-none focus:border-gold-500/50 rounded-sm transition-colors"
                />
              </div>
              <p className="font-sans text-xs text-stone-600 mt-1.5">
                Enter your Vodacom/Tigo number e.g. 255712345678
              </p>
            </div>
          )}

          {/* In sandbox, show the phone being used (read-only) */}
          {IS_SANDBOX && (
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                Test Phone Number (auto)
              </label>
              <div className="w-full bg-stone-900/50 border border-stone-800 px-4 py-3 font-mono text-sm text-stone-500 rounded-sm">
                {SANDBOX_TEST_PHONE}
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2.5 bg-red-950/20 border border-red-900/30 p-4 rounded-sm">
              <span className="text-red-400 flex-shrink-0 mt-px">⚠</span>
              <p className="font-sans text-xs text-red-300 leading-relaxed">{error}</p>
            </div>
          )}

          <button
            onClick={initiatePush}
            disabled={!IS_SANDBOX && (!phone || phone.length < 9)}
            className="w-full py-4 bg-red-700 text-white font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99] transition-all duration-300 shadow-lg shadow-red-900/30 rounded-sm flex items-center justify-center gap-2"
          >
            <span>{IS_SANDBOX ? 'Simulate M-Pesa Payment' : 'Send M-Pesa Request'}</span>
            <span>→</span>
          </button>

          <button
            onClick={onBack}
            className="w-full font-sans text-xs text-stone-600 hover:text-stone-400 tracking-[0.15em] uppercase transition-colors duration-200"
          >
            ← Back to Details
          </button>
        </div>
      )}

      {/* ── SENDING STATE ── */}
      {status === STATUS.SENDING && (
        <div className="text-center space-y-6 py-8">
          <div className="flex justify-center">
            <div className="w-14 h-14 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
          </div>
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-stone-500 mb-2">Connecting</p>
            <p className="font-serif text-xl text-stone-100 font-normal">Sending request to M-Pesa...</p>
          </div>
        </div>
      )}

      {/* ── WAITING / POLLING STATE ── */}
      {(status === STATUS.WAITING || status === STATUS.POLLING) && (
        <div className="text-center space-y-7 py-4">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-red-950/30 border border-red-900/30 flex items-center justify-center">
              <span className="text-4xl animate-bounce">📱</span>
            </div>
            <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping" />
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-emerald-500/70 mb-2">Request Sent</p>
            <h3 className="font-serif text-2xl text-stone-100 mb-3 font-normal">
              {IS_SANDBOX ? 'Simulating Payment...' : 'Check Your Phone'}
            </h3>
            <p className="font-sans text-sm text-stone-500 font-light leading-relaxed max-w-xs mx-auto">
              {IS_SANDBOX
                ? 'Sandbox mode — polling for auto-confirmation from Safaricom test environment.'
                : `An M-Pesa prompt has been sent to ${phone}. Enter your PIN to confirm.`}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-5 py-3 bg-emerald-950/20 border border-emerald-900/25 rounded-sm">
            <span className="font-sans text-xs text-stone-500">Deposit</span>
            <span className="font-serif text-lg text-emerald-400">TZS {DEPOSIT.toLocaleString()}</span>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-stone-800/60 rounded-full h-1 overflow-hidden max-w-xs mx-auto">
              <div
                className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-1000 ease-linear"
                style={{ width: `${(secondsLeft / 90) * 100}%` }}
              />
            </div>
            <p className="font-sans text-xs text-stone-600">
              Expires in <span className="text-stone-400 tabular-nums">{secondsLeft}s</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-stone-600">
            <div className="w-3 h-3 border border-stone-700 border-t-stone-400 rounded-full animate-spin" />
            <span className="font-sans text-xs tracking-wider">Waiting for confirmation...</span>
          </div>

          <button
            onClick={reset}
            className="font-sans text-xs text-stone-700 hover:text-stone-500 tracking-[0.15em] uppercase transition-colors"
          >
            Cancel &amp; try again
          </button>
        </div>
      )}

      {/* ── SUCCESS STATE ── */}
      {status === STATUS.SUCCESS && (
        <div className="text-center space-y-5 py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-700/40">
            <span className="text-3xl">✓</span>
          </div>
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-emerald-500/80 mb-2">Payment Confirmed</p>
            <h3 className="font-serif text-2xl text-stone-100 font-normal">
              TZS {DEPOSIT.toLocaleString()} received
            </h3>
            <p className="font-sans text-sm text-stone-500 mt-2">Redirecting to confirmation...</p>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* ── CANCELLED STATE ── */}
      {status === STATUS.CANCELLED && (
        <div className="text-center space-y-6 py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-900 border border-stone-700">
            <span className="text-3xl">✕</span>
          </div>
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-2">Cancelled</p>
            <h3 className="font-serif text-2xl text-stone-200 font-normal mb-2">Payment Cancelled</h3>
            <p className="font-sans text-sm text-stone-500 font-light">The M-Pesa request was cancelled.</p>
          </div>
          <button onClick={reset} className="px-8 py-3 border border-gold-500/40 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-charcoal-900 rounded-sm transition-all duration-300">
            Try Again
          </button>
        </div>
      )}

      {/* ── TIMEOUT STATE ── */}
      {status === STATUS.TIMEOUT && (
        <div className="text-center space-y-6 py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-950/30 border border-amber-900/30">
            <span className="text-3xl">⏱</span>
          </div>
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-amber-500/70 mb-2">Timed Out</p>
            <h3 className="font-serif text-2xl text-stone-200 font-normal mb-2">Request Expired</h3>
            <p className="font-sans text-sm text-stone-500 font-light max-w-xs mx-auto leading-relaxed">
              The M-Pesa request expired. Please try again.
            </p>
          </div>
          <button onClick={reset} className="px-8 py-3 border border-gold-500/40 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-charcoal-900 rounded-sm transition-all duration-300">
            Try Again
          </button>
        </div>
      )}

      {/* ── FAILED STATE ── */}
      {status === STATUS.FAILED && (
        <div className="text-center space-y-6 py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-950/30 border border-red-900/30">
            <span className="text-3xl">⚠</span>
          </div>
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-red-500/70 mb-2">Failed</p>
            <h3 className="font-serif text-2xl text-stone-200 font-normal mb-2">Payment Failed</h3>
            <p className="font-sans text-sm text-stone-500 font-light max-w-xs mx-auto leading-relaxed">
              {error || 'Something went wrong. Please try again.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={reset} className="px-8 py-3 border border-gold-500/40 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-charcoal-900 rounded-sm transition-all duration-300">
              Try Again
            </button>
            <button onClick={onBack} className="px-8 py-3 border border-stone-700 text-stone-500 font-sans text-xs tracking-[0.2em] uppercase hover:border-stone-500 hover:text-stone-300 rounded-sm transition-all duration-300">
              Back to Details
            </button>
          </div>
        </div>
      )}

    </div>
  )
}