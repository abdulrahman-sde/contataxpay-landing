import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full py-2 rounded-control border-2 border-solid border-[color:var(--ui-field-border)] bg-[var(--ui-field-bg)] px-3.5 text-sm text-[color:var(--ui-field-ink)] shadow-none placeholder:text-[color:var(--ui-field-placeholder)] hover:border-[color:var(--ui-field-border-hover)] ring-offset-background disabled:cursor-not-allowed disabled:bg-[var(--ui-field-bg-disabled)] disabled:opacity-60 aria-[invalid=true]:border-red-500 focus-visible:outline-none focus-visible:border-[color:var(--ui-field-border-focus)] focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
