/**
 * adminParser.ts
 * Rule-based markdown processing utilities for the WealthMaze Admin Studio.
 * Zero AI required — all processing is deterministic.
 */

export interface ArticleMetadata {
  title: string;
  slug: string;
  metaDescription: string;
  category: string;
  tags: string[];
  readTime: string;
  relatedCalculators: string[];
  publishedAt: string;
}

// ─── Markdown Cleaning ────────────────────────────────────────────────────────

/**
 * Cleans raw LLM-generated markdown for WealthMaze compliance:
 * - Strips horizontal dividers (---)
 * - Converts absolute wealthmaze.in URLs to relative paths
 * - Removes top-level title heading (# Title line)
 * - Removes byline (*By Om K. | WealthMaze | ...*)
 * - Removes SLUG/META/metadata blocks
 * - Removes trailing JSON block (parsed separately)
 */
export function cleanMarkdown(raw: string): string {
  let cleaned = raw;

  // Remove trailing JSON block (```json ... ``` at the end)
  cleaned = cleaned.replace(/```json[\s\S]*?```\s*$/m, "").trim();

  // Remove raw JSON block at end (not fenced)
  cleaned = cleaned.replace(/\{\s*"title"[\s\S]*?\}\s*$/m, "").trim();

  // Strip horizontal dividers (standalone ---)
  cleaned = cleaned.replace(/^\s*---\s*$/gm, "");

  // Convert absolute wealthmaze.in URLs to relative paths
  cleaned = cleaned.replace(/https?:\/\/wealthmaze\.in\//g, "/");

  // Remove top-level H1 title (# Title at the very top)
  cleaned = cleaned.replace(/^#\s+.+\n?/m, "");

  // Remove byline (*By Om K. | WealthMaze | ...*)
  cleaned = cleaned.replace(/^\*By .+\*\s*\n?/m, "");

  // Remove SLUG/META blocks (any line starting with SLUG:, META TITLE:, etc.)
  cleaned = cleaned.replace(/^(SLUG|META TITLE|META DESCRIPTION|FOCUS KEYWORD|SECONDARY KEYWORDS|CATEGORY|READ TIME|TAG):.*\n?/gim, "");

  // Remove fenced code blocks that contain only metadata
  cleaned = cleaned.replace(/```\s*\n(SLUG|META TITLE|META DESCRIPTION)[\s\S]*?```\s*\n?/gim, "");

  // Remove disclaimer paragraphs (typically the last italic paragraph)
  cleaned = cleaned.replace(/^\*Disclaimer:.*\*\s*\n?/gm, "");

  // Collapse multiple blank lines into maximum two
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  return cleaned.trim();
}

// ─── Slug Generation ──────────────────────────────────────────────────────────

/**
 * Converts a title string to a URL-safe slug.
 * e.g. "The House You Want & the Life You're Building" -> "the-house-you-want-the-life-youre-building"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars except hyphen
    .replace(/\s+/g, "-")     // Spaces to hyphens
    .replace(/-+/g, "-")      // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}

// ─── Read Time Calculation ────────────────────────────────────────────────────

/**
 * Calculates estimated reading time based on word count.
 * Uses 238 wpm (average adult reading speed).
 */
export function calculateReadTime(markdown: string): string {
  const wordCount = markdown
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/#+\s/g, "")           // Remove heading markers
    .replace(/[*_~`]/g, "")         // Remove markdown symbols
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.round(wordCount / 238));
  return `${minutes} min read`;
}

// ─── LLM JSON Block Parser ────────────────────────────────────────────────────

/**
 * Scans raw pasted text for a trailing JSON metadata block produced by the LLM.
 * Returns partial ArticleMetadata if found, or null.
 *
 * Expected format (fenced or raw):
 * {
 *   "title": "...",
 *   "slug": "...",
 *   "metaDescription": "...",
 *   "category": "...",
 *   "tags": [...],
 *   "readTime": "...",
 *   "relatedCalculators": [...]
 * }
 */
export function parseLLMJsonBlock(raw: string): Partial<ArticleMetadata> | null {
  // Try to find JSON block (fenced or unfenced)
  const fencedMatch = raw.match(/```json\s*([\s\S]*?)```/);
  const unfencedMatch = raw.match(/\{[\s\S]*"title"[\s\S]*\}/);

  const jsonStr = fencedMatch?.[1] || unfencedMatch?.[0];
  if (!jsonStr) return null;

  try {
    const parsed = JSON.parse(jsonStr.trim());
    return {
      title: parsed.title || "",
      slug: parsed.slug || "",
      metaDescription: parsed.metaDescription || parsed.meta_description || "",
      category: parsed.category || "",
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      readTime: parsed.readTime || parsed.read_time || "",
      relatedCalculators: Array.isArray(parsed.relatedCalculators)
        ? parsed.relatedCalculators
        : [],
    };
  } catch {
    return null;
  }
}

// ─── Slug Conflict Detection ──────────────────────────────────────────────────

/**
 * Returns true if the slug already exists in the known list of post slugs.
 */
export function slugExists(slug: string, existingSlugs: string[]): boolean {
  return existingSlugs.includes(slug.toLowerCase().trim());
}

// ─── SEO Health Check ─────────────────────────────────────────────────────────

export interface SEOHealthResult {
  score: number; // 0-100
  warnings: string[];
  passes: string[];
}

/**
 * Runs a lightweight rule-based SEO health check on the article content and metadata.
 */
export function seoHealthCheck(
  markdownContent: string,
  meta: Partial<ArticleMetadata>
): SEOHealthResult {
  const warnings: string[] = [];
  const passes: string[] = [];

  // Meta description length
  const descLen = (meta.metaDescription || "").length;
  if (descLen === 0) {
    warnings.push("Missing meta description.");
  } else if (descLen < 120) {
    warnings.push(`Meta description is short (${descLen} chars). Aim for 140-160.`);
  } else if (descLen > 165) {
    warnings.push(`Meta description is too long (${descLen} chars). Keep under 160.`);
  } else {
    passes.push(`Meta description length is good (${descLen} chars).`);
  }

  // Horizontal dividers still present
  if (/^\s*---\s*$/m.test(markdownContent)) {
    warnings.push("Content still contains horizontal dividers (---). These will be stripped on publish.");
  } else {
    passes.push("No horizontal dividers found.");
  }

  // Absolute wealthmaze URLs
  if (/https?:\/\/wealthmaze\.in/.test(markdownContent)) {
    warnings.push("Absolute wealthmaze.in URLs detected. Convert to relative paths (e.g. /calculator-slug).");
  } else {
    passes.push("All WealthMaze links are relative.");
  }

  // At least one H2 heading
  if (!/^##\s/m.test(markdownContent)) {
    warnings.push("No H2 headings found. Add at least one ## section.");
  } else {
    passes.push("Article has section headings.");
  }

  // Has closing calculator links
  if (!/\[.*\]\(\//.test(markdownContent)) {
    warnings.push("No internal links found. Add closing calculator links.");
  } else {
    passes.push("Internal calculator links present.");
  }

  // Slug format
  if (meta.slug && /[A-Z\s]/.test(meta.slug)) {
    warnings.push("Slug contains uppercase letters or spaces. Use lowercase-hyphenated format.");
  } else if (meta.slug) {
    passes.push("Slug format is valid.");
  }

  // Related calculators
  if (!meta.relatedCalculators || meta.relatedCalculators.length === 0) {
    warnings.push("No related calculators selected.");
  } else {
    passes.push(`${meta.relatedCalculators.length} related calculator(s) selected.`);
  }

  const score = Math.round((passes.length / (passes.length + warnings.length)) * 100);
  return { score, warnings, passes };
}
