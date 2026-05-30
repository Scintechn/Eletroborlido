"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Dictionary, Locale } from "@/lib/i18n";
import { submitContactForm } from "@/app/[locale]/contact/actions";

type Field = "name" | "email" | "phone" | "subject" | "message";
type Errors = Partial<Record<Field | "consent", string>>;

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm({
  t,
  locale,
}: {
  t: Dictionary["contact"]["form"];
  locale: Locale;
}) {
  const [values, setValues] = useState(initial);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = t.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = t.errors.email;
    if (values.message.trim().length < 10) next.message = t.errors.message;
    if (!consent) next.consent = t.errors.consent;
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const result = await submitContactForm({
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
        message: values.message,
        locale,
      });
      setStatus(result.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues(initial);
    setConsent(false);
    setErrors({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-navy-900">{t.success.title}</h3>
        <p className="mt-2 text-slate-600">{t.success.body}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-semibold text-navy-600 underline underline-offset-2 hover:text-navy-700"
        >
          {t.success.again}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={t.heading}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"
    >
      <h2 className="text-xl font-bold text-navy-900">{t.heading}</h2>

      <div className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldText
            id="name"
            label={t.name.label}
            placeholder={t.name.placeholder}
            value={values.name}
            onChange={(v) => update("name", v)}
            error={errors.name}
            required
            autoComplete="name"
          />
          <FieldText
            id="email"
            type="email"
            label={t.email.label}
            placeholder={t.email.placeholder}
            value={values.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
            required
            autoComplete="email"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FieldText
            id="phone"
            type="tel"
            label={t.phone.label}
            hint={t.phone.optional}
            placeholder={t.phone.placeholder}
            value={values.phone}
            onChange={(v) => update("phone", v)}
            autoComplete="tel"
          />
          <div>
            <Label htmlFor="subject">{t.subject.label}</Label>
            <select
              id="subject"
              value={values.subject}
              onChange={(e) => update("subject", e.target.value)}
              className={inputClass(false)}
            >
              <option value="" disabled>
                {t.subject.placeholder}
              </option>
              {t.subject.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="message">{t.message.label}</Label>
          <textarea
            id="message"
            rows={5}
            placeholder={t.message.placeholder}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(inputClass(!!errors.message), "resize-y")}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={consent}
              required
              aria-required="true"
              onChange={(e) => {
                setConsent(e.target.checked);
                setErrors((er) => ({ ...er, consent: undefined }));
              }}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-slate-300 text-navy-700 focus-visible:ring-2 focus-visible:ring-navy-500"
            />
            <span>
              {t.consent.before}
              <Link
                href={`/${locale}/privacy-policy`}
                className="font-semibold text-navy-600 underline underline-offset-2 hover:text-navy-700"
              >
                {t.consent.link}
              </Link>
              {t.consent.after}
            </span>
          </label>
          <FieldError id="consent-error" message={errors.consent} />
        </div>

        {status === "error" && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {t.errors.submit}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-8 py-4 text-base font-semibold text-navy-900 shadow-cta transition-all hover:scale-[1.01] hover:bg-yellow-600 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {status === "submitting" ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full min-h-[44px] rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-150 placeholder:text-slate-400",
    hasError
      ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500/20"
      : "border-slate-300 focus:border-navy-600 focus:ring-2 focus:ring-navy-500/20"
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-slate-700">
      {children}
    </label>
  );
}

function FieldText({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  hint,
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {hint && <span className="ml-1 font-normal text-slate-400">({hint})</span>}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass(!!error)}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
      {message}
    </p>
  );
}
