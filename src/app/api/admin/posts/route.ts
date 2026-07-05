import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const REPO_OWNER = process.env.GITHUB_REPO_OWNER!;
const REPO_NAME = process.env.GITHUB_REPO_NAME!;
const BRANCH = process.env.GITHUB_BRANCH || "main";

function getOctokit() {
  return new Octokit({ auth: process.env.GITHUB_PAT });
}

// GET: list all blog posts (slugs + titles) from posts.ts
export async function GET() {
  try {
    const octokit = getOctokit();
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: "src/data/blog/posts.ts",
      ref: BRANCH,
    });

    if (Array.isArray(data) || data.type !== "file") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }

    const content = Buffer.from(data.content, "base64").toString("utf-8");

    // Extract slug + title pairs via regex
    const entries: { slug: string; title: string; category: string; publishedAt: string }[] = [];
    const slugRegex = /slug:\s*"([^"]+)"/g;
    const titleRegex = /title:\s*"([^"]+)"/g;
    const catRegex = /category:\s*"([^"]+)"/g;
    const dateRegex = /publishedAt:\s*"([^"]+)"/g;

    const slugs = [...content.matchAll(slugRegex)].map((m) => m[1]);
    const titles = [...content.matchAll(titleRegex)].map((m) => m[1]);
    const cats = [...content.matchAll(catRegex)].map((m) => m[1]);
    const dates = [...content.matchAll(dateRegex)].map((m) => m[1]);

    for (let i = 0; i < slugs.length; i++) {
      entries.push({
        slug: slugs[i],
        title: titles[i] || "",
        category: cats[i] || "",
        publishedAt: dates[i] || "",
      });
    }

    return NextResponse.json({ posts: entries });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
