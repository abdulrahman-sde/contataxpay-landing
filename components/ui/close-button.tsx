"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Single source of truth for the close (X) control.
 *
 * Every dialog, modal, popup and form panel closes with the same red square
 * button, so restyling the cross everywhere is a one-file change. Use
 * `<CloseButton>` for plain buttons and `closeButtonClass()` when the button
 * element is owned by a primitive (Radix `Dialog.Close`, `Sheet.Close`, ...).
 */
export type CloseButtonSize = "sm" | "md" | "lg"

export const CLOSE_BUTTON_BASE_CLASS =
  "inline-flex shrink-0 items-center justify-center rounded-md bg-red-600 text-white opacity-100 shadow-sm ring-offset-background transition-all duration-200 hover:scale-105 hover:bg-red-700 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-red-600 data-[state=open]:text-white"

export const CLOSE_BUTTON_SIZE_CLASS: Record<CloseButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-9 w-9",
}

export const CLOSE_ICON_SIZE_CLASS: Record<CloseButtonSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
}

export function closeButtonClass(size: CloseButtonSize = "md", className?: string) {
  return cn(CLOSE_BUTTON_BASE_CLASS, CLOSE_BUTTON_SIZE_CLASS[size], className)
}

/** The cross itself, for primitives that render their own button element. */
export function CloseIcon({
  size = "md",
  className,
}: {
  size?: CloseButtonSize
  className?: string
}) {
  return <X className={cn(CLOSE_ICON_SIZE_CLASS[size], className)} aria-hidden="true" />
}

export interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: CloseButtonSize
  /** Accessible name; also the tooltip. Defaults to "Close". */
  label?: string
}

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ size = "md", label = "Close", className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      className={closeButtonClass(size, className)}
      {...props}
    >
      <CloseIcon size={size} />
    </button>
  )
)
CloseButton.displayName = "CloseButton"
