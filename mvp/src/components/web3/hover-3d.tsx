import * as React from "react"
import { cn } from "@/lib/utils"

interface Hover3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  perspective?: number
  intensity?: number
}

const Hover3D = React.forwardRef<HTMLDivElement, Hover3DProps>(
  (
    {
      className,
      children,
      perspective = 1000,
      intensity = 5,
      ...props
    },
    ref
  ) => {
    const [rotation, setRotation] = React.useState({ x: 0, y: 0 })
    const cardRef = React.useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / centerY * intensity
      const rotateY = (centerX - x) / centerX * intensity

      setRotation({ x: rotateX, y: rotateY })
    }

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 })
    }

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ perspective }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          ref={cardRef}
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)
Hover3D.displayName = "Hover3D"

export { Hover3D } 