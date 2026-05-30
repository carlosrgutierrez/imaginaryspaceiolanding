#!/usr/bin/env node
/**
 * Notion CRM probe — checks credentials, schema, and optionally creates a test lead
 * using the same property mapping as lib/notion-leads.ts.
 *
 * Usage:
 *   node scripts/probe-notion.mjs
 *   node scripts/probe-notion.mjs --create-test-lead
 */
import { Client } from "@notionhq/client";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const apiKey = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;
const dataSourceId =
  process.env.NOTION_DATA_SOURCE_ID ?? "16087d70-5755-8364-992a-8781dc09e33c";
const createTest = process.argv.includes("--create-test-lead");

/** Columns written by lib/notion-leads.ts */
const EXPECTED = {
  name: { name: "Name", type: "title" },
  email: { name: "Email", type: "email" },
  workEmail: { name: "Work Email", type: "email" },
  company: { name: "Company", type: "rich_text" },
  org: { name: "Org", type: "rich_text" },
  title: { name: "Title", type: "rich_text" },
  context: { name: "Context", type: "rich_text" },
  ev: { name: "EV", type: "number" },
  stage: { name: "Stage", type: "select", requiredOption: "Website" },
  platform: { name: "Platform", type: "select", requiredOption: "Other" },
};

function richText(value) {
  return { rich_text: value ? [{ text: { content: value } }] : [] };
}

function summarizeProperty(name, prop) {
  const base = { name, type: prop.type };
  if (prop.type === "select" && prop.select?.options) {
    return {
      ...base,
      options: prop.select.options.map((o) => o.name),
    };
  }
  return base;
}

async function main() {
  console.log("\nNotion CRM probe\n");

  if (!apiKey || !databaseId) {
    console.error("❌ Missing NOTION_API_KEY or NOTION_DATABASE_ID in .env.local");
    console.error("   Copy .env.example → .env.local and fill in your integration token.");
    process.exit(1);
  }

  const notion = new Client({ auth: apiKey });

  // Database access
  try {
    const db = await notion.databases.retrieve({ database_id: databaseId });
    console.log("✓ Database accessible:", db.title?.[0]?.plain_text ?? "(untitled)");
    console.log("  NOTION_DATABASE_ID:", databaseId);
  } catch (err) {
    console.error("❌ Could not access database:", err.body?.message ?? err.message);
    console.error("\nCommon fixes:");
    console.error("  • Share CRM - IMS with your Notion integration (⋯ → Connections)");
    console.error("  • Confirm NOTION_DATABASE_ID is the database ID, not a page ID");
    process.exit(1);
  }

  // Schema lives on the data source (Notion API 2025+)
  let props = {};
  try {
    const ds = await notion.dataSources.retrieve({ data_source_id: dataSourceId });
    props = ds.properties ?? {};
    console.log("✓ Data source accessible:", ds.title?.[0]?.plain_text ?? "(untitled)");
    console.log("  NOTION_DATA_SOURCE_ID:", dataSourceId);
  } catch (err) {
    console.error("❌ Could not access data source:", err.body?.message ?? err.message);
    console.error("   Check NOTION_DATA_SOURCE_ID or remove it to use database_id parent.");
    process.exit(1);
  }

  console.log("\nColumns in Notion (" + Object.keys(props).length + "):");
  for (const name of Object.keys(props).sort()) {
    const info = summarizeProperty(name, props[name]);
    if (info.options) {
      console.log(`  • ${name} (${info.type}): ${info.options.join(" | ")}`);
    } else {
      console.log(`  • ${name} (${info.type})`);
    }
  }

  console.log("\nExpected by the contact form (lib/notion-leads.ts):");
  const mismatches = [];
  for (const [key, expected] of Object.entries(EXPECTED)) {
    const actual = props[expected.name];
    if (!actual) {
      mismatches.push(`  ✗ Missing column: "${expected.name}" (${key})`);
      continue;
    }
    if (actual.type !== expected.type) {
      mismatches.push(
        `  ✗ "${expected.name}": expected ${expected.type}, got ${actual.type}`
      );
      continue;
    }
    if (expected.requiredOption) {
      const options = new Set(actual.select.options.map((o) => o.name));
      if (!options.has(expected.requiredOption)) {
        mismatches.push(
          `  ✗ "${expected.name}": missing select option "${expected.requiredOption}"`
        );
        continue;
      }
    }
    console.log(`  ✓ ${expected.name} (${expected.type})`);
  }

  if (mismatches.length) {
    console.log("\n⚠ Schema mismatches:");
    mismatches.forEach((m) => console.log(m));
    process.exit(1);
  }

  console.log("\n✓ All expected columns match.");

  if (createTest) {
    console.log("\nCreating test lead (delete in Notion after review)...");
    const stamp = Date.now();
    const properties = {
      Name: { title: [{ text: { content: "Test Lead (delete me)" } }] },
      Email: { email: `test+${stamp}@example.com` },
      "Work Email": { email: `test+${stamp}@example.com` },
      Company: richText("1-10"),
      Org: richText("Imaginary Space QA"),
      Title: richText("Founder"),
      Context: richText("Source: Website contact form\n\nProbe script test — safe to delete."),
      Stage: { select: { name: "Website" } },
      Platform: { select: { name: "Other" } },
      EV: { number: 50_000 },
    };

    try {
      const page = await notion.pages.create({
        parent: { data_source_id: dataSourceId },
        properties,
      });
      console.log("✓ Test lead created:", page.id);
      console.log("  URL:", page.url);
    } catch (err) {
      console.error("❌ Test lead failed:", err.body?.message ?? err.message);
      process.exit(1);
    }
  } else {
    console.log("\nTip: run with --create-test-lead to write a row to Notion.");
  }

  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
