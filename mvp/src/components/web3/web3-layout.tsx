import { ReactNode } from 'react'
import { GradientBackground } from './gradient-background'
import { ParticleBackground } from './particle-background'

interface Web3LayoutProps {
  children: ReactNode
  showParticles?: boolean
  backgroundClassName?: string
}

export function Web3Layout({
  children,
  showParticles = true,
  backgroundClassName
}: Web3LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <GradientBackground className={backgroundClassName} />
      {showParticles && <ParticleBackground className="opacity-50" />}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 