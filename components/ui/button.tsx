import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The single button primitive for the whole app. Import it from
 * `@/components/ui/button` everywhere — do not create page-local button
 * components or hardcode a colour at the call site.
 *
 * Each variant resolves to a role class defined once against the `--btn-*`
 * design tokens in `app/globals.css`. To rebrand, change `--btn-primary` (and
 * friends) there; every variant follows.
 *
 *   <Button>Save</Button>                 // primary — Figma #3563e9 fill
 *   <Button variant="secondary">Back</Button>  // white fill + #2563EB glow
 *   <Button variant="outline">Cancel</Button>
 *   <Button variant="destructive">Delete</Button>
 *   <Button variant="warning">Replace</Button>
 *   <Button variant="attention">Sign now</Button>
 *
 * Variants: default | primary (alias of default) | secondary | destructive |
 *           outline | ghost | link | success | warning | attention
 */
const buttonVariants = cva(
  // Geometry and colour come from the `--btn-*` tokens in app/globals.css so a
  // single token edit rebrands every button. Base type scale is standardised to
  // the Figma style: Inter 16px / 400; sizes below only change height, padding
  // and icon size.
  "btn inline-flex items-center justify-center gap-2 whitespace-nowrap overflow-visible text-[length:var(--btn-font-size)] font-normal leading-[1.2] rounded-[var(--btn-radius)] ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "btn-primary",
        // `primary` is an explicit alias so callers can write variant="primary".
        primary: "btn-primary",
        destructive: "btn-danger",
        outline: "btn-outline border border-input bg-transparent hover:bg-accent/10",
        secondary:
          "btn-secondary bg-[var(--btn-secondary)] text-[var(--btn-secondary-ink)] hover:bg-[var(--btn-secondary-hover)]",
        ghost: "hover:bg-accent/10",
        link: "btn-link underline-offset-4 hover:underline",
        success: "btn-success",
        warning: "btn-warning",
        attention: "btn-attention",
      },
      size: {
        // Figma default: 40px tall, 10px gap, 12px/46px padding.
        default:
          "btn-md h-[var(--btn-height)] gap-[var(--btn-gap)] px-[var(--btn-padding-x)] py-[var(--btn-padding-y)] [&_svg]:size-4",
        sm: "btn-sm [&_svg]:size-3",
        lg: "btn-lg h-12 px-6 py-3 text-base [&_svg]:size-5",
        icon: "h-[var(--btn-height)] w-[var(--btn-height)] p-0 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
