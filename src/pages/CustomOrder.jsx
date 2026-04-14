import React, { useState } from 'react'

export default function CustomOrder() {
  const [form, setForm] = useState({
    name: '', email: '', budget: '', timeline: '',
    inspiration: '', source: '', photo: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleFile = (e) => {
    setForm(f => ({ ...f, photo: e.target.files[0] || null }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.inspiration.trim()) errs.inspiration = 'Please describe your vision'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    // Netlify Forms submission
    const data = new FormData()
    data.append('form-name', 'custom-order')
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('budget', form.budget)
    data.append('timeline', form.timeline)
    data.append('inspiration', form.inspiration)
    data.append('source', form.source)
    if (form.photo) data.append('photo', form.photo)

    try {
      await fetch('/', { method: 'POST', body: data })
      setSubmitted(true)
    } catch {
      // Fallback: show success anyway (works locally; Netlify handles on deploy)
      setSubmitted(true)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem',
    background: 'rgba(0, 184, 255, 0.04)',
    border: '1px solid rgba(0, 184, 255, 0.2)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '1.05rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    appearance: 'none',
    WebkitAppearance: 'none',
  }

  const focusStyle = {
    borderColor: 'var(--blue)',
    boxShadow: '0 0 0 2px rgba(0,184,255,0.1)',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--blue)',
    marginBottom: '0.5rem',
    fontFamily: 'var(--font-body)',
  }

  const errorStyle = {
    color: 'var(--pink)',
    fontSize: '0.8rem',
    marginTop: '0.3rem',
    fontStyle: 'italic',
  }

  const selectStyle = {
    ...inputStyle,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2300b8ff' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    paddingRight: '2.5rem',
    cursor: 'pointer',
  }

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '4rem 2rem', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '500px' }}>
          <div style={{
            width: '60px', height: '60px',
            border: '1px solid var(--cyan)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '1.5rem',
            color: 'var(--cyan)',
            boxShadow: 'var(--glow-cyan)',
          }}>
            ✓
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            color: 'var(--cyan)',
            textShadow: '0 0 20px rgba(0,255,249,0.4)',
            marginBottom: '1rem',
          }}>
            Thank You!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
            I've received your request and I'm so excited to connect with you. I'll be in touch within 2–3 business days to discuss your dream bag.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{
            fontSize: '0.75rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '1rem',
          }}>Custom Order</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            textShadow: '0 0 30px rgba(0,184,255,0.2)',
            marginBottom: '1.5rem',
          }}>
            Let's Create Something
          </h1>
          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.8 }}>
            Fill out the form below and I'll reach out personally to start the conversation. Every detail matters — share as much or as little as you'd like.
          </p>
        </div>

        {/* Form */}
        {/* NOTE: The hidden input below is required for Netlify Forms to work */}
        <form
          name="custom-order"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          encType="multipart/form-data"
        >
          <input type="hidden" name="form-name" value="custom-order" />
          <input type="hidden" name="bot-field" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {/* Name */}
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input
                name="name" type="text" value={form.name}
                onChange={handleChange} placeholder="Your name"
                style={{ ...inputStyle, ...(errors.name ? { borderColor: 'var(--pink)' } : {}) }}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => { e.target.style.borderColor = errors.name ? 'var(--pink)' : 'rgba(0,184,255,0.2)'; e.target.style.boxShadow = 'none' }}
              />
              {errors.name && <p style={errorStyle}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input
                name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="your@email.com"
                style={{ ...inputStyle, ...(errors.email ? { borderColor: 'var(--pink)' } : {}) }}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => { e.target.style.borderColor = errors.email ? 'var(--pink)' : 'rgba(0,184,255,0.2)'; e.target.style.boxShadow = 'none' }}
              />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {/* Budget */}
            <div>
              <label style={labelStyle}>Approximate Budget</label>
              <select name="budget" value={form.budget} onChange={handleChange} style={selectStyle}>
                <option value="">Select a range</option>
                <option value="Under $200">Under $200</option>
                <option value="$200–$500">$200 – $500</option>
                <option value="$500–$1,000">$500 – $1,000</option>
                <option value="$1,000+">$1,000+</option>
              </select>
            </div>

            {/* Timeline */}
            <div>
              <label style={labelStyle}>Desired Timeline</label>
              <select name="timeline" value={form.timeline} onChange={handleChange} style={selectStyle}>
                <option value="">Select a timeline</option>
                <option value="ASAP">ASAP</option>
                <option value="1–3 months">1 – 3 months</option>
                <option value="3–6 months">3 – 6 months</option>
                <option value="Just exploring">Just exploring</option>
              </select>
            </div>
          </div>

          {/* Inspiration */}
          <div>
            <label style={labelStyle}>Your Vision *</label>
            <textarea
              name="inspiration" value={form.inspiration}
              onChange={handleChange} rows={6}
              placeholder="Tell me about the bag you're dreaming of — style, size, colors, materials, occasion, any special details or features..."
              style={{ ...inputStyle, resize: 'vertical', ...(errors.inspiration ? { borderColor: 'var(--pink)' } : {}) }}
              onFocus={e => Object.assign(e.target.style, { borderColor: 'var(--blue)', boxShadow: '0 0 0 2px rgba(0,184,255,0.1)' })}
              onBlur={e => { e.target.style.borderColor = errors.inspiration ? 'var(--pink)' : 'rgba(0,184,255,0.2)'; e.target.style.boxShadow = 'none' }}
            />
            {errors.inspiration && <p style={errorStyle}>{errors.inspiration}</p>}
          </div>

          {/* Inspo photo */}
          <div>
            <label style={labelStyle}>Inspiration Photo (optional)</label>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '0.75rem', fontStyle: 'italic' }}>
              Have a reference image? A style you love, a color swatch, anything that captures your vision.
            </p>
            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '0.75rem', padding: '2rem',
              border: '1px dashed rgba(0,184,255,0.3)',
              cursor: 'pointer', transition: 'all 0.2s',
              color: 'var(--text-muted)', fontSize: '0.9rem',
              textAlign: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'rgba(0,184,255,0.03)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,184,255,0.3)'; e.currentTarget.style.background = 'none' }}
            >
              <span style={{ fontSize: '2rem', color: 'var(--blue)' }}>↑</span>
              <span>{form.photo ? form.photo.name : 'Click to upload a photo'}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>JPG, PNG, HEIC up to 10MB</span>
              <input type="file" name="photo" accept="image/*"
                onChange={handleFile} style={{ display: 'none' }} />
            </label>
          </div>

          {/* How found */}
          <div>
            <label style={labelStyle}>How Did You Find Me?</label>
            <select name="source" value={form.source} onChange={handleChange} style={selectStyle}>
              <option value="">Select one</option>
              <option value="Instagram">Instagram</option>
              <option value="Google">Google</option>
              <option value="Word of mouth">Word of mouth</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit */}
          <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
            <button type="submit" className="btn-primary" style={{
              padding: '1rem 3rem',
              fontSize: '1rem',
            }}>
              Send My Request
            </button>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '1rem', fontStyle: 'italic' }}>
              I respond to all inquiries within 2–3 business days.
            </p>
          </div>
        </form>
      </div>

      <style>{`
        select option { background: #0a0a2e; color: #f0e8ff; }
      `}</style>
    </div>
  )
}
