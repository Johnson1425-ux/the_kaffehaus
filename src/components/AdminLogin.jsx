import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'marist22'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      // Store auth in sessionStorage so dashboard can verify
      sessionStorage.setItem('admin_auth', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#faf6ed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>

        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '2rem',
            fontWeight: 300,
            color: '#2a1c0b',
            marginBottom: '0.25rem',
          }}>
            The Kaffeehaus
          </div>
          <div style={{
            fontFamily: '"Libre Baskerville", Georgia, serif',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#9a7a3a',
          }}>
            Staff Portal
          </div>
        </div>

        {/* Card */}
        <div className="card-classic" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8b7355',
                marginBottom: '0.5rem',
              }}>
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                onKeyDown={handleKeyDown}
                placeholder="Enter password"
                autoFocus
                className="input-classic"
                style={{ width: '100%', padding: '0.75rem 1rem', boxSizing: 'border-box' }}
              />
            </div>

            {error && (
              <p style={{
                fontFamily: '"Crimson Text", Georgia, serif',
                fontSize: '0.95rem',
                color: '#8b1a1a',
                fontStyle: 'italic',
                margin: 0,
              }}>
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              className="btn-primary"
              style={{ padding: '0.85rem', width: '100%' }}
            >
              Login
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}