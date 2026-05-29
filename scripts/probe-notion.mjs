#!/usr/bin/env node
/**
 * One-off Notion CRM probe — reads DB schema and optionally creates a test lead.
 * Usage: node scripts/probe-notion.mjs [--create-test-lead]
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
const createTest = process.argv.includes("--create-test-lead");

const EXPECTED = {
  name: { name: "Name", type: "title" },
  email: { name: "Email", type: "email" },
  company: { name: "Company", type: "rich_text" },
  website: { name: "Website", type: "url" },
  role: { name: "Role", type: "select" },
  companySize: { name: "Company Size", type: "select" },
  budget: { name: "Budget", type: "select" },
  project: { name: "Project", type: "rich_text" },
  source: { name: "Source", type: "select" },
  status: { name: "Status", type: "select" },
};

if (!apiKey || !databaseId) {
  console.error("Missing NOTION_API_KEY or NOTION_DATABASE_ID in .env.local");
  process.exit(1);
}

const notion = new Client({ auth: apiKey });

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

  let db;
  try {
    db = await notion.databases.retrieve({ database_id: databaseId });
  } catch (err) {
    console.error("❌ Could not access database:", err.body?.message ?? err.message);
    console.error("\nCommon fixes:");
    console.error("  • Share the database with your Notion integration (⋯ → Connections)");
    console.error("  • Confirm NOTION_DATABASE_ID is the database ID, not a page ID");
    process.exit(1);
  }

  console.log("✓ Database accessible:", db.title?.[0]?.plain_text ?? "(untitled)");
  console.log("  ID:", databaseId);

  const props = db.properties ?? {};
  const actualNames = Object.keys(props);
  console.log("\nColumns in Notion (" + actualNames.length + "):");
  for (const name of actualNames.sort()) {
    const info = summarizeProperty(name, props[name]);
    if (info.options) {
      console.log(`  • ${name} (${info.type}): ${info.options.join(" | ")}`);
    } else {
      console.log(`  • ${name} (${info.type})`);
    }
  }

  console.log("\nExpected by the contact form:");
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
    console.log(`  ✓ ${expected.name} (${expected.type})`);
  }

  if (mismatches.length) {
    console.log("\n⚠ Schema mismatches:");
    mismatches.forEach((m) => console.log(m));
  } else {
    console.log("\n✓ All expected columns match.");
  }

  // Check select option compatibility for form values
  const formSelects = {
    Role: [
      "C-Suite / Founder",
      "VP / Director",
      "Engineering Manager",
      "Product Manager",
      "Consultant",
      "Other",
    ],
    "Company Size": ["1–10", "11–50", "51–200", "201–1,000", "1,000+"],
    Budget: ["< $10k", "$10k–$50k", "$50k–$150k", "$150k+"],
    Source: ["Website"],
    Status: ["New"],
  };

  console.log("\nSelect option check (form → Notion):");
  for (const [col, values] of Object.entries(formSelects)) {
    const prop = props[col];
    if (!prop || prop.type !== "select") {
      console.log(`  ⚠ ${col}: column missing or not a select`);
      continue;
    }
    const options = new Set(prop.select.options.map((o) => o.name));
    for (const v of values) {
      console.log(options.has(v) ? `  ✓ ${col}: "${v}"` : `  ✗ ${col}: "${v}" NOT in Notion`);
    }
  }

  if (createTest) {
    console.log("\nCreating test lead (delete in Notion after review)...");
    try {
      const page = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          Name: { title: [{ text: { content: "Test Lead (delete me)" } }] },
          Email: { email: "test@example.com" },
          Company: { rich_text: [{ text: { content: "Imaginary Space QA" } }] },
          Role: { select: { name: "Other" } },
          "Company Size": { select: { name: "1–10" } },
          Budget: { select: { name: "< $10k" } },
          Source: { select: { name: "Website" } },
          Status: { select: { name: "New" } },
          Project: {
            rich_text: [{ text: { content: "Probe script test — safe to delete." } }],
          },
        },
      });
      console.log("✓ Test lead created:", page.id);
    } catch (err) {
      console.error("❌ Test lead failed:", err.body?.message ?? err.message);
      process.exit(1);
    }
  }

  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
