import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play, Award } from 'lucide-react'
import coursesData from '../data/courses.json'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [expandedCourse, setExpandedCourse] = useState(null)

  useEffect(() => {
    setCourses(coursesData)
  }, [])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-700'
      case 'Moyen': return 'bg-yellow-100 text-yellow-700'
      case 'Difficile': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Choisissez un cours
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Sélectionnez un langage et accédez directement aux exercices pratiques
        </p>
      </motion.div>

      {/* Liste des cours */}
      <div className="space-y-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card-modern"
          >
            {/* En-tête du cours */}
            <button
              onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
              className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl ${course.color} flex items-center justify-center text-3xl shadow-md`}>
                  {course.icon}
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">{course.language}</h2>
                  <p className="text-gray-400">{course.exercises.length} exercices disponibles</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedCourse === course.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={28} className="text-gray-500" />
              </motion.div>
            </button>

            {/* Liste des exercices (expandable) */}
            <AnimatePresence>
              {expandedCourse === course.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-gray-700 space-y-6">
                    {course.exercises.map((exercise) => (
                      <Link
                        key={exercise.id}
                        to={`/exercise/${course.id}/${exercise.id}`}
                      >
                        <motion.div
                          whileHover={{ y: -2 }}
                          className="flex items-center justify-between p-5 rounded-lg border border-gray-700 hover:border-ipssi-green hover:bg-gray-800/30 transition-all group"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-10 h-10 rounded-full ${course.color} flex items-center justify-center font-bold text-white text-sm shadow-sm`}>
                              {exercise.id}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white group-hover:text-ipssi-green transition-colors">
                                {exercise.title}
                              </h3>
                              <p className="text-sm text-gray-400 line-clamp-1">
                                {exercise.question}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                              {exercise.difficulty}
                            </span>
                            <Play size={20} className="text-ipssi-green" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="card-modern bg-gradient-to-r from-ipssi-green to-ipssi-yellow text-gray-900 text-center py-8"
      >
        <Award size={48} className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">
          Prêt à progresser ?
        </h2>
        <p className="text-gray-800">
          Chaque exercice complété te rapproche de la maîtrise du code
        </p>
      </motion.div>
    </div>
  )
}

export default Courses

