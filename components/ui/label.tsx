import * as React from "react"
import { cn } from "@/lib/utils"

/** Same look as the app's components/ui/label.tsx (plain <label>, no Radix needed here). */
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("field-label text-sm font-medium leading-none text-slate-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
