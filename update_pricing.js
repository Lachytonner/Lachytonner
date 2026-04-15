const fs = require('fs');

let code = fs.readFileSync('claude-cost/src/index.js', 'utf8');

const newPricing = `const PRICING = {
  'claude-3-7-sonnet-20250219':   { input: 3,    output: 15, cacheRead: 0.30, cacheWrite: 3.75 },
  'claude-3-5-sonnet-20241022':   { input: 3,    output: 15, cacheRead: 0.30, cacheWrite: 3.75 },
  'claude-3-5-haiku-20241022':    { input: 0.80, output: 4,  cacheRead: 0.08, cacheWrite: 1    },
  'claude-3-opus-20240229':       { input: 15,   output: 75, cacheRead: 1.50, cacheWrite: 3.75 },
  'claude-3-sonnet-20240229':     { input: 3,    output: 15, cacheRead: 0.30, cacheWrite: 3.75 },
  'claude-3-haiku-20240307':      { input: 0.25, output: 1.25, cacheRead: 0.025, cacheWrite: 0.30 }
};`;

code = code.replace(/const PRICING = \{[\s\S]*?\};\n/, newPricing + '\n');
fs.writeFileSync('claude-cost/src/index.js', code);
