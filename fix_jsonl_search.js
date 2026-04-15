const fs = require('fs');

let code = fs.readFileSync('claude-cost/src/index.js', 'utf8');

code = code.replace(
  "else if (entry.name.endsWith('.jsonl')) {",
  "else if (entry.name === 'messages.jsonl') {"
);

fs.writeFileSync('claude-cost/src/index.js', code);
