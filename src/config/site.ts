// Site Configuration
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "https://wealthmaze.com";

export const siteConfig = {
  url: siteUrl,
  domain: siteUrl.replace(/^https?:\/\//, ""),
  email: "support@wealthmaze.com",
  keywords: [
    "WealthMaze",
    "wealthmaze",
    "wealthwise",
    "wealth wise",
    "wealwise",
    "weal wise",
    "wealth maze",
    "wealth-maze",
    "wealmaze",
    "weal maze",
    "SIP calculator",
    "lumpsum calculator",
    "EMI calculator",
    "mutual fund returns",
    "financial calculators",
    "investment tools",
    "retirement planner",
    "FIRE calculator",
    "net worth calculator",
  ],
};
