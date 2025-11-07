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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            to="/courses"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-ipssi-green transition-colors font-medium group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Retour aux cours
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-medium text-gray-400"
        >
          Exercice <span className="text-ipssi-green font-bold">{exercise.id}</span> sur {course.exercises.length}
        </motion.div>
      </div>

      {/* Header de l'exercice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
      >
        {/* Badge de succès */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute top-6 right-6"
          >
            <div className="bg-gradient-to-br from-ipssi-green to-ipssi-yellow p-3 rounded-xl shadow-lg">
              <Check className="text-gray-900" size={32} />
            </div>
          </motion.div>
        )}

        <div className="flex items-start gap-6">
          {/* Icône */}
          <div className={`w-20 h-20 rounded-2xl ${course.color} flex items-center justify-center text-4xl shadow-lg flex-shrink-0`}>
            {course.icon}
          </div>

          {/* Contenu */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-4 py-1.5 bg-gray-700/50 text-gray-300 rounded-lg text-sm font-medium">
                Exercice {exercise.id}
              </span>
              <span className={`px-4 py-1.5 rounded-lg text-sm font-bold text-white ${
                exercise.difficulty === 'Facile' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                exercise.difficulty === 'Moyen' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {exercise.difficulty}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {exercise.title}
            </h1>
            
            <p className="text-gray-400 font-medium">
              {course.language} • IPSSI CodeQuest
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mini-cours de l'exercice */}
      {exercise.lesson && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border-l-4 border-ipssi-green shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-ipssi-green/10 rounded-xl">
              <BookOpen className="text-ipssi-green" size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                Ce que tu vas apprendre
              </h2>
              <p className="text-gray-300 leading-relaxed">
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
        className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border-l-4 border-ipssi-yellow shadow-lg"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-ipssi-yellow/10 rounded-xl">
            <Trophy className="text-ipssi-yellow" size={28} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-3">
              Ton défi IPSSI
            </h2>
            <p className="text-gray-300 leading-relaxed">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative overflow-hidden bg-gradient-to-br from-ipssi-green/20 to-ipssi-yellow/20 backdrop-blur-sm rounded-2xl p-12 border-2 border-ipssi-green shadow-2xl text-center"
        >
          {/* Décorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-ipssi-green/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-ipssi-yellow/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-7xl mb-6"
            >
              🏆
            </motion.div>
            
            <h2 className="text-4xl font-bold text-white mb-4">
              Bravo champion de l'IPSSI !
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Tu as réussi l'exercice {exercise.id} ! {nextExercise ? "Prêt pour le suivant ?" : "Tu as terminé tous les exercices ! 🎊"}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {nextExercise ? (
                <Link to={`/exercise/${course.id}/${nextExercise.id}`}>
                  <motion.button
                    className="bg-gradient-to-r from-ipssi-green to-ipssi-yellow text-gray-900 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Exercice suivant
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
              ) : (
                <Link to="/courses">
                  <motion.button
                    className="bg-gradient-to-r from-ipssi-green to-ipssi-yellow text-gray-900 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explorer d'autres cours
                  </motion.button>
                </Link>
              )}
              
              <motion.button
                onClick={handleRetry}
                className="bg-gray-800 text-white font-bold text-lg px-8 py-4 rounded-xl border-2 border-gray-700 hover:border-ipssi-green transition-all inline-flex items-center gap-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCcw size={20} />
                Refaire
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Conseils */}
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-l-4 border-purple-500 p-6 rounded-xl"
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
            <span className="text-2xl">💡</span>
            Conseils de ton prof à l'IPSSI Nice
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">→</span>
              <span>Lis bien l'énoncé avant de commencer à coder</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">→</span>
              <span>N'hésite pas à utiliser l'indice si tu es bloqué</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">→</span>
              <span>Vérifie bien ta syntaxe : majuscules, espaces, ponctuation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">→</span>
              <span>Le bouton de réinitialisation te permet de tout recommencer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">→</span>
              <span>Prends ton temps, c'est en pratiquant qu'on devient expert !</span>
            </li>
          </ul>
        </motion.div>
      )}

      {/* Progression */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">
            Ta progression dans {course.language}
          </h3>
          <span className="text-2xl font-bold bg-gradient-to-r from-ipssi-green to-ipssi-yellow bg-clip-text text-transparent">
            {exercise.id}/{course.exercises.length}
          </span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(exercise.id / course.exercises.length) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-ipssi-green to-ipssi-yellow rounded-full"
          />
        </div>
        <p className="text-sm text-gray-400 mt-3 text-center">
          Continue comme ça ! Tu es sur la bonne voie pour maîtriser {course.language} ! 💪
        </p>
      </motion.div>
    </div>
  )
}

export default Exercise
