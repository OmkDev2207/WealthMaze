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
    relatedCalculators: ["lumpsum-calculator", "mutual-fund-return-calculator", "sip-comparison-calculator", "goal-based-investment-calculator"],
    relatedPosts: ["what-is-sip", "power-of-starting-early", "small-financial-decisions-compound", "compounding-explained", "sip-vs-fd", "sip-mistakes", "sip-for-retirement", "sip-for-students", "beginner-investing-guide", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
  },

  "lumpsum-calculator": {
    relatedCalculators: ["sip-calculator", "cagr-calculator", "mutual-fund-return-calculator", "xirr-calculator"],
    relatedPosts: ["compounding-explained", "cagr-explained", "sip-vs-fd", "beginner-investing-guide"],
  },

  "mutual-fund-return-calculator": {
    relatedCalculators: ["sip-calculator", "lumpsum-calculator", "sip-comparison-calculator", "xirr-calculator"],
    relatedPosts: ["what-is-sip", "what-is-index-fund", "passive-investing-basics", "sip-vs-fd", "beginner-investing-guide"],
  },

  "sip-comparison-calculator": {
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator", "lumpsum-calculator"],
    relatedPosts: ["what-is-sip", "sip-vs-fd", "sip-mistakes", "passive-investing-basics"],
  },

  "cagr-calculator": {
    relatedCalculators: ["lumpsum-calculator", "xirr-calculator", "stock-return-calculator", "portfolio-return-calculator"],
    relatedPosts: ["cagr-explained", "compounding-explained", "understanding-market-volatility", "beginner-investing-guide"],
  },

  "xirr-calculator": {
    relatedCalculators: ["cagr-calculator", "portfolio-return-calculator", "mutual-fund-return-calculator"],
    relatedPosts: ["cagr-explained", "compounding-explained", "investing-psychology"],
  },

  "goal-based-investment-calculator": {
    relatedCalculators: ["sip-calculator", "retirement-calculator", "fire-calculator", "inflation-impact-calculator"],
    relatedPosts: ["sip-for-retirement", "compounding-explained", "beginner-investing-guide", "saving-first-1-lakh"],
  },

  "sip-goal-planner": {
    relatedCalculators: ["sip-calculator", "step-up-sip-calculator", "compound-interest-calculator", "financial-freedom-calculator"],
    relatedPosts: ["what-nobody-tells-you-about-your-first-salary", "salary-is-not-your-wealth", "why-most-people-retire-poor"],
  },

  "portfolio-return-calculator": {
    relatedCalculators: ["xirr-calculator", "cagr-calculator", "stock-return-calculator", "net-worth-calculator"],
    relatedPosts: ["asset-allocation", "investing-psychology", "cagr-explained", "understanding-market-volatility"],
  },

  // ─── Retirement ────────────────────────────────────────────────────────────
  "retirement-calculator": {
    relatedCalculators: ["fire-calculator", "sip-calculator", "goal-based-investment-calculator", "nps-calculator"],
    relatedPosts: ["sip-for-retirement", "compounding-explained", "asset-allocation"],
  },

  "fire-calculator": {
    relatedCalculators: ["retirement-calculator", "financial-freedom-calculator", "sip-calculator", "inflation-impact-calculator"],
    relatedPosts: ["sip-for-retirement", "asset-allocation", "compounding-explained"],
  },

  "financial-freedom-calculator": {
    relatedCalculators: ["fire-calculator", "retirement-calculator", "how-long-until-1-crore"],
    relatedPosts: ["financial-freedom-is-simpler", "wealth-vs-income", "sip-for-retirement", "saving-first-1-lakh", "passive-investing-basics", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
  },

  "how-long-until-1-crore": {
    relatedCalculators: ["financial-freedom-calculator", "sip-calculator", "goal-based-investment-calculator"],
    relatedPosts: ["saving-first-1-lakh", "compounding-explained", "sip-for-retirement"],
  },

  // ─── Savings ────────────────────────────────────────────────────────────────
  "fd-calculator": {
    relatedCalculators: ["rd-calculator", "ppf-calculator", "epf-calculator"],
    relatedPosts: ["sip-vs-fd", "liquid-vs-non-liquid-assets", "emergency-fund-guide", "saving-first-1-lakh", "budget-rule-50-30-20"],
  },

  "rd-calculator": {
    relatedCalculators: ["fd-calculator", "ppf-calculator", "sip-calculator"],
    relatedPosts: ["saving-first-1-lakh", "budget-rule-50-30-20", "emergency-fund-guide", "buying-a-car-savings"],
  },

  "ppf-calculator": {
    relatedCalculators: ["epf-calculator", "nps-calculator", "fd-calculator"],
    relatedPosts: ["sip-vs-fd", "saving-first-1-lakh", "liquid-vs-non-liquid-assets"],
  },

  "epf-calculator": {
    relatedCalculators: ["ppf-calculator", "nps-calculator", "retirement-calculator"],
    relatedPosts: ["sip-for-retirement", "liquid-vs-non-liquid-assets"],
  },

  "nps-calculator": {
    relatedCalculators: ["epf-calculator", "ppf-calculator", "retirement-calculator", "fire-calculator"],
    relatedPosts: ["sip-for-retirement", "asset-allocation"],
  },

  // ─── Loans ──────────────────────────────────────────────────────────────────
  "emi-calculator": {
    relatedCalculators: ["loan-prepayment-calculator", "loan-comparison-calculator", "sip-calculator"],
    relatedPosts: ["emi-formula-explained", "debt-to-income-ratio", "reducing-emi", "home-loan-vs-personal-loan", "loan-affordability-guide", "understanding-loan-prepayments"],
  },

  "loan-prepayment-calculator": {
    relatedCalculators: ["emi-calculator", "loan-comparison-calculator"],
    relatedPosts: ["understanding-loan-prepayments", "reducing-emi", "emi-formula-explained", "debt-to-income-ratio"],
  },

  "loan-comparison-calculator": {
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator"],
    relatedPosts: ["home-loan-vs-personal-loan", "loan-affordability-guide", "debt-to-income-ratio"],
  },

  // ─── Tax ────────────────────────────────────────────────────────────────────
  "income-tax-calculator": {
    relatedCalculators: ["capital-gains-calculator", "epf-calculator", "ppf-calculator"],
    relatedPosts: ["income-tax-basics", "types-of-taxes", "what-is-taxation", "tax-policy-basics", "where-do-taxes-go"],
  },

  "capital-gains-calculator": {
    relatedCalculators: ["income-tax-calculator", "stock-return-calculator", "cagr-calculator"],
    relatedPosts: ["income-tax-basics", "types-of-taxes", "cagr-explained"],
  },

  // ─── Stock Market ────────────────────────────────────────────────────────────
  "stock-return-calculator": {
    relatedCalculators: ["cagr-calculator", "dividend-yield-calculator", "capital-gains-calculator", "position-size-calculator"],
    relatedPosts: ["cagr-explained", "understanding-market-volatility", "investing-psychology", "introduction-to-financial-markets"],
  },

  "dividend-yield-calculator": {
    relatedCalculators: ["stock-return-calculator", "portfolio-return-calculator"],
    relatedPosts: ["introduction-to-financial-markets", "investing-psychology", "passive-investing-basics"],
  },

  "position-size-calculator": {
    relatedCalculators: ["stock-return-calculator", "portfolio-return-calculator"],
    relatedPosts: ["understanding-market-volatility", "investing-psychology"],
  },

  // ─── Gold ────────────────────────────────────────────────────────────────────
  "gold-investment-calculator": {
    relatedCalculators: ["gold-sip-calculator", "silver-investment-calculator", "inflation-impact-calculator"],
    relatedPosts: ["gold-investment-guide", "sgb-vs-physical-gold", "asset-allocation", "liquid-vs-non-liquid-assets"],
  },

  "gold-sip-calculator": {
    relatedCalculators: ["gold-investment-calculator", "sip-calculator", "silver-investment-calculator"],
    relatedPosts: ["gold-investment-guide", "sgb-vs-physical-gold", "sip-for-retirement"],
  },

  "silver-investment-calculator": {
    relatedCalculators: ["gold-investment-calculator", "gold-sip-calculator", "inflation-impact-calculator"],
    relatedPosts: ["gold-investment-guide", "asset-allocation"],
  },

  // ─── Lifestyle ────────────────────────────────────────────────────────────────
  "inflation-impact-calculator": {
    relatedCalculators: ["goal-based-investment-calculator", "fire-calculator", "retirement-calculator"],
    relatedPosts: ["asset-allocation", "sip-for-retirement", "compounding-explained"],
  },

  "net-worth-calculator": {
    relatedCalculators: ["portfolio-return-calculator", "financial-freedom-calculator", "retirement-calculator"],
    relatedPosts: ["why-most-people-never-build-wealth", "wealth-vs-income", "asset-allocation", "liquid-vs-non-liquid-assets", "saving-first-1-lakh"],
  },

  // ─── Car/Home Loan (programmatic variants also use these) ────────────────────
  "car-loan-emi-calculator": {
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator", "rd-calculator"],
    relatedPosts: ["buying-a-car-savings", "emi-formula-explained", "debt-to-income-ratio", "reducing-emi"],
  },

  "home-loan-emi-calculator": {
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator", "loan-comparison-calculator"],
    relatedPosts: ["buying-a-house-financial-roadmap", "home-loan-vs-personal-loan", "emi-formula-explained", "understanding-loan-prepayments"],
  },

  "step-up-sip-calculator": {
    relatedCalculators: ["sip-calculator", "sip-comparison-calculator", "mutual-fund-return-calculator", "lumpsum-calculator"],
    relatedPosts: ["what-is-sip", "compounding-explained", "sip-mistakes", "sip-for-retirement", "beginner-investing-guide"],
  },

  "coast-fire-calculator": {
    relatedCalculators: ["fire-calculator", "retirement-calculator", "financial-freedom-calculator", "sip-calculator"],
    relatedPosts: ["sip-for-retirement", "compounding-explained", "saving-first-1-lakh", "asset-allocation"],
  },

  "personal-loan-emi-calculator": {
    relatedCalculators: ["emi-calculator", "loan-comparison-calculator", "loan-prepayment-calculator", "home-loan-emi-calculator"],
    relatedPosts: ["home-loan-vs-personal-loan", "loan-affordability-guide", "emi-formula-explained", "debt-to-income-ratio"],
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
    relatedPosts: ["small-financial-decisions-compound", "why-most-people-never-build-wealth", "saving-first-1-lakh", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
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
    relatedPosts: ["compounding-explained", "understanding-market-volatility", "investing-psychology"],
    relatedCalculators: ["cagr-calculator", "xirr-calculator", "portfolio-return-calculator"],
  },

  "emi-formula-explained": {
    relatedPosts: ["debt-to-income-ratio", "reducing-emi", "home-loan-vs-personal-loan", "understanding-loan-prepayments"],
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator"],
  },

  "buying-a-car-savings": {
    relatedPosts: ["saving-first-1-lakh", "budget-rule-50-30-20", "emi-formula-explained"],
    relatedCalculators: ["rd-calculator", "fd-calculator", "emi-calculator"],
  },

  "buying-a-house-financial-roadmap": {
    relatedPosts: ["home-loan-vs-personal-loan", "emi-formula-explained", "saving-first-1-lakh"],
    relatedCalculators: ["emi-calculator", "sip-calculator", "loan-prepayment-calculator"],
  },

  "what-is-taxation": {
    relatedPosts: ["types-of-taxes", "income-tax-basics", "tax-policy-basics", "where-do-taxes-go"],
    relatedCalculators: ["income-tax-calculator", "capital-gains-calculator"],
  },

  "types-of-taxes": {
    relatedPosts: ["what-is-taxation", "income-tax-basics", "tax-policy-basics", "where-do-taxes-go"],
    relatedCalculators: ["income-tax-calculator"],
  },

  "income-tax-basics": {
    relatedPosts: ["types-of-taxes", "what-is-taxation", "tax-policy-basics"],
    relatedCalculators: ["income-tax-calculator", "capital-gains-calculator"],
  },

  "budget-rule-50-30-20": {
    relatedPosts: ["saving-first-1-lakh", "emergency-fund-guide", "liquid-vs-non-liquid-assets", "buying-a-car-savings"],
    relatedCalculators: ["rd-calculator", "fd-calculator"],
  },

  "liquid-vs-non-liquid-assets": {
    relatedPosts: ["emergency-fund-guide", "budget-rule-50-30-20", "asset-allocation", "sip-vs-fd"],
    relatedCalculators: ["fd-calculator", "rd-calculator"],
  },

  "introduction-to-financial-markets": {
    relatedPosts: ["beginner-investing-guide", "what-is-sip", "passive-investing-basics", "cagr-explained"],
    relatedCalculators: ["sip-calculator", "stock-return-calculator"],
  },

  "what-is-index-fund": {
    relatedPosts: ["passive-investing-basics", "beginner-investing-guide", "what-is-sip", "sip-mistakes"],
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator", "cagr-calculator"],
  },

  "debt-to-income-ratio": {
    relatedPosts: ["emi-formula-explained", "loan-affordability-guide", "reducing-emi"],
    relatedCalculators: ["emi-calculator", "loan-comparison-calculator"],
  },

  "understanding-loan-prepayments": {
    relatedPosts: ["reducing-emi", "emi-formula-explained", "home-loan-vs-personal-loan"],
    relatedCalculators: ["loan-prepayment-calculator", "emi-calculator"],
  },

  "understanding-market-volatility": {
    relatedPosts: ["investing-psychology", "cagr-explained", "asset-allocation"],
    relatedCalculators: ["stock-return-calculator", "cagr-calculator"],
  },

  "asset-allocation": {
    relatedPosts: ["investing-psychology", "passive-investing-basics", "gold-investment-guide", "liquid-vs-non-liquid-assets"],
    relatedCalculators: ["portfolio-return-calculator", "net-worth-calculator", "gold-investment-calculator"],
  },

  "beginner-investing-guide": {
    relatedPosts: ["what-is-sip", "introduction-to-financial-markets", "compounding-explained", "what-is-index-fund"],
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator", "cagr-calculator"],
  },

  "emergency-fund-guide": {
    relatedPosts: ["budget-rule-50-30-20", "saving-first-1-lakh", "liquid-vs-non-liquid-assets"],
    relatedCalculators: ["fd-calculator", "rd-calculator"],
  },

  "gold-investment-guide": {
    relatedPosts: ["sgb-vs-physical-gold", "asset-allocation", "liquid-vs-non-liquid-assets"],
    relatedCalculators: ["gold-investment-calculator", "gold-sip-calculator", "silver-investment-calculator"],
  },

  "home-loan-vs-personal-loan": {
    relatedPosts: ["emi-formula-explained", "debt-to-income-ratio", "loan-affordability-guide", "understanding-loan-prepayments"],
    relatedCalculators: ["emi-calculator", "loan-comparison-calculator"],
  },

  "investing-psychology": {
    relatedPosts: ["understanding-market-volatility", "asset-allocation", "sip-mistakes", "beginner-investing-guide"],
    relatedCalculators: ["sip-calculator", "portfolio-return-calculator"],
  },

  "loan-affordability-guide": {
    relatedPosts: ["debt-to-income-ratio", "reducing-emi", "emi-formula-explained", "home-loan-vs-personal-loan"],
    relatedCalculators: ["emi-calculator", "loan-comparison-calculator"],
  },

  "passive-investing-basics": {
    relatedPosts: ["what-is-index-fund", "beginner-investing-guide", "asset-allocation", "sip-mistakes"],
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator"],
  },

  "reducing-emi": {
    relatedPosts: ["understanding-loan-prepayments", "debt-to-income-ratio", "emi-formula-explained", "loan-affordability-guide"],
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator"],
  },

  "saving-first-1-lakh": {
    relatedPosts: ["budget-rule-50-30-20", "emergency-fund-guide", "sip-for-students", "buying-a-car-savings"],
    relatedCalculators: ["rd-calculator", "fd-calculator", "sip-calculator"],
  },

  "sgb-vs-physical-gold": {
    relatedPosts: ["gold-investment-guide", "asset-allocation", "liquid-vs-non-liquid-assets"],
    relatedCalculators: ["gold-investment-calculator", "gold-sip-calculator"],
  },

  "sip-for-retirement": {
    relatedPosts: ["compounding-explained", "sip-mistakes", "asset-allocation", "sip-for-students"],
    relatedCalculators: ["retirement-calculator", "sip-calculator", "fire-calculator", "goal-based-investment-calculator"],
  },

  "sip-for-students": {
    relatedPosts: ["what-is-sip", "saving-first-1-lakh", "beginner-investing-guide", "sip-mistakes"],
    relatedCalculators: ["sip-calculator", "goal-based-investment-calculator"],
  },

  "sip-mistakes": {
    relatedPosts: ["what-is-sip", "sip-for-students", "investing-psychology", "compounding-explained"],
    relatedCalculators: ["sip-calculator", "sip-comparison-calculator"],
  },

  "sip-vs-fd": {
    relatedPosts: ["what-is-sip", "liquid-vs-non-liquid-assets", "sip-mistakes"],
    relatedCalculators: ["sip-calculator", "fd-calculator"],
  },

  "tax-policy-basics": {
    relatedPosts: ["what-is-taxation", "types-of-taxes", "where-do-taxes-go", "income-tax-basics"],
    relatedCalculators: ["income-tax-calculator"],
  },

  "where-do-taxes-go": {
    relatedPosts: ["what-is-taxation", "types-of-taxes", "tax-policy-basics"],
    relatedCalculators: ["income-tax-calculator"],
  },

  "why-most-people-never-build-wealth": {
    relatedPosts: ["small-financial-decisions-compound", "wealth-vs-income", "financial-freedom-is-simpler", "saving-first-1-lakh", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
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
    relatedCalculators: ["compound-interest-calculator", "savings-calculator", "sip-calculator"],
  },

  "financial-freedom-is-simpler": {
    relatedPosts: ["why-most-people-never-build-wealth", "power-of-starting-early", "wealth-vs-income", "sip-for-retirement", "most-people-think-about-growing-wealth-wrong-at-an-early-age"],
    relatedCalculators: ["financial-freedom-calculator", "fire-calculator", "retirement-calculator"],
  },

  "most-people-think-about-growing-wealth-wrong-at-an-early-age": {
    relatedPosts: ["why-most-people-never-build-wealth", "power-of-starting-early", "wealth-vs-income", "saving-first-1-lakh"],
    relatedCalculators: ["sip-calculator", "savings-calculator", "financial-freedom-calculator"],
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
  const explicit = (calculatorLinks[calculatorId]?.relatedCalculators ?? []).filter((id) => id !== calculatorId);
  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  const result = new Set<string>(explicit);
  const currentCalc = calcsList.find((c) => c.id === calculatorId);
  const currentCat = currentCalc?.category;
  const currentTokens = (currentCalc?.name ?? calculatorId).toLowerCase().split(/[- \s]+/);

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
  const explicit = (calculatorLinks[calculatorId]?.relatedPosts ?? []);
  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  const result = new Set<string>(explicit);
  const currentCalc = allCalculators.find((c) => c.id === calculatorId);
  const tokens = (currentCalc?.name ?? calculatorId).toLowerCase().split(/[- \s]+/);

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
  const tokens = `${currentPost?.title ?? ""} ${currentPost?.category ?? ""} ${currentPost?.tags.join(" ") ?? ""}`.toLowerCase().split(/[- \s]+/);

  const candidates = allCalculators
    .filter((c) => !result.has(c.id))
    .map((c) => {
      let score = computeScore(`${c.name} ${c.category} ${c.description ?? ""}`, tokens);
      return { id: c.id, score };
    })
    .sort((a, b) => b.score - a.score);

  for (const item of candidates) {
    if (result.size >= limit) break;
    result.add(item.id);
  }

  return Array.from(result).slice(0, limit);
}
