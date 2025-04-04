import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface GradientBackgroundProps {
  className?: string
  speed?: number
  colors?: string[]
}

export function GradientBackground({
  className,
  speed = 0.0015, // Slow, smooth movement
  colors = [
    '#0b2e1d', // Deep forest green
    '#0f3d2e', // Dark jade
    '#14532d', // Dense moss green
    '#166534', // Classic dark green
    '#1e4620', // Muted jungle
    '#2e7d32'  // Earthy emerald for contrast
  ]
  
}: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      timeRef.current += speed
      const width = canvas.width
      const height = canvas.height

      // Create a smooth fading effect
      ctx.globalAlpha = 0.9
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)' // Faint fade effect
      ctx.fillRect(0, 0, width, height)

      // Create a dynamic, fluid gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      const numColors = colors.length

      colors.forEach((color, i) => {
        // Smooth sine wave motion
        const wave = Math.sin(timeRef.current * 2 + i * 1.5) * 0.4 + 0.5 // Normalize range [0, 1]
        gradient.addColorStop(wave, color)
      })

      // Apply gradient and blur for a smooth effect
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Create a soft blur effect for fluidity
      ctx.filter = 'blur(20px)'

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [colors, speed])

  return (
    <div className={cn('fixed inset-0 -z-10', className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
