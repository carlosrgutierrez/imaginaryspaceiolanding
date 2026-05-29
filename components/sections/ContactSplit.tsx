"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Mail, Globe, CheckCircle2 } from "lucide-react";
import FadeInView from "@/components/animations/FadeInView";
import SectionLabel from "@/components/ui/SectionLabel";
import AccentHighlight from "@/components/ui/AccentHighlight";
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

const selectClass =
  "w-full bg-bg-card border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-text-primary focus:outline-none focus:border-accent/40 transition-colors appearance-none";

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
    <section className="min-h-screen pt-24 pb-16 px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">

          {/* ── Left column ── */}
          <FadeInView className="lg:sticky lg:top-28">
            <SectionLabel className="mb-6">Work With Us</SectionLabel>

            <h1 className="font-serif text-4xl lg:text-5xl text-text-primary leading-[1.5] mb-8">
              Ready to transform your business with{" "}
              <AccentHighlight>AI?</AccentHighlight>
            </h1>

            <p className="font-sans text-text-secondary text-base leading-relaxed mb-12">
              Tell us about your project and we&apos;ll get back to you within
              one business day. No obligations, no sales pressure — just an
              honest conversation about whether we&apos;re the right fit.
            </p>

            <div className="flex flex-col gap-5">
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
                <div key={label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-text-muted uppercase tracking-[0.14em]">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="font-sans text-sm text-text-primary mt-0.5 hover:text-accent transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-sans text-sm text-text-primary mt-0.5">
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
              <div className="bg-bg-card border border-white/8 rounded-card-lg p-8 lg:p-10 flex flex-col items-center text-center gap-6 min-h-[420px] justify-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-3xl text-text-primary mb-3">
                    Message received
                  </h2>
                  <p className="font-sans text-text-secondary text-base leading-relaxed max-w-md">
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
                className="bg-bg-card border border-white/8 rounded-card-lg p-8 lg:p-10 flex flex-col gap-6"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Honeypot — hidden from users, bots may fill it */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute opacity-0 pointer-events-none h-0 w-0"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />

                <div className="grid sm:grid-cols-2 gap-4">
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    id="company"
                    label="Company"
                    placeholder="Your company"
                    required
                    value={form.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    error={errors.company}
                  />
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
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="role"
                    className="font-sans text-[11px] font-medium text-text-muted uppercase tracking-[0.12em]"
                  >
                    Your Role
                  </label>
                  <select
                    id="role"
                    className={selectClass}
                    value={form.role}
                    onChange={(e) => updateField("role", e.target.value)}
                    required
                  >
                    <option value="" disabled className="text-text-muted">
                      Select your role
                    </option>
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r} className="bg-bg-card">
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <span role="alert" className="font-sans text-xs text-red-400">
                      {errors.role}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="company-size"
                    className="font-sans text-[11px] font-medium text-text-muted uppercase tracking-[0.12em]"
                  >
                    Company Size
                  </label>
                  <select
                    id="company-size"
                    className={selectClass}
                    value={form.companySize}
                    onChange={(e) => updateField("companySize", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select company size
                    </option>
                    {SIZE_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-bg-card">
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.companySize && (
                    <span role="alert" className="font-sans text-xs text-red-400">
                      {errors.companySize}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <label className="font-sans text-[11px] font-medium text-text-muted uppercase tracking-[0.12em]">
                    Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField("budget", opt)}
                        className={`font-sans text-sm py-2.5 px-3 rounded-lg border transition-all duration-150 ${
                          form.budget === opt
                            ? "border-accent text-accent bg-accent/10"
                            : "border-white/10 text-text-muted hover:border-white/25"
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
                  <p
                    role="alert"
                    className="font-sans text-sm text-red-400 -mt-2"
                  >
                    {errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  className="w-full rounded-lg mt-2"
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
