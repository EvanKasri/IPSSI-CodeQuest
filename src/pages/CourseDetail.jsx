import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Code2, Play, Clock, Target } from 'lucide-react'
import coursesData from '../data/courses.json'

const CourseDetail = () => {
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
          <p className="text-2xl text-gray-600">Chargement du cours...</p>
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
          to="/courses" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-ipssi-blue transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Retour aux cours
        </Link>
      </motion.div>

      {/* Header du cours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card-cartoon ${course.color} text-white`}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl"
          >
            {course.icon}
          </motion.div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              {course.language}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-white/90">
              {course.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Informations du cours */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-cartoon flex items-center gap-4"
        >
          <Clock className="text-ipssi-blue" size={32} />
          <div>
            <div className="text-sm text-gray-500">Durée estimée</div>
            <div className="text-xl font-bold">15-30 min</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-cartoon flex items-center gap-4"
        >
          <Target className="text-green-500" size={32} />
          <div>
            <div className="text-sm text-gray-500">Niveau</div>
            <div className="text-xl font-bold">Débutant</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-cartoon flex items-center gap-4"
        >
          <Code2 className="text-purple-500" size={32} />
          <div>
            <div className="text-sm text-gray-500">Exercices</div>
            <div className="text-xl font-bold">{course.exercises?.length || 0} pratiques</div>
          </div>
        </motion.div>
      </div>

      {/* Contenu du cours */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card-cartoon"
      >
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: course.content }}
        />
      </motion.div>

      {/* CTA Exercice */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="card-cartoon bg-gradient-to-r from-ipssi-blue to-purple-600 text-white text-center py-12"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          🎯
        </motion.div>
        <h2 className="text-3xl font-bold mb-4">
          Prêt à mettre en pratique ?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          C'est le moment de tester tes nouvelles compétences avec un exercice pratique !
        </p>
        <Link to={`/exercises/${course.id}`}>
          <motion.button
            className="bg-white text-ipssi-blue font-bold text-xl px-12 py-5 rounded-full shadow-cartoon hover:shadow-cartoon-hover transition-all inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={28} />
            Commencer les exercices
          </motion.button>
        </Link>
      </motion.div>

      {/* Encouragement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-2xl"
      >
        <p className="flex items-center gap-3 text-lg">
          <span className="text-3xl">💡</span>
          <strong>Astuce :</strong> Prends ton temps pour bien comprendre les concepts. La pratique régulière est la clé du succès ! 🚀
        </p>
      </motion.div>
    </div>
  )
}

export default CourseDetail

