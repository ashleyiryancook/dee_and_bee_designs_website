import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const heroRef = useRef(null)

  useEffect(() => {
    // Fade in on mount
    if (heroRef.current) {
      heroRef.current.style.opacity = '0'
      heroRef.current.style.transform = 'translateY(20px)'
      requestAnimationFrame(() => {
        heroRef.current.style.transition = 'opacity 1s ease, transform 1s ease'
        heroRef.current.style.opacity = '1'
        heroRef.current.style.transform = 'translateY(0)'
      })
    }
  }, [])

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative grid lines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,184,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,184,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        {/* Glow orbs */}
        <div style={{
          position: 'absolute',
          top: '20%', left: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(73,0,255,0.15), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%', right: '10%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(0,184,255,0.1), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div ref={heroRef} style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          {/* Eyebrow */}
          <p style={{
            fontSize: '0.8rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            textShadow: '0 0 10px rgba(0,184,255,0.5)',
            marginBottom: '1.5rem',
          }}>
            Bespoke · Handcrafted · One of a Kind
          </p>

          {/* Main title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: '1rem',
            textShadow: '0 0 40px rgba(0,184,255,0.2)',
          }}>
            Dee & Bee Designs
          </h1>

          {/* Neon underline */}
          <div style={{
            width: '200px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
            margin: '0 auto 2rem',
            boxShadow: '0 0 8px rgba(0,255,249,0.6)',
          }} />

          {/* Tagline */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            marginBottom: '3rem',
            lineHeight: 1.8,
          }}>
            Handcrafted luxury handbags, designed and made to order.<br />
            Every piece is created fresh — just for you.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/portfolio" className="btn-primary">
              View My Work
            </Link>
            <Link to="/custom-order" className="btn-secondary">
              Request a Custom Bag
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-dim)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          <span>Scroll</span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--blue), transparent)',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
        </div>
      </section>

      {/* About / Process section */}
      <section className="section" style={{
        padding: '6rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            marginBottom: '1rem',
          }}>The process</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--text-primary)',
          }}>
            How It Works
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
        }}>
          {[
            {
              number: '01',
              title: 'Share Your Vision',
              body: 'Tell me about the bag you dream of — the style, size, occasion, colors, and any special details. Submit your inspiration through my custom order form.',
              color: 'var(--blue)',
            },
            {
              number: '02',
              title: 'We Collaborate',
              body: 'I\'ll reach out to discuss materials, hardware, and design details. Together we\'ll refine your vision until every element feels exactly right.',
              color: 'var(--purple)',
            },
            {
              number: '03',
              title: 'Handcrafted for You',
              body: 'Your bag is made entirely by hand, one careful stitch at a time. I use only quality materials and take pride in every detail — no shortcuts, ever.',
              color: 'var(--cyan)',
            },
          ].map((step) => (
            <div key={step.number} className="glass-card" style={{
              padding: '2.5rem',
              position: 'relative',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                color: step.color,
                opacity: 0.2,
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                lineHeight: 1,
              }}>
                {step.number}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                color: step.color,
                textShadow: `0 0 15px ${step.color}66`,
                marginBottom: '1rem',
              }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'rgba(0, 184, 255, 0.03)',
        borderTop: '1px solid rgba(0,184,255,0.1)',
        borderBottom: '1px solid rgba(0,184,255,0.1)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            marginBottom: '1rem',
          }}>About</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            marginBottom: '2rem',
          }}>
            The Story Behind the Studio
          </h2>
          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.9,
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            marginBottom: '1.5rem',
          }}>
            Every bag that leaves my studio is a one-of-a-kind creation. I don't keep inventory — because I believe a truly special handbag should be made with its owner in mind from the very first stitch.
          </p>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.9,
            color: 'var(--text-muted)',
            marginBottom: '3rem',
          }}>
            Whether you're looking for an heirloom-quality tote, a show-stopping evening clutch, or something entirely unique that you've never been able to find — I'd love to make it for you.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/portfolio" className="btn-primary">See My Work</Link>
            <Link to="/custom-order" className="btn-pink">Start Your Order</Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
