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
          <p className="text-2xl text-gray-600">Chargement de l'exercice...</p>
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
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            to={`/exercises/${course.id}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ipssi-blue transition-colors font-medium"
          >
            <List size={20} />
            Voir tous les exercices
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-gray-500"
        >
          Exercice {exercise.id} sur {course.exercises.length}
        </motion.div>
      </div>

      {/* Header de l'exercice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card-cartoon ${course.color} text-white`}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="text-6xl">{course.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                  Exercice {exercise.id}
                </div>
                <div className={`px-3 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)} text-white text-sm font-semibold shadow-cartoon-sm`}>
                  {exercise.difficulty}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {exercise.title}
              </h1>
              <p className="text-white/80 mt-2">
                {course.language} - IPSSI CodeQuest
              </p>
            </div>
          </div>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Check className="text-white bg-green-500 rounded-full p-2" size={64} />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Mini-cours de l'exercice */}
      {exercise.lesson && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card-cartoon bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-ipssi-blue"
        >
          <div className="flex items-start gap-4">
            <BookOpen className="text-ipssi-blue flex-shrink-0" size={32} />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                📚 Ce que tu vas apprendre
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {exercise.lesson}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Énoncé */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card-cartoon"
      >
        <div className="flex items-start gap-4">
          <Trophy className="text-yellow-500 flex-shrink-0" size={32} />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              📝 Ton défi IPSSI
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {exercise.question}
            </p>
          </div>
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

      {/* Section succès */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="card-cartoon bg-gradient-to-r from-green-400 to-green-500 text-white text-center py-12 overflow-hidden"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            className="text-8xl mb-6 inline-block"
          >
            🏆
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">
            Bravo champion de l'IPSSI ! 🎉
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tu as réussi l'exercice {exercise.id} ! {nextExercise ? "Prêt pour le suivant ?" : "Tu as terminé tous les exercices ! 🎊"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {nextExercise ? (
              <Link to={`/exercise/${course.id}/${nextExercise.id}`}>
                <motion.button
                  className="bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-full shadow-cartoon hover:shadow-cartoon-hover transition-all inline-flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Exercice suivant
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
            ) : (
              <Link to="/courses">
                <motion.button
                  className="bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-full shadow-cartoon hover:shadow-cartoon-hover transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎓 Explorer d'autres cours
                </motion.button>
              </Link>
            )}
            <Link to={`/exercises/${course.id}`}>
              <motion.button
                className="bg-white/20 backdrop-blur text-white font-bold text-lg px-8 py-4 rounded-full border-2 border-white hover:bg-white/30 transition-all inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List size={20} />
                Tous les exercices
              </motion.button>
            </Link>
            <motion.button
              onClick={handleRetry}
              className="bg-white/20 backdrop-blur text-white font-bold text-lg px-8 py-4 rounded-full border-2 border-white hover:bg-white/30 transition-all inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCcw size={20} />
              Refaire
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Conseils */}
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-50 border-l-4 border-ipssi-blue p-6 rounded-r-2xl"
        >
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Conseils de ton prof à l'IPSSI Nice
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Lis bien l'énoncé avant de commencer à coder</li>
            <li>• N'hésite pas à utiliser l'indice si tu es bloqué (💡)</li>
            <li>• Vérifie bien ta syntaxe : majuscules, espaces, ponctuation</li>
            <li>• Le bouton ↻ te permet de tout réinitialiser</li>
            <li>• Prends ton temps, c'est en pratiquant qu'on devient expert ! 🚀</li>
          </ul>
        </motion.div>
      )}

      {/* Progression */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-cartoon bg-gradient-to-r from-gray-50 to-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            📊 Ta progression dans {course.language}
          </h3>
          <span className="text-2xl font-bold text-ipssi-blue">
            {exercise.id}/{course.exercises.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(exercise.id / course.exercises.length) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${course.color} rounded-full`}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Continue comme ça ! Tu es sur la bonne voie pour maîtriser {course.language} ! 💪
        </p>
      </motion.div>
    </div>
  )
}

export default Exercise
