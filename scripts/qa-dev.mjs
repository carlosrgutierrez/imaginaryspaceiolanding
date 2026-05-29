#!/usr/bin/env node
/**
 * Post-batch QA — verifies localhost dev server is healthy.
 * Run while `npm run dev` is up. Exits 1 on failure with actionable feedback.
 */
const BASE = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";

const checks = [];

function pass(name, detail) {
  checks.push({ ok: true, name, detail });
}

function fail(name, detail) {
  checks.push({ ok: false, name, detail });
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" });
  const text = await res.text();
  return { res, text };
}

async function main() {
  console.log(`\nQA dev check — ${BASE}\n`);

  // 1. Homepage
  let html;
  try {
    const { res, text } = await fetchText(`${BASE}/`);
    html = text;
    if (res.status === 200) pass("Homepage", `HTTP ${res.status}`);
    else fail("Homepage", `HTTP ${res.status} (expected 200)`);
  } catch (e) {
    fail("Homepage", `Cannot connect — is dev running? (${e.message})`);
    printReport();
    process.exit(1);
  }

  // 2. Stylesheet (white screen = CSS 404)
  const cssMatch = html.match(/href="(\/_next\/static\/css\/[^"]+)"/);
  if (!cssMatch) {
    fail("CSS link", "No stylesheet link in HTML — layout may be broken");
  } else {
    const cssPath = cssMatch[1].split("&")[0].includes("?")
      ? cssMatch[1]
      : cssMatch[1];
    const cssUrl = `${BASE}${cssMatch[1]}`;
    try {
      const cssRes = await fetch(cssUrl);
      const cssBody = await cssRes.text();
      if (cssRes.status !== 200) {
        fail(
          "CSS load",
          `HTTP ${cssRes.status} for ${cssMatch[1]} — THIS CAUSES WHITE SCREEN. Run: npm run dev:clean`
        );
      } else if (cssBody.length < 1000) {
        fail("CSS load", `Stylesheet too small (${cssBody.length} bytes)`);
      } else if (!cssBody.includes("0A0A0A") && !cssBody.includes("bg-primary")) {
        fail("CSS theme", "Dark background tokens missing from stylesheet");
      } else {
        pass("CSS load", `${cssBody.length} bytes, dark theme tokens present`);
      }
    } catch (e) {
      fail("CSS load", e.message);
    }
  }

  // 3. Key routes
  for (const route of ["/services", "/team", "/work-with-us"]) {
    try {
      const { res } = await fetchText(`${BASE}${route}`);
      if (res.status === 200) pass(`Route ${route}`, "OK");
      else fail(`Route ${route}`, `HTTP ${res.status}`);
    } catch (e) {
      fail(`Route ${route}`, e.message);
    }
  }

  // 4. Batch-specific smoke strings (optional sanity)
  if (html.includes("Acme Corp")) {
    fail("Marquee copy", 'Still shows placeholder "Acme Corp"');
  } else if (html.includes("Meta") || html.includes("SIEMENS")) {
    pass("Marquee copy", "Client names present");
  }

  if (html.includes("nexus-ai")) {
    fail("Contact email", "Legacy nexus-ai email still referenced");
  } else {
    pass("Contact email", "No nexus-ai on homepage");
  }

  if (html.includes("That&#x27;s why we built Imaginary Space") || html.includes("That's why we built Imaginary Space")) {
    pass("Value prop copy", "Homepage value proposition headline present");
  } else {
    fail("Value prop copy", "Value proposition headline missing from homepage");
  }

  try {
    const { text: contactHtml } = await fetchText(`${BASE}/work-with-us`);
    if (contactHtml.includes("nexus-ai") || contactHtml.includes("Acme Corp")) {
      fail("Contact page", "Legacy Nexus/Acme placeholders on /work-with-us");
    } else if (contactHtml.includes("carlos@imaginaryspace.ai")) {
      pass("Contact page", "Imaginary Space contact email present");
    } else {
      pass("Contact page", "No legacy placeholders");
    }

    const { text: servicesHtml } = await fetchText(`${BASE}/services`);
    if (servicesHtml.includes("/work/")) {
      fail("Services page", "Broken /work/ case study links still present");
    } else if (servicesHtml.includes("Land Use, Automated") || servicesHtml.includes("Measure")) {
      pass("Services page", "Real case study titles linked");
    }

    const { text: teamHtml } = await fetchText(`${BASE}/team`);
    if (teamHtml.includes("Alex Chen") || teamHtml.includes("Sarah Miller")) {
      fail("Team page", "Old placeholder leadership still on /team");
    } else if (
      teamHtml.includes("Harry Roper") &&
      teamHtml.includes("Verity Formentera")
    ) {
      pass("Team page", "Updated team roster present");
    }
  } catch (e) {
    fail("Contact page", e.message);
  }

  if (html.includes("TestimonialSection") || html.includes("Don't just take our word")) {
    fail("Testimonials", "Testimonial section still visible on homepage");
  } else {
    pass("Testimonials", "Hidden on homepage");
  }

  printReport();
  process.exit(checks.some((c) => !c.ok) ? 1 : 0);
}

function printReport() {
  for (const c of checks) {
    const icon = c.ok ? "✓" : "✗";
    console.log(`  ${icon} ${c.name}${c.detail ? ` — ${c.detail}` : ""}`);
  }
  const failed = checks.filter((c) => !c.ok);
  console.log("");
  if (failed.length) {
    console.log(`FAILED (${failed.length} check(s)).`);
    if (failed.some((c) => c.name === "CSS load")) {
      console.log("\nFix: stop dev (Ctrl+C), then run:  npm run dev:clean\n");
    }
  } else {
    console.log("ALL CHECKS PASSED.\n");
  }
}

main();
