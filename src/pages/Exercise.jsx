import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Trophy, RefreshCcw, Check, ArrowRight, List, BookOpen } from 'lucide-react'
import CodeEditor from '../components/CodeEditor'
import MultiTabEditor from '../components/MultiTabEditor'
import coursesData from '../data/courses.json'

const Exercise = () => {
  const { courseId, exerciseId } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [exercise, setExercise] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Reset de l'état quand on change d'exercice
    setIsCompleted(false)
    
    const foundCourse = coursesData.find(c => c.id === courseId)
    if (foundCourse) {
      setCourse(foundCourse)
      const foundExercise = foundCourse.exercises.find(ex => ex.id === parseInt(exerciseId))
      if (foundExercise) {
        setExercise(foundExercise)
        // Scroll vers le haut quand on change d'exercice
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/courses')
      }
    } else {
      navigate('/courses')
    }
  }, [courseId, exerciseId, navigate])

  const handleSuccess = () => {
    setIsCompleted(true)
  }

  const handleRetry = () => {
    setIsCompleted(false)
    window.location.reload()
  }

  const getNextExercise = () => {
    if (!course || !exercise) return null
    const currentIndex = course.exercises.findIndex(ex => ex.id === exercise.id)
    if (currentIndex < course.exercises.length - 1) {
      return course.exercises[currentIndex + 1]
    }
    return null
  }

  const nextExercise = getNextExercise()

  if (!course || !exercise) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            ⚡
          </motion.div>
          <p className="text-2xl text-gray-300">Chargement de l'exercice...</p>
        </div>
      </div>
    )
  }

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

  return (
    <div className="space-y-6">
      {/* Header compact */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <Link 
          to="/courses"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-ipssi-green transition-colors text-sm font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Retour
        </Link>

        <div className="flex items-center gap-4">
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-gradient-to-r from-ipssi-green to-ipssi-yellow px-4 py-2 rounded-lg"
            >
              <Check size={18} className="text-gray-900" />
              <span className="text-sm font-bold text-gray-900">Réussi</span>
            </motion.div>
          )}
          
          <span className="text-sm text-gray-400">
            <span className="text-ipssi-green font-bold">{exercise.id}</span>/{course.exercises.length}
          </span>
        </div>
      </motion.div>

      {/* Titre et énoncé compacts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${course.color} flex items-center justify-center text-2xl flex-shrink-0`}>
            {course.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-white">
                {exercise.title}
              </h1>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                exercise.difficulty === 'Facile' ? 'bg-green-500/20 text-green-400' :
                exercise.difficulty === 'Moyen' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {exercise.difficulty}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{course.language}</p>
          </div>
        </div>

        {/* Leçon si présente */}
        {exercise.lesson && (
          <div className="mb-4 p-4 bg-ipssi-green/5 border-l-2 border-ipssi-green rounded-r">
            <p className="text-sm text-gray-300 leading-relaxed">
              <BookOpen size={16} className="inline mr-2 text-ipssi-green" />
              {exercise.lesson}
            </p>
          </div>
        )}

        {/* Énoncé */}
        <div className="p-4 bg-ipssi-yellow/5 border-l-2 border-ipssi-yellow rounded-r">
          <p className="text-sm text-gray-300 leading-relaxed">
            <Trophy size={16} className="inline mr-2 text-ipssi-yellow" />
            {exercise.question}
          </p>
        </div>
      </motion.div>

      {/* Éditeur de code */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {exercise.useMultiTab ? (
          <MultiTabEditor exercise={exercise} onSuccess={handleSuccess} />
        ) : (
          <CodeEditor exercise={exercise} onSuccess={handleSuccess} />
        )}
      </motion.div>

      {/* Navigation exercices */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-ipssi-green/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                🎉 Exercice réussi !
              </h3>
              <p className="text-sm text-gray-400">
                {nextExercise ? "Continue sur ta lancée" : "Tous les exercices terminés !"}
              </p>
            </div>
            
            <div className="flex gap-3">
              {nextExercise ? (
                <Link to={`/exercise/${course.id}/${nextExercise.id}`}>
                  <motion.button
                    className="bg-gradient-to-r from-ipssi-green to-ipssi-yellow text-gray-900 font-bold px-6 py-3 rounded-lg inline-flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Suivant
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
              ) : (
                <Link to="/courses">
                  <motion.button
                    className="bg-gradient-to-r from-ipssi-green to-ipssi-yellow text-gray-900 font-bold px-6 py-3 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Autres cours
                  </motion.button>
                </Link>
              )}
              
              <motion.button
                onClick={handleRetry}
                className="bg-gray-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors inline-flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCcw size={18} />
                Refaire
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Exercise
