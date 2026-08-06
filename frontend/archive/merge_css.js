const fs = require('fs');

// Read old styles.css and the new portfolio_final.css
let css = fs.readFileSync('styles.css', 'utf8');
const portfolioCSS = fs.readFileSync('portfolio_final.css', 'utf8');

// ─── Remove all old portfolio-related CSS blocks ─────────────
// We'll cut from the first portfolio-related section onwards
// The old portfolio CSS starts from "#portfolio-scrollable-content"
// Let's find where desktop-specific CSS ends and portfolio CSS begins

// Find the point where portfolio CSS starts - look for the first occurrence of:
// #portfolio-scrollable-content
const portfolioStart = css.indexOf('#portfolio-scrollable-content');
if (portfolioStart === -1) {
    console.log('Could not find portfolio CSS start, appending only');
    css += '\n' + portfolioCSS;
} else {
    // Keep everything before it
    const desktopOnly = css.substring(0, portfolioStart);
    // Append new portfolio CSS
    css = desktopOnly + portfolioCSS;
}

fs.writeFileSync('styles.css', css, 'utf8');
console.log('styles.css merged! Lines:', css.split('\n').length);
