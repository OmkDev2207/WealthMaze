const fs = require('fs');

const errorMap = {
  'gold.ts': [4,59,115,170],
  'investing.ts': [13,102,173,235,290,449,517,573,653,732,782,865,943,1021,1103,1170,1252,1372],
  'lifestyle.ts': [4,74,125,172],
  'loans.ts': [4,82,170,259],
  'savings.ts': [4,63,120,175,244,311],
  'stocks.ts': [4,62,113,154],
  'tax.ts': [4,110],
};

const dir = 'src/data/calculators/';

for (const [file, startLines] of Object.entries(errorMap)) {
  const p = dir + file;
  const raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.includes('\r\n');
  const eol = crlf ? '\r\n' : '\n';
  const lines = raw.split(/\r?\n/);
  
  const insertions = [];
  
  for (const startLine of startLines) {
    const startIdx = startLine - 1;
    
    // Find faqs: [ starting from config open
    let faqsStart = -1;
    for (let i = startIdx; i < Math.min(startIdx + 500, lines.length); i++) {
      if (lines[i].trim() === 'faqs: [') {
        faqsStart = i;
        break;
      }
    }
    if (faqsStart < 0) {
      console.log(file + ':' + startLine + ' ERROR: no faqs found');
      continue;
    }
    
    // Find closing ] of faqs array
    let faqsEnd = -1;
    for (let i = faqsStart + 1; i < Math.min(faqsStart + 50, lines.length); i++) {
      const t = lines[i].trim();
      if (t === ']' || t === '],') {
        faqsEnd = i;
        break;
      }
    }
    if (faqsEnd < 0) {
      console.log(file + ':' + startLine + ' ERROR: no faqs end (faqsStart line: ' + lines[faqsStart] + ')');
      continue;
    }
    
    // Check if isIndiaSpecific follows faqs
    let insertAfter = faqsEnd;
    const nextLine = lines[faqsEnd + 1] ? lines[faqsEnd + 1].trim() : '';
    if (nextLine.startsWith('isIndiaSpecific')) {
      insertAfter = faqsEnd + 1;
    }
    
    insertions.push({ afterLine: insertAfter });
    console.log(file + ':' + startLine + ' -> insert after line ' + (insertAfter + 1) + ': ' + lines[insertAfter].substring(0, 40));
  }
  
  // Apply in reverse order to preserve line numbers
  insertions.sort(function(a, b) { return b.afterLine - a.afterLine; });
  
  for (const ins of insertions) {
    const nextLine = lines[ins.afterLine + 1] ? lines[ins.afterLine + 1] : '';
    if (nextLine.includes('lastUpdated')) {
      console.log('  -> already has lastUpdated, skipping');
      continue;
    }
    lines.splice(ins.afterLine + 1, 0, '  lastUpdated: "July 2026",');
  }
  
  fs.writeFileSync(p, lines.join(eol), 'utf8');
  const count = (fs.readFileSync(p, 'utf8').match(/lastUpdated/g) || []).length;
  console.log(file + ': done, lastUpdated count=' + count);
}

console.log('All done!');
