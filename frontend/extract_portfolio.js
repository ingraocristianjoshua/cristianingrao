const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// The portfolio section starts with <div id="portfolio-scrollable-content">
// and ends right before </body>.
const portfolioStartIndex = indexHtml.indexOf('<div id="portfolio-scrollable-content">');
if (portfolioStartIndex === -1) {
    console.error('Portfolio section not found');
    process.exit(1);
}

// Extract head
const headEndIndex = indexHtml.indexOf('</head>') + 7;
const headHtml = indexHtml.substring(0, headEndIndex);
const newHeadHtml = headHtml.replace('<title>Cristian Ingrao — Software Developer</title>', '<title>Portfolio — Cristian Ingrao</title>');

// Extract portfolio content
const bodyEndIndex = indexHtml.lastIndexOf('</body>');
let portfolioContent = indexHtml.substring(portfolioStartIndex, bodyEndIndex);

// Add a script tag at the end to include script.js
const portfolioHtml = `${newHeadHtml}
<body style="background: #08080f;">
    
    <!-- TOP NAVIGATION FOR PORTFOLIO -->
    <nav style="position: fixed; top: 0; left: 0; right: 0; height: 50px; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); z-index: 9999; display: flex; align-items: center; padding: 0 24px; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <a href="index.html" style="color: #fff; text-decoration: none; font-family: -apple-system, sans-serif; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <span>←</span> Torna al Desktop
        </a>
    </nav>

${portfolioContent}
</body>
</html>`;

fs.writeFileSync('portfolio.html', portfolioHtml, 'utf8');

// Remove portfolio from index.html
const newIndexHtml = indexHtml.substring(0, portfolioStartIndex) + '\n</body>\n</html>';
fs.writeFileSync('index.html', newIndexHtml, 'utf8');

console.log('Portfolio extracted successfully.');
