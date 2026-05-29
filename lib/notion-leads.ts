import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ContactFormPayload } from "@/lib/contact";
import { NOTION_CRM, budgetToEv } from "@/lib/notion-config";

type NotionPropertyValue =
  | { title: { text: { content: string } }[] }
  | { email: string }
  | { number: number | null }
  | { rich_text: { text: { content: string } }[] }
  | { select: { name: string } | null };

function getNotionClient() {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) {
    throw new Error("NOTION_API_KEY is not configured.");
  }
  return new Client({ auth: apiKey });
}

function richText(value: string): NotionPropertyValue {
  return { rich_text: value ? [{ text: { content: value } }] : [] };
}

function buildContext(lead: ContactFormPayload): string {
  const lines = ["Source: Website contact form"];

  if (lead.companyWebsite) {
    lines.push(`Website: ${lead.companyWebsite}`);
  }

  if (lead.projectDescription) {
    lines.push("", "Project:", lead.projectDescription);
  }

  return lines.join("\n");
}

export function isNotionConfigured(): boolean {
  return Boolean(process.env.NOTION_API_KEY && NOTION_CRM.databaseId);
}

export async function createLeadInNotion(
  lead: ContactFormPayload
): Promise<PageObjectResponse> {
  if (!NOTION_CRM.databaseId) {
    throw new Error("NOTION_DATABASE_ID is not configured.");
  }

  const { properties: p } = NOTION_CRM;
  const fullName = `${lead.firstName} ${lead.lastName}`.trim();
  const ev = budgetToEv(lead.budget);

  const properties: Record<string, NotionPropertyValue> = {
    [p.name]: { title: [{ text: { content: fullName } }] },
    [p.email]: { email: lead.workEmail },
    [p.workEmail]: { email: lead.workEmail },
    [p.company]: richText(lead.companySize),
    [p.org]: richText(lead.company),
    [p.title]: richText(lead.role),
    [p.context]: richText(buildContext(lead)),
    [p.stage]: { select: { name: NOTION_CRM.stageWebsite } },
    [p.platform]: { select: { name: NOTION_CRM.platformWebsite } },
  };

  if (ev !== null) {
    properties[p.ev] = { number: ev };
  }

  const notion = getNotionClient();
  const page = await notion.pages.create({
    parent: NOTION_CRM.dataSourceId
      ? { data_source_id: NOTION_CRM.dataSourceId }
      : { database_id: NOTION_CRM.databaseId },
    properties: properties as Parameters<Client["pages"]["create"]>[0]["properties"],
  });

  if (!("properties" in page)) {
    throw new Error("Unexpected Notion response when creating lead.");
  }

  return page;
}
