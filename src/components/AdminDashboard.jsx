import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'marist22'

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', color: '#6b4c23', bg: 'rgba(107,76,35,0.08)',  border: 'rgba(107,76,35,0.3)'  },
  seated:    { label: 'Seated',    color: '#5a8a3a', bg: 'rgba(90,138,58,0.08)',  border: 'rgba(90,138,58,0.3)'  },
  no_show:   { label: 'No Show',   color: '#8b1a1a', bg: 'rgba(139,26,26,0.06)', border: 'rgba(139,26,26,0.25)' },
  cancelled: { label: 'Cancelled', color: '#a08c6b', bg: 'rgba(160,140,107,0.06)', border: 'rgba(160,140,107,0.25)' },
}

// ── Status Badge ──
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.confirmed
  return (
    <span style={{
      fontFamily: '"Libre Baskerville", Georgia, serif',
      fontSize: '0.5rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: cfg.color,
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      padding: '0.25rem 0.6rem',
    }}>
      {cfg.label}
    </span>
  )
}

// ── Reservation Card ──
function ReservationCard({ reservation, onStatusChange }) {
  const [updating, setUpdating] = useState(false)

  const handleStatus = async (newStatus) => {
    setUpdating(true)
    await onStatusChange(reservation.id, newStatus)
    setUpdating(false)
  }

  const actions = {
    confirmed: [
      { label: '✓ Mark as Seated', status: 'seated',  primary: true  },
      { label: '✕ No Show',        status: 'no_show', primary: false },
    ],
    seated:    [{ label: '↩ Unmark Seated', status: 'confirmed', primary: false }],
    no_show:   [{ label: '↩ Restore',       status: 'confirmed', primary: false }],
    cancelled: [],
  }

  const currentActions = actions[reservation.status] || []
  const isNoShow    = reservation.status === 'no_show'
  const isSeated    = reservation.status === 'seated'
  const isCancelled = reservation.status === 'cancelled'

  return (
    <div style={{
      background: isSeated ? 'rgba(90,138,58,0.05)' : '#f2ebda',
      border: `1px solid ${isNoShow ? 'rgba(139,26,26,0.2)' : isSeated ? 'rgba(90,138,58,0.25)' : 'rgba(139,115,85,0.25)'}`,
      padding: '1.25rem 1.5rem',
      opacity: isCancelled || isNoShow ? 0.6 : 1,
      transition: 'all 0.3s',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        inset: '3px',
        border: '1px solid rgba(139,115,85,0.08)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <span style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.4rem',
              fontWeight: 300,
              color: '#2a1c0b',
            }}>
              {reservation.name}
            </span>
            <StatusBadge status={reservation.status} />
          </div>

          <div style={{
            fontFamily: '"Crimson Text", Georgia, serif',
            fontSize: '0.95rem',
            color: '#8b7355',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25rem 1.25rem',
          }}>
            <span>🕐 {reservation.time?.slice(0, 5)}</span>
            <span>👥 {reservation.guests} guest{reservation.guests !== '1' ? 's' : ''}</span>
            <span>📞 {reservation.phone}</span>
          </div>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontFamily: '"Libre Baskerville", Georgia, serif',
            fontSize: '0.5rem',
            letterSpacing: '0.15em',
            color: '#c4a882',
            marginBottom: '0.3rem',
          }}>
            #{reservation.id}
          </div>
          <div style={{
            fontFamily: '"Crimson Text", Georgia, serif',
            fontSize: '0.9rem',
            color: '#5a8a3a',
          }}>
            TZS {Number(reservation.deposit_paid).toLocaleString()} ✓
          </div>
        </div>
      </div>

      {reservation.notes && (
        <div style={{
          background: 'rgba(154,122,58,0.06)',
          border: '1px solid rgba(154,122,58,0.2)',
          padding: '0.5rem 0.75rem',
          marginBottom: '0.75rem',
          fontFamily: '"Crimson Text", Georgia, serif',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          color: '#6b4c23',
        }}>
          <span style={{ fontStyle: 'normal', fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a7a3a', marginRight: '0.5rem' }}>Note:</span>
          {reservation.notes}
        </div>
      )}

      {currentActions.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {currentActions.map((action) => (
            <button
              key={action.status}
              onClick={() => handleStatus(action.status)}
              disabled={updating}
              className={action.primary ? 'btn-primary' : 'btn-outline'}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.6rem', opacity: updating ? 0.5 : 1 }}
            >
              {updating ? '...' : action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Dashboard ──
export default function AdminDashboard() {
  const navigate = useNavigate()

  // Guard: redirect to login if not authenticated
  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') {
      navigate('/admin', { replace: true })
    }
  }, [navigate])

  const [date, setDate]               = useState(new Date().toISOString().split('T')[0])
  const [reservations, setReservations] = useState([])
  const [summary, setSummary]         = useState({})
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [lastRefresh, setLastRefresh] = useState(null)

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ date })
      if (filterStatus !== 'all') params.append('status', filterStatus)

      const res = await fetch(`/api/reservations-list?${params}`, {
        headers: { 'x-admin-password': ADMIN_PASSWORD },
      })

      if (res.status === 401) {
        sessionStorage.removeItem('admin_auth')
        navigate('/admin', { replace: true })
        return
      }

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setReservations(data.reservations)
      setSummary(data.summary)
      setLastRefresh(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [date, filterStatus, navigate])

  useEffect(() => {
    fetchReservations()
    const interval = setInterval(fetchReservations, 60000)
    return () => clearInterval(interval)
  }, [fetchReservations])

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch('/api/reservations-update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': ADMIN_PASSWORD,
        },
        body: JSON.stringify({ id, status }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
      setSummary((prev) => {
        const updated = { ...prev }
        const oldStatus = reservations.find((r) => r.id === id)?.status
        if (oldStatus) updated[oldStatus] = String(Math.max(0, Number(updated[oldStatus]) - 1))
        updated[status] = String(Number(updated[status] || 0) + 1)
        return updated
      })
    } catch (err) {
      alert('Failed to update: ' + err.message)
    }
  }

  const handleSignOut = () => {
    sessionStorage.removeItem('admin_auth')
    navigate('/admin', { replace: true })
  }

  const filtered = filterStatus === 'all'
    ? reservations
    : reservations.filter((r) => r.status === filterStatus)

  const summaryItems = [
    { key: 'total',     label: 'Total',     color: '#2a1c0b' },
    { key: 'confirmed', label: 'Confirmed',  color: '#6b4c23' },
    { key: 'seated',    label: 'Seated',     color: '#5a8a3a' },
    { key: 'no_show',   label: 'No Shows',   color: '#8b1a1a' },
  ]

  const filterTabs = ['all', 'confirmed', 'seated', 'no_show', 'cancelled']

  return (
    <div style={{ minHeight: '100vh', background: '#faf6ed', color: '#2a1c0b' }}>

      {/* ── Header ── */}
      <div style={{
        borderBottom: '1px solid rgba(139,115,85,0.25)',
        padding: '1rem 2rem',
        background: '#f2ebda',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>

          <div>
            <div style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.5rem',
              fontWeight: 300,
              color: '#2a1c0b',
            }}>
              The Kaffeehaus
            </div>
            <div style={{
              fontFamily: '"Libre Baskerville", Georgia, serif',
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#9a7a3a',
            }}>
              Reservations Dashboard
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-classic"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', colorScheme: 'light' }}
            />
            <button
              onClick={fetchReservations}
              disabled={loading}
              className="btn-outline"
              style={{ padding: '0.5rem 1rem' }}
            >
              {loading ? '...' : '↻ Refresh'}
            </button>
            <button
              onClick={handleSignOut}
              style={{
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a08c6b',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem' }}>

        {/* ── Summary cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {summaryItems.map((s) => (
            <div key={s.key} className="card-classic" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '2.5rem',
                fontWeight: 300,
                color: s.color,
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}>
                {summary[s.key] || 0}
              </div>
              <div style={{
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#a08c6b',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Filter tabs ── */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {filterTabs.map((s) => {
            const isActive = filterStatus === s
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  fontFamily: '"Libre Baskerville", Georgia, serif',
                  fontSize: '0.5rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '0.4rem 0.9rem',
                  border: `1px solid ${isActive ? 'rgba(107,76,35,0.6)' : 'rgba(139,115,85,0.25)'}`,
                  background: isActive ? 'rgba(107,76,35,0.08)' : 'transparent',
                  color: isActive ? '#6b4c23' : '#a08c6b',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {s === 'all' ? 'All' : s === 'no_show' ? 'No Show' : s.charAt(0).toUpperCase() + s.slice(1)}
                {s !== 'all' && summary[s] ? ` (${summary[s]})` : ''}
              </button>
            )
          })}
        </div>

        {lastRefresh && (
          <p style={{
            fontFamily: '"Crimson Text", Georgia, serif',
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: '#c4a882',
            marginBottom: '1rem',
          }}>
            Last refreshed: {lastRefresh.toLocaleTimeString()} · Auto-refreshes every 60s
          </p>
        )}

        <div className="section-divider" style={{ marginBottom: '1.5rem' }} />

        {error && (
          <div style={{
            background: 'rgba(139,26,26,0.05)',
            border: '1px solid rgba(139,26,26,0.2)',
            padding: '1rem',
            marginBottom: '1rem',
            fontFamily: '"Crimson Text", Georgia, serif',
            fontSize: '1rem',
            color: '#8b1a1a',
            fontStyle: 'italic',
          }}>
            {error}
          </div>
        )}

        {loading && reservations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '2rem',
              color: '#c4a882',
              marginBottom: '0.75rem',
              animation: 'pulse 2s infinite',
            }}>
              ✦
            </div>
            <p style={{
              fontFamily: '"Crimson Text", Georgia, serif',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: '#a08c6b',
            }}>
              Loading reservations...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 0',
            border: '1px solid rgba(139,115,85,0.2)',
          }}>
            <div style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '2.5rem',
              color: '#c4a882',
              marginBottom: '0.75rem',
            }}>
              ◇
            </div>
            <p style={{
              fontFamily: '"Crimson Text", Georgia, serif',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#a08c6b',
            }}>
              {reservations.length === 0
                ? `No reservations for ${date}`
                : `No ${filterStatus.replace('_', ' ')} reservations`}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map((r) => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}