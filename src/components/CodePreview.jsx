import { motion } from 'framer-motion'
import { Eye, Terminal, Code } from 'lucide-react'
import { useMemo } from 'react'

const CodePreview = ({ code, language }) => {
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

  // Preview CSS
  const cssPreview = useMemo(() => {
    if (!code) return ''
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 1rem; font-family: sans-serif; background-color: #f9fafb; color: #1f2937; }
          ${code}
        </style>
      </head>
      <body>
        <div class="ipssi">Bonjour IPSSI Nice ! 🎓</div>
        <h1 class="titre">IPSSI CodeQuest</h1>
        <div class="campus">
          <h2>Campus IPSSI Nice</h2>
          <p>Une école d'excellence</p>
        </div>
        <span class="badge">Étudiant IPSSI</span>
        <div class="ipssi-card">
          <h2>Formation Web</h2>
          <p>Développement front-end et back-end</p>
          <p><strong>📍 IPSSI Nice</strong></p>
        </div>
      </body>
      </html>
    `
  }, [code])

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
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300"
      >
        <Code className="mx-auto mb-3 text-gray-400" size={48} />
        <p className="text-gray-600 font-medium">
          Commence à coder pour voir le résultat ici ! ✨
        </p>
      </motion.div>
    )
  }

  // Python - Console style
  if (language === 'python') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-2xl p-6 font-mono text-sm shadow-xl"
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
          <Terminal size={20} className="text-green-400" />
          <span className="font-semibold text-green-400">Console Python</span>
          <span className="ml-auto text-xs text-gray-500">IPSSI CodeQuest</span>
        </div>
        <div className="space-y-2">
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

  // HTML, CSS, JavaScript - Preview iframe
  const getSrcDoc = () => {
    if (language === 'html') return htmlPreview
    if (language === 'css') return cssPreview
    if (language === 'javascript') return jsPreview
    return ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Eye size={18} />
          <span className="font-semibold text-sm">
            {language === 'javascript' ? 'Console' : 'Aperçu'} en temps réel
          </span>
        </div>
        <span className="text-xs text-white/80">IPSSI CodeQuest</span>
      </div>
      <div className="bg-gray-50 p-1">
        <iframe
          className="w-full h-[400px] bg-white rounded-lg border-0"
          title="Live Preview"
          srcDoc={getSrcDoc()}
          sandbox="allow-scripts"
        />
      </div>
    </motion.div>
  )
}

export default CodePreview

