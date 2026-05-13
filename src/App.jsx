import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Menu from './components/Menu.jsx'
import Ambience from './components/Ambience.jsx'
import Reviews from './components/Reviews.jsx'
import Reserve from './components/Reserve.jsx'
import Footer from './components/Footer.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import { SpeedInsights } from '@vercel/speed-insights/react'

function CustomerSite() {
  return (
    <div style={{ minHeight: '100vh', background: '#faf6ed', color: '#2a1c0b' }}>
      <Navbar />
      <Hero />
      <Experience />
      <Menu />
      <Ambience />
      <Reviews />
      <Reserve />
      <Footer />
      <SpeedInsights />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerSite />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}