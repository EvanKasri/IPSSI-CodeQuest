import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Rocket, Code2, Trophy, Users, GraduationCap, BookOpen } from 'lucide-react'

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
    { name: "HTML", icon: "🌐", color: "bg-orange-400" },
    { name: "CSS", icon: "🎨", color: "bg-blue-400" },
    { name: "JavaScript", icon: "⚡", color: "bg-yellow-400" },
    { name: "Python", icon: "🐍", color: "bg-green-400" }
  ]

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8"
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-8xl inline-block"
        >
          🐱‍💻
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          🚀 Apprends à coder <br />
          <span className="text-ipssi-blue">comme un pro</span> avec<br />
          <span className="bg-gradient-to-r from-ipssi-blue to-purple-600 bg-clip-text text-transparent">
            IPSSI CodeQuest !
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          La plateforme éducative interactive pour maîtriser les langages de programmation. 
          Apprends, pratique, et deviens un développeur accompli ! 💻✨
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/courses">
            <motion.button
              className="btn-cartoon btn-primary text-lg px-8 py-4 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket size={24} />
              Commencer l'aventure
            </motion.button>
          </Link>
          <a 
            href="https://ecole-ipssi.com/ecole-informatique-nice/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <motion.button
              className="btn-cartoon bg-white text-ipssi-blue border-4 border-ipssi-blue text-lg px-8 py-4 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap size={24} />
              Rejoins l'IPSSI Nice
            </motion.button>
          </a>
        </div>
      </motion.section>

      {/* Langages Section */}
      <section>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          🎯 Les langages que tu vas maîtriser
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`card-cartoon ${lang.color} text-center cursor-pointer`}
            >
              <div className="text-6xl mb-3">{lang.icon}</div>
              <h3 className="text-2xl font-bold text-white">{lang.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          ✨ Pourquoi IPSSI CodeQuest ?
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-cartoon flex gap-6"
            >
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="card-cartoon bg-gradient-to-r from-ipssi-blue to-purple-600 text-white text-center py-16"
      >
        <h2 className="text-4xl font-bold mb-6">
          Prêt à devenir un champion du code ? 🏆
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Rejoins des centaines d'étudiants IPSSI qui apprennent à coder de manière fun et interactive !
        </p>
        <Link to="/courses">
          <motion.button
            className="bg-white text-ipssi-blue font-bold text-xl px-12 py-5 rounded-full shadow-cartoon hover:shadow-cartoon-hover transition-all"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 C'est parti !
          </motion.button>
        </Link>
      </motion.section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { value: "4+", label: "Langages" },
          { value: "20+", label: "Exercices" },
          { value: "100%", label: "Gratuit" },
          { value: "🎓", label: "IPSSI Nice" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card-cartoon"
          >
            <div className="text-5xl font-bold text-ipssi-blue mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 font-semibold">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

export default Home

