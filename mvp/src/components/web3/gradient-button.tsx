import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gradientButtonVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden rounded-lg p-[2px] transition-all duration-300 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400",
        success: "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500",
        warning: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  children: React.ReactNode
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative flex h-full w-full items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-transparent hover:text-white">
          {children}
        </span>
      </button>
    )
  }
)
GradientButton.displayName = "GradientButton"

export { GradientButton, gradientButtonVariants } 