import sitemap from '../src/app/sitemap';

try {
  const entries = sitemap();
  console.log(`--- TOTAL SITEMAP ENTRIES: ${entries.length} ---`);
  entries.forEach((entry) => {
    console.log(entry.url);
  });
} catch (error) {
  console.error("Error executing sitemap generator:", error);
}
