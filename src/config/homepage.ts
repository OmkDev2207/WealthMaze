export interface CredibilityCard {
  title: string;
  description: string;
  iconName: string;
}

export const homepageConfig = {
  trustBadge: {
    text: "100% Free • No Signup Required • No Credit Card • Privacy First",
  },
  credibility: {
    title: "Why Savers & Investors Choose WealthMaze",
    subtitle: "Simple, accurate, and completely private financial planning tools built to help you grow your net worth.",
    cards: [
      {
        title: "100% Free Forever",
        description: "No subscription plans, no paywalls, and no hidden costs. Access all calculators completely free.",
        iconName: "Sparkles",
      },
      {
        title: "No Signup Required",
        description: "Start calculating immediately. We never ask for your email, phone number, or login credentials.",
        iconName: "UserCheck",
      },
      {
        title: "Privacy First",
        description: "Your financial data stays yours. Most calculations run locally in your browser and never touch a server.",
        iconName: "ShieldCheck",
      },
      {
        title: "Fast & Mobile Optimized",
        description: "Fully responsive layouts designed for speed and comfort on any smartphone, tablet, or desktop.",
        iconName: "Zap",
      },
      {
        title: "Educational Resources",
        description: "Practical guides and step-by-step walkthroughs to help you master mutual funds, taxes, and loan prepayments.",
        iconName: "BookOpen",
      },
      {
        title: "Built for Long-Term Wealth",
        description: "Designed to help you plan systematic investments (SIPs), manage debt (EMIs), track net worth, and reach early retirement.",
        iconName: "TrendingUp",
      },
    ] as CredibilityCard[],
  },
};
