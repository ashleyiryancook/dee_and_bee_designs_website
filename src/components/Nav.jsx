import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../App.jsx'

export default function Nav() {
  const { isAdmin, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: 'var(--nav-height)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      background: scrolled
        ? 'rgba(5, 5, 26, 0.95)'
        : 'rgba(5, 5, 26, 0.6)',
      backdropFilter: 'blur(16px)',
      borderBottom: scrolled
        ? '1px solid rgba(0, 184, 255, 0.2)'
        : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <Link to="/" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        color: 'var(--text-primary)',
        textDecoration: 'none',
        textShadow: '0 0 20px rgba(0, 184, 255, 0.4)',
        flexShrink: 0,
      }}>
        Dee & Bee Designs
      </Link>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Desktop nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/portfolio">Portfolio</NavItem>
        <NavItem to="/custom-order">Custom Order</NavItem>

        {isAdmin && (
          <span style={{
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--pink)',
            border: '1px solid var(--pink)',
            padding: '0.2rem 0.6rem',
            textShadow: '0 0 10px rgba(255,0,193,0.5)',
          }}>
            Admin
          </span>
        )}

        {isAdmin ? (
          <button onClick={logout} style={{
            background: 'none',
            border: '1px solid rgba(240,232,255,0.2)',
            color: 'var(--text-muted)',
            padding: '0.3rem 0.8rem',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'var(--font-body)',
          }}
          onMouseEnter={e => e.target.style.borderColor = 'var(--blue)'}
          onMouseLeave={e => e.target.style.borderColor = 'rgba(240,232,255,0.2)'}
          >
            Logout
          </button>
        ) : null}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'var(--blue)',
          fontSize: '1.5rem',
          cursor: 'pointer',
        }}
        className="hamburger"
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--nav-height)',
          left: 0, right: 0,
          background: 'rgba(5, 5, 26, 0.98)',
          borderBottom: '1px solid var(--border-blue)',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          <MobileNavItem to="/" onClick={() => setMenuOpen(false)}>Home</MobileNavItem>
          <MobileNavItem to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</MobileNavItem>
          <MobileNavItem to="/custom-order" onClick={() => setMenuOpen(false)}>Custom Order</MobileNavItem>
          {isAdmin && <button onClick={() => { logout(); setMenuOpen(false) }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1rem', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Logout</button>}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}

function NavItem({ to, children }) {
  return (
    <NavLink to={to} style={({ isActive }) => ({
      fontFamily: 'var(--font-body)',
      fontSize: '0.9rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: isActive ? 'var(--cyan)' : 'var(--text-muted)',
      textDecoration: 'none',
      textShadow: isActive ? '0 0 12px rgba(0,255,249,0.5)' : 'none',
      transition: 'all 0.2s',
      paddingBottom: '2px',
      borderBottom: isActive ? '1px solid var(--cyan)' : '1px solid transparent',
    })}>
      {children}
    </NavLink>
  )
}

function MobileNavItem({ to, children, onClick }) {
  return (
    <NavLink to={to} onClick={onClick} style={({ isActive }) => ({
      fontFamily: 'var(--font-body)',
      fontSize: '1.1rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: isActive ? 'var(--cyan)' : 'var(--text-primary)',
      textDecoration: 'none',
    })}>
      {children}
    </NavLink>
  )
}
