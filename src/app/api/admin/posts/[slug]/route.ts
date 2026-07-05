import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const REPO_OWNER = process.env.GITHUB_REPO_OWNER!;
const REPO_NAME = process.env.GITHUB_REPO_NAME!;
const BRANCH = process.env.GITHUB_BRANCH || "main";

function getOctokit() {
  return new Octokit({ auth: process.env.GITHUB_PAT });
}

// GET: fetch raw markdown content for a specific post
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const octokit = getOctokit();
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `src/content/blog/${slug}.md`,
      ref: BRANCH,
    });

    if (Array.isArray(data) || data.type !== "file") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }

    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return NextResponse.json({ content, sha: data.sha });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE: remove a post's markdown file
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const octokit = getOctokit();
    const mdPath = `src/content/blog/${slug}.md`;

    // Get the file SHA first
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: mdPath,
      ref: BRANCH,
    });

    if (Array.isArray(data) || data.type !== "file") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }

    await octokit.repos.deleteFile({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: mdPath,
      message: `Remove article: ${slug}`,
      sha: data.sha,
      branch: BRANCH,
    });

    return NextResponse.json({ success: true, message: `Deleted ${slug}.` });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
