import * as React from "react"

import { cn } from "@/lib/utils"
import "./input.css"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "input flex h-[var(--ui-field-h,40px)] w-full rounded-control border-2 border-solid border-[color:var(--ui-field-border)] bg-[var(--ui-field-bg)] px-3.5 text-sm text-[color:var(--ui-field-ink)] shadow-none placeholder:text-[color:var(--ui-field-placeholder)] hover:border-[color:var(--ui-field-border-hover)] ring-offset-background disabled:cursor-not-allowed disabled:bg-[var(--ui-field-bg-disabled)] disabled:opacity-60 aria-[invalid=true]:border-red-500 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:border-[color:var(--ui-field-border-focus)] focus-visible:ring-0 focus-visible:ring-offset-0 aria-[invalid=true]:focus-visible:border-red-500 aria-[invalid=true]:focus-visible:ring-red-500/20",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
