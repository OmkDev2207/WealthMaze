const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Usage: node scripts/publish-article.js <path-to-txt-file>
const filePath = process.argv[2];

if (!filePath) {
  console.error("Error: Please provide the path to your article text file.");
  console.log("Usage: npm run publish -- path/to/draft.txt");
  process.exit(1);
}

try {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found at ${absolutePath}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(absolutePath, "utf8");

  // Parse frontmatter
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    console.error("Error: Missing frontmatter section at the top of the file.");
    console.log("Format your draft file like this:\n");
    console.log("---");
    console.log("title: My Article Title");
    console.log("description: A short description of the article.");
    console.log("category: Investing");
    console.log("tags: SIP, Investing, Beginners");
    console.log("calculators: sip-calculator, mutual-fund-return-calculator");
    console.log("---");
    console.log("Markdown content of your article goes here...");
    process.exit(1);
  }

  const [, frontmatterRaw, markdownBody] = match;

  // Parse frontmatter lines
  const metadata = {};
  frontmatterRaw.split("\n").forEach((line) => {
    const parts = line.split(":");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(":").trim();
      metadata[key] = val;
    }
  });

  const { title, description, category, tags, calculators } = metadata;

  if (!title || !description || !category) {
    console.error("Error: Frontmatter must contain 'title', 'description', and 'category'.");
    process.exit(1);
  }

  // Generate slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  // Estimate read time (assume 200 words per minute average reading speed)
  const wordCount = markdownBody.trim().split(/\s+/).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  const postsConfigPath = path.join(__dirname, "../src/data/blog/posts.ts");
  const postsConfigRaw = fs.readFileSync(postsConfigPath, "utf8");

  // Check if slug already exists
  if (postsConfigRaw.includes(`slug: "${slug}"`)) {
    console.error(`Error: An article with slug "${slug}" already exists.`);
    process.exit(1);
  }

  // Format date: e.g. "June 21, 2026"
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const publishedAt = new Date().toLocaleDateString("en-US", dateOptions);

  // Parse tags and calculators
  const tagList = tags ? tags.split(",").map((t) => t.trim()) : [];
  const calcList = calculators ? calculators.split(",").map((c) => c.trim()) : [];

  // Create the markdown file
  const markdownFilePath = path.join(__dirname, `../src/content/blog/${slug}.md`);
  fs.writeFileSync(markdownFilePath, markdownBody.trim() + "\n", "utf8");
  console.log(`Created markdown file: src/content/blog/${slug}.md`);

  // Construct metadata object to inject
  const newPostObject = `  {
    slug: "${slug}",
    title: "${title.replace(/"/g, '\\"')}",
    description: "${description.replace(/"/g, '\\"')}",
    publishedAt: "${publishedAt}",
    readTime: "${readTime}",
    category: "${category.replace(/"/g, '\\"')}",
    tags: ${JSON.stringify(tagList)},
    author: authors.omk,
    relatedCalculators: ${JSON.stringify(calcList)},
  },
];`;

  // Insert metadata block in posts.ts before the last ];
  const updatedPostsConfig = postsConfigRaw.replace(/\];\s*$/, newPostObject);
  fs.writeFileSync(postsConfigPath, updatedPostsConfig, "utf8");
  console.log(`Updated posts configuration: src/data/blog/posts.ts`);

  // Automatically git commit and push
  console.log("Staging changes...");
  execSync("git add -A");
  console.log("Committing changes...");
  execSync(`git commit -m "feat: publish new article '${title}'"`);
  console.log("Pushing to remote...");
  execSync("git push");

  console.log(`\n🎉 Successfully published and deployed: ${title}!`);
} catch (error) {
  console.error("An unexpected error occurred:", error.message);
}
