/**
 * WealthMaze Internal Linking Graph
 * ==================================
 * Central source of truth for all internal links between calculators and blog posts.
 *
 * Structure:
 *   - calculatorRelations: for each calculator, lists related calculators AND related blog post slugs
 *   - blogRelations:       for each blog post slug, lists related blog slugs AND related calculator IDs
 *
 * This enables:
 *   1. Calculator pages  → link to related calculators + related blog posts
 *   2. Blog article pages → link to relevant calculators + related articles
 *   3. Zero orphan pages  → every page appears in at least one relation list
 */

import { blogPosts } from "@/data/blog/posts";
import { allCalculators } from "@/data/calculators";
import { programmaticPages } from "@/data/programmatic";

export interface CalculatorLinkData {
  /** Other calculator IDs that are closely related */
  relatedCalculators: string[];
  /** Blog post slugs that contextually explain or complement this calculator */
  relatedPosts: string[];
}

export interface BlogLinkData {
  /** Blog post slugs that are related (same topic or complement this article) */
  relatedPosts: string[];
  /** Calculator IDs that are directly useful for readers of this article */
  relatedCalculators: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATOR RELATIONS
// ─────────────────────────────────────────────────────────────────────────────
export const calculatorLinks: Record<string, CalculatorLinkData> = {

  "sip-calculator": {
    relatedCalculators: ["financial-goal-planner", "lumpsum-calculator", "mutual-fund-return-calculator", "sip-comparison-calculator", "goal-based-investment-calculator"],
    relatedPosts: ["what-is-sip", "power-of-starting-early", "small-financial-decisions-compound", "compounding-explained", "sip-vs-fd", "sip-mistakes", "sip-for-retirement", "sip-for-students", "beginner-investing-guide", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
  },

  "lumpsum-calculator": {
    relatedCalculators: ["financial-goal-planner", "sip-calculator", "cagr-calculator", "mutual-fund-return-calculator", "xirr-calculator"],
    relatedPosts: ["compounding-explained", "cagr-explained", "sip-vs-fd", "beginner-investing-guide"],
  },

  "mutual-fund-return-calculator": {
    relatedCalculators: ["sip-calculator", "lumpsum-calculator", "sip-comparison-calculator", "xirr-calculator"],
    relatedPosts: ["what-is-sip", "sip-vs-fd", "beginner-investing-guide"],
  },

  "sip-comparison-calculator": {
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator", "lumpsum-calculator"],
    relatedPosts: ["what-is-sip", "sip-vs-fd", "sip-mistakes"],
  },

  "cagr-calculator": {
    relatedCalculators: ["lumpsum-calculator", "xirr-calculator", "stock-return-calculator", "portfolio-return-calculator"],
    relatedPosts: ["cagr-explained", "compounding-explained", "beginner-investing-guide"],
  },

  "xirr-calculator": {
    relatedCalculators: ["cagr-calculator", "portfolio-return-calculator", "mutual-fund-return-calculator"],
    relatedPosts: ["cagr-explained", "compounding-explained"],
  },

  "goal-based-investment-calculator": {
    relatedCalculators: ["sip-calculator", "retirement-calculator", "fire-calculator", "inflation-impact-calculator"],
    relatedPosts: ["sip-for-retirement", "compounding-explained", "beginner-investing-guide"],
  },

  "sip-goal-planner": {
    relatedCalculators: ["sip-calculator", "step-up-sip-calculator", "compound-interest-calculator", "financial-freedom-calculator"],
    relatedPosts: ["what-nobody-tells-you-about-your-first-salary", "salary-is-not-your-wealth", "why-most-people-retire-poor"],
  },

  "financial-goal-planner": {
    relatedCalculators: ["sip-calculator", "lumpsum-calculator", "retirement-calculator", "inflation-impact-calculator"],
    relatedPosts: ["power-of-starting-early", "small-financial-decisions-compound", "compounding-explained", "beginner-investing-guide"],
  },

  "portfolio-return-calculator": {
    relatedCalculators: ["xirr-calculator", "cagr-calculator", "stock-return-calculator", "net-worth-calculator"],
    relatedPosts: ["cagr-explained"],
  },

  // ─── Retirement ────────────────────────────────────────────────────────────
  "retirement-calculator": {
    relatedCalculators: ["financial-goal-planner", "fire-calculator", "sip-calculator", "goal-based-investment-calculator", "nps-calculator"],
    relatedPosts: ["sip-for-retirement", "compounding-explained"],
  },

  "fire-calculator": {
    relatedCalculators: ["retirement-calculator", "financial-freedom-calculator", "sip-calculator", "inflation-impact-calculator"],
    relatedPosts: ["sip-for-retirement", "compounding-explained"],
  },

  "financial-freedom-calculator": {
    relatedCalculators: ["fire-calculator", "retirement-calculator", "how-long-until-1-crore"],
    relatedPosts: ["financial-freedom-is-simpler", "wealth-vs-income", "sip-for-retirement", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
  },

  "how-long-until-1-crore": {
    relatedCalculators: ["financial-freedom-calculator", "sip-calculator", "goal-based-investment-calculator"],
    relatedPosts: ["compounding-explained", "sip-for-retirement"],
  },

  // ─── Savings ────────────────────────────────────────────────────────────────
  "fd-calculator": {
    relatedCalculators: ["rd-calculator", "ppf-calculator", "epf-calculator"],
    relatedPosts: ["sip-vs-fd", "liquid-vs-non-liquid-assets", "budget-rule-50-30-20"],
  },

  "rd-calculator": {
    relatedCalculators: ["fd-calculator", "ppf-calculator", "sip-calculator"],
    relatedPosts: ["budget-rule-50-30-20", "how-to-save-for-a-car"],
  },

  "ppf-calculator": {
    relatedCalculators: ["epf-calculator", "nps-calculator", "fd-calculator"],
    relatedPosts: ["sip-vs-fd", "liquid-vs-non-liquid-assets"],
  },

  "epf-calculator": {
    relatedCalculators: ["ppf-calculator", "nps-calculator", "retirement-calculator"],
    relatedPosts: ["sip-for-retirement", "liquid-vs-non-liquid-assets"],
  },

  "nps-calculator": {
    relatedCalculators: ["epf-calculator", "ppf-calculator", "retirement-calculator", "fire-calculator"],
    relatedPosts: ["sip-for-retirement"],
  },

  // ─── Loans ──────────────────────────────────────────────────────────────────
  "emi-calculator": {
    relatedCalculators: ["loan-prepayment-calculator", "loan-comparison-calculator", "sip-calculator"],
    relatedPosts: ["how-is-loan-emi-calculated"],
  },

  "loan-prepayment-calculator": {
    relatedCalculators: ["emi-calculator", "loan-comparison-calculator"],
    relatedPosts: ["how-is-loan-emi-calculated"],
  },

  "loan-comparison-calculator": {
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator"],
    relatedPosts: [],
  },

  // ─── Tax ────────────────────────────────────────────────────────────────────
  "income-tax-calculator": {
    relatedCalculators: ["capital-gains-calculator", "epf-calculator", "ppf-calculator"],
    relatedPosts: [],
  },

  "capital-gains-calculator": {
    relatedCalculators: ["income-tax-calculator", "stock-return-calculator", "cagr-calculator"],
    relatedPosts: ["cagr-explained"],
  },

  // ─── Stock Market ────────────────────────────────────────────────────────────
  "stock-return-calculator": {
    relatedCalculators: ["cagr-calculator", "dividend-yield-calculator", "capital-gains-calculator", "position-size-calculator"],
    relatedPosts: ["cagr-explained"],
  },

  "dividend-yield-calculator": {
    relatedCalculators: ["stock-return-calculator", "portfolio-return-calculator"],
    relatedPosts: [],
  },

  "position-size-calculator": {
    relatedCalculators: ["stock-return-calculator", "portfolio-return-calculator"],
    relatedPosts: [],
  },

  // ─── Gold ────────────────────────────────────────────────────────────────────
  "gold-investment-calculator": {
    relatedCalculators: ["gold-sip-calculator", "digital-gold-calculator", "silver-investment-calculator", "inflation-impact-calculator"],
    relatedPosts: ["liquid-vs-non-liquid-assets"],
  },

  "gold-sip-calculator": {
    relatedCalculators: ["gold-investment-calculator", "digital-gold-calculator", "sip-calculator", "silver-investment-calculator"],
    relatedPosts: ["sip-for-retirement"],
  },

  "silver-investment-calculator": {
    relatedCalculators: ["gold-investment-calculator", "digital-gold-calculator", "gold-sip-calculator", "inflation-impact-calculator"],
    relatedPosts: [],
  },

  "digital-gold-calculator": {
    relatedCalculators: ["gold-investment-calculator", "gold-sip-calculator", "silver-investment-calculator"],
    relatedPosts: ["is-gold-a-good-investment"],
  },

  // ─── Lifestyle ────────────────────────────────────────────────────────────────
  "inflation-impact-calculator": {
    relatedCalculators: ["financial-goal-planner", "goal-based-investment-calculator", "fire-calculator", "retirement-calculator"],
    relatedPosts: ["sip-for-retirement", "compounding-explained"],
  },

  "net-worth-calculator": {
    relatedCalculators: ["portfolio-return-calculator", "financial-freedom-calculator", "retirement-calculator"],
    relatedPosts: ["why-most-people-never-build-wealth", "wealth-vs-income", "liquid-vs-non-liquid-assets"],
  },

  // ─── Car/Home Loan (programmatic variants also use these) ────────────────────
  "car-loan-emi-calculator": {
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator", "rd-calculator"],
    relatedPosts: ["how-to-save-for-a-car", "how-is-loan-emi-calculated"],
  },

  "home-loan-emi-calculator": {
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator", "loan-comparison-calculator"],
    relatedPosts: ["buying-a-house-financial-roadmap", "how-is-loan-emi-calculated"],
  },

  "step-up-sip-calculator": {
    relatedCalculators: ["sip-calculator", "sip-comparison-calculator", "mutual-fund-return-calculator", "lumpsum-calculator"],
    relatedPosts: ["what-is-sip", "compounding-explained", "sip-mistakes", "sip-for-retirement", "beginner-investing-guide"],
  },

  "coast-fire-calculator": {
    relatedCalculators: ["fire-calculator", "retirement-calculator", "financial-freedom-calculator", "sip-calculator"],
    relatedPosts: ["sip-for-retirement", "compounding-explained"],
  },

  "personal-loan-emi-calculator": {
    relatedCalculators: ["emi-calculator", "loan-comparison-calculator", "loan-prepayment-calculator", "home-loan-emi-calculator"],
    relatedPosts: ["how-is-loan-emi-calculated"],
  },

  "compound-interest-calculator": {
    relatedCalculators: ["savings-calculator", "investment-growth-calculator", "sip-calculator"],
    relatedPosts: ["power-of-starting-early", "small-financial-decisions-compound", "compounding-explained"],
  },

  "investment-growth-calculator": {
    relatedCalculators: ["compound-interest-calculator", "sip-calculator", "lumpsum-calculator"],
    relatedPosts: ["power-of-starting-early", "beginner-investing-guide", "compounding-explained"],
  },

  "savings-calculator": {
    relatedCalculators: ["compound-interest-calculator", "fd-calculator", "rd-calculator"],
    relatedPosts: ["small-financial-decisions-compound", "why-most-people-never-build-wealth", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// BLOG RELATIONS
// ─────────────────────────────────────────────────────────────────────────────
export const blogLinks: Record<string, BlogLinkData> = {

  "what-is-sip": {
    relatedPosts: ["sip-mistakes", "sip-for-students", "sip-vs-fd", "compounding-explained", "beginner-investing-guide"],
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator", "sip-comparison-calculator"],
  },

  "compounding-explained": {
    relatedPosts: ["what-is-sip", "cagr-explained", "sip-for-retirement", "beginner-investing-guide"],
    relatedCalculators: ["sip-calculator", "lumpsum-calculator", "cagr-calculator"],
  },

  "cagr-explained": {
    relatedPosts: ["compounding-explained"],
    relatedCalculators: ["cagr-calculator", "xirr-calculator", "portfolio-return-calculator"],
  },

  "buying-a-house-financial-roadmap": {
    relatedPosts: ["how-is-loan-emi-calculated"],
    relatedCalculators: ["sip-goal-planner", "emi-calculator", "net-worth-calculator"],
  },

  "budget-rule-50-30-20": {
    relatedPosts: ["liquid-vs-non-liquid-assets", "how-to-save-for-a-car"],
    relatedCalculators: ["rd-calculator", "fd-calculator"],
  },

  "liquid-vs-non-liquid-assets": {
    relatedPosts: ["budget-rule-50-30-20", "sip-vs-fd"],
    relatedCalculators: ["fd-calculator", "rd-calculator"],
  },

  "beginner-investing-guide": {
    relatedPosts: ["what-is-sip", "compounding-explained"],
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator", "cagr-calculator"],
  },

  "sip-for-retirement": {
    relatedPosts: ["compounding-explained", "sip-mistakes", "sip-for-students"],
    relatedCalculators: ["retirement-calculator", "sip-calculator", "fire-calculator", "goal-based-investment-calculator"],
  },

  "sip-for-students": {
    relatedPosts: ["what-is-sip", "beginner-investing-guide", "sip-mistakes"],
    relatedCalculators: ["sip-calculator", "goal-based-investment-calculator"],
  },

  "sip-mistakes": {
    relatedPosts: ["what-is-sip", "sip-for-students", "compounding-explained"],
    relatedCalculators: ["sip-calculator", "sip-comparison-calculator"],
  },

  "sip-vs-fd": {
    relatedPosts: ["what-is-sip", "liquid-vs-non-liquid-assets", "sip-mistakes"],
    relatedCalculators: ["sip-calculator", "fd-calculator"],
  },

  "why-most-people-never-build-wealth": {
    relatedPosts: ["small-financial-decisions-compound", "wealth-vs-income", "financial-freedom-is-simpler", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
    relatedCalculators: ["net-worth-calculator", "savings-calculator", "goal-based-investment-calculator"],
  },

  "power-of-starting-early": {
    relatedPosts: ["compounding-explained", "small-financial-decisions-compound", "financial-freedom-is-simpler", "beginner-investing-guide", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
    relatedCalculators: ["sip-calculator", "investment-growth-calculator", "compound-interest-calculator"],
  },

  "wealth-vs-income": {
    relatedPosts: ["why-most-people-never-build-wealth", "financial-freedom-is-simpler", "liquid-vs-non-liquid-assets", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
    relatedCalculators: ["net-worth-calculator", "financial-freedom-calculator"],
  },

  "small-financial-decisions-compound": {
    relatedPosts: ["why-most-people-never-build-wealth", "power-of-starting-early", "budget-rule-50-30-20"],
    relatedCalculators: ["net-worth-calculator", "compound-interest-calculator", "sip-goal-planner"],
  },

  "financial-freedom-is-simpler": {
    relatedPosts: ["why-most-people-never-build-wealth", "power-of-starting-early", "wealth-vs-income", "sip-for-retirement", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
    relatedCalculators: ["financial-freedom-calculator", "fire-calculator", "retirement-calculator"],
  },

  "most-people-think-about-growing-wealth-wrong-at-an-early-age": {
    relatedPosts: ["why-most-people-never-build-wealth", "power-of-starting-early", "wealth-vs-income"],
    relatedCalculators: ["sip-calculator", "savings-calculator", "financial-freedom-calculator"],
  },

  "how-to-save-for-a-car": {
    relatedPosts: ["how-is-loan-emi-calculated", "budget-rule-50-30-20"],
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator", "savings-calculator"],
  },

  "how-is-loan-emi-calculated": {
    relatedPosts: ["how-to-save-for-a-car"],
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator", "loan-comparison-calculator"],
  },

  "cagr-in-share-market": {
    relatedPosts: ["cagr-explained", "what-is-xirr-calculator-guide", "compounding-explained"],
    relatedCalculators: ["cagr-calculator", "xirr-calculator", "investment-growth-calculator"],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ACCESSOR HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Helper to compute token overlap score between two strings or arrays.
 */
function computeScore(textA: string, tokensB: string[]): number {
  const lowerA = textA.toLowerCase();
  let score = 0;
  for (const token of tokensB) {
    if (token.length > 2 && lowerA.includes(token.toLowerCase())) {
      score += 2;
    }
  }
  return score;
}

/**
 * Returns up to `limit` related calculator IDs for a given calculator.
 * Backfills using category and keyword similarity if explicit mappings are insufficient.
 */
export function getRelatedCalculators(
  calculatorId: string,
  calcsList: { id: string; category: string; name?: string; description?: string }[] = allCalculators,
  limit = 5
): string[] {
  const progPage = programmaticPages.find((p) => p.id === calculatorId);
  const baseId = progPage ? progPage.parentCalculatorId : calculatorId;

  let explicit = (calculatorLinks[baseId]?.relatedCalculators ?? []).filter((id) => id !== calculatorId);

  // If this is a programmatic page, link to its parent + sibling programmatic pages!
  if (progPage) {
    const siblings = programmaticPages
      .filter((p) => p.parentCalculatorId === baseId && p.id !== calculatorId)
      .map((p) => p.id);
    explicit = [baseId, ...siblings.slice(0, 3), ...explicit];
  } else {
    // If this is a regular parent calculator, automatically link to up to 2 of its child pSEO pages!
    const children = programmaticPages
      .filter((p) => p.parentCalculatorId === calculatorId)
      .slice(0, 2)
      .map((p) => p.id);
    explicit = [...explicit, ...children];
  }

  // Remove duplicates and self
  const result = new Set<string>(explicit.filter((id) => id !== calculatorId));
  if (result.size >= limit) {
    return Array.from(result).slice(0, limit);
  }

  const currentCalc = calcsList.find((c) => c.id === baseId);
  const currentCat = currentCalc?.category;
  const currentTokens = (progPage?.name ?? currentCalc?.name ?? calculatorId).toLowerCase().split(/[- \s]+/);

  // Score candidates
  const candidates = calcsList
    .filter((c) => c.id !== calculatorId && !result.has(c.id))
    .map((c) => {
      let score = c.category === currentCat ? 5 : 0;
      score += computeScore(c.name ?? c.id, currentTokens);
      if (c.description) score += computeScore(c.description, currentTokens) * 0.5;
      return { id: c.id, score };
    })
    .sort((a, b) => b.score - a.score);

  for (const item of candidates) {
    if (result.size >= limit) break;
    result.add(item.id);
  }

  return Array.from(result).slice(0, limit);
}

/**
 * Returns up to `limit` related blog post slugs for a given calculator.
 */
export function getRelatedPostsForCalculator(calculatorId: string, limit = 4): string[] {
  const progPage = programmaticPages.find((p) => p.id === calculatorId);
  const baseId = progPage ? progPage.parentCalculatorId : calculatorId;

  const explicit = (calculatorLinks[baseId]?.relatedPosts ?? []);
  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  const result = new Set<string>(explicit);
  const currentCalc = allCalculators.find((c) => c.id === baseId);
  const tokens = (progPage?.name ?? currentCalc?.name ?? calculatorId).toLowerCase().split(/[- \s]+/);

  const candidates = blogPosts
    .filter((p) => !result.has(p.slug))
    .map((p) => {
      let score = 0;
      score += computeScore(`${p.title} ${p.category} ${p.tags.join(" ")}`, tokens);
      return { slug: p.slug, score };
    })
    .sort((a, b) => b.score - a.score);

  for (const item of candidates) {
    if (result.size >= limit) break;
    result.add(item.slug);
  }

  return Array.from(result).slice(0, limit);
}

/**
 * Returns up to `limit` related blog post slugs for a given blog post.
 */
export function getRelatedPostsForBlog(slug: string, limit = 5): string[] {
  const explicit = (blogLinks[slug]?.relatedPosts ?? []).filter((s) => s !== slug);
  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  const result = new Set<string>(explicit);
  const currentPost = blogPosts.find((p) => p.slug === slug);
  const currentCat = currentPost?.category;
  const currentTags = currentPost?.tags ?? [];
  const tokens = (currentPost?.title ?? slug).toLowerCase().split(/[- \s]+/);

  const candidates = blogPosts
    .filter((p) => p.slug !== slug && !result.has(p.slug))
    .map((p) => {
      let score = p.category === currentCat ? 4 : 0;
      for (const tag of p.tags) {
        if (currentTags.includes(tag)) score += 3;
      }
      score += computeScore(p.title, tokens);
      return { slug: p.slug, score };
    })
    .sort((a, b) => b.score - a.score);

  for (const item of candidates) {
    if (result.size >= limit) break;
    result.add(item.slug);
  }

  return Array.from(result).slice(0, limit);
}

/**
 * Returns up to `limit` related calculator IDs for a given blog post.
 */
export function getRelatedCalculatorsForBlog(slug: string, limit = 5): string[] {
  const explicit = (blogLinks[slug]?.relatedCalculators ?? []);
  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  const result = new Set<string>(explicit);
  const currentPost = blogPosts.find((p) => p.slug === slug);
  const tokens = (currentPost?.title ?? slug).toLowerCase().split(/[- \s]+/);

  const candidates = allCalculators
    .filter((c) => !result.has(c.id))
    .map((c) => {
      let score = 0;
      score += computeScore(`${c.name} ${c.category} ${c.description}`, tokens);
      return { id: c.id, score };
    })
    .sort((a, b) => b.score - a.score);

  for (const item of candidates) {
    if (result.size >= limit) break;
    result.add(item.id);
  }

  return Array.from(result).slice(0, limit);
}
