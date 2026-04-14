import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(0, 184, 255, 0.15)',
      padding: '3rem 2rem',
      textAlign: 'center',
      background: 'rgba(0, 0, 10, 0.6)',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          color: 'var(--text-primary)',
          textShadow: '0 0 20px rgba(0,184,255,0.3)',
          marginBottom: '0.5rem',
        }}>
          Dee & Bee Designs
        </h2>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          Handcrafted luxury handbags, made to order
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/portfolio">Portfolio</FooterLink>
          <FooterLink to="/custom-order">Custom Order</FooterLink>
        </div>

        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,184,255,0.3), transparent)',
          marginBottom: '1.5rem',
        }} />

        <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Dee & Bee Designs. All rights reserved.
        </p>

        {/* Subtle admin link */}
        <Link to="/admin" style={{
          display: 'inline-block',
          marginTop: '1.5rem',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
          textDecoration: 'none',
          opacity: 0.4,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.target.style.opacity = '1'}
        onMouseLeave={e => e.target.style.opacity = '0.4'}
        >
          Admin
        </Link>
      </div>
    </footer>
  )
}

function FooterLink({ to, children }) {
  return (
    <Link to={to} style={{
      fontFamily: 'var(--font-body)',
      fontSize: '0.85rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      textDecoration: 'none',
      transition: 'color 0.2s',
    }}
    onMouseEnter={e => e.target.style.color = 'var(--blue)'}
    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
    >
      {children}
    </Link>
  )
}
