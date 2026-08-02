const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Fix 1: Add proper loading screen CSS (was lost during revert)
const loadingCSS = `
/* ═══════════════════════════════════════════════════════════ */
/* LOADING SCREEN                                              */
/* ═══════════════════════════════════════════════════════════ */
#loading-screen {
    position: fixed;
    inset: 0;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    flex-direction: column;
    gap: 20px;
    transition: opacity 0.5s ease, visibility 0.5s ease;
}
#loading-screen.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}
.loading-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
.loading-text {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 300;
    color: rgba(255,255,255,0.8);
    letter-spacing: 4px;
    text-transform: lowercase;
    animation: fade-pulse 1.5s ease infinite;
}
@keyframes fade-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}
@keyframes circle-progress {
    to { stroke-dashoffset: 0; }
}
`;

// Insert loading CSS before #desktop-hero
const insertPoint = css.indexOf('#desktop-hero {');
css = css.substring(0, insertPoint) + loadingCSS + '\n' + css.substring(insertPoint);

fs.writeFileSync('styles.css', css, 'utf8');
console.log('Loading screen CSS added!');

// Fix 2: Check if loading screen JS is in script.js
let js = fs.readFileSync('script.js', 'utf8');
if (!js.includes("loading-screen")) {
    const loadingJS = `
// ═══════════════════════════════════════════════════════════
// LOADING SCREEN
// ═══════════════════════════════════════════════════════════
window.addEventListener('load', () => {
    setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        if (ls) ls.classList.add('hidden');
    }, 1800);
});
`;
    js = loadingJS + js;
    fs.writeFileSync('script.js', js, 'utf8');
    console.log('Loading screen JS added!');
} else {
    console.log('Loading screen JS already present.');
}
