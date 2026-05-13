import { useState, useEffect, useCallback } from 'react'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'marist22'

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', color: 'text-blue-400',   bg: 'bg-blue-950/40',  border: 'border-blue-800/40'  },
  seated:    { label: 'Seated',    color: 'text-emerald-400', bg: 'bg-emerald-950/40', border: 'border-emerald-800/40' },
  no_show:   { label: 'No Show',   color: 'text-red-400',    bg: 'bg-red-950/40',   border: 'border-red-800/40'   },
  cancelled: { label: 'Cancelled', color: 'text-stone-500',  bg: 'bg-stone-900/40', border: 'border-stone-800'    },
}

function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-serif text-3xl text-gradient-gold mb-2">The Kaffeehaus</div>
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-stone-500">Staff Portal</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 rounded-sm space-y-5">
          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Enter password"
              className="w-full bg-transparent border border-gold-500/20 px-4 py-3 font-sans text-sm text-stone-200 placeholder-stone-700 focus:outline-none focus:border-gold-500/50 rounded-sm transition-colors"
              autoFocus
            />
          </div>

          {error && (
            <p className="font-sans text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gold-500 text-charcoal-900 font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:bg-gold-400 transition-all duration-300 rounded-sm"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.confirmed
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-sm font-sans text-[10px] tracking-[0.15em] uppercase font-medium ${cfg.color} ${cfg.bg} border ${cfg.border}`}>
      {cfg.label}
    </span>
  )
}

function ReservationCard({ reservation, onStatusChange, loading }) {
  const [updating, setUpdating] = useState(false)

  const handleStatus = async (newStatus) => {
    setUpdating(true)
    await onStatusChange(reservation.id, newStatus)
    setUpdating(false)
  }

  const actions = {
    confirmed: [
      { label: '✓ Mark Seated', status: 'seated',    style: 'bg-emerald-700 hover:bg-emerald-600 text-white' },
      { label: '✕ No Show',     status: 'no_show',   style: 'bg-red-900/60 hover:bg-red-800 text-red-300 border border-red-800/50' },
    ],
    seated: [
      { label: '↩ Unmark',      status: 'confirmed', style: 'bg-stone-800 hover:bg-stone-700 text-stone-300' },
    ],
    no_show: [
      { label: '↩ Restore',     status: 'confirmed', style: 'bg-stone-800 hover:bg-stone-700 text-stone-300' },
    ],
    cancelled: [],
  }

  const currentActions = actions[reservation.status] || []

  return (
    <div className={`border rounded-sm p-5 transition-all duration-300 ${
      reservation.status === 'seated'  ? 'border-emerald-800/40 bg-emerald-950/10' :
      reservation.status === 'no_show' ? 'border-red-800/30 bg-red-950/10 opacity-60' :
      reservation.status === 'cancelled' ? 'border-stone-800 opacity-40' :
      'border-gold-500/15 bg-stone-900/20'
    }`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="font-serif text-lg text-stone-100">{reservation.name}</span>
            <StatusBadge status={reservation.status} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-stone-500">
            <span>🕐 {reservation.time?.slice(0, 5)}</span>
            <span>👥 {reservation.guests} guest{reservation.guests !== '1' ? 's' : ''}</span>
            <span>📞 {reservation.phone}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-sans text-[10px] text-stone-600 mb-1">#{reservation.id}</div>
          <div className="font-sans text-xs text-emerald-500">TZS {Number(reservation.deposit_paid).toLocaleString()} ✓</div>
        </div>
      </div>

      {reservation.notes && (
        <div className="mb-4 px-3 py-2 bg-amber-950/20 border border-amber-900/20 rounded-sm">
          <span className="font-sans text-[10px] text-amber-400/70 tracking-wider uppercase">Note: </span>
          <span className="font-sans text-xs text-stone-400">{reservation.notes}</span>
        </div>
      )}

      {currentActions.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {currentActions.map((action) => (
            <button
              key={action.status}
              onClick={() => handleStatus(action.status)}
              disabled={updating || loading}
              className={`px-4 py-2 font-sans text-xs tracking-wider rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${action.style}`}
            >
              {updating ? '...' : action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [reservations, setReservations] = useState([])
  const [summary, setSummary] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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
        setLoggedIn(false)
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
  }, [date, filterStatus])

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!loggedIn) return
    fetchReservations()
    const interval = setInterval(fetchReservations, 60000)
    return () => clearInterval(interval)
  }, [loggedIn, fetchReservations])

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

      // Update local state immediately
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      )

      // Update summary counts
      setSummary((prev) => {
        const updated = { ...prev }
        const oldStatus = reservations.find((r) => r.id === id)?.status
        if (oldStatus && updated[oldStatus]) updated[oldStatus] = String(Number(updated[oldStatus]) - 1)
        if (updated[status] !== undefined) updated[status] = String(Number(updated[status]) + 1)
        return updated
      })
    } catch (err) {
      alert('Failed to update: ' + err.message)
    }
  }

  const filtered = filterStatus === 'all'
    ? reservations
    : reservations.filter((r) => r.status === filterStatus)

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />

  return (
    <div className="min-h-screen bg-charcoal-900 text-stone-100">

      {/* Header */}
      <div className="border-b border-gold-500/10 px-6 py-4 bg-charcoal-900/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-serif text-xl text-gradient-gold">The Kaffeehaus</div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-600">Reservations Dashboard</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Date picker */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-stone-900 border border-stone-800 px-3 py-2 font-sans text-sm text-stone-300 focus:outline-none focus:border-gold-500/50 rounded-sm"
              style={{ colorScheme: 'dark' }}
            />

            {/* Refresh */}
            <button
              onClick={fetchReservations}
              disabled={loading}
              className="px-4 py-2 border border-stone-800 text-stone-400 hover:border-gold-500/40 hover:text-gold-400 font-sans text-xs tracking-wider rounded-sm transition-all duration-200 disabled:opacity-50"
            >
              {loading ? '...' : '↻ Refresh'}
            </button>

            {/* Logout */}
            <button
              onClick={() => setLoggedIn(false)}
              className="px-4 py-2 font-sans text-xs text-stone-600 hover:text-stone-400 tracking-wider rounded-sm transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { key: 'total',     label: 'Total',     color: 'text-stone-300'  },
            { key: 'confirmed', label: 'Confirmed',  color: 'text-blue-400'   },
            { key: 'seated',    label: 'Seated',     color: 'text-emerald-400'},
            { key: 'no_show',   label: 'No Shows',   color: 'text-red-400'    },
          ].map((s) => (
            <div key={s.key} className="border border-gold-500/10 p-4 rounded-sm text-center">
              <div className={`font-serif text-3xl mb-1 ${s.color}`}>
                {summary[s.key] || 0}
              </div>
              <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-600">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['all', 'confirmed', 'seated', 'no_show', 'cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 font-sans text-[10px] tracking-[0.15em] uppercase border rounded-sm transition-all duration-200 ${
                filterStatus === s
                  ? 'border-gold-500 text-gold-400 bg-gold-500/8'
                  : 'border-stone-800 text-stone-600 hover:border-stone-700 hover:text-stone-400'
              }`}
            >
              {s === 'all' ? 'All' : s === 'no_show' ? 'No Show' : s.charAt(0).toUpperCase() + s.slice(1)}
              {s !== 'all' && summary[s] ? ` (${summary[s]})` : ''}
            </button>
          ))}
        </div>

        {/* Last refresh */}
        {lastRefresh && (
          <p className="font-sans text-[10px] text-stone-700 mb-4 tracking-wider">
            Last refreshed: {lastRefresh.toLocaleTimeString()} · Auto-refreshes every 60s
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="border border-red-900/40 bg-red-950/20 p-4 rounded-sm mb-6">
            <p className="font-sans text-xs text-red-400">{error}</p>
          </div>
        )}

        {/* Reservations list */}
        {loading && reservations.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border border-stone-700 border-t-gold-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="font-sans text-xs text-stone-600 tracking-wider">Loading reservations...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-stone-800 rounded-sm">
            <div className="font-serif text-4xl text-stone-800 mb-3">◇</div>
            <p className="font-sans text-sm text-stone-600">
              {reservations.length === 0
                ? `No reservations for ${date}`
                : `No ${filterStatus} reservations`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r) => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onStatusChange={handleStatusChange}
                loading={loading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}