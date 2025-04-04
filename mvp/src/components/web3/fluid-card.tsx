import * as React from "react"
import { cn } from "@/lib/utils"

interface FluidCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  gradient?: "default" | "purple" | "blue" | "green"
}

const FluidCard = React.forwardRef<HTMLDivElement, FluidCardProps>(
  ({ className, children, gradient = "default", ...props }, ref) => {
    const gradientClasses = {
      default: "from-purple-500/20 via-blue-500/20 to-cyan-500/20",
      purple: "from-purple-600/20 via-fuchsia-500/20 to-pink-500/20",
      blue: "from-blue-600/20 via-cyan-500/20 to-teal-500/20",
      green: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            gradientClasses[gradient]
          )}
        />
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
)
FluidCard.displayName = "FluidCard"

export { FluidCard } 