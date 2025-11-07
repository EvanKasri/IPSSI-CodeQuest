import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Home } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 shadow-xl mb-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group ml-4">
            <img 
              src="https://i.ibb.co/B2WDwkdY/Chat-GPT-Image-7-nov-2025-12-10-47.png" 
              alt="IPSSI Logo" 
              className="h-24 w-auto transition-all group-hover:scale-105"
            />
          </Link>
          
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/') 
                    ? 'bg-ipssi-green text-gray-900 shadow-lg shadow-ipssi-green/30 font-bold' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Home size={18} />
                <span className="hidden sm:inline">Accueil</span>
              </motion.button>
            </Link>
            
            <Link to="/courses">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/courses') 
                    ? 'bg-ipssi-green text-gray-900 shadow-lg shadow-ipssi-green/30 font-bold' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <BookOpen size={18} />
                <span className="hidden sm:inline">Cours</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

