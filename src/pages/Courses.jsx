import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CourseCard from '../components/CourseCard'
import { Search, Filter, BookOpen } from 'lucide-react'
import coursesData from '../data/courses.json'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCourses, setFilteredCourses] = useState([])

  useEffect(() => {
    setCourses(coursesData)
    setFilteredCourses(coursesData)
  }, [])

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCourses(filtered)
  }, [searchTerm, courses])

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl inline-block"
        >
          📚
        </motion.div>
        <h1 className="text-5xl font-bold text-gray-800">
          Tous les <span className="text-ipssi-blue">cours</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choisis un langage et commence ton apprentissage ! Chaque cours contient des explications détaillées et des exercices pratiques. 🚀
        </p>
      </motion.div>

      {/* Barre de recherche */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="Rechercher un cours... (HTML, CSS, Python...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-4 py-4 rounded-full border-4 border-gray-200 focus:border-ipssi-blue outline-none text-lg shadow-cartoon"
          />
        </div>
      </motion.div>

      {/* Statistiques */}
      <div className="flex flex-wrap justify-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white px-6 py-3 rounded-full shadow-cartoon-sm flex items-center gap-2"
        >
          <BookOpen className="text-ipssi-blue" size={20} />
          <span className="font-semibold">{filteredCourses.length} cours disponibles</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white px-6 py-3 rounded-full shadow-cartoon-sm flex items-center gap-2"
        >
          <Filter className="text-green-500" size={20} />
          <span className="font-semibold">Tous niveaux</span>
        </motion.div>
      </div>

      {/* Grille des cours */}
      {filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-2xl text-gray-600">Aucun cours trouvé...</p>
          <p className="text-gray-500 mt-2">Essaye une autre recherche !</p>
        </motion.div>
      )}

      {/* Section encouragement */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="card-cartoon bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center py-12 mt-16"
      >
        <h2 className="text-3xl font-bold mb-4">
          💪 Continue comme ça, champion !
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Chaque cours que tu commences te rapproche de ton objectif. N'oublie pas : la pratique rend parfait ! 🎯
        </p>
      </motion.div>
    </div>
  )
}

export default Courses

