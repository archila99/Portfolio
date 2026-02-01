import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import Projects from './pages/Projects'
import Game from './pages/Game'

function App() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
