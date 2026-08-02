const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The section we want to extract starts at <!-- BENTO / DESKTOP SECTION -->
const bentoStartStr = '            <!-- BENTO / DESKTOP SECTION -->';
const bentoStart = html.indexOf(bentoStartStr);

// The end of the portfolio projects inside the window:
// It ends with AFAM card and then some closing divs.
const afamEnd = html.indexOf('<!-- AFAM -->');
// let's find the end of AFAM block
const afterAfam = html.indexOf('</div>', afamEnd + 500); // just guess
// Safer: Let's extract the whole win-portfolio and slice the inside manually

const winStartStr = '<div class="mac-window" id="win-portfolio"';
const winStart = html.indexOf(winStartStr);

const nextWinStr = '<div class="mac-window" id="win-folder-miniature"';
const nextWin = html.indexOf(nextWinStr);

let winPortfolioBlock = html.substring(winStart, nextWin);

// Find where bento starts inside winPortfolioBlock
const bentoIndex = winPortfolioBlock.indexOf(bentoStartStr);
// The content we want ends right before the last 4 closing divs of winPortfolioBlock
let closingDivsIndex = winPortfolioBlock.lastIndexOf('</div>');
closingDivsIndex = winPortfolioBlock.lastIndexOf('</div>', closingDivsIndex - 1);
closingDivsIndex = winPortfolioBlock.lastIndexOf('</div>', closingDivsIndex - 1);
closingDivsIndex = winPortfolioBlock.lastIndexOf('</div>', closingDivsIndex - 1);

const extractedContent = winPortfolioBlock.substring(bentoIndex, closingDivsIndex);

// Now we want to delete winPortfolioBlock from HTML
html = html.replace(winPortfolioBlock, '');

// Also we need to wrap the existing desktop OS in a hero section
// Where does the OS start? After <body>
// We'll replace <body> with <body>\n<div id="desktop-hero">
html = html.replace('<body>', '<body>\n    <div id="desktop-hero">');

// Where does the OS end? Right before the dock-container or right after the dock-container?
// The dock should probably be fixed and independent of the desktop-hero.
// Actually, everything is absolute in the OS.
// So we can close the desktop-hero right after the dock container.
const dockEnd = html.indexOf('<!-- Context Menu -->');
html = html.slice(0, dockEnd) + '    </div>\n    <div id="portfolio-scrollable-content">\n' + extractedContent + '\n    </div>\n' + html.slice(dockEnd);

// In styles.css, body currently has overflow: hidden.
// We need to change that.

fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML restructured successfully!');
