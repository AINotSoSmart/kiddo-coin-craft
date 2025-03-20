
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex relative items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all border-2 border-black backdrop-blur-sm focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [font-family:'Comic_Sans_MS',cursive] bg-[#FEF7CD] hover:bg-white/10 transform hover:translate-y-[-4px] active:translate-y-[2px] before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:rounded-lg before:-z-10 before:translate-x-[5px] before:translate-y-[5px]",
  {
    variants: {
      variant: {
        default: "border-dashed",
        destructive:
          "bg-kid-red hover:bg-kid-red/90 text-white border-dashed",
        outline:
          "bg-white/90 border-dashed",
        secondary:
          "bg-white/90 border-dashed",
        ghost: "border-transparent shadow-none before:hidden hover:translate-y-0 active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline border-transparent shadow-none before:hidden hover:translate-y-0 active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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
