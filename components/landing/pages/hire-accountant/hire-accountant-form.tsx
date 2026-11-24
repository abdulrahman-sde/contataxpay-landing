"use client"

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/i18n/language-provider"
import { routes } from "@/lib/landing/routes"
import { cn } from "@/lib/utils"
import { CountrySelect } from "./country-select"

type FormState = {
  country: string
  companyName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  businessType: string
  numberOfEmployees: string
  message: string
}
const EMPTY: FormState = {
  country: "",
  companyName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessType: "",
  numberOfEmployees: "",
  message: "",
}
const STEPS = 8

/** A native select drawn like the app's Input. */
const SELECT =
  "h-[var(--ui-field-h,40px)] w-full cursor-pointer appearance-none rounded-control border-2 border-solid border-[color:var(--ui-field-border)] bg-[var(--ui-field-bg)] pr-10 pl-3.5 text-sm text-[color:var(--ui-field-ink)] hover:border-[color:var(--ui-field-border-hover)] focus-visible:border-[color:var(--ui-field-border-focus)] focus-visible:outline-none aria-[invalid=true]:border-red-500"

/**
 * The 8-step "Fill out the form" wizard. Steps, checks, texts and the /api/hire-accountant call
 * are the app's (landing page redesign/hire_accountant/page.js); fields use the app's Input.
 */
export function HireAccountantForm() {
  const { t } = useLanguage()
  const f = t.landing.hireAccountant.form
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (redirectTimer.current) clearTimeout(redirectTimer.current)
  }, [])

  const set = (name: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    set(e.target.name as keyof FormState, e.target.value)

  const validate = (s: number) => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (s === 1 && !form.country) e.country = f.step1.error
    if (s === 2 && !form.companyName.trim()) e.companyName = f.step2.error
    if (s === 3) {
      if (!form.firstName.trim()) e.firstName = f.step3.firstNameError
      if (!form.lastName.trim()) e.lastName = f.step3.lastNameError
    }
    if (s === 4) {
      if (!form.email.trim()) e.email = f.step4.error
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = f.step4.invalidEmail
    }
    if (s === 5 && !form.phone.trim()) e.phone = f.step5.error
    if (s === 6 && !form.businessType.trim()) e.businessType = f.step6.error
    if (s === 7 && !form.numberOfEmployees.trim()) e.numberOfEmployees = f.step7.error
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    setSubmitting(true)
    setStatus(null)
    try {
      // UI only: nothing is sent, the form just shows its success state.
      setStatus({ ok: true, message: f.messages.success })
      setForm(EMPTY)
      setStep(1)
      setErrors({})
      document.getElementById("hire-accountant-status")?.scrollIntoView({ behavior: "smooth", block: "center" })
      if (redirectTimer.current) clearTimeout(redirectTimer.current)
      redirectTimer.current = setTimeout(() => router.push(routes.landing), 3000)
    } catch (err) {
      setStatus({ ok: false, message: err instanceof Error && err.message ? err.message : f.messages.error })
    } finally {
      setSubmitting(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate(step)) return
    if (step < STEPS) setStep(step + 1)
    else void submit()
  }

  const heading: Record<number, { title: string; description: string }> = {
    1: f.step1,
    2: f.step2,
    3: f.step3,
    4: f.step4,
    5: f.step5,
    6: f.step6,
    7: f.step7,
    8: f.step8,
  }
  const current = heading[step]!

  return (
    <div>
      {/* Progress: numbered dots on wider screens, a bar on phones */}
      <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-900/[0.06] sm:p-6">
        <div className="flex items-center justify-between text-sm sm:hidden">
          <span className="font-medium text-slate-900">{f.stepLabel.replace("{step}", String(step))}</span>
          <span className="text-slate-400 tabular-nums">{step} / {STEPS}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 sm:hidden">
          <div className="h-full rounded-full bg-[#3563e9] transition-[width] duration-300" style={{ width: `${(step / STEPS) * 100}%` }} />
        </div>

        <ol className="hidden items-start sm:flex">
          {Array.from({ length: STEPS }, (_, i) => i + 1).map((n) => {
            const done = n < step
            const active = n === step
            return (
              <li key={n} className="relative flex flex-1 flex-col items-center">
                {n < STEPS && (
                  <span
                    aria-hidden="true"
                    className={cn("absolute top-4 left-1/2 h-0.5 w-full", n < step ? "bg-[#3563e9]" : "bg-slate-100")}
                  />
                )}
                <span
                  className={cn(
                    "relative z-[1] flex size-8 items-center justify-center rounded-full text-sm font-medium tabular-nums transition-colors",
                    done && "bg-[#3563e9] text-white",
                    active && "bg-white text-[#3563e9] ring-2 ring-[#3563e9]",
                    !done && !active && "bg-slate-100 text-slate-400",
                  )}
                >
                  {done ? <Check className="size-4" strokeWidth={2.5} /> : n}
                </span>
                <span className={cn("mt-2 text-xs", active ? "text-slate-900" : "text-slate-400")}>
                  {f.stepLabel.replace("{step}", String(n))}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      {status && (
        <div
          id="hire-accountant-status"
          role="status"
          aria-live="polite"
          className={cn(
            "mt-5 rounded-2xl px-4 py-3 text-sm ring-1",
            status.ok ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : "bg-rose-50 text-rose-800 ring-rose-200",
          )}
        >
          {status.message}
          {status.ok && <p className="mt-1 text-xs text-emerald-700">{f.messages.redirecting}</p>}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-5 rounded-3xl bg-white p-6 shadow-[0_24px_60px_-28px_rgba(53,99,233,0.35)] ring-1 ring-slate-900/[0.06] sm:p-8"
      >
        <h3 className="text-lg font-medium text-slate-900 sm:text-xl">{current.title}</h3>
        <p className="mt-1.5 text-sm text-slate-500">{current.description}</p>

        <div className="mt-6 space-y-4">
          {step === 1 && (
            <Field error={errors.country}>
              <CountrySelect value={form.country} onChange={(code) => set("country", code)} invalid={!!errors.country} />
            </Field>
          )}
          {step === 2 && (
            <Field error={errors.companyName}>
              <Input name="companyName" value={form.companyName} onChange={onChange} placeholder={f.step2.placeholder} aria-invalid={!!errors.companyName || undefined} autoComplete="organization" />
            </Field>
          )}
          {step === 3 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field error={errors.firstName}>
                <Input name="firstName" value={form.firstName} onChange={onChange} placeholder={f.step3.firstNamePlaceholder} aria-invalid={!!errors.firstName || undefined} autoComplete="given-name" />
              </Field>
              <Field error={errors.lastName}>
                <Input name="lastName" value={form.lastName} onChange={onChange} placeholder={f.step3.lastNamePlaceholder} aria-invalid={!!errors.lastName || undefined} autoComplete="family-name" />
              </Field>
            </div>
          )}
          {step === 4 && (
            <Field error={errors.email}>
              <Input name="email" type="email" value={form.email} onChange={onChange} placeholder={f.step4.placeholder} aria-invalid={!!errors.email || undefined} autoComplete="email" />
            </Field>
          )}
          {step === 5 && (
            <Field error={errors.phone}>
              <Input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder={f.step5.placeholder} aria-invalid={!!errors.phone || undefined} autoComplete="tel" />
            </Field>
          )}
          {step === 6 && (
            <Field error={errors.businessType}>
              <SelectBox name="businessType" value={form.businessType} onChange={onChange} invalid={!!errors.businessType}>
                <option value="">{f.step6.placeholder}</option>
                <option value="sole-proprietorship">{f.step6.options.soleProprietorship}</option>
                <option value="partnership">{f.step6.options.partnership}</option>
                <option value="llc">{f.step6.options.llc}</option>
                <option value="corporation">{f.step6.options.corporation}</option>
                <option value="non-profit">{f.step6.options.nonProfit}</option>
                <option value="other">{f.step6.options.other}</option>
              </SelectBox>
            </Field>
          )}
          {step === 7 && (
            <Field error={errors.numberOfEmployees}>
              <SelectBox name="numberOfEmployees" value={form.numberOfEmployees} onChange={onChange} invalid={!!errors.numberOfEmployees}>
                <option value="">{f.step7.placeholder}</option>
                <option value="1">{f.step7.options.justMe}</option>
                <option value="2-10">{f.step7.options.twoToTen}</option>
                <option value="11-50">{f.step7.options.elevenToFifty}</option>
                <option value="51-200">{f.step7.options.fiftyOneToTwoHundred}</option>
                <option value="201-500">{f.step7.options.twoHundredOneToFiveHundred}</option>
                <option value="500+">{f.step7.options.fiveHundredPlus}</option>
              </SelectBox>
            </Field>
          )}
          {step === 8 && (
            <Textarea name="message" value={form.message} onChange={onChange} rows={5} placeholder={f.step8.placeholder} className="resize-none" />
          )}
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
          {step > 1 ? (
            <Button type="button" variant="secondary" onClick={() => setStep(step - 1)} className="h-11 w-full px-6 sm:w-auto">
              {f.buttons.back}
            </Button>
          ) : (
            <span className="hidden sm:block" />
          )}
          <Button type="submit" disabled={submitting} className="h-11 w-full px-8 sm:w-auto">
            {submitting ? f.buttons.submitting : step === STEPS ? f.buttons.submit : f.buttons.next}
          </Button>
        </div>
      </form>
    </div>
  )
}

function Field({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

function SelectBox({
  name,
  value,
  onChange,
  invalid,
  children,
}: {
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  invalid?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <select name={name} value={value} onChange={onChange} aria-invalid={invalid || undefined} className={cn(SELECT, !value && "text-[color:var(--ui-field-placeholder)]")}>
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-slate-400" />
    </div>
  )
}
