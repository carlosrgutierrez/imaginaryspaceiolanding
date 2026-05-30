export type ContactFormPayload = {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  companyWebsite?: string;
  role: string;
  companySize: string;
  budget: string;
  projectDescription?: string;
  /** Honeypot — must stay empty for real submissions */
  website?: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  body: unknown
): { ok: true; data: ContactFormPayload } | { ok: false; errors: ContactFormErrors } {
  if (!body || typeof body !== "object") {
    return { ok: false, errors: { firstName: "Invalid submission." } };
  }

  const raw = body as Record<string, unknown>;
  const errors: ContactFormErrors = {};

  const firstName = trimString(raw.firstName);
  const lastName = trimString(raw.lastName);
  const workEmail = trimString(raw.workEmail);
  const company = trimString(raw.company);
  const companyWebsite = trimString(raw.companyWebsite);
  const role = trimString(raw.role);
  const companySize = trimString(raw.companySize);
  const budget = trimString(raw.budget);
  const projectDescription = trimString(raw.projectDescription);
  const honeypot = trimString(raw.website);

  if (honeypot) {
    return { ok: false, errors: { firstName: "Invalid submission." } };
  }

  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!workEmail) errors.workEmail = "Work email is required.";
  else if (!EMAIL_RE.test(workEmail)) errors.workEmail = "Enter a valid email address.";
  if (!company) errors.company = "Company is required.";
  if (!role) errors.role = "Select your role.";
  if (!companySize) errors.companySize = "Select company size.";
  if (!budget) errors.budget = "Select a budget range.";

  const normalizedWebsite = normalizeWebsiteUrl(companyWebsite);
  if (companyWebsite && !isValidUrl(normalizedWebsite)) {
    errors.companyWebsite = "Enter a valid website (e.g. company.com).";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      workEmail,
      company,
      companyWebsite: normalizedWebsite || undefined,
      role,
      companySize,
      budget,
      projectDescription: projectDescription || undefined,
    },
  };
}

function trimString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Accepts `company.com` and normalizes to `https://company.com`. */
export function normalizeWebsiteUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
