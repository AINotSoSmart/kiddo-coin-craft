import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all border-2 border-black backdrop-blur-sm focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [font-family:'Comic_Sans_MS',cursive] bg-[#FEF7CD] hover:bg-white/10 shadow-[3px_3px_0_#000000] hover:shadow-[5px_5px_0_#000000] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#000000]",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "bg-kid-red hover:bg-kid-red/90 text-white",
        outline:
          "bg-white/90",
        secondary:
          "bg-white/90",
        ghost: "border-transparent shadow-none hover:shadow-none hover:translate-y-0 active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline border-transparent shadow-none hover:shadow-none hover:translate-y-0 active:translate-y-0",
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
