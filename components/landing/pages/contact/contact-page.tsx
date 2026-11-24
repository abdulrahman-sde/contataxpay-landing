"use client"

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/i18n/language-provider"
import { cn } from "@/lib/utils"
import { PrivacyAcknowledgement } from "../privacy-acknowledgement"
import { AddressArt, EmailArt, PhoneArt, WhatsAppArt } from "./contact-art"

/** Same soft glow as the home page's Services / Testimonials / Footer. */
const PAGE_GLOW =
  "radial-gradient(45% 60% at 18% 25%, rgb(199 210 254 / 0.45), transparent 70%), radial-gradient(40% 60% at 85% 20%, rgb(191 219 254 / 0.6), transparent 70%), linear-gradient(180deg, #f4f7ff 0%, #eef3ff 45%, #ffffff 100%)"

type FormState = { firstName: string; lastName: string; email: string; phone: string; message: string }
const EMPTY: FormState = { firstName: "", lastName: "", email: "", phone: "", message: "" }

/**
 * Contact page (/landing/contact). Texts and the /api/contact call are the app's, unchanged.
 * Light page glow instead of the dark band (keeps the header readable); the contact details
 * as one list next to the intro, the form in a single white card.
 */
export function ContactPage() {
  const { t } = useLanguage()
  const c = t.landing.contact
  const f = t.contactForm
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [showPrivacyError, setShowPrivacyError] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!privacyAccepted) {
      setShowPrivacyError(true)
      return
    }
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error || f.messages.error)
      setStatus({ ok: true, message: f.messages.success })
      setForm(EMPTY)
      setPrivacyAccepted(false)
      setShowPrivacyError(false)
    } catch (err) {
      setStatus({ ok: false, message: err instanceof Error && err.message ? err.message : f.messages.error })
    } finally {
      setSubmitting(false)
    }
  }

  const details: { art: ReactNode; title: string; lines: ReactNode[] }[] = [
    {
      art: <PhoneArt />,
      title: c.details.phone.title,
      lines: [
        <a key="1" href="tel:+4915568205116" className="hover:text-slate-900">{c.details.phone.value1}</a>,
        <a key="2" href="tel:+491630474573" className="hover:text-slate-900">{c.details.phone.value2}</a>,
      ],
    },
    {
      art: <WhatsAppArt />,
      title: c.details.whatsapp,
      lines: [
        <a key="1" href="https://wa.me/4915568205116" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">{c.details.whatsappValue}</a>,
        <a key="2" href="https://wa.me/491630474573" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">{c.details.whatsappValue2}</a>,
      ],
    },
    {
      art: <EmailArt />,
      title: c.details.email.title,
      lines: [<a key="1" href={`mailto:${c.details.email.value}`} className="break-all hover:text-slate-900">{c.details.email.value}</a>],
    },
    {
      art: <AddressArt />,
      title: c.details.address.title,
      lines: [<span key="1">{t.footer.company.address || c.details.address.value}</span>],
    },
  ]

  return (
    <div style={{ background: PAGE_GLOW }} className="px-4 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl leading-tight font-medium tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">{c.title}</h1>
        <p className="mt-4 text-base text-slate-600 md:text-lg">{c.subtitle}</p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-10 md:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        {/* Intro + contact details */}
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-slate-900 md:text-3xl">{c.card.title}</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600 md:text-base">{c.card.subtitle}</p>

          <dl className="mt-8 divide-y divide-slate-200/80 border-y border-slate-200/80">
            {details.map(({ art, title, lines }) => (
              <div key={title} className="flex items-start gap-4 py-5">
                <span className="size-10 shrink-0 overflow-hidden rounded-xl [&>svg]:size-10">{art}</span>
                <div className="min-w-0">
                  <dt className="text-sm font-medium text-slate-900">{title}</dt>
                  <dd className="mt-1 flex flex-col text-sm leading-relaxed text-slate-600">{lines}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_-28px_rgba(53,99,233,0.35)] ring-1 ring-slate-900/[0.06] sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="contact-firstName" label={f.placeholders.firstName}>
              <Input id="contact-firstName" name="firstName" value={form.firstName} onChange={onChange} required autoComplete="given-name" />
            </Field>
            <Field id="contact-lastName" label={f.placeholders.lastName}>
              <Input id="contact-lastName" name="lastName" value={form.lastName} onChange={onChange} required autoComplete="family-name" />
            </Field>
            <Field id="contact-email" label={f.placeholders.email}>
              <Input id="contact-email" name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
            </Field>
            <Field id="contact-phone" label={f.placeholders.phone}>
              <Input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={onChange} required autoComplete="tel" />
            </Field>
            <div className="sm:col-span-2">
              <Textarea
                name="message"
                aria-label={f.placeholders.message}
                placeholder={f.placeholders.message}
                value={form.message}
                onChange={onChange}
                required
                rows={6}
              />
            </div>
          </div>

          {status && (
            <p
              role="status"
              className={cn(
                "mt-5 rounded-xl px-3.5 py-2.5 text-sm ring-1",
                status.ok ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : "bg-rose-50 text-rose-800 ring-rose-200",
              )}
            >
              {status.message}
            </p>
          )}

          <PrivacyAcknowledgement
            id="contact-privacy"
            checked={privacyAccepted}
            onChange={setPrivacyAccepted}
            showError={showPrivacyError}
            className="mt-5"
          />

          <Button type="submit" disabled={submitting} className="mt-6 h-11 w-full">
            {submitting ? f.messages.submitting : f.submitButton}
          </Button>
        </form>
      </div>
    </div>
  )
}

/** Label above its control, 8px apart (the app's `.field`). */
function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}
