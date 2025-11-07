import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Rocket, Code2, Trophy, Users, GraduationCap, BookOpen, ArrowRight, Zap, Target, Brain, Globe, Palette, Sparkles, FileCode } from 'lucide-react'
import ParticleBackground from '../components/ParticleBackground'

const Home = () => {
  const features = [
    {
      icon: <Code2 className="text-ipssi-blue" size={40} />,
      title: "Apprends par la pratique",
      description: "Des exercices interactifs pour coder directement dans ton navigateur"
    },
    {
      icon: <BookOpen className="text-green-500" size={40} />,
      title: "Cours complets",
      description: "Des tutoriels détaillés sur HTML, CSS, JavaScript, Python et plus"
    },
    {
      icon: <Trophy className="text-yellow-500" size={40} />,
      title: "Valide tes compétences",
      description: "Teste tes connaissances et progresse à ton rythme"
    },
    {
      icon: <Users className="text-purple-500" size={40} />,
      title: "Communauté IPSSI",
      description: "Rejoins la communauté des étudiants passionnés de code"
    }
  ]

  const languages = [
    { 
      name: "HTML", 
      icon: <Globe size={32} />, 
      description: "Structure web", 
      available: true 
    },
    { 
      name: "CSS", 
      icon: <Palette size={32} />, 
      description: "Design & style", 
      available: true 
    },
    { 
      name: "JavaScript", 
      icon: <Sparkles size={32} />, 
      description: "Interactivité", 
      available: true 
    },
    { 
      name: "Python", 
      icon: <Code2 size={32} />, 
      description: "Programmation", 
      available: true 
    },
    { 
      name: "PHP", 
      icon: <FileCode size={32} />, 
      description: "Backend", 
      available: false 
    }
  ]

  return (
    <>
      <ParticleBackground />
      
      <div className="relative z-10 space-y-32">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center justify-center -mt-12">
          <div className="text-center space-y-8 max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-ipssi-green/30 shadow-lg"
              >
                <Zap size={18} className="text-ipssi-green" />
                <span className="text-sm font-medium text-gray-300">Plateforme d'apprentissage IPSSI Nice</span>
              </motion.div>

              {/* Titre principal */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="text-white">Maîtrise le</span><br />
                <span className="bg-gradient-to-r from-ipssi-green via-ipssi-yellow to-ipssi-lime bg-clip-text text-transparent">
                  code comme un pro
                </span>
              </h1>

              {/* Sous-titre */}
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Une plateforme moderne pour apprendre la programmation à travers des exercices pratiques et interactifs
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Link to="/courses">
                <motion.button
                  className="group relative px-8 py-4 bg-ipssi-green text-gray-900 font-bold rounded-xl shadow-xl shadow-ipssi-green/30 hover:shadow-2xl hover:shadow-ipssi-green/40 transition-all overflow-hidden"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <span className="text-lg">Commencer gratuitement</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-ipssi-yellow to-ipssi-lime opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>
              
              <a 
                href="https://ecole-ipssi.com/ecole-informatique-nice/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <motion.button
                  className="px-8 py-4 bg-gray-800/80 backdrop-blur-sm text-gray-300 font-semibold rounded-xl border-2 border-gray-700 hover:border-ipssi-green hover:text-white transition-all shadow-lg"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap size={20} />
                    <span className="text-lg">Découvrir l'IPSSI</span>
                  </div>
                </motion.button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 pt-12"
            >
              {[
                { value: "5", label: "Langages" },
                { value: "20+", label: "Exercices" },
                { value: "100%", label: "Gratuit" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-ipssi-green">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Langages Section */}
        <section className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technologies enseignées
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Apprends les langages les plus demandés dans l'industrie
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {languages.map((lang, index) => {
              const TechCard = lang.available ? Link : 'div'
              const linkProps = lang.available ? { to: "/courses" } : {}
              
              return (
                <TechCard key={lang.name} {...linkProps}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={lang.available ? { y: -4 } : {}}
                    className={`relative group ${lang.available ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className={`
                      bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 
                      border-2 transition-all duration-300 shadow-lg
                      ${lang.available 
                        ? 'border-gray-700 hover:border-ipssi-green hover:shadow-ipssi-green/20' 
                        : 'border-gray-800 opacity-70'
                      }
                    `}>
                      {/* Badge "Bientôt" pour PHP */}
                      {!lang.available && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-ipssi-yellow to-ipssi-green text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Bientôt
                        </div>
                      )}
                      
                      <div className="flex flex-col items-center text-center space-y-3">
                        {/* Icône */}
                        <div className={`
                          w-16 h-16 rounded-xl flex items-center justify-center
                          ${lang.available 
                            ? 'bg-gradient-to-br from-ipssi-green/20 to-ipssi-yellow/20 text-ipssi-green group-hover:scale-110' 
                            : 'bg-gray-700/30 text-gray-500'
                          }
                          transition-all duration-300
                        `}>
                          {lang.icon}
                        </div>
                        
                        {/* Nom */}
                        <h3 className={`text-lg font-bold ${lang.available ? 'text-white' : 'text-gray-500'}`}>
                          {lang.name}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm text-gray-400">
                          {lang.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Effet de glow au hover (seulement pour les disponibles) */}
                    {lang.available && (
                      <div className="absolute inset-0 bg-ipssi-green/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    )}
                  </motion.div>
                </TechCard>
              )
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Pourquoi choisir CodeQuest ?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Une approche moderne et efficace pour l'apprentissage du code
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Target size={32} className="text-purple-600" />,
                title: "Apprentissage ciblé",
                description: "Des exercices structurés pour progresser efficacement et atteindre tes objectifs"
              },
              {
                icon: <Code2 size={32} className="text-blue-600" />,
                title: "Pratique directe",
                description: "Code directement dans ton navigateur avec un éditeur intégré et un feedback instantané"
              },
              {
                icon: <Brain size={32} className="text-pink-600" />,
                title: "Pédagogie adaptée",
                description: "Des cours conçus par l'IPSSI pour une progression logique et adaptée à ton niveau"
              },
              {
                icon: <Trophy size={32} className="text-yellow-600" />,
                title: "Validation des acquis",
                description: "Teste tes connaissances et valide tes compétences avec des exercices variés"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-700/50"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-inner">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ipssi-green via-ipssi-yellow to-ipssi-lime p-12 md:p-16 text-center shadow-2xl"
          >
            {/* Overlay pour réduire le contraste */}
            <div className="absolute inset-0 bg-gray-900/20" />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Commence ton aventure dès maintenant
              </h2>
              <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto mb-4">
                Rejoins la communauté IPSSI et développe tes compétences en programmation
              </p>
              <div className="pt-4">
                <Link to="/courses">
                  <motion.button
                    className="bg-gray-900 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2">
                      <span>Explorer les cours</span>
                      <ArrowRight size={20} />
                    </div>
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-ipssi-green/20 rounded-full blur-3xl" />
          </motion.div>
        </section>
      </div>
    </>
  )
}

export default Home

