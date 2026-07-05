import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import { cleanMarkdown } from "@/lib/adminParser";

const REPO_OWNER = process.env.GITHUB_REPO_OWNER!;
const REPO_NAME = process.env.GITHUB_REPO_NAME!;
const BRANCH = process.env.GITHUB_BRANCH || "main";

function getOctokit() {
  if (!process.env.GITHUB_PAT) {
    throw new Error("GITHUB_PAT environment variable is not set.");
  }
  return new Octokit({ auth: process.env.GITHUB_PAT });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      title,
      metaDescription,
      category,
      tags,
      readTime,
      relatedCalculators,
      publishedAt,
      markdownContent,
      isUpdate = false,
    } = body;

    if (!slug || !title || !markdownContent) {
      return NextResponse.json(
        { error: "slug, title, and markdownContent are required." },
        { status: 400 }
      );
    }

    const octokit = getOctokit();
    const cleanedContent = cleanMarkdown(markdownContent);
    const mdPath = `src/content/blog/${slug}.md`;

    // ── Step 1: Commit the markdown file ───────────────────────────────────────
    let existingFileSha: string | undefined;
    try {
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: mdPath,
        ref: BRANCH,
      });
      if (!Array.isArray(data)) {
        existingFileSha = data.sha;
      }
    } catch {
      // File doesn't exist yet — that's fine for new articles
    }

    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: mdPath,
      message: `${isUpdate ? "Update" : "Publish"} article: ${title}`,
      content: Buffer.from(cleanedContent, "utf-8").toString("base64"),
      sha: existingFileSha,
      branch: BRANCH,
    });

    // ── Step 2: Update posts.ts ────────────────────────────────────────────────
    if (!isUpdate || existingFileSha === undefined) {
      // Only add metadata entry for new articles (updates keep existing entry)
      const { data: postsFileData } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: "src/data/blog/posts.ts",
        ref: BRANCH,
      });

      if (Array.isArray(postsFileData) || postsFileData.type !== "file") throw new Error("posts.ts is not a file?");

      const currentContent = Buffer.from(postsFileData.content, "base64").toString("utf-8");
      const newPostEntry = buildPostEntry({
        slug,
        title,
        metaDescription,
        category,
        tags,
        readTime,
        relatedCalculators,
        publishedAt,
      });

      // Insert before the closing ]; of the blogPosts array
      const updatedContent = currentContent.replace(
        /(\];\s*\nexport const getPostBySlug)/,
        `${newPostEntry}\n];\nexport const getPostBySlug`
      );

      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: "src/data/blog/posts.ts",
        message: `Add blog metadata: ${slug}`,
        content: Buffer.from(updatedContent, "utf-8").toString("base64"),
        sha: postsFileData.sha,
        branch: BRANCH,
      });
    }

    // ── Step 3: Append to publish log ─────────────────────────────────────────
    await appendPublishLog(octokit, {
      slug,
      title,
      action: isUpdate ? "Updated" : "Published",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Article "${title}" ${isUpdate ? "updated" : "published"} successfully. Live in ~45 seconds.`,
      url: `/blog/${slug}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Admin Publish Error]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildPostEntry(meta: {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  tags: string[];
  readTime: string;
  relatedCalculators: string[];
  publishedAt: string;
}): string {
  const tagsJson = JSON.stringify(meta.tags);
  const calcsJson = JSON.stringify(meta.relatedCalculators);
  return `  {
    slug: "${meta.slug}",
    title: "${meta.title.replace(/"/g, '\\"')}",
    description: "${meta.metaDescription.replace(/"/g, '\\"')}",
    publishedAt: "${meta.publishedAt}",
    readTime: "${meta.readTime}",
    category: "${meta.category}",
    tags: ${tagsJson},
    author: authors.omk,
    relatedCalculators: ${calcsJson},
  },`;
}

async function appendPublishLog(
  octokit: Octokit,
  entry: { slug: string; title: string; action: string; timestamp: string }
) {
  const logPath = "src/data/admin/publishLog.json";
  let existingSha: string | undefined;
  let existingLog: typeof entry[] = [];

  try {
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: logPath,
      ref: BRANCH,
    });
    if (!Array.isArray(data) && data.type === "file") {
      existingSha = data.sha;
      existingLog = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8"));
    }
  } catch {
    // Log doesn't exist yet
  }

  const updatedLog = [entry, ...existingLog].slice(0, 200); // Keep last 200 entries

  await octokit.repos.createOrUpdateFileContents({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: logPath,
    message: `Admin log: ${entry.action} "${entry.slug}"`,
    content: Buffer.from(JSON.stringify(updatedLog, null, 2), "utf-8").toString("base64"),
    sha: existingSha,
    branch: BRANCH,
  });
}
