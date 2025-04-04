import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface GradientBackgroundProps {
  className?: string
  speed?: number
  colors?: string[]
}

export function GradientBackground({
  className,
  speed = 0.5,
  colors = [
    'from-purple-600',
    'via-blue-500',
    'to-cyan-400',
    'from-fuchsia-500',
    'via-purple-600',
    'to-indigo-500'
  ]
}: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
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

      // Create gradient
      const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height
      )

      // Add color stops with animation
      const numColors = colors.length
      colors.forEach((color, i) => {
        const offset = (i / numColors + (timeRef.current % 1)) % 1
        gradient.addColorStop(offset, color)
      })

      // Fill canvas with gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [colors, speed])

  return (
    <div className={cn('fixed inset-0 -z-10', className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
} 