import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const html = read("index.html");
const css = read("public/assets/css/portfolio.css");
const js = read("public/assets/js/portfolio.js");
const robots = read("robots.txt");
const sitemap = read("sitemap.xml");
const failures = [];

const check = (condition, message) => {
    if (!condition) failures.push(message);
};

check(html.includes("<title>Alejandro Vinokur | Software Engineer</title>"), "Missing recruiter-facing title");
check(html.includes('name="description"'), "Missing meta description");
check(html.includes('class="skip-link"'), "Missing skip link");
check(html.includes('aria-live="polite"'), "Missing accessible form status region");
check(html.includes('class="header-title" id="hero-title">Alejandro Vinokur</h1>'), "Original name-led hero structure is missing");
check(html.includes("Software Engineer · Buenos Aires"), "Hero role and location are missing");
check(html.includes("Software Engineer · Backend focus"), "Backend focus positioning is missing");
check(html.includes("I build backend systems that stay reliable when integrations and production constraints get real."), "Hero value proposition is missing");
check(html.includes('class="brand-img"'), "Original avatar-centered navigation structure is missing");
check(!html.includes("Google Maps"), "Google Maps should not be loaded");
check(!html.includes("maps.googleapis.com"), "Google Maps API script should not be present");
check(!html.includes("Birthdate"), "Birthdate should not be public");
check(!html.includes("3885864499"), "Phone number should remain private");
check(!html.includes('href="#"'), "Placeholder links are not allowed");
check(!html.includes("Happy Users"), "Unqualified satisfaction claim should not be present");
check(!html.includes("presented without exposing confidential work"), "Portfolio should not include design-commentary disclaimers");
check(!html.includes("Client names, private URLs"), "Portfolio should not include confidentiality boilerplate");
check(html.includes("~10 applications"), "Qualified application-count claim is missing");
check(html.includes("Estimated 1M+"), "Qualified reach estimate is missing");
check(html.includes("POC / prototype"), "Prototype maturity label is missing");
check(html.includes('class="mate-icon"'), "Mate metric icon is missing");
check(html.includes("AI Integration"), "AI integration service is missing");
check((html.match(/class="ti-email"/g) || []).length === 3, "Original email icon should be used in all contact locations");
check(!html.includes("Prototype-backed capability"), "Services should not be labeled as prototype capabilities");

const projectCount = (html.match(/class="portfolio-entry"/g) || []).length;
check(projectCount === 10, `Expected 10 portfolio projects, found ${projectCount}`);
check((html.match(/data-filter=/g) || []).length === 5, "Portfolio filter set is incomplete");

const requiredFields = ["name", "email", "subject", "message", "_gotcha"];
for (const field of requiredFields) check(html.includes(`name="${field}"`), `Contact field ${field} is missing`);
check(html.includes('action="https://formspree.io/f/'), "Formspree action is missing");
if (process.env.ALLOW_FORM_PLACEHOLDER !== "1") {
    check(!html.includes("/FORM_ID"), "Replace FORM_ID with the real Formspree form ID");
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
check(duplicates.length === 0, `Duplicate HTML IDs: ${[...new Set(duplicates)].join(", ")}`);

const localAssets = [...html.matchAll(/(?:src|href)="(public\/[^"#?]+)"/g)].map((match) => match[1]);
for (const asset of localAssets) check(existsSync(resolve(root, asset)), `Missing local asset: ${asset}`);

check(css.includes("prefers-reduced-motion"), "Reduced-motion support is missing");
check(css.includes(":focus-visible"), "Visible keyboard focus styles are missing");
check(js.includes("response.status === 429"), "Rate-limit handling is missing");
check(js.includes("aria-invalid"), "Inline validation state is missing");

check(robots.includes("https://alevinokur.github.io/AleVinokur/sitemap.xml"), "robots.txt has the wrong sitemap URL");
check(!sitemap.includes("tudominio.com"), "Sitemap still contains placeholder domain");
check(sitemap.includes("https://alevinokur.github.io/AleVinokur/"), "Sitemap does not include the published portfolio URL");

const pdf = readFileSync(resolve(root, "public/assets/cv/Alejandro-Vinokur.pdf"));
check(pdf.subarray(0, 4).toString() === "%PDF", "Resume asset is not a valid PDF");

if (failures.length) {
    console.error(`Static-site validation failed (${failures.length}):`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
}

console.log(`Static-site validation passed: ${ids.length} unique IDs, ${localAssets.length} local asset references.`);
