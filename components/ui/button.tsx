import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#8b1a1a] text-white hover:bg-[#5c1111] shadow-sm hover:shadow",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-[#8b1a1a] text-[#8b1a1a] bg-transparent hover:bg-[#8b1a1a] hover:text-white",
        secondary: "bg-[#c9a227] text-white hover:bg-[#a8851e] shadow-sm",
        ghost: "hover:bg-stone-100 text-stone-700",
        link: "text-[#8b1a1a] underline-offset-4 hover:underline p-0 h-auto",
        white: "bg-white text-[#8b1a1a] hover:bg-stone-100 shadow-sm",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs rounded-md",
        lg: "h-12 px-8 text-base rounded-xl",
        xl: "h-14 px-10 text-lg rounded-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
