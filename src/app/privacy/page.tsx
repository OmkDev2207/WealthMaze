import * as React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - WealthMaze",
  description: "Read the WealthMaze privacy policy to understand how we protect user data and comply with Google AdSense requirements.",
};

export default function PrivacyPage() {
  const lastUpdated = "June 18, 2026";

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <header className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">Last Updated: {lastUpdated}</p>
      </header>

      <section className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        <p>
          At <strong>WealthMaze</strong> (accessible from wealthmaze.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by WealthMaze and how we use it.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">1. Log Files & Analytics</h2>
        <p>
          WealthMaze follows a standard procedure of using log files and uses third-party analytics services like <strong>Google Analytics</strong>. These services log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">2. Cookies and Web Beacons</h2>
        <p>
          Like any other website, WealthMaze uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">3. Google DoubleClick DART Cookie</h2>
        <p>
          Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to wealthmaze.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">https://policies.google.com/technologies/ads</a>.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">4. Our Advertising Partners</h2>
        <p>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google AdSense</strong></li>
        </ul>
        <p>
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on WealthMaze, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">5. Third Party Privacy Policies</h2>
        <p>
          WealthMaze's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">6. Children's Information</h2>
        <p>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. WealthMaze does not knowingly collect any Personal Identifiable Information from children under the age of 13.
        </p>
      </section>
    </article>
  );
}
