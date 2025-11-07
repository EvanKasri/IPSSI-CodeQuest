import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* À propos */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://i.ibb.co/B2WDwkdY/Chat-GPT-Image-7-nov-2025-12-10-47.png" 
                  alt="IPSSI Logo" 
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Plateforme moderne d'apprentissage du code, conçue pour les étudiants par les étudiants.
              </p>
            </div>

            {/* Liens */}
            <div>
              <h4 className="font-semibold text-white mb-4">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-ipssi-green transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="text-gray-400 hover:text-ipssi-green transition-colors">
                    Cours
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://ecole-ipssi.com/ecole-informatique-nice/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-ipssi-green transition-colors"
                  >
                    École IPSSI Nice
                  </a>
                </li>
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-semibold text-white mb-4">Projet étudiant</h4>
              <p className="text-gray-400 mb-4">
                Créé avec passion par les étudiants de l'IPSSI Nice
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Made with</span>
                <Heart className="text-red-500 fill-red-500" size={16} />
                <span>à Nice</span>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <p>© 2025 IPSSI CodeQuest. Tous droits réservés.</p>
              <p className="text-ipssi-green font-medium">Version 1.0</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

