import { Link } from 'react-router-dom'
import { BookOpen, Home, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.nav 
      className="bg-white shadow-cartoon mb-8"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🐱‍💻
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-ipssi-blue group-hover:text-blue-600 transition-colors">
                IPSSI CodeQuest
              </h1>
              <p className="text-xs text-gray-500">Apprends à coder comme un pro !</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-700 hover:text-ipssi-blue transition-colors font-medium"
            >
              <Home size={20} />
              <span className="hidden md:inline">Accueil</span>
            </Link>
            <Link 
              to="/courses" 
              className="flex items-center gap-2 text-gray-700 hover:text-ipssi-blue transition-colors font-medium"
            >
              <BookOpen size={20} />
              <span className="hidden md:inline">Cours</span>
            </Link>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden sm:block"
            >
              <Sparkles className="text-yellow-500" size={24} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

