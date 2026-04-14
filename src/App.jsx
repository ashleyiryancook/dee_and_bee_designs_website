import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import CustomOrder from './pages/CustomOrder.jsx'
import AdminLogin from './pages/AdminLogin.jsx'

// ─── Auth Context ───────────────────────────────────────────────────────────
export const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('dab_admin') === 'true'
  })

  const login = (password) => {
    // ⚠️ CHANGE THIS PASSWORD before deploying!
    const ADMIN_PASSWORD = 'deeandbee2024'
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('dab_admin', 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('dab_admin')
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      <BrowserRouter>
        <Nav />
        <main style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/custom-order" element={<CustomOrder />} />
            <Route path="/admin" element={<AdminLogin />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
