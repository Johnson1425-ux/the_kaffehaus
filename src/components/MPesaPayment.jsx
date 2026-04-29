import { useState, useEffect } from 'react'

const DEPOSIT_AMOUNT = 5000

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

function Spinner() {
  return (
    <div style={{
      width: '48px', height: '48px', borderRadius: '50%',
      border: '2px solid rgba(139,115,85,0.2)',
      borderTopColor: '#5a8a3a',
      animation: 'spin 0.9s linear infinite',
      margin: '0 auto',
    }} />
  )
}

function Steps({ current }) {
  const steps = ['Details', 'Payment', 'Confirmed']
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', gap: 0 }}>
      {steps.map((label, i) => {
        const idx = i + 1
        const done = current > idx
        const active = current === idx
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.7rem', fontWeight: 700,
                border: done ? '1px solid #5a8a3a' : active ? '1px solid #6b4c23' : '1px solid rgba(139,115,85,0.3)',
                background: done ? 'rgba(90,138,58,0.1)' : active ? 'rgba(107,76,35,0.08)' : 'transparent',
                color: done ? '#5a8a3a' : active ? '#6b4c23' : '#a08c6b',
                transition: 'all 0.4s',
              }}>
                {done ? '✓' : idx}
              </div>
              <span style={{
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: done ? '#5a8a3a' : active ? '#6b4c23' : '#a08c6b',
                marginTop: '6px',
              }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: '64px', height: '1px', margin: '0 4px', marginBottom: '20px',
                background: done ? 'rgba(90,138,58,0.4)' : 'rgba(139,115,85,0.2)',
                transition: 'all 0.4s',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

const fieldLabel = {
  display: 'block',
  fontFamily: '"Libre Baskerville", Georgia, serif',
  fontSize: '0.6rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#8b7355',
  marginBottom: '0.5rem',
}

const summaryKey = { fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', color: '#8b7355' }
const summaryVal = { fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', color: '#3d2a12' }

export default function MPesaPayment({ reservation, onBack, onComplete }) {
  const [phase, setPhase] = useState('enter')
  const [mpesaPhone, setMpesaPhone] = useState(reservation.phone || '')
  const [phoneError, setPhoneError] = useState('')
  const [countdown, setCountdown] = useState(60)
  const [transactionId, setTransactionId] = useState('')

  useEffect(() => {
    if (phase !== 'waiting') return
    if (countdown <= 0) { setPhase('failed'); return }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, countdown])

  const handleInitiate = () => {
    const cleaned = mpesaPhone.replace(/\s+/g, '').replace(/^\+255/, '0').replace(/^255/, '0')
    if (!/^07\d{8}$/.test(cleaned)) {
      setPhoneError('Enter a valid Tanzanian M-Pesa number (07XXXXXXXX)')
      return
    }
    setPhoneError('')
    setPhase('pushing')
    setTimeout(() => { setPhase('waiting'); setCountdown(60) }, 2000)
    setTimeout(() => {
      const txId = 'TZ' + Math.random().toString(36).substring(2, 10).toUpperCase()
      setTransactionId(txId)
      setPhase('success')
    }, 6500)
  }

  const formattedPhone = mpesaPhone.replace(/\s+/g, '') || reservation.phone

  const cardStyle = {
    background: '#f2ebda',
    border: '1px solid rgba(139,115,85,0.25)',
    padding: '2rem 2.5rem',
    position: 'relative',
  }

  return (
    <div style={{ ...cardStyle, padding: '2rem' }}>
      {/* Inset border */}
      <div style={{ position: 'absolute', inset: '4px', border: '1px solid rgba(139,115,85,0.1)', pointerEvents: 'none' }} />

      <Steps current={2} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ping { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:0;transform:scale(1.4)} }
      `}</style>

      {/* ── ENTER PHONE ── */}
      {phase === 'enter' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* M-Pesa header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <MPesaLogo size={36} />
            <div>
              <div style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', color: '#2a1c0b' }}>M-PESA</div>
              <div style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8b7355' }}>Secure Mobile Payment</div>
            </div>
          </div>

          {/* Booking summary */}
          <div style={{ background: 'rgba(90,138,58,0.04)', border: '1px solid rgba(90,138,58,0.2)', padding: '1.25rem' }}>
            <p style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(90,138,58,0.7)', marginBottom: '0.75rem' }}>
              Reservation Summary
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 1rem' }}>
              {[
                ['Guest', reservation.name],
                ['Date', reservation.date],
                ['Time', reservation.time],
                ['Guests', reservation.guests],
              ].map(([k, v]) => (
                <>
                  <span key={`k-${k}`} style={summaryKey}>{k}</span>
                  <span key={`v-${k}`} style={summaryVal}>{v}</span>
                </>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(90,138,58,0.15)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={summaryKey}>Reservation Deposit</span>
              <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.4rem', color: '#5a8a3a' }}>
                TZS {DEPOSIT_AMOUNT.toLocaleString()}
              </span>
            </div>
            <p style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '0.85rem', fontStyle: 'italic', color: '#a08c6b', marginTop: '0.25rem' }}>
              Deductible from your final bill
            </p>
          </div>

          {/* Phone input */}
          <div>
            <label style={fieldLabel}>M-Pesa Phone Number</label>
            <div style={{ display: 'flex' }}>
              <div style={{
                display: 'flex', alignItems: 'center', padding: '0 1rem',
                border: '1px solid rgba(139,115,85,0.3)', borderRight: 'none',
                background: 'rgba(90,138,58,0.04)',
                fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', color: '#8b7355',
                whiteSpace: 'nowrap',
              }}>
                🇹🇿 +255
              </div>
              <input
                type="tel"
                placeholder="07X XXX XXXX"
                value={mpesaPhone}
                onChange={(e) => { setMpesaPhone(e.target.value); setPhoneError('') }}
                style={{
                  flex: 1,
                  background: 'rgba(250,246,237,0.9)',
                  border: '1px solid rgba(139,115,85,0.3)',
                  padding: '0.75rem 1rem',
                  fontFamily: '"Crimson Text", Georgia, serif',
                  fontSize: '1rem',
                  color: '#2a1c0b',
                  outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = '#9a7a3a'}
                onBlur={e => e.target.style.borderColor = 'rgba(139,115,85,0.3)'}
              />
            </div>
            {phoneError && (
              <p style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '0.9rem', color: '#8b1a1a', marginTop: '0.35rem' }}>{phoneError}</p>
            )}
            <p style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '0.9rem', fontStyle: 'italic', color: '#a08c6b', marginTop: '0.35rem' }}>
              You'll receive an M-Pesa prompt on this number to approve TZS {DEPOSIT_AMOUNT.toLocaleString()}
            </p>
          </div>

          {/* Security note */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: 'rgba(196,168,130,0.08)', border: '1px solid rgba(139,115,85,0.15)', padding: '0.75rem 1rem' }}>
            <span style={{ color: '#9a7a3a', flexShrink: 0, marginTop: '2px' }}>✦</span>
            <p style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '0.9rem', fontStyle: 'italic', color: '#8b7355', margin: 0, lineHeight: 1.5 }}>
              Never share your M-Pesa PIN with anyone. We will never ask for it.
            </p>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={handleInitiate}
              style={{
                width: '100%', padding: '1rem',
                background: '#5a8a3a', color: '#faf6ed',
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                border: '1px solid #5a8a3a', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#4a7530'}
              onMouseLeave={e => e.currentTarget.style.background = '#5a8a3a'}
            >
              <MPesaLogo size={18} />
              Pay TZS {DEPOSIT_AMOUNT.toLocaleString()} via M-Pesa
            </button>
            <button
              onClick={onBack}
              style={{
                width: '100%', padding: '0.75rem',
                background: 'transparent', color: '#8b7355',
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                border: '1px solid rgba(139,115,85,0.3)', cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,115,85,0.06)'; e.currentTarget.style.color = '#6b4c23' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b7355' }}
            >
              Back to Details
            </button>
          </div>
        </div>
      )}

      {/* ── PUSHING ── */}
      {phase === 'pushing' && (
        <div style={{ textAlign: 'center', padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <Spinner />
          <div>
            <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.6rem', fontWeight: 300, color: '#2a1c0b', marginBottom: '0.5rem' }}>
              Sending Payment Request…
            </h3>
            <p style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', fontStyle: 'italic', color: '#8b7355' }}>
              Initiating M-Pesa STK push to <strong style={{ fontStyle: 'normal', color: '#3d2a12' }}>{formattedPhone}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MPesaLogo size={16} />
            <span style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a08c6b' }}>
              Vodacom M-Pesa · Secure
            </span>
          </div>
        </div>
      )}

      {/* ── WAITING ── */}
      {phase === 'waiting' && (
        <div style={{ textAlign: 'center', padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          {/* Phone graphic */}
          <div style={{
            width: '80px', height: '130px',
            border: '2px solid rgba(90,138,58,0.4)',
            borderRadius: '12px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: '#f2ebda',
            position: 'relative',
            boxShadow: '0 0 24px rgba(90,138,58,0.08)',
          }}>
            <div style={{ position: 'absolute', top: '6px', width: '24px', height: '3px', background: 'rgba(139,115,85,0.3)', borderRadius: '2px' }} />
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📲</div>
            <div style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a8a3a', textAlign: 'center', lineHeight: 1.4 }}>
              M-Pesa<br />Prompt Sent
            </div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', border: '2px solid rgba(90,138,58,0.25)', animation: 'ping 1.5s ease infinite' }} />
          </div>

          <div>
            <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.6rem', fontWeight: 300, color: '#2a1c0b', marginBottom: '0.5rem' }}>
              Check Your Phone
            </h3>
            <p style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', fontStyle: 'italic', color: '#8b7355', maxWidth: '300px', lineHeight: 1.6 }}>
              An M-Pesa prompt has been sent to <strong style={{ fontStyle: 'normal', color: '#3d2a12' }}>{formattedPhone}</strong>.{' '}
              Enter your <strong style={{ fontStyle: 'normal', color: '#5a8a3a' }}>M-Pesa PIN</strong> to confirm TZS {DEPOSIT_AMOUNT.toLocaleString()}.
            </p>
          </div>

          {/* Countdown ring */}
          <div style={{ width: '80px', height: '80px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(139,115,85,0.15)" strokeWidth="2" />
              <circle cx="40" cy="40" r="36" fill="none" stroke="#5a8a3a" strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${2 * Math.PI * 36 * (1 - countdown / 60)}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.5rem', color: '#5a8a3a', lineHeight: 1 }}>{countdown}</div>
              <div style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a08c6b' }}>secs</div>
            </div>
          </div>

          <div style={{ background: 'rgba(196,168,130,0.08)', border: '1px solid rgba(139,115,85,0.15)', padding: '0.75rem 1rem', maxWidth: '320px' }}>
            <p style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '0.9rem', fontStyle: 'italic', color: '#8b7355', margin: 0 }}>
              ⚠ Do not close this page. Your reservation will be held for <strong style={{ fontStyle: 'normal', color: '#6b4c23' }}>{countdown} seconds</strong>.
            </p>
          </div>
        </div>
      )}

      {/* ── SUCCESS ── */}
      {phase === 'success' && (
        <div style={{ textAlign: 'center', padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          {/* Success ring */}
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            border: '1px solid rgba(90,138,58,0.5)',
            background: 'rgba(90,138,58,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <svg width="28" height="28" fill="none" stroke="#5a8a3a" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <p style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(90,138,58,0.7)', marginBottom: '0.5rem' }}>
              Payment Confirmed
            </p>
            <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '2rem', fontWeight: 300, color: '#2a1c0b', marginBottom: '0.5rem' }}>
              You're All Set!
            </h3>
            <p style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', fontStyle: 'italic', color: '#8b7355', maxWidth: '300px' }}>
              TZS {DEPOSIT_AMOUNT.toLocaleString()} received via M-Pesa. Your table at <strong style={{ fontStyle: 'normal', color: '#6b4c23' }}>The Kaffeehaus</strong> is confirmed.
            </p>
          </div>

          {/* Receipt */}
          <div style={{ background: 'rgba(90,138,58,0.04)', border: '1px solid rgba(90,138,58,0.2)', padding: '1.25rem', textAlign: 'left', width: '100%', maxWidth: '340px' }}>
            <p style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(90,138,58,0.7)', marginBottom: '0.75rem' }}>
              Transaction Receipt
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 1rem' }}>
              {[
                ['Transaction ID', transactionId],
                ['Amount Paid', `TZS ${DEPOSIT_AMOUNT.toLocaleString()}`],
                ['Method', 'M-Pesa'],
                ['Phone', formattedPhone],
                ['Date / Time', `${reservation.date} · ${reservation.time}`],
                ['Guest', reservation.name],
              ].map(([k, v]) => (
                <>
                  <span key={`k-${k}`} style={summaryKey}>{k}</span>
                  <span key={`v-${k}`} style={{ ...summaryVal, color: k === 'Amount Paid' ? '#5a8a3a' : '#3d2a12', fontFamily: k === 'Transaction ID' ? 'monospace' : '"Crimson Text", Georgia, serif' }}>{v}</span>
                </>
              ))}
            </div>
          </div>

          <p style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '0.9rem', fontStyle: 'italic', color: '#a08c6b' }}>
            An SMS confirmation will be sent to {formattedPhone}. Your deposit is deductible from the final bill.
          </p>

          <button
            onClick={onComplete}
            className="btn-primary w-full py-4"
          >
            View Reservation Details
          </button>
        </div>
      )}

      {/* ── FAILED ── */}
      {phase === 'failed' && (
        <div style={{ textAlign: 'center', padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            border: '1px solid rgba(139,26,26,0.4)',
            background: 'rgba(139,26,26,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" fill="none" stroke="#8b1a1a" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.8rem', fontWeight: 300, color: '#2a1c0b', marginBottom: '0.5rem' }}>
              Payment Timed Out
            </h3>
            <p style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', fontStyle: 'italic', color: '#8b7355', maxWidth: '300px' }}>
              The M-Pesa prompt expired without a response. Please try again or call us to reserve by phone.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
            <button
              onClick={() => { setPhase('enter'); setCountdown(60) }}
              style={{
                width: '100%', padding: '1rem',
                background: '#5a8a3a', color: '#faf6ed',
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                border: '1px solid #5a8a3a', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#4a7530'}
              onMouseLeave={e => e.currentTarget.style.background = '#5a8a3a'}
            >
              <MPesaLogo size={16} />
              Try Again
            </button>
            <button
              onClick={onBack}
              style={{
                width: '100%', padding: '0.75rem',
                background: 'transparent', color: '#8b7355',
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                border: '1px solid rgba(139,115,85,0.3)', cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,115,85,0.06)'; e.currentTarget.style.color = '#6b4c23' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b7355' }}
            >
              Back to Details
            </button>
          </div>
        </div>
      )}
    </div>
  )
}