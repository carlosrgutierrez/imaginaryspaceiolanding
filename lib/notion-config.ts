/**
 * Maps the website contact form → Notion CRM - IMS database columns.
 */
export const NOTION_CRM = {
  databaseId: process.env.NOTION_DATABASE_ID ?? "",
  dataSourceId:
    process.env.NOTION_DATA_SOURCE_ID ??
    "16087d70-5755-8364-992a-8781dc09e33c",
  properties: {
    name: "Name",
    email: "Email",
    workEmail: "Work Email",
    company: "Company",
    org: "Org",
    title: "Title",
    ev: "EV",
    context: "Context",
    stage: "Stage",
    platform: "Platform",
  },
  stageWebsite: "Website",
  platformWebsite: "Other",
} as const;

/** Map form budget select → EV number (upper-bound estimate). */
export function budgetToEv(budget: string): number | null {
  switch (budget) {
    case "< $10k":
      return 10_000;
    case "$10k–$50k":
      return 50_000;
    case "$50k–$150k":
      return 150_000;
    case "$150k+":
      return 200_000;
    default:
      return null;
  }
}
