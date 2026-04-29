import Navbar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Menu from './components/Menu.jsx'
import Ambience from './components/Ambience.jsx'
import Reviews from './components/Reviews.jsx'
import Reserve from './components/Reserve.jsx'
import Footer from './components/Footer.jsx'
import { SpeedInsights } from '@vercel/speed-insights/react'

export default function App() {
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