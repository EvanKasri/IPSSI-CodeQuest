import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ExercisePath from '../components/ExercisePath'
import coursesData from '../data/courses.json'

const ExerciseList = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.id === id)
    if (foundCourse) {
      setCourse(foundCourse)
    } else {
      navigate('/courses')
    }
  }, [id, navigate])

  if (!course) {
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
          <p className="text-2xl text-gray-600">Chargement des exercices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Bouton retour */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link 
          to={`/course/${course.id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-ipssi-blue transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Retour au cours
        </Link>
      </motion.div>

      {/* Composant de chemin */}
      <ExercisePath course={course} />

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-50 border-l-4 border-ipssi-blue p-6 rounded-r-2xl max-w-4xl mx-auto"
      >
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Conseils pour réussir tes exercices IPSSI
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Commence par l'exercice 1 et progresse dans l'ordre</li>
          <li>• Lis bien chaque énoncé avant de coder</li>
          <li>• N'hésite pas à utiliser les indices si tu es bloqué</li>
          <li>• Prends ton temps, l'important c'est de comprendre ! 🎯</li>
          <li>• N'oublie pas : à l'IPSSI Nice, on apprend en pratiquant ! 🚀</li>
        </ul>
      </motion.div>
    </div>
  )
}

export default ExerciseList

