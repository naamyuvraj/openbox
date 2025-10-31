import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-black/90 dark:hover:bg-white/90 border border-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 border border-destructive",
        outline:
          "border border-foreground text-foreground hover:bg-foreground hover:text-background dark:hover:bg-foreground dark:hover:text-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted border border-border",
        ghost: "hover:bg-muted text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm has-[>svg]:px-3 rounded-sm",
        sm: "h-8 rounded-sm text-xs gap-1.5 px-3 has-[>svg]:px-2",
        lg: "h-12 rounded-sm text-base px-8 has-[>svg]:px-5",
        icon: "size-10 rounded-sm",
        "icon-sm": "size-8 rounded-sm",
        "icon-lg": "size-12 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
