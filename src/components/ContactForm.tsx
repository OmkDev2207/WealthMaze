"use client";

import * as React from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && msg) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-6 rounded-2xl text-center space-y-3">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">Message Sent!</h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Thank you for reaching out. Om K. or a member of the WealthMaze team will review your message and get back to you at <strong>{email}</strong> within 24–48 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 p-6 rounded-2xl shadow-sm dark:shadow-none space-y-4">
      <h3 className="text-base font-bold text-zinc-900 dark:text-white">Send a Message</h3>
      <div className="space-y-1">
        <label htmlFor="contact-name" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          Full Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
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
  );
}
