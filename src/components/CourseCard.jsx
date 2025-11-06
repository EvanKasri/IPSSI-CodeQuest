import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const CourseCard = ({ course, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -8 }}
      className="relative"
    >
      <div className={`card-cartoon ${course.color} overflow-hidden relative`}>
        {/* Badge étoile */}
        <div className="absolute top-4 right-4">
          <motion.div
            animate={{ rotate: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="text-yellow-300 fill-yellow-300" size={24} />
          </motion.div>
        </div>

        {/* Icône du langage */}
        <div className="text-6xl mb-4">
          {course.icon}
        </div>

        {/* Contenu */}
        <h3 className="text-2xl font-bold text-white mb-2">
          {course.language}
        </h3>
        <p className="text-white/90 text-sm mb-4">
          {course.title}
        </p>
        <p className="text-white/80 text-sm mb-6 line-clamp-3">
          {course.description}
        </p>

        {/* Bouton */}
        <Link to={`/course/${course.id}`}>
          <motion.button
            className="w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-cartoon-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer le cours
            <ArrowRight size={20} />
          </motion.button>
        </Link>

        {/* Décoration cartoon */}
        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
      </div>
    </motion.div>
  )
}

export default CourseCard

