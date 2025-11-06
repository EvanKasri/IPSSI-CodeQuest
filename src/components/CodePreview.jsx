import { motion } from 'framer-motion'
import { Eye, Terminal, Code } from 'lucide-react'
import { useMemo } from 'react'

const CodePreview = ({ code, language, useConsole = false }) => {
  // Exécution Python
  const executePython = useMemo(() => {
    if (!code) return []
    
    try {
      const output = []
      const lines = code.trim().split('\n')
      const variables = {}
      
      for (const line of lines) {
        const trimmedLine = line.trim()
        if (!trimmedLine || trimmedLine.startsWith('#')) continue
        
        // print()
        const printMatch = trimmedLine.match(/print\((.*)\)/)
        if (printMatch) {
          let content = printMatch[1].trim()
          
          if (content.match(/^['"].*['"]$/)) {
            output.push(content.slice(1, -1))
          } else if (variables[content]) {
            output.push(variables[content])
          } else if (content.match(/^[\d\s+\-*/()]+$/)) {
            try {
              output.push(String(eval(content)))
            } catch {
              output.push(content)
            }
          } else {
            try {
              let expr = content
              for (const [varName, varValue] of Object.entries(variables)) {
                expr = expr.replace(new RegExp('\\b' + varName + '\\b', 'g'), varValue)
              }
              if (expr.match(/^[\d\s+\-*/()]+$/)) {
                output.push(String(eval(expr)))
              } else {
                output.push(content)
              }
            } catch {
              output.push(content)
            }
          }
          continue
        }
        
        // Variable
        const varMatch = trimmedLine.match(/^(\w+)\s*=\s*(.+)$/)
        if (varMatch) {
          const varName = varMatch[1]
          let value = varMatch[2].trim()
          
          if (value.match(/^['"].*['"]$/)) {
            variables[varName] = value.slice(1, -1)
          } else if (!isNaN(value)) {
            variables[varName] = value
          } else {
            try {
              let expr = value
              for (const [vName, vValue] of Object.entries(variables)) {
                expr = expr.replace(new RegExp('\\b' + vName + '\\b', 'g'), vValue)
              }
              if (expr.match(/^[\d\s+\-*/()]+$/)) {
                variables[varName] = String(eval(expr))
              } else {
                variables[varName] = value
              }
            } catch {
              variables[varName] = value
            }
          }
        }
      }
      
      return output.length > 0 ? output : []
    } catch (error) {
      return [`Erreur: ${error.message}`]
    }
  }, [code])

  // Preview HTML
  const htmlPreview = useMemo(() => {
    if (!code) return ''
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 1rem; font-family: sans-serif; background-color: #f9fafb; color: #1f2937; }
        </style>
      </head>
      <body>${code}</body>
      </html>
    `
  }, [code])

  // Pour CSS/JS, on reçoit déjà le HTML complet depuis MultiTabEditor
  // Donc on l'utilise directement

  // Preview JavaScript
  const jsPreview = useMemo(() => {
    if (!code) return ''
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 1rem; font-family: sans-serif; background-color: #1f2937; color: #f9fafb; }
          #console-output {
            background-color: #111827;
            color: #10b981;
            padding: 12px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            white-space: pre-wrap;
            min-height: 100px;
            border: 2px solid #374151;
          }
          .console-line {
            margin: 4px 0;
            display: flex;
            align-items: start;
          }
          .console-prefix {
            color: #10b981;
            margin-right: 8px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h3 style="color: #10b981; margin-top: 0;">Console JavaScript</h3>
        <div id="console-output"></div>
        <script>
          const originalLog = console.log;
          const consoleOutput = document.getElementById('console-output');
          
          console.log = (...args) => {
            originalLog(...args);
            const line = document.createElement('div');
            line.className = 'console-line';
            const prefix = document.createElement('span');
            prefix.className = 'console-prefix';
            prefix.textContent = '>>>';
            const content = document.createElement('span');
            content.textContent = args.map(arg => {
              if (typeof arg === 'object' && arg !== null) {
                return JSON.stringify(arg, null, 2);
              }
              return String(arg);
            }).join(' ');
            line.appendChild(prefix);
            line.appendChild(content);
            consoleOutput.appendChild(line);
          };
          
          try {
            ${code}
          } catch (e) {
            const errorLine = document.createElement('div');
            errorLine.className = 'console-line';
            errorLine.innerHTML = '<span class="console-prefix" style="color: #ef4444;">❌</span><span style="color: #ef4444;">Erreur: ' + e.message + '</span>';
            consoleOutput.appendChild(errorLine);
          }
          
          if (consoleOutput.innerHTML === '') {
            consoleOutput.innerHTML = '<div style="color: #6b7280; font-style: italic;">Aucune sortie console...</div>';
          }
        </script>
      </body>
      </html>
    `
  }, [code])

  if (!code || code.trim().length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center border-2 border-gray-700 h-full flex items-center justify-center"
      >
        <div>
          <Code className="mx-auto mb-3 text-gray-500" size={48} />
          <p className="text-gray-400 font-medium">
            Commence à coder pour voir le résultat ici ! ✨
          </p>
        </div>
      </motion.div>
    )
  }

  // Python - Console style
  if (language === 'python') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-2xl p-6 font-mono text-sm shadow-xl h-full flex flex-col"
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700 flex-shrink-0">
          <Terminal size={20} className="text-green-400" />
          <span className="font-semibold text-green-400">Console Python</span>
          <span className="ml-auto text-xs text-gray-500">IPSSI CodeQuest</span>
        </div>
        <div className="space-y-2 flex-1 overflow-y-auto">
          {executePython.length > 0 ? (
            executePython.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="text-green-400 font-bold">{'>>>'}</span>
                <span className="text-gray-100">{line}</span>
              </motion.div>
            ))
          ) : (
            <div className="text-gray-500 italic">Aucune sortie...</div>
          )}
        </div>
      </motion.div>
    )
  }

  // JavaScript avec console (exercices simples sans HTML)
  if (language === 'javascript' && useConsole) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden h-full flex flex-col"
      >
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-white">
            <Terminal size={18} />
            <span className="font-semibold text-sm">Console JavaScript</span>
          </div>
          <span className="text-xs text-white/80">IPSSI CodeQuest</span>
        </div>
        <div className="bg-gray-50 p-1 flex-1">
          <iframe
            className="w-full h-full bg-white rounded-lg border-0"
            title="JavaScript Console"
            srcDoc={jsPreview}
            sandbox="allow-scripts"
          />
        </div>
      </motion.div>
    )
  }

  // HTML, CSS, JavaScript - Preview iframe
  const getSrcDoc = () => {
    // Pour HTML simple
    if (language === 'html') return htmlPreview
    
    // Pour CSS et JavaScript, le code reçu est déjà le HTML complet depuis MultiTabEditor
    // On l'utilise directement
    if (language === 'css' || language === 'javascript') {
      return code || '<body style="padding: 2rem; font-family: sans-serif;">Commence à coder...</body>'
    }
    
    return ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden h-full flex flex-col"
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 text-white">
          <Eye size={18} />
          <span className="font-semibold text-sm">Aperçu en temps réel</span>
        </div>
        <span className="text-xs text-white/80">IPSSI CodeQuest</span>
      </div>
      <div className="bg-gray-50 p-1 flex-1">
        <iframe
          className="w-full h-full bg-white rounded-lg border-0"
          title="Live Preview"
          srcDoc={getSrcDoc()}
          sandbox="allow-scripts"
        />
      </div>
    </motion.div>
  )
}

export default CodePreview

