"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Eye,
  Edit3,
  Upload,
  Send,
  LogOut,
  BookOpen,
  History,
  Plus,
  Search,
  Trash2,
  RefreshCw,
  Download,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Copy,
  ExternalLink,
  Loader2,
  Shield,
} from "lucide-react";
import {
  cleanMarkdown,
  generateSlug,
  calculateReadTime,
  parseLLMJsonBlock,
  seoHealthCheck,
  type ArticleMetadata,
  type SEOHealthResult,
} from "@/lib/adminParser";

// ─── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Investing", "Personal Finance", "Wealth Building", "Savings",
  "Tax", "Loans", "Stock Market", "Gold", "Retirement Planning", "Financial Independence",
];

const ALL_CALCULATORS = [
  { id: "sip-calculator", name: "SIP Calculator" },
  { id: "lumpsum-calculator", name: "Lumpsum Calculator" },
  { id: "step-up-sip-calculator", name: "Step-Up SIP Calculator" },
  { id: "sip-goal-planner", name: "SIP Goal Planner" },
  { id: "sip-comparison-calculator", name: "SIP Comparison" },
  { id: "mutual-fund-return-calculator", name: "Mutual Fund Return" },
  { id: "cagr-calculator", name: "CAGR Calculator" },
  { id: "compound-interest-calculator", name: "Compound Interest" },
  { id: "investment-growth-calculator", name: "Investment Growth" },
  { id: "net-worth-calculator", name: "Net Worth Calculator" },
  { id: "savings-calculator", name: "Savings Calculator" },
  { id: "emergency-fund-calculator", name: "Emergency Fund" },
  { id: "financial-freedom-calculator", name: "Financial Freedom" },
  { id: "fire-calculator", name: "FIRE Calculator" },
  { id: "retirement-calculator", name: "Retirement Calculator" },
  { id: "income-tax-calculator", name: "Income Tax" },
  { id: "capital-gains-calculator", name: "Capital Gains" },
  { id: "emi-calculator", name: "EMI Calculator" },
  { id: "home-loan-emi-calculator", name: "Home Loan EMI" },
  { id: "car-loan-emi-calculator", name: "Car Loan EMI" },
  { id: "loan-prepayment-calculator", name: "Loan Prepayment" },
  { id: "loan-comparison-calculator", name: "Loan Comparison" },
  { id: "fd-calculator", name: "FD Calculator" },
  { id: "rd-calculator", name: "RD Calculator" },
  { id: "xirr-calculator", name: "XIRR Calculator" },
  { id: "stock-return-calculator", name: "Stock Return" },
  { id: "portfolio-return-calculator", name: "Portfolio Return" },
  { id: "gold-investment-calculator", name: "Gold Investment" },
  { id: "gold-sip-calculator", name: "Gold SIP" },
  { id: "digital-gold-calculator", name: "Digital Gold" },
  { id: "inflation-impact-calculator", name: "Inflation Impact" },
];

const DRAFT_KEY = "wm_admin_draft";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Tab = "new" | "manager" | "history";
type ViewMode = "edit" | "preview";

interface PostEntry {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
}

interface LogEntry {
  slug: string;
  title: string;
  action: string;
  timestamp: string;
}

// ─── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        onSuccess();
      } else {
        setError(data.error || "Login failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Shield className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Studio</h1>
          <p className="text-zinc-500 text-sm mt-1">WealthMaze Private</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoFocus
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
          />
          {error && (
            <p className="text-red-400 text-xs flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 shrink-0" /> {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enter Studio"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── SEO Health Bar ────────────────────────────────────────────────────────────

function SEOHealthBar({ result }: { result: SEOHealthResult | null }) {
  if (!result) return null;
  const color = result.score >= 80 ? "emerald" : result.score >= 50 ? "yellow" : "red";
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">SEO Health</span>
        <span className={`text-sm font-bold text-${color}-400`}>{result.score}/100</span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full bg-${color}-500 transition-all duration-500`}
          style={{ width: `${result.score}%` }}
        />
      </div>
      <div className="space-y-1">
        {result.warnings.map((w, i) => (
          <p key={i} className="text-xs text-yellow-400 flex items-start gap-1.5">
            <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" /> {w}
          </p>
        ))}
        {result.passes.map((p, i) => (
          <p key={i} className="text-xs text-emerald-400 flex items-start gap-1.5">
            <CheckCircle className="w-3 h-3 mt-0.5 shrink-0" /> {p}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── Main Admin Panel ──────────────────────────────────────────────────────────

function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("new");
  const [viewMode, setViewMode] = useState<ViewMode>("edit");

  // Article form state
  const [rawContent, setRawContent] = useState("");
  const [cleanedContent, setCleanedContent] = useState("");
  const [meta, setMeta] = useState<Partial<ArticleMetadata>>({
    title: "",
    slug: "",
    metaDescription: "",
    category: "Personal Finance",
    tags: [],
    readTime: "",
    relatedCalculators: [],
    publishedAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  });
  const [tagsInput, setTagsInput] = useState("");
  const [seoResult, setSeoResult] = useState<SEOHealthResult | null>(null);
  const [slugConflict, setSlugConflict] = useState(false);
  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);

  // Publish state
  const [publishStatus, setPublishStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [publishMessage, setPublishMessage] = useState("");

  // Manager state
  const [posts, setPosts] = useState<PostEntry[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [managerSearch, setManagerSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // History state
  const [historyLog, setHistoryLog] = useState<LogEntry[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Auto-save draft ───────────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const { rawContent: rc, meta: m, tagsInput: ti } = JSON.parse(saved);
        if (rc) setRawContent(rc);
        if (m) setMeta(m);
        if (ti) setTagsInput(ti);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (rawContent || meta.title) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ rawContent, meta, tagsInput }));
    }
  }, [rawContent, meta, tagsInput]);

  // ── Load existing slugs for conflict detection ─────────────────────────────
  useEffect(() => {
    fetch("/api/admin/posts")
      .then((r) => r.json())
      .then((d) => {
        if (d.posts) setExistingSlugs(d.posts.map((p: PostEntry) => p.slug));
      })
      .catch(() => {});
  }, []);

  // ── Slug conflict check ────────────────────────────────────────────────────
  useEffect(() => {
    if (meta.slug) {
      setSlugConflict(existingSlugs.includes(meta.slug));
    }
  }, [meta.slug, existingSlugs]);

  // ── Auto-update slug from title ────────────────────────────────────────────
  const handleTitleChange = (title: string) => {
    setMeta((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  // ── Process pasted/uploaded content ───────────────────────────────────────
  const processContent = useCallback((raw: string) => {
    const jsonMeta = parseLLMJsonBlock(raw);
    const cleaned = cleanMarkdown(raw);
    const readTime = calculateReadTime(cleaned);

    setCleanedContent(cleaned);
    setMeta((prev) => ({
      ...prev,
      ...(jsonMeta || {}),
      readTime: jsonMeta?.readTime || readTime,
      publishedAt: prev.publishedAt,
    }));

    if (jsonMeta?.tags) setTagsInput(jsonMeta.tags.join(", "));

    const health = seoHealthCheck(cleaned, {
      ...(jsonMeta || {}),
      metaDescription: jsonMeta?.metaDescription || meta.metaDescription,
    });
    setSeoResult(health);
  }, [meta.metaDescription]);

  const handleManualClean = () => {
    processContent(rawContent);
    setViewMode("preview");
  };

  // ── File upload ────────────────────────────────────────────────────────────
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setRawContent(text);
      processContent(text);
    };
    reader.readAsText(file);
  };

  // ── Tags helper ────────────────────────────────────────────────────────────
  const parsedTags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // ── Toggle calculator ──────────────────────────────────────────────────────
  const toggleCalculator = (id: string) => {
    setMeta((prev) => ({
      ...prev,
      relatedCalculators: prev.relatedCalculators?.includes(id)
        ? prev.relatedCalculators.filter((c) => c !== id)
        : [...(prev.relatedCalculators || []), id],
    }));
  };

  // ── Re-run SEO check when meta changes ────────────────────────────────────
  useEffect(() => {
    if (cleanedContent) {
      setSeoResult(seoHealthCheck(cleanedContent, { ...meta, tags: parsedTags }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.metaDescription, meta.slug, meta.relatedCalculators, cleanedContent]);

  // ── Publish ────────────────────────────────────────────────────────────────
  async function handlePublish() {
    if (!meta.title || !meta.slug || !cleanedContent) {
      setPublishMessage("Title, slug, and article content are required.");
      setPublishStatus("error");
      return;
    }

    setPublishStatus("loading");
    setPublishMessage("Committing to GitHub...");

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: meta.slug,
          title: meta.title,
          metaDescription: meta.metaDescription,
          category: meta.category,
          tags: parsedTags,
          readTime: meta.readTime,
          relatedCalculators: meta.relatedCalculators,
          publishedAt: meta.publishedAt,
          markdownContent: cleanedContent,
          isUpdate: slugConflict,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPublishStatus("success");
        setPublishMessage(data.message);
        localStorage.removeItem(DRAFT_KEY);
        // Refresh slug list
        setExistingSlugs((prev) => [...prev, meta.slug!]);
      } else {
        setPublishStatus("error");
        setPublishMessage(data.error || "Publish failed.");
      }
    } catch (err) {
      setPublishStatus("error");
      setPublishMessage("Network error. Check connection.");
    }
  }

  // ── Load posts for manager ─────────────────────────────────────────────────
  async function loadPosts() {
    setPostsLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch {}
    setPostsLoading(false);
  }

  // ── Load history ───────────────────────────────────────────────────────────
  async function loadHistory() {
    // History is fetched from the published log in the repo
    // For simplicity, we use the posts API which reads from GitHub
    setHistoryLog([]); // reset; real implementation reads publishLog.json
  }

  useEffect(() => {
    if (activeTab === "manager") loadPosts();
    if (activeTab === "history") loadHistory();
  }, [activeTab]);

  async function handleDelete(slug: string) {
    try {
      await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      setDeleteConfirm(null);
    } catch {}
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(managerSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(managerSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(managerSearch.toLowerCase())
  );

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="font-bold text-sm text-white">WM Admin Studio</span>
            <span className="text-zinc-600 text-xs hidden sm:block">· Private</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/admin/WEALTHMAZE_ARTICLE_SCHEMA.md"
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> LLM Schema
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 pt-2">
          {([
            { id: "new", label: "New Article", icon: Plus },
            { id: "manager", label: "Article Manager", icon: BookOpen },
            { id: "history", label: "Publish History", icon: History },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                activeTab === id
                  ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:block">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* ── TAB: NEW ARTICLE ──────────────────────────────────────────────── */}
        {activeTab === "new" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Content Input + Metadata */}
            <div className="space-y-5">
              {/* Step 1: Content */}
              <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-sm text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                    Paste Article Content
                  </h2>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white text-xs transition-colors"
                  >
                    <Upload className="w-3 h-3" /> Upload .md
                  </button>
                  <input ref={fileInputRef} type="file" accept=".md,.txt" onChange={handleFileUpload} className="hidden" />
                </div>
                <textarea
                  value={rawContent}
                  onChange={(e) => setRawContent(e.target.value)}
                  placeholder="Paste your LLM-generated article here (with JSON block at end)..."
                  className="w-full h-48 bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 resize-none font-mono leading-relaxed transition-colors"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleManualClean}
                    disabled={!rawContent}
                    className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" /> Clean & Preview
                  </button>
                  <button
                    onClick={() => { setRawContent(""); setCleanedContent(""); setSeoResult(null); localStorage.removeItem(DRAFT_KEY); }}
                    className="px-3 py-2 border border-zinc-700 text-zinc-500 hover:text-zinc-300 rounded-xl text-xs transition-colors"
                    title="Clear draft"
                  >
                    Clear
                  </button>
                </div>
                {rawContent && (
                  <p className="text-xs text-zinc-600">
                    💾 Draft auto-saved locally.
                    {cleanedContent && ` · ${cleanedContent.split(/\s+/).filter(Boolean).length} words · ${calculateReadTime(cleanedContent)}`}
                  </p>
                )}
              </section>

              {/* Step 2: Metadata Form */}
              <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
                <h2 className="font-semibold text-sm text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Article Metadata
                </h2>

                {/* Title */}
                <div>
                  <label className="text-xs text-zinc-400 font-medium mb-1.5 block">Title *</label>
                  <input
                    value={meta.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Full article title"
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="text-xs text-zinc-400 font-medium mb-1.5 flex items-center justify-between">
                    <span>Slug *</span>
                    {meta.slug && (
                      <span className={`flex items-center gap-1 text-xs font-medium ${slugConflict ? "text-yellow-400" : "text-emerald-400"}`}>
                        {slugConflict ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                        {slugConflict ? "Exists — will UPDATE" : "Available"}
                      </span>
                    )}
                  </label>
                  <input
                    value={meta.slug}
                    onChange={(e) => setMeta((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                    placeholder="url-friendly-slug"
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <label className="text-xs text-zinc-400 font-medium mb-1.5 flex items-center justify-between">
                    <span>Meta Description</span>
                    <span className={`text-xs ${(meta.metaDescription?.length || 0) > 160 ? "text-red-400" : (meta.metaDescription?.length || 0) >= 140 ? "text-emerald-400" : "text-zinc-500"}`}>
                      {meta.metaDescription?.length || 0}/160
                    </span>
                  </label>
                  <textarea
                    value={meta.metaDescription}
                    onChange={(e) => setMeta((p) => ({ ...p, metaDescription: e.target.value }))}
                    placeholder="SEO meta description (140-160 chars)"
                    rows={3}
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 resize-none transition-colors"
                  />
                </div>

                {/* Row: Category + Read Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-zinc-400 font-medium mb-1.5 block">Category</label>
                    <select
                      value={meta.category}
                      onChange={(e) => setMeta((p) => ({ ...p, category: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 font-medium mb-1.5 block">Read Time</label>
                    <input
                      value={meta.readTime}
                      onChange={(e) => setMeta((p) => ({ ...p, readTime: e.target.value }))}
                      placeholder="e.g. 8 min read"
                      className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-xs text-zinc-400 font-medium mb-1.5 block">Tags (comma-separated)</label>
                  <input
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Personal Finance, Savings, Compounding"
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {parsedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {parsedTags.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-300">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Published Date */}
                <div>
                  <label className="text-xs text-zinc-400 font-medium mb-1.5 block">Published Date</label>
                  <input
                    value={meta.publishedAt}
                    onChange={(e) => setMeta((p) => ({ ...p, publishedAt: e.target.value }))}
                    placeholder="July 5, 2026"
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Related Calculators */}
                <div>
                  <label className="text-xs text-zinc-400 font-medium mb-2 block">
                    Related Calculators ({meta.relatedCalculators?.length || 0} selected)
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {ALL_CALCULATORS.map(({ id, name }) => {
                      const selected = meta.relatedCalculators?.includes(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleCalculator(id)}
                          className={`text-left px-2.5 py-2 rounded-lg border text-xs transition-colors ${
                            selected
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600"
                          }`}
                        >
                          {selected && <span className="mr-1">✓</span>}
                          {name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* SEO Health */}
              <SEOHealthBar result={seoResult} />

              {/* Step 4: Publish */}
              <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                <h2 className="font-semibold text-sm text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">4</span>
                  {slugConflict ? "Update Article" : "Publish Article"}
                </h2>

                {publishStatus === "success" && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Published!</p>
                      <p className="text-emerald-500/80">{publishMessage}</p>
                      <a href={`/blog/${meta.slug}`} target="_blank" rel="noopener" className="underline mt-1 inline-flex items-center gap-1">
                        View article <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {publishStatus === "error" && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{publishMessage}</p>
                  </div>
                )}

                <button
                  onClick={handlePublish}
                  disabled={publishStatus === "loading" || !meta.title || !meta.slug || !cleanedContent}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {publishStatus === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> {publishMessage}</>
                  ) : (
                    <><Send className="w-4 h-4" /> {slugConflict ? "Update on GitHub" : "Publish to WealthMaze"}</>
                  )}
                </button>
                <p className="text-xs text-zinc-600 text-center">
                  Commits to GitHub → Vercel rebuilds → Live in ~45 seconds
                </p>
              </section>
            </div>

            {/* Right Column: Live Preview */}
            <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
                  <h2 className="font-semibold text-sm text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                    Preview
                  </h2>
                  <div className="flex bg-zinc-900 border border-zinc-700 rounded-lg p-0.5">
                    <button
                      onClick={() => setViewMode("edit")}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${viewMode === "edit" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                      <Edit3 className="w-3 h-3 inline mr-1" />Source
                    </button>
                    <button
                      onClick={() => setViewMode("preview")}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${viewMode === "preview" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                      <Eye className="w-3 h-3 inline mr-1" />Rendered
                    </button>
                  </div>
                </div>

                {viewMode === "edit" ? (
                  <textarea
                    value={cleanedContent}
                    onChange={(e) => {
                      setCleanedContent(e.target.value);
                      setSeoResult(seoHealthCheck(e.target.value, { ...meta, tags: parsedTags }));
                    }}
                    placeholder="Cleaned article markdown will appear here after clicking 'Clean & Preview'..."
                    className="w-full h-[600px] bg-zinc-950 p-4 text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none resize-none font-mono leading-relaxed"
                  />
                ) : (
                  <div className="h-[600px] overflow-y-auto p-5">
                    {cleanedContent ? (
                      <article className="prose prose-sm prose-invert max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-strong:text-white prose-a:text-emerald-400">
                        <h1 className="text-xl font-bold text-white mb-1">{meta.title || "Untitled Article"}</h1>
                        <p className="text-xs text-zinc-500 mb-6">{meta.category} · {meta.readTime} · {meta.publishedAt}</p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: cleanedContent
                              .replace(/^### (.+)$/gm, "<h3>$1</h3>")
                              .replace(/^## (.+)$/gm, "<h2>$1</h2>")
                              .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                              .replace(/\*(.+?)\*/g, "<em>$1</em>")
                              .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
                              .replace(/\n\n/g, "</p><p>")
                              .replace(/^/, "<p>")
                              .replace(/$/, "</p>"),
                          }}
                        />
                      </article>
                    ) : (
                      <div className="h-full flex items-center justify-center text-zinc-700 text-sm">
                        Paste content and click "Clean & Preview" to see rendered output
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: ARTICLE MANAGER ─────────────────────────────────────────── */}
        {activeTab === "manager" && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  value={managerSearch}
                  onChange={(e) => setManagerSearch(e.target.value)}
                  placeholder="Search articles by title, slug, or category..."
                  className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <button
                onClick={loadPosts}
                disabled={postsLoading}
                className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${postsLoading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {postsLoading ? (
              <div className="flex items-center justify-center py-20 text-zinc-600">
                <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading articles...
              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-800 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/60">
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium text-xs uppercase">Article</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium text-xs uppercase hidden sm:table-cell">Category</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium text-xs uppercase hidden md:table-cell">Published</th>
                      <th className="text-right px-4 py-3 text-zinc-500 font-medium text-xs uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post, i) => (
                      <tr key={post.slug} className={`border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors ${i === filteredPosts.length - 1 ? "border-b-0" : ""}`}>
                        <td className="px-4 py-3">
                          <p className="font-medium text-zinc-200 text-sm line-clamp-1">{post.title}</p>
                          <p className="text-zinc-600 text-xs font-mono mt-0.5">{post.slug}</p>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-400">{post.category}</span>
                        </td>
                        <td className="px-4 py-3 text-zinc-500 text-xs hidden md:table-cell">{post.publishedAt}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener"
                              className="p-1.5 text-zinc-500 hover:text-emerald-400 transition-colors"
                              title="View live"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(post.slug);
                              }}
                              className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                              title="Copy slug"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            {deleteConfirm === post.slug ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(post.slug)}
                                  className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg"
                                >
                                  Confirm Delete
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(post.slug)}
                                className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                                title="Delete article"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredPosts.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-12 text-zinc-600 text-sm">
                          {managerSearch ? "No articles match your search." : "No articles loaded."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <p className="text-xs text-zinc-600">{filteredPosts.length} of {posts.length} articles</p>
          </div>
        )}

        {/* ── TAB: PUBLISH HISTORY ─────────────────────────────────────────── */}
        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-800 overflow-hidden">
              {historyLog.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/60">
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium text-xs uppercase">Article</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium text-xs uppercase hidden sm:table-cell">Action</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium text-xs uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyLog.map((entry, i) => (
                      <tr key={i} className="border-b border-zinc-900 last:border-b-0">
                        <td className="px-4 py-3">
                          <p className="font-medium text-zinc-200 text-sm">{entry.title}</p>
                          <p className="text-zinc-600 text-xs font-mono">{entry.slug}</p>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${entry.action === "Published" ? "bg-emerald-500/10 text-emerald-400" : entry.action === "Updated" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`}>
                            {entry.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-zinc-500 text-xs">
                          {new Date(entry.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-16 flex flex-col items-center justify-center text-zinc-600 space-y-2">
                  <History className="w-8 h-8 opacity-40" />
                  <p className="text-sm">No publish history yet.</p>
                  <p className="text-xs">History is logged to GitHub after each publish action.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Root Page Component ───────────────────────────────────────────────────────

export default function AdminStudioPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if session cookie is present by calling a lightweight API
    fetch("/api/admin/posts")
      .then((r) => {
        if (r.ok || r.status !== 401) {
          setAuthenticated(true);
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-zinc-600 animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onSuccess={() => setAuthenticated(true)} />;
  }

  return <AdminPanel />;
}
