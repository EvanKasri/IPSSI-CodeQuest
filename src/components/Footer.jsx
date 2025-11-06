import { Heart, Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-ipssi-blue to-purple-600 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              🐱‍💻 IPSSI CodeQuest
            </h3>
            <p className="text-blue-100 mb-4">
              Plateforme éducative pour apprendre à coder de manière interactive et ludique.
            </p>
            <p className="text-sm text-blue-200">
              Made with <Heart className="inline text-red-400" size={16} /> par les étudiants IPSSI Nice
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold mb-4">🔗 Liens rapides</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <a href="/" className="hover:text-white transition-colors">Accueil</a>
              </li>
              <li>
                <a href="/courses" className="hover:text-white transition-colors">Tous les cours</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">À propos</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-xl font-bold mb-4">🌐 Suivez-nous</h3>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:contact@ipssi-codequest.fr"
                className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={24} />
              </motion.a>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              🎓 IPSSI Nice - École d'informatique
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-blue-100 text-sm">
          <p>© 2025 IPSSI CodeQuest - Tous droits réservés</p>
          <p className="mt-2">🚀 Version 1.0 - Projet étudiant</p>
          {/* Easter egg caché ! */}
          <p className="mt-4 text-xs opacity-0 hover:opacity-100 transition-opacity cursor-default">
            🎉 Easter egg trouvé ! Coucou IPSSI Nice ! 👋
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

