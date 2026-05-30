"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Mail, Globe, CheckCircle2 } from "lucide-react";
import FadeInView from "@/components/animations/FadeInView";
import SectionLabel from "@/components/ui/SectionLabel";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  CONTACT_REACH,
} from "@/lib/constants";
import type { ContactFormErrors } from "@/lib/contact";

const BUDGET_OPTIONS = ["< $10k", "$10k–$50k", "$50k–$150k", "$150k+"];

const ROLE_OPTIONS = [
  "C-Suite / Founder",
  "VP / Director",
  "Engineering Manager",
  "Product Manager",
  "Consultant",
  "Other",
];

const SIZE_OPTIONS = [
  "1–10",
  "11–50",
  "51–200",
  "201–1,000",
  "1,000+",
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  workEmail: "",
  company: "",
  companyWebsite: "",
  role: "",
  companySize: "",
  budget: "",
  projectDescription: "",
};

const fieldLabel =
  "font-sans text-sm text-text-secondary";

const selectClass =
  "w-full rounded-lg border border-white/10 bg-bg-primary px-4 py-3 font-sans text-sm text-text-primary transition-colors appearance-none focus:border-accent/40 focus:outline-none";

function FormSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <select
        id={id}
        className={selectClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-bg-card">
            {option}
          </option>
        ))}
      </select>
      {error && (
        <span role="alert" className="font-sans text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}

export default function ContactSplit() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof typeof INITIAL_FORM>(
    key: K,
    value: (typeof INITIAL_FORM)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrors({});
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        errors?: ContactFormErrors;
        message?: string;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        setForm(INITIAL_FORM);
        setHoneypot("");
        return;
      }

      if (data.errors) {
        setErrors(data.errors);
      }
      setErrorMessage(
        data.message ?? "Something went wrong. Please try again."
      );
      setStatus("error");
    } catch {
      setErrorMessage(
        "Network error. Check your connection or email us directly."
      );
      setStatus("error");
    }
  }

  return (
    <section className="min-h-screen px-6 pb-16 pt-24 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid items-start gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">

          {/* ── Left column ── */}
          <FadeInView className="lg:sticky lg:top-28">
            <SectionLabel className="mb-6">Work With Us</SectionLabel>

            <h1 className="mb-8 font-serif text-4xl leading-[1.2] text-text-primary lg:text-5xl">
              Ready to transform your business with{" "}
              <span className="text-accent-grad">AI?</span>
            </h1>

            <p className="mb-12 max-w-md font-sans text-base leading-relaxed text-text-secondary">
              Tell us about your project and we&apos;ll get back to you within
              one business day. No obligations, no sales pressure — just an
              honest conversation about whether we&apos;re the right fit.
            </p>

            <div className="flex flex-col gap-6">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value: CONTACT_LOCATION,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: CONTACT_EMAIL,
                  href: `mailto:${CONTACT_EMAIL}`,
                },
                {
                  icon: Globe,
                  label: "Reach",
                  value: CONTACT_REACH,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={16} className="mt-1 shrink-0 text-accent" />
                  <div>
                    <p className="font-sans text-sm font-medium text-text-primary">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-0.5 block font-sans text-sm text-text-secondary transition-colors hover:text-accent"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-sans text-sm text-text-secondary">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeInView>

          {/* ── Right column — Form ── */}
          <FadeInView delay={0.15}>
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-card-lg border border-white/5 bg-bg-card/50 p-8 text-center lg:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle2 size={28} className="text-accent" />
                </div>
                <div>
                  <h2 className="mb-3 font-serif text-3xl text-text-primary">
                    Message received
                  </h2>
                  <p className="mx-auto max-w-md font-sans text-base leading-relaxed text-text-secondary">
                    Thanks for reaching out. We&apos;ll review your project and
                    get back to you within one business day.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                className="flex flex-col gap-5 rounded-card-lg border border-white/5 bg-bg-card/50 p-6 sm:p-8 lg:p-10"
                onSubmit={handleSubmit}
                noValidate
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    id="first-name"
                    label="First Name"
                    placeholder="Alex"
                    required
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    error={errors.firstName}
                  />
                  <Input
                    id="last-name"
                    label="Last Name"
                    placeholder="Chen"
                    required
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    error={errors.lastName}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    id="work-email"
                    label="Work Email"
                    type="email"
                    placeholder="alex@company.com"
                    required
                    value={form.workEmail}
                    onChange={(e) => updateField("workEmail", e.target.value)}
                    error={errors.workEmail}
                  />
                  <Input
                    id="company"
                    label="Company"
                    placeholder="Your company"
                    required
                    value={form.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    error={errors.company}
                  />
                </div>

                <Input
                  id="company-website"
                  label="Company Website"
                  type="url"
                  placeholder="https://company.com"
                  value={form.companyWebsite}
                  onChange={(e) =>
                    updateField("companyWebsite", e.target.value)
                  }
                  error={errors.companyWebsite}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormSelect
                    id="role"
                    label="Your Role"
                    value={form.role}
                    onChange={(value) => updateField("role", value)}
                    options={[...ROLE_OPTIONS]}
                    placeholder="Select your role"
                    error={errors.role}
                  />
                  <FormSelect
                    id="company-size"
                    label="Company Size"
                    value={form.companySize}
                    onChange={(value) => updateField("companySize", value)}
                    options={[...SIZE_OPTIONS]}
                    placeholder="Select company size"
                    error={errors.companySize}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className={fieldLabel}>Budget Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField("budget", opt)}
                        className={`rounded-lg border px-3 py-2.5 font-sans text-sm transition-colors ${
                          form.budget === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-white/10 text-text-secondary hover:border-white/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.budget && (
                    <span role="alert" className="font-sans text-xs text-red-400">
                      {errors.budget}
                    </span>
                  )}
                </div>

                <Textarea
                  id="project-description"
                  label="Tell Us About Your Project"
                  placeholder="Describe your main challenge, what you've tried, and what success looks like for you..."
                  rows={5}
                  value={form.projectDescription}
                  onChange={(e) =>
                    updateField("projectDescription", e.target.value)
                  }
                />

                {status === "error" && errorMessage && (
                  <p role="alert" className="-mt-1 font-sans text-sm text-red-400">
                    {errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  className="mt-1 w-full rounded-lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : "Send Message →"}
                </Button>
              </form>
            )}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
