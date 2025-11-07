import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Exercise from './pages/Exercise'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 font-poppins overflow-x-hidden">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/exercise/:courseId/:exerciseId" element={<Exercise />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

