/**
 * Script: add-last-updated.ts
 * Injects `lastUpdated: "2026-07"` into every CalculatorConfig object
 * that is missing the field across all 7 calculator config files.
 * Run with: npx ts-node --project tsconfig.json scripts/add-last-updated.ts
 */
import * as fs from "fs";
import * as path from "path";

const calcDir = path.join(__dirname, "..", "src", "data", "calculators");
const files = ["gold.ts", "investing.ts", "lifestyle.ts", "loans.ts", "savings.ts", "stocks.ts", "tax.ts"];

for (const file of files) {
  const filePath = path.join(calcDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Insert `lastUpdated: "2026-07",` right before `isIndiaSpecific` if present,
  // otherwise right before the `faqs:` close — we target just before `};` following
  // `faqs: [` arrays that don't already have lastUpdated.
  // Strategy: find each CalculatorConfig object and add the field after `faqs: [...]`
  // We use a regex that matches `  },` preceded by `]` (closing faqs array) and NOT already having lastUpdated.
  
  // Simple approach: add lastUpdated before `  isIndiaSpecific` or before closing `};` after a faqs block
  // Pattern: a line with `  },` after a line ending with `]` that doesn't have lastUpdated nearby
  
  // We'll do a reliable multiline replacement: find each object block ending in `faqs: [...]`
  // and inject lastUpdated before the closing `}` of the config object.
  
  // The config objects always end with:
  //   ],
  // };    (for the last one) or
  //   ],
  // },   (for array items)
  // But `faqs` is always the last field (before optional isIndiaSpecific).
  
  // Pattern: after a line that ends the faqs array (`  ],`) followed optionally by isIndiaSpecific, 
  // then `};` or `},` — insert lastUpdated right after the faqs closing bracket if not already present.
  
  // Insert before isIndiaSpecific if present, else before closing `};` or `},`
  // We'll insert: `  lastUpdated: "2026-07",\n` 
  
  if (content.includes("lastUpdated:")) {
    console.log(`  ${file}: already has lastUpdated, skipping`);
    continue;
  }

  // Replace pattern: `  isIndiaSpecific` → insert before it
  if (content.includes("  isIndiaSpecific")) {
    content = content.replace(/(\n  isIndiaSpecific)/g, '\n  lastUpdated: "2026-07",$1');
    console.log(`  ${file}: inserted before isIndiaSpecific`);
  } else {
    // No isIndiaSpecific: insert before closing `};` or `},` that follows a faqs array end `  ],`
    // The faqs array close looks like `  ],\n` followed by `}` with optional comma/semicolon
    content = content.replace(/(\n  \],\n)([ \t]*[};])/g, '$1  lastUpdated: "2026-07",\n$2');
    console.log(`  ${file}: inserted before closing brace`);
  }
  
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`  ${file}: done`);
}

console.log("All files processed!");
