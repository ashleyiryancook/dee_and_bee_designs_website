import React, { useState, useMemo } from 'react'
import { useAuth } from '../App.jsx'

const portfolioModules = import.meta.glob('../data/portfolio/*.json', { eager: true })

function getPortfolio() {
  return Object.entries(portfolioModules).map(([path, mod]) => {
    const slug = path.split('/').pop().replace('.json', '')
    return { id: slug, ...mod.default }
  })
}

const CATEGORY_LABELS = {
  all:            'All',
  backpack:       'Backpacks',
  clutch:         'Clutches',
  crossbody:      'Crossbody',
  tote:           'Totes',
  wallet:         'Wallets',
  'shoulder-bag': 'Shoulder Bags',
  'mini-bag':     'Mini Bags',
  other:          'Other',
}

const CATEGORY_ORDER = ['all','backpack','clutch','crossbody','tote','wallet','shoulder-bag','mini-bag','other']

export default function Portfolio() {
  const { isAdmin } = useAuth()
  const allItems = useMemo(() => getPortfolio(), [])
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const availableFilters = useMemo(() => {
    const cats = new Set(allItems.map(i => i.category).filter(Boolean))
    return CATEGORY_ORDER.filter(c => c === 'all' || cats.has(c))
  }, [allItems])

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return allItems
    return allItems.filter(i => i.category === activeFilter)
  }, [allItems, activeFilter])

  return (
    <div style={{ minHeight: '100vh', padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontSize: '0.75rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '1rem',
          }}>Portfolio</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            textShadow: '0 0 30px rgba(0,184,255,0.2)',
          }}>
            My Work
          </h1>
          <div style={{
            width: '120px', height: '1px', margin: '1rem auto 1.5rem',
            background: 'linear-gradient(90deg, transparent, var(--blue), transparent)',
          }} />
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', fontStyle: 'italic' }}>
            Each piece was made to order for a specific client. Browse for inspiration, then create something uniquely yours.
          </p>
        </div>

        {/* Filter bar — only shows categories that have at least one bag */}
        {availableFilters.length > 1 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}>
            {availableFilters.map(cat => {
              const isActive = activeFilter === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    padding: '0.5rem 1.4rem',
                    background: isActive ? 'rgba(0,184,255,0.15)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--blue)' : 'rgba(0,184,255,0.2)'}`,
                    color: isActive ? 'var(--cyan)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textShadow: isActive ? '0 0 10px rgba(0,255,249,0.4)' : 'none',
                    boxShadow: isActive ? '0 0 14px rgba(0,184,255,0.2)' : 'none',
                  }}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              )
            })}
          </div>
        )}

        {/* Admin banner */}
        {isAdmin && (
          <div style={{
            marginBottom: '2rem', padding: '1rem 1.5rem',
            border: '1px solid rgba(255,0,193,0.3)',
            background: 'rgba(255,0,193,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1rem',
          }}>
            <p style={{ color: 'var(--pink)', fontSize: '0.85rem' }}>
              Admin mode — add, edit, or delete pieces in the CMS dashboard.
            </p>
            <a href="/admin" target="_blank" rel="noreferrer"
              className="btn-pink" style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}>
              Open CMS →
            </a>
          </div>
        )}

        {/* Result count */}
        <p style={{
          color: 'var(--text-dim)', fontSize: '0.8rem',
          letterSpacing: '0.1em', marginBottom: '2rem', textAlign: 'right',
        }}>
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          {activeFilter !== 'all' && ` — ${CATEGORY_LABELS[activeFilter]}`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {filtered.map(item => (
              <PortfolioCard key={item.id} item={item} onOpen={() => setLightbox(item)} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--text-muted)' }}>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
              No {CATEGORY_LABELS[activeFilter]?.toLowerCase()} pieces added yet.
            </p>
            <button onClick={() => setActiveFilter('all')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
              View All Pieces
            </button>
          </div>
        )}
      </div>

      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  )
}

function PortfolioCard({ item, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="glass-card"
      style={{ overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {/* Category pill on image */}
      {item.category && (
        <div style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 2,
          fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--blue)', background: 'rgba(5,5,26,0.85)',
          border: '1px solid rgba(0,184,255,0.35)', padding: '0.2rem 0.7rem',
          backdropFilter: 'blur(4px)',
        }}>
          {CATEGORY_LABELS[item.category] || item.category}
        </div>
      )}

      <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,5,26,0.85) 0%, transparent 60%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'flex-end', padding: '1.5rem',
        }}>
          <span style={{
            fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--cyan)', textShadow: '0 0 10px rgba(0,255,249,0.5)',
          }}>View Details</span>
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.6rem',
          color: 'var(--text-primary)', marginBottom: '0.5rem',
        }}>{item.title}</h3>
        <p style={{
          color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{item.description}</p>
      </div>
    </div>
  )
}

function Lightbox({ item, onClose }) {
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(5,5,26,0.96)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', overflowY: 'auto',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        maxWidth: '900px', width: '100%',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem', background: 'rgba(8,8,40,0.95)',
        border: '1px solid var(--border-blue)', padding: '2rem',
        position: 'relative', boxShadow: 'var(--glow-blue)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'none', border: 'none', color: 'var(--text-muted)',
          fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1, zIndex: 1,
        }}>✕</button>

        <img src={item.image} alt={item.title}
          style={{ width: '100%', height: '380px', objectFit: 'cover' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
          {item.category && (
            <span style={{
              fontSize: '0.7rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--blue)',
            }}>
              {CATEGORY_LABELS[item.category] || item.category}
            </span>
          )}
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '2.5rem',
            color: 'var(--cyan)', textShadow: '0 0 20px rgba(0,255,249,0.4)', lineHeight: 1.2,
          }}>{item.title}</h2>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, var(--blue), transparent)' }} />
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '1.05rem' }}>{item.description}</p>
          {item.tags && item.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {item.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'var(--blue)', border: '1px solid rgba(0,184,255,0.25)', padding: '0.2rem 0.6rem',
                }}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
