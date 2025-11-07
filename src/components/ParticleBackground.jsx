import { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    // Dimensionner le canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particules flottantes
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.5 + 0.3
        this.pulseSpeed = Math.random() * 0.02 + 0.01
      }

      update(t) {
        this.x += this.speedX
        this.y += this.speedY
        this.opacity = 0.3 + Math.sin(t * this.pulseSpeed) * 0.2

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = `rgba(204, 255, 0, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialiser les particules
    const particles = Array.from({ length: 50 }, () => new Particle())

    // Grille dynamique avec profondeur
    const drawDynamicGrid = (t) => {
      const gridSize = 80
      const waveAmplitude = 20
      const waveFrequency = 0.002

      ctx.strokeStyle = 'rgba(204, 255, 0, 0.04)'
      ctx.lineWidth = 1

      // Lignes horizontales ondulées
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 5) {
          const wave = Math.sin(x * waveFrequency + t * 0.001) * waveAmplitude
          if (x === 0) ctx.moveTo(x, y + wave)
          else ctx.lineTo(x, y + wave)
        }
        ctx.stroke()
      }

      // Lignes verticales ondulées
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        for (let y = 0; y <= canvas.height; y += 5) {
          const wave = Math.sin(y * waveFrequency + t * 0.001 + Math.PI / 2) * waveAmplitude
          if (y === 0) ctx.moveTo(x + wave, y)
          else ctx.lineTo(x + wave, y)
        }
        ctx.stroke()
      }
    }

    // Animation principale
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      time++

      // Grille dynamique
      drawDynamicGrid(time)

      // Particules
      particles.forEach(particle => {
        particle.update(time)
        particle.draw()
      })

      // Vignette subtile
      const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      )
      vignetteGradient.addColorStop(0, 'rgba(0,0,0,0)')
      vignetteGradient.addColorStop(1, 'rgba(0,0,0,0.3)')
      ctx.fillStyle = vignetteGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  )
}

export default ParticleBackground

