import * as React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact WealthMaze - Support, Feedback & Advertiser Relations",
  description: "Contact the WealthMaze team for feedback, bug reports, or calculator suggestions. We are happy to hear from our community of investors and savers.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact WealthMaze - Get in Touch",
    description: "Have feedback on our calculators or spotted an issue? Contact the WealthMaze team. We value input from our financial planning community.",
    url: `${siteConfig.url}/contact`,
    type: "website",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact WealthMaze - Get in Touch",
    description: "Have feedback or suggestions? Contact the WealthMaze team.",
  },
};

const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
    { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": `${siteConfig.url}/contact` },
  ],
});

export default function ContactPage() {
  return (
    <>
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Contact Us</h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-2 font-medium">We would love to hear from you</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">Get in Touch</h2>
          <p>
            Have feedback on our calculations? Spotted a bug? Or want to suggest a new financial calculator? We value feedback from our community.
          </p>
          <div className="space-y-2 pt-2 text-zinc-700 dark:text-zinc-300 font-medium">
            <p>
              <strong>Email:</strong> support@wealthmaze.com
            </p>
            <p>
              <strong>Business Hours:</strong> Monday – Friday, 9:00 AM – 6:00 PM (IST)
            </p>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/30 rounded-xl text-xs text-yellow-800 dark:text-yellow-400">
            <strong>Important Note:</strong> We do not provide personalized investment advice, wealth management consultation, or direct stock recommendations. Emails requesting specific mutual fund selections or portfolio management will not be answered.
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 p-6 rounded-2xl shadow-sm dark:shadow-none space-y-4">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Send a Message</h3>
          <div className="space-y-1">
            <label htmlFor="contact-name" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Full Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              className="w-full h-10 px-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-email" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              required
              className="w-full h-10 px-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-msg" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Message
            </label>
            <textarea
              id="contact-msg"
              rows={4}
              required
              className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            Send Message
          </button>
        </form>
      </section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
    </>
  );
}
