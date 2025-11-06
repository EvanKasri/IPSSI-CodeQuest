import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Lock, Play, Star } from 'lucide-react'

const ExercisePath = ({ course }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Facile':
        return 'bg-green-400'
      case 'Moyen':
        return 'bg-yellow-400'
      case 'Difficile':
        return 'bg-red-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Facile':
        return '⭐'
      case 'Moyen':
        return '⭐⭐'
      case 'Difficile':
        return '⭐⭐⭐'
      default:
        return '⭐'
    }
  }

  return (
    <div className="relative py-12">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="text-6xl mb-4">{course.icon}</div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Ton parcours <span className={`${course.color} bg-clip-text text-transparent`}>{course.language}</span>
        </h2>
        <p className="text-xl text-gray-600">
          {course.exercises.length} exercices pour maîtriser {course.language} à l'IPSSI Nice ! 🎓
        </p>
      </motion.div>

      {/* Chemin d'exercices */}
      <div className="max-w-4xl mx-auto">
        {course.exercises.map((exercise, index) => {
          const isEven = index % 2 === 0
          
          return (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative mb-12 ${isEven ? 'text-left' : 'text-right'}`}
            >
              {/* Ligne de connexion */}
              {index < course.exercises.length - 1 && (
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-12 ${course.color} opacity-30`} />
              )}

              <div className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Numéro de l'exercice (cercle) */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex-shrink-0 w-20 h-20 rounded-full ${course.color} flex items-center justify-center shadow-cartoon relative z-10`}
                >
                  <span className="text-3xl font-bold text-white">{exercise.id}</span>
                </motion.div>

                {/* Carte d'exercice */}
                <Link 
                  to={`/exercise/${course.id}/${exercise.id}`}
                  className="flex-1"
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="card-cartoon bg-white hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {exercise.title}
                        </h3>
                        <p className="text-sm text-gray-500">Exercice {exercise.id} sur {course.exercises.length}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)} text-white text-sm font-semibold shadow-cartoon-sm`}>
                        {getDifficultyIcon(exercise.difficulty)} {exercise.difficulty}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {exercise.question}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          {exercise.language.toUpperCase()}
                        </span>
                      </div>
                      <motion.div
                        className="flex items-center gap-2 text-ipssi-blue font-semibold"
                        whileHover={{ x: 5 }}
                      >
                        <Play size={20} />
                        <span>Commencer</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Badge de fin */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: course.exercises.length * 0.1 + 0.2 }}
        className="flex justify-center mt-12"
      >
        <div className="card-cartoon bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-center px-12 py-8">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-3xl font-bold mb-2">Objectif final</h3>
          <p className="text-lg">
            Complète tous les exercices et deviens un expert {course.language} !
          </p>
          <div className="mt-4 text-sm opacity-90">
            💪 Challenge IPSSI Nice
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ExercisePath

