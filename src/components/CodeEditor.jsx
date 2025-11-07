import { useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Lightbulb, Eye } from 'lucide-react'
import confetti from 'canvas-confetti'
import CodePreview from './CodePreview'

const CodeEditor = ({ exercise, onSuccess }) => {
  const [code, setCode] = useState(exercise.initialCode || '')
  const [output, setOutput] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    setCode(exercise.initialCode || '')
    setOutput('')
    setIsCorrect(false)
    setShowHint(false)
    setShowSolution(false)
  }, [exercise])

  const getLanguageExtension = () => {
    switch (exercise.language) {
      case 'html':
        return html()
      case 'css':
        return css()
      case 'javascript':
        return javascript()
      case 'python':
        return python()
      default:
        return javascript()
    }
  }

  const normalizeCode = (str) => {
    // Supprimer les commentaires HTML
    let cleanedStr = str.replace(/<!--[\s\S]*?-->/g, '')
    // Supprimer les commentaires CSS
    cleanedStr = cleanedStr.replace(/\/\*[\s\S]*?\*\//g, '')
    // Supprimer les commentaires JavaScript et Python (lignes commençant par // ou #)
    cleanedStr = cleanedStr.replace(/\/\/.*$/gm, '')
    cleanedStr = cleanedStr.replace(/#.*$/gm, '')
    
    // Pour HTML, Python et JavaScript, normaliser les guillemets (accepter " et ')
    if (exercise.language === 'html' || exercise.language === 'python' || exercise.language === 'javascript') {
      cleanedStr = cleanedStr.replace(/"/g, "'")
    }
    
    // Pour JavaScript, supprimer les point-virgules (optionnels)
    if (exercise.language === 'javascript') {
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

    // Vérification par langage
    if (exercise.language === 'html') {
      // Vérifier les balises manquantes
      const solutionTags = solution.match(/<(\w+)[^>]*>/g) || []
      const userTags = userCode.match(/<(\w+)[^>]*>/g) || []
      
      solutionTags.forEach(tag => {
        const tagName = tag.match(/<(\w+)/)[1]
        if (!userTags.some(t => t.includes(tagName))) {
          errors.push(`❌ Il manque une balise <${tagName}>`)
        }
      })

      // Vérifier les balises fermantes
      const openTags = userCode.match(/<(\w+)[^>]*>/g) || []
      const closeTags = userCode.match(/<\/(\w+)>/g) || []
      if (openTags.length > closeTags.length) {
        errors.push('❌ Tu as oublié de fermer une ou plusieurs balises')
      }

      // Vérifier le contenu des balises
      if (normalized.length < normalizedSol.length * 0.5) {
        errors.push('❌ Il manque du contenu dans ton code')
      }
    } else if (exercise.language === 'css') {
      // Vérifier le sélecteur
      if (!userCode.includes('.') && solution.includes('.')) {
        errors.push('❌ N\'oublie pas le point (.) devant le nom de la classe !')
      }
      
      // Vérifier les accolades
      if (!userCode.includes('{') || !userCode.includes('}')) {
        errors.push('❌ Il manque les accolades { } pour ton style CSS')
      }

      // Vérifier les propriétés
      const solProps = solution.match(/[\w-]+\s*:/g) || []
      solProps.forEach(prop => {
        const propName = prop.replace(':', '').trim()
        if (!userCode.includes(propName)) {
          errors.push(`❌ Il manque la propriété ${propName}`)
        }
      })

      // Vérifier les point-virgules
      const userProps = userCode.match(/:.+?[;}]/g) || []
      userProps.forEach(prop => {
        if (!prop.trim().endsWith(';') && !prop.trim().endsWith('}')) {
          errors.push('❌ N\'oublie pas le point-virgule ; à la fin de chaque propriété')
        }
      })
    } else if (exercise.language === 'javascript') {
      // Vérifier la fonction
      if (solution.includes('function') && !userCode.includes('function')) {
        errors.push('❌ Tu dois créer une fonction avec le mot-clé "function"')
      }

      // Vérifier console.log
      if (solution.includes('console.log') && !userCode.includes('console.log')) {
        errors.push('❌ Tu dois utiliser console.log() pour afficher')
      }

      // Vérifier const/let
      if ((solution.includes('const') || solution.includes('let')) && 
          !userCode.includes('const') && !userCode.includes('let')) {
        errors.push('❌ Tu dois déclarer une variable avec const ou let')
      }

      // Vérifier les parenthèses
      const openParen = (userCode.match(/\(/g) || []).length
      const closeParen = (userCode.match(/\)/g) || []).length
      if (openParen !== closeParen) {
        errors.push('❌ Vérifie tes parenthèses ( ) - certaines ne sont pas fermées')
      }
    } else if (exercise.language === 'python') {
      // Vérifier print()
      if (solution.includes('print') && !userCode.includes('print')) {
        errors.push('❌ Tu dois utiliser print() pour afficher')
      }

      // Vérifier def
      if (solution.includes('def ') && !userCode.includes('def ')) {
        errors.push('❌ Tu dois créer une fonction avec "def"')
      }

      // Vérifier l'indentation
      if (solution.includes('def ') && userCode.includes('def ') && 
          !userCode.match(/def.*:\n\s{2,}/)) {
        errors.push('❌ N\'oublie pas l\'indentation (4 espaces) après la définition de fonction !')
      }
    }

    // Vérifications générales
    if (userCode.trim().length === 0) {
      errors.push('❌ Tu n\'as rien écrit ! Commence à coder.')
    }

    return errors
  }

  const executeCode = () => {
    const normalizedCode = normalizeCode(code)
    const normalizedSolution = normalizeCode(exercise.solution)

    if (normalizedCode === normalizedSolution) {
      setOutput('✅ Bravo ! Ton code est correct ! 🎉')
      setIsCorrect(true)
      
      // Confettis !
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#007bff', '#86efac', '#fde047', '#fda4af', '#c084fc']
      })

      if (onSuccess) onSuccess()
    } else {
      // Analyser l'erreur et donner des détails
      const errors = analyzeError(code, exercise.solution)
      
      if (errors.length > 0) {
        setOutput(`❌ Presque ! Voici ce qui ne va pas :\n\n${errors.join('\n')}`)
      } else {
        setOutput('❌ Pas tout à fait... Vérifie les détails : majuscules, espaces, ponctuation. 💪')
      }
      setIsCorrect(false)
    }
  }

  const resetCode = () => {
    setCode(exercise.initialCode)
    setOutput('')
    setIsCorrect(false)
    setShowHint(false)
    setShowSolution(false)
  }

  const viewSolution = () => {
    setShowSolution(true)
    setCode(exercise.solution)
    setOutput('💡 Solution affichée ! Prends le temps de la comprendre.')
  }

  return (
    <div className="space-y-4">
      {/* Layout avec éditeur et preview côte à côté */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
        {/* Éditeur de code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="code-container overflow-hidden h-[450px] flex flex-col"
        >
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between flex-wrap gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-white text-sm font-mono">
              {exercise.language}
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
            value={code}
            height="100%"
            theme={oneDark}
            extensions={[getLanguageExtension()]}
            onChange={(value) => setCode(value)}
            className="text-base h-full"
          />
        </div>
        </motion.div>

        {/* Preview/Console en temps réel - Toujours visible */}
        <div className="h-[450px]">
          <CodePreview 
            code={code} 
            language={exercise.language}
            useConsole={exercise.language === 'javascript'}
          />
        </div>
      </div>

      {/* Indice */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg"
        >
          <p className="flex items-center gap-2 text-yellow-800">
            <Lightbulb size={20} />
            <strong>Indice :</strong> {exercise.hint}
          </p>
        </motion.div>
      )}

      {/* Boutons d'action */}
      <div className="flex flex-wrap gap-3">
        <motion.button
          onClick={executeCode}
          className="btn-cartoon btn-primary flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play size={20} />
          {exercise.language === 'python' ? 'Valider mon code' : 'Exécuter le code'}
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
      {showSolution && !isCorrect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-xl"
        >
          <p className="text-purple-300">
            <strong>💡 Solution affichée !</strong> Prends le temps de bien la comprendre. L'important n'est pas de copier, mais de comprendre la logique ! À l'IPSSI, on valorise la compréhension. 🎓
          </p>
        </motion.div>
      )}

      {/* Résultat */}
      {output && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
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
    </div>
  )
}

export default CodeEditor
