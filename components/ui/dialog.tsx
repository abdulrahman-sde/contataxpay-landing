"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { CloseIcon, closeButtonClass } from "@/components/ui/close-button"
import "./dialog.css"

/** Kept for callers that pass it through `closeClassName`; the look lives in close-button.tsx. */
export const DIALOG_CLOSE_BUTTON_CLASS = closeButtonClass("md", "z-[10001]")

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[9999] bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    closeClassName?: string
    onClose?: () => void
    /** UI standard widths: sm 480px (confirm, short forms), md 720px (forms), lg 1120px (upload with preview). */
    size?: "sm" | "md" | "lg"
  }
>(({ className, closeClassName, onClose, size, children, onInteractOutside, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      // A toast (sonner) lives outside the dialog; clicking it (or its close X) must not count as an outside click.
      onInteractOutside={(event) => {
        const target = event.target as HTMLElement | null
        if (target?.closest?.("[data-sonner-toast], [data-sonner-toaster]")) {
          event.preventDefault()
          return
        }
        onInteractOutside?.(event)
      }}
      className={cn(
        "fixed left-1/2 top-1/2 z-[10000] grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-4 sm:p-6 shadow-lg duration-200 max-h-[90dvh] overflow-y-auto overflow-x-hidden box-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-none sm:rounded-surface",
        size && "w-[calc(100vw-2rem)] sm:p-6",
        size === "sm" && "max-w-[480px]",
        size === "md" && "max-w-[720px]",
        size === "lg" && "max-w-[1120px]",
        className
      )}
      // Standard dialogs (a `size` is set) get the lavender header band, see .dialog-header in globals.css.
      data-dialog-standard={size ? "" : undefined}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        data-dialog-close=""
        onClick={onClose}
        className={cn(
          "absolute right-4 top-4",
          DIALOG_CLOSE_BUTTON_CLASS,
          closeClassName
        )}
      >
        <CloseIcon />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "dialog-header flex flex-col gap-1.5 text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "dialog-title text-lg font-semibold leading-tight tracking-normal",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
