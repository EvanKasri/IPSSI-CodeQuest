import { useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, Lightbulb, Code2, FileCode, Sparkles, Eye } from 'lucide-react'
import confetti from 'canvas-confetti'
import CodePreview from './CodePreview'

const MultiTabEditor = ({ exercise, onSuccess }) => {
  const [activeTab, setActiveTab] = useState(exercise.language === 'css' || exercise.language === 'javascript' ? 'html' : 'main')
  const [htmlCode, setHtmlCode] = useState(exercise.baseHtml || '<div class="container">\n  <!-- Ton HTML ici -->\n</div>')
  const [mainCode, setMainCode] = useState(exercise.initialCode || '')
  const [output, setOutput] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    setHtmlCode(exercise.baseHtml || '<div class="container">\n  <!-- Ton HTML ici -->\n</div>')
    setMainCode(exercise.initialCode || '')
    setActiveTab(exercise.language === 'css' || exercise.language === 'javascript' ? 'html' : 'main')
    setOutput('')
    setIsCorrect(false)
    setShowHint(false)
    setShowSolution(false)
  }, [exercise])

  const tabs = exercise.language === 'css' || exercise.language === 'javascript'
    ? [
        { id: 'html', label: 'HTML', icon: <FileCode size={16} />, language: 'html' },
        { id: 'main', label: exercise.language === 'css' ? 'CSS' : 'JavaScript', icon: <Code2 size={16} />, language: exercise.language }
      ]
    : [{ id: 'main', label: exercise.language.toUpperCase(), icon: <Code2 size={16} />, language: exercise.language }]

  const getCurrentCode = () => {
    return activeTab === 'html' ? htmlCode : mainCode
  }

  const setCurrentCode = (value) => {
    if (activeTab === 'html') {
      setHtmlCode(value)
    } else {
      setMainCode(value)
    }
  }

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case 'html':
        return html()
      case 'css':
        return css()
      case 'javascript':
        return javascript()
      default:
        return javascript()
    }
  }

  const getCombinedCode = () => {
    if (exercise.language === 'css') {
      return `<!DOCTYPE html>\n<html>\n<head>\n<style>\n${mainCode}\n</style>\n</head>\n<body>\n${htmlCode}\n</body>\n</html>`
    } else if (exercise.language === 'javascript') {
      return `<!DOCTYPE html>\n<html>\n<body>\n${htmlCode}\n<script>\n${mainCode}\n</script>\n</body>\n</html>`
    }
    return mainCode
  }

  const normalizeCode = (str) => {
    let cleanedStr = str.replace(/<!--[\s\S]*?-->/g, '')
    cleanedStr = cleanedStr.replace(/\/\*[\s\S]*?\*\//g, '')
    cleanedStr = cleanedStr.replace(/\/\/.*$/gm, '')
    cleanedStr = cleanedStr.replace(/#.*$/gm, '')
    
    // Normaliser les guillemets pour JavaScript
    if (exercise.language === 'javascript') {
      cleanedStr = cleanedStr.replace(/"/g, "'")
      // Supprimer les point-virgules (optionnels)
      cleanedStr = cleanedStr.replace(/;/g, '')
    }
    
    return cleanedStr
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\s*([<>{}();,:])\s*/g, '$1')
      .toLowerCase()
  }

  const analyzeError = (userCode, solution) => {
    const errors = []
    const normalized = normalizeCode(userCode)
    const normalizedSol = normalizeCode(solution)

    if (exercise.language === 'html') {
      const solutionTags = solution.match(/<(\w+)[^>]*>/g) || []
      const userTags = userCode.match(/<(\w+)[^>]*>/g) || []
      
      solutionTags.forEach(tag => {
        const tagName = tag.match(/<(\w+)/)[1]
        if (!userTags.some(t => t.includes(tagName))) {
          errors.push(`❌ Il manque une balise <${tagName}>`)
        }
      })

      const openTags = userCode.match(/<(\w+)[^>]*>/g) || []
      const closeTags = userCode.match(/<\/(\w+)>/g) || []
      if (openTags.length > closeTags.length) {
        errors.push('❌ Tu as oublié de fermer une ou plusieurs balises')
      }

      if (normalized.length < normalizedSol.length * 0.5) {
        errors.push('❌ Il manque du contenu dans ton code')
      }
    } else if (exercise.language === 'css') {
      if (!userCode.includes('.') && solution.includes('.')) {
        errors.push('❌ N\'oublie pas le point (.) devant le nom de la classe !')
      }
      
      if (!userCode.includes('{') || !userCode.includes('}')) {
        errors.push('❌ Il manque les accolades { } pour ton style CSS')
      }

      const solProps = solution.match(/[\w-]+\s*:/g) || []
      solProps.forEach(prop => {
        const propName = prop.replace(':', '').trim()
        if (!userCode.includes(propName)) {
          errors.push(`❌ Il manque la propriété ${propName}`)
        }
      })
    } else if (exercise.language === 'javascript') {
      if (solution.includes('function') && !userCode.includes('function')) {
        errors.push('❌ Tu dois créer une fonction avec le mot-clé "function"')
      }

      if (solution.includes('console.log') && !userCode.includes('console.log')) {
        errors.push('❌ Tu dois utiliser console.log() pour afficher')
      }

      const openParen = (userCode.match(/\(/g) || []).length
      const closeParen = (userCode.match(/\)/g) || []).length
      if (openParen !== closeParen) {
        errors.push('❌ Vérifie tes parenthèses ( ) - certaines ne sont pas fermées')
      }
    }

    if (userCode.trim().length === 0) {
      errors.push('❌ Tu n\'as rien écrit ! Commence à coder.')
    }

    return errors
  }

  const executeCode = () => {
    const normalizedCode = normalizeCode(mainCode)
    const normalizedSolution = normalizeCode(exercise.solution)

    if (normalizedCode === normalizedSolution) {
      setOutput('✅ Bravo ! Ton code est correct ! 🎉')
      setIsCorrect(true)
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#007bff', '#86efac', '#fde047', '#fda4af', '#c084fc']
      })

      if (onSuccess) onSuccess()
    } else {
      const errors = analyzeError(mainCode, exercise.solution)
      
      if (errors.length > 0) {
        setOutput(`❌ Presque ! Voici ce qui ne va pas :\n\n${errors.join('\n')}`)
      } else {
        setOutput('❌ Pas tout à fait... Vérifie les détails : majuscules, espaces, ponctuation. 💪')
      }
      setIsCorrect(false)
    }
  }

  const resetCode = () => {
    setHtmlCode(exercise.baseHtml || '<div class="container">\n  <!-- Ton HTML ici -->\n</div>')
    setMainCode(exercise.initialCode || '')
    setOutput('')
    setIsCorrect(false)
    setShowHint(false)
    setShowSolution(false)
  }

  const viewSolution = () => {
    setShowSolution(true)
    setMainCode(exercise.solution)
    if (exercise.baseHtml) {
      setHtmlCode(exercise.solutionHtml || exercise.baseHtml)
    }
    setOutput('💡 Solution affichée ! Prends le temps de la comprendre.')
  }

  const getCombinedPreviewCode = () => {
    if (exercise.language === 'css') {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${mainCode}</style>
        </head>
        <body>${htmlCode}</body>
        </html>
      `
    } else if (exercise.language === 'javascript') {
      return `
        <!DOCTYPE html>
        <html>
        <body>
          ${htmlCode}
          <script>${mainCode}</script>
        </body>
        </html>
      `
    }
    return mainCode
  }

  return (
    <div className="space-y-4">
      {/* Guide contextuel */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 flex items-start gap-3"
      >
        <Sparkles className="text-purple-400 flex-shrink-0 mt-1" size={20} />
        <div className="flex-1">
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-purple-400">💡 Mode guidé :</strong> {
              exercise.language === 'css' 
                ? "Utilise l'onglet HTML pour voir la structure, puis style-la dans l'onglet CSS. La prévisualisation se met à jour en temps réel !"
                : exercise.language === 'javascript'
                ? "Utilise l'onglet HTML pour voir la structure, puis ajoute de l'interactivité dans l'onglet JavaScript !"
                : "Écris ton code et vois le résultat en temps réel ! N'hésite pas à utiliser les indices si besoin."
            }
          </p>
        </div>
      </motion.div>

      {/* Layout avec onglets/éditeur et preview côte à côte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
        <div className="space-y-2">
          {/* Onglets */}
          {tabs.length > 1 && (
            <div className="flex gap-2">
              {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'main' && <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">À toi !</span>}
            </motion.button>
          ))}
            </div>
          )}

          {/* Éditeur */}
          <motion.div
            layout
            className="code-container overflow-hidden h-[450px] flex flex-col"
          >
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between flex-wrap gap-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-white text-sm font-mono">
                {tabs.find(t => t.id === activeTab)?.language || exercise.language}
              </span>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => setShowHint(!showHint)}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Afficher l'indice"
              >
                <Lightbulb size={20} />
              </motion.button>
              <motion.button
                onClick={resetCode}
                className="text-blue-400 hover:text-blue-300 transition-colors"
                whileHover={{ scale: 1.1, rotate: -180 }}
                whileTap={{ scale: 0.9 }}
                title="Réinitialiser"
              >
                <RotateCcw size={20} />
              </motion.button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeMirror
              value={getCurrentCode()}
              height="100%"
              theme={oneDark}
              extensions={[getLanguageExtension(tabs.find(t => t.id === activeTab)?.language || exercise.language)]}
              onChange={(value) => setCurrentCode(value)}
              className="text-base h-full"
              readOnly={activeTab === 'html' && !exercise.editableHtml}
            />
          </div>
          {activeTab === 'html' && !exercise.editableHtml && (
            <div className="bg-blue-900 text-blue-200 px-4 py-2 text-sm flex-shrink-0">
              ℹ️ Ce HTML est en lecture seule. Modifie le {exercise.language === 'css' ? 'CSS' : 'JavaScript'} dans l'onglet correspondant.
            </div>
          )}
        </motion.div>
        </div>

        {/* Preview en temps réel - Toujours visible */}
        <div className="h-[450px]">
          <CodePreview 
            code={getCombinedPreviewCode()} 
            language={exercise.language === 'css' ? 'css' : exercise.language === 'javascript' ? 'javascript' : 'html'}
            useConsole={false}
          />
        </div>
      </div>

      {/* Indice */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg"
          >
            <p className="flex items-center gap-2 text-yellow-800">
              <Lightbulb size={20} />
              <strong>Indice :</strong> {exercise.hint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Boutons d'action */}
      <div className="flex flex-wrap gap-3">
        <motion.button
          onClick={executeCode}
          className="btn-cartoon btn-primary flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play size={20} />
          Valider mon code
        </motion.button>

        {!showSolution && (
          <motion.button
            onClick={viewSolution}
            className="btn-cartoon bg-purple-500 hover:bg-purple-600 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye size={20} />
            Voir la solution
          </motion.button>
        )}
      </div>

      {/* Message de solution */}
      <AnimatePresence>
        {showSolution && !isCorrect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg"
          >
            <p className="text-purple-800">
              <strong>💡 Solution affichée !</strong> Prends le temps de bien la comprendre. L'important n'est pas de copier, mais de comprendre la logique ! À l'IPSSI, on valorise la compréhension. 🎓
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Résultat */}
      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`p-6 rounded-2xl shadow-cartoon ${
              isCorrect 
                ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' 
                : 'bg-gradient-to-r from-orange-400 to-red-400 text-white'
            }`}
          >
            {isCorrect ? (
              <>
                <p className="text-xl font-semibold text-center">{output}</p>
                <motion.p
                  className="text-center mt-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  🎉 Continue comme ça, champion de l'IPSSI ! 🚀
                </motion.p>
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-xl font-semibold text-center">
                  {output.split('\n\n')[0]}
                </p>
                {output.includes('\n\n') && (
                  <div className="bg-white/20 rounded-lg p-4 text-left">
                    {output.split('\n\n')[1].split('\n').map((error, index) => (
                      <div key={index} className="flex items-start gap-2 mb-2">
                        <span className="text-2xl">•</span>
                        <span className="flex-1">{error}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-center text-sm opacity-90">
                  💡 Lis bien les messages ci-dessus pour corriger ton code !
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MultiTabEditor

