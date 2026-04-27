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
    <div className="min-h-screen bg-charcoal-900 text-stone-100">
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
