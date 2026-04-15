const fs = require('fs');

let code = fs.readFileSync('claude-cost/src/index.js', 'utf8');

const newMain = `
function showLastCost() {
  try {
    const projectsDir = getProjectsDir();
    if (fs.existsSync(projectsDir)) {
      const filePath = findMostRecentJsonl(projectsDir);
      if (filePath) {
        const session = parseSession(filePath);
        if (session.messageCount > 0) {
          printSummary(session);
        } else {
          console.log('No recent Claude session data found.');
        }
      } else {
        console.log('No recent Claude session data found.');
      }
    } else {
      console.log('Claude projects directory not found.');
    }
  } catch (e) {
    console.error('Error parsing cost:', e.message);
  }
}

function main() {
  const args = process.argv.slice(2);

  // Check for the show/cost flag
  if (args.length === 1 && (args[0] === 'show' || args[0] === '--cost' || args[0] === '-c')) {
    showLastCost();
    process.exit(0);
  }

  const claudeBin = findClaude();
  const isWin = process.platform === 'win32';
`;

code = code.replace(/function main\(\) \{\n  const claudeBin = findClaude\(\);\n  const args = process.argv.slice\(2\);\n  const isWin = process.platform === 'win32';/, newMain.trim());

fs.writeFileSync('claude-cost/src/index.js', code);
