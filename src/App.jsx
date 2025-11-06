import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import ExerciseList from './pages/ExerciseList'
import Exercise from './pages/Exercise'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-poppins overflow-x-hidden">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/exercises/:id" element={<ExerciseList />} />
            <Route path="/exercise/:courseId/:exerciseId" element={<Exercise />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

