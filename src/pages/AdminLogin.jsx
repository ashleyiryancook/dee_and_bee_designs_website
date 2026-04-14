import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App.jsx'

export default function AdminLogin() {
  const { isAdmin, login, logout } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(password)
    if (success) {
      navigate('/portfolio')
    } else {
      setError('Incorrect password. Please try again.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setPassword('')
    }
  }

  if (isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '4rem 2rem', textAlign: 'center',
      }}>
        <div>
          <p style={{
            fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--cyan)',
            marginBottom: '1rem',
          }}>
            ✓ Admin Mode Active
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem', color: 'var(--text-primary)',
            marginBottom: '2rem',
          }}>
            You're logged in
          </h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/portfolio')} className="btn-primary">
              Go to Portfolio
            </button>
            <button onClick={() => { logout(); navigate('/') }} className="btn-secondary">
              Log Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '4rem 2rem',
    }}>
      <div style={{
        maxWidth: '380px', width: '100%',
        background: 'rgba(8, 8, 40, 0.9)',
        border: '1px solid rgba(0,184,255,0.2)',
        padding: '3rem 2.5rem',
        animation: shake ? 'shake 0.4s ease' : 'none',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: '0.5rem',
        }}>
          Admin Login
        </h2>
        <p style={{
          color: 'var(--text-dim)', fontSize: '0.8rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', textAlign: 'center', marginBottom: '2rem',
        }}>
          Dee & Bee Designs
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '0.5rem',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              placeholder="Enter admin password"
              autoFocus
              style={{
                width: '100%', padding: '0.9rem 1rem',
                background: 'rgba(0,184,255,0.04)',
                border: `1px solid ${error ? 'var(--pink)' : 'rgba(0,184,255,0.2)'}`,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem', outline: 'none',
              }}
            />
            {error && (
              <p style={{
                color: 'var(--pink)', fontSize: '0.8rem',
                marginTop: '0.5rem', fontStyle: 'italic',
              }}>
                {error}
              </p>
            )}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  )
}
