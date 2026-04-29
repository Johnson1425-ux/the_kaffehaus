import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import MPesaPayment from './MPesaPayment'

const DEPOSIT = 5000

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
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.7rem',
                fontWeight: 700,
                border: done ? '1px solid #5a8a3a' : active ? '1px solid #6b4c23' : '1px solid rgba(139,115,85,0.35)',
                background: done ? 'rgba(90,138,58,0.1)' : active ? 'rgba(107,76,35,0.08)' : 'transparent',
                color: done ? '#5a8a3a' : active ? '#6b4c23' : '#a08c6b',
                transition: 'all 0.4s',
              }}>
                {done ? '✓' : idx}
              </div>
              <span style={{
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: done ? '#5a8a3a' : active ? '#6b4c23' : '#a08c6b',
                marginTop: '6px',
              }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: '64px',
                height: '1px',
                background: done ? 'rgba(90,138,58,0.4)' : 'rgba(139,115,85,0.2)',
                margin: '0 4px',
                marginBottom: '20px',
                transition: 'all 0.4s',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  background: 'rgba(250,246,237,0.9)',
  border: '1px solid rgba(139,115,85,0.3)',
  padding: '0.75rem 1rem',
  fontFamily: '"Crimson Text", Georgia, serif',
  fontSize: '1.05rem',
  color: '#2a1c0b',
  outline: 'none',
  transition: 'border-color 0.25s',
  boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block',
  fontFamily: '"Libre Baskerville", Georgia, serif',
  fontSize: '0.6rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#8b7355',
  marginBottom: '0.5rem',
}

export default function Reserve() {
  const ref = useReveal()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' })

  const times = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','18:00','19:00','20:00','21:00','22:00']

  const handleDetailsSubmit = (e) => {
    e.preventDefault()
    setStep(2)
    setTimeout(() => {
      const el = document.getElementById('reserve')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <section id="reserve" className="py-28 px-6 relative" style={{ background: '#faf6ed' }}>

      <div ref={ref} className="reveal max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p style={{
            fontFamily: '"Libre Baskerville", Georgia, serif',
            fontSize: '0.62rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#9a7a3a',
            marginBottom: '1rem',
          }}>
            Make a Reservation
          </p>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: '#2a1c0b',
            marginBottom: '0.4rem',
          }}>
            Reserve Your Table
          </h2>
          <h2 style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontStyle: 'italic',
            color: '#6b4c23',
            marginBottom: '1rem',
          }}>
            Tonight
          </h2>
          <p style={{
            fontFamily: '"Crimson Text", Georgia, serif',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: '#8b7355',
            maxWidth: '380px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
          }}>
            Secure your seat before peak hours fill up. Confirm with a quick M-Pesa deposit — deductible from your bill.
          </p>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #9a7a3a, transparent)', margin: '0 auto 1.5rem' }} />

          {/* Payment badges */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a08c6b' }}>
              Accepted:
            </span>
            {[
              { label: 'M-PESA', bg: 'rgba(227,24,55,0.06)', border: 'rgba(227,24,55,0.25)', color: '#8b1a1a' },
              { label: 'CASH', bg: 'rgba(139,115,85,0.08)', border: 'rgba(139,115,85,0.25)', color: '#6b4c23' },
              { label: 'TIGOPESA', bg: 'rgba(37,99,185,0.06)', border: 'rgba(37,99,185,0.2)', color: '#1a3a6b' },
            ].map(b => (
              <span key={b.label} style={{
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: b.bg,
                border: `1px solid ${b.border}`,
                color: b.color,
                padding: '0.3rem 0.75rem',
              }}>
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <form onSubmit={handleDetailsSubmit} className="card-classic p-8 md:p-12" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Steps current={1} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>Full Name</label>
                <input required type="text" placeholder="Your name" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#9a7a3a'}
                  onBlur={e => e.target.style.borderColor = 'rgba(139,115,85,0.3)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone / WhatsApp</label>
                <input required type="tel" placeholder="+255 ..." value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#9a7a3a'}
                  onBlur={e => e.target.style.borderColor = 'rgba(139,115,85,0.3)'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>Date</label>
                <input required type="date" value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  style={{ ...inputStyle, colorScheme: 'light' }}
                  onFocus={e => e.target.style.borderColor = '#9a7a3a'}
                  onBlur={e => e.target.style.borderColor = 'rgba(139,115,85,0.3)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Time</label>
                <select required value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => e.target.style.borderColor = '#9a7a3a'}
                  onBlur={e => e.target.style.borderColor = 'rgba(139,115,85,0.3)'}
                >
                  <option value="">Select time</option>
                  {times.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Number of Guests</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                {['1','2','3','4','5','6','7+'].map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm({ ...form, guests: g })}
                    style={{
                      width: '44px',
                      height: '44px',
                      fontFamily: '"Crimson Text", Georgia, serif',
                      fontSize: '1rem',
                      border: form.guests === g ? '1px solid #6b4c23' : '1px solid rgba(139,115,85,0.3)',
                      background: form.guests === g ? '#6b4c23' : 'transparent',
                      color: form.guests === g ? '#faf6ed' : '#8b7355',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                Special Requests <span style={{ textTransform: 'none', letterSpacing: 0, fontStyle: 'italic', color: '#c4a882' }}>(optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Dietary requirements, occasion, preferred seating..."
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => e.target.style.borderColor = '#9a7a3a'}
                onBlur={e => e.target.style.borderColor = 'rgba(139,115,85,0.3)'}
              />
            </div>

            {/* Deposit notice */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              background: 'rgba(90,138,58,0.05)',
              border: '1px solid rgba(90,138,58,0.2)',
              padding: '1rem',
            }}>
              <span style={{ color: '#5a8a3a', fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>✦</span>
              <p style={{
                fontFamily: '"Crimson Text", Georgia, serif',
                fontSize: '1rem',
                color: '#5e4b2a',
                lineHeight: 1.5,
                margin: 0,
              }}>
                A <strong style={{ color: '#5a8a3a', fontWeight: 600 }}>TZS {DEPOSIT.toLocaleString()} M-Pesa deposit</strong> is required to hold your table. It will be deducted from your final bill.
              </p>
            </div>

            <button type="submit" className="btn-primary w-full py-4" style={{ fontSize: '0.7rem' }}>
              Continue to M-Pesa Payment →
            </button>

            <p style={{
              textAlign: 'center',
              fontFamily: '"Crimson Text", Georgia, serif',
              fontSize: '0.85rem',
              fontStyle: 'italic',
              color: '#a08c6b',
            }}>
              Powered by Vodacom M-Pesa · Secure · Instant confirmation
            </p>
          </form>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <MPesaPayment reservation={form} onBack={() => setStep(1)} onComplete={() => setStep(3)} />
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div className="card-classic p-8 md:p-12 text-center">
            <Steps current={3} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '3rem',
                color: '#9a7a3a',
                lineHeight: 1,
              }}>
                ❧
              </div>
              <div>
                <p style={{
                  fontFamily: '"Libre Baskerville", Georgia, serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#5a8a3a',
                  marginBottom: '0.75rem',
                }}>
                  Reservation Confirmed
                </p>
                <h3 style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '2.2rem',
                  fontWeight: 300,
                  color: '#2a1c0b',
                  marginBottom: '0.25rem',
                }}>
                  Welcome,{' '}
                  <em style={{ fontFamily: '"IM Fell English", Georgia, serif', color: '#6b4c23' }}>{form.name}</em>
                </h3>
                <p style={{
                  fontFamily: '"Crimson Text", Georgia, serif',
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  color: '#7d6640',
                  maxWidth: '380px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}>
                  Your table at The Kaffeehaus is confirmed for{' '}
                  <strong style={{ color: '#3d2a12', fontStyle: 'normal' }}>{form.date}</strong> at{' '}
                  <strong style={{ color: '#3d2a12', fontStyle: 'normal' }}>{form.time}</strong> for{' '}
                  <strong style={{ color: '#3d2a12', fontStyle: 'normal' }}>{form.guests} guest{form.guests !== '1' ? 's' : ''}</strong>.
                </p>
              </div>

              {/* Summary */}
              <div style={{
                background: '#f2ebda',
                border: '1px solid rgba(139,115,85,0.2)',
                padding: '1.5rem',
                maxWidth: '340px',
                width: '100%',
                textAlign: 'left',
              }}>
                {[
                  ['Deposit paid', `TZS ${DEPOSIT.toLocaleString()} ✓`, '#5a8a3a'],
                  ['Payment method', 'M-Pesa', '#3d2a12'],
                  ...(form.notes ? [['Special request', form.notes, '#3d2a12']] : []),
                ].map(([key, val, valColor]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', color: '#8b7355' }}>{key}</span>
                    <span style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: '1rem', color: valColor, textAlign: 'right' }}>{val}</span>
                  </div>
                ))}
              </div>

              <p style={{
                fontFamily: '"Crimson Text", Georgia, serif',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                color: '#a08c6b',
              }}>
                A confirmation SMS has been sent to {form.phone}. We look forward to welcoming you.
              </p>

              <button
                onClick={() => { setStep(1); setForm({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' }) }}
                style={{
                  fontFamily: '"Libre Baskerville", Georgia, serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#9a7a3a',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
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