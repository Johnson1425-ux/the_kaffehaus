import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Menu from './components/Menu'
import Ambience from './components/Ambience'
import Reviews from './components/Reviews'
import Reserve from './components/Reserve'
import Footer from './components/Footer'

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
    </div>
  )
}