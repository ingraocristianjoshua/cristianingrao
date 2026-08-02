const fs = require('fs');

// ─── 1. Fix CSS — Make everything one unified scrolling world ────
let css = fs.readFileSync('styles.css', 'utf8');

// a) Body / html must scroll freely, no extra bg
css = css.replace(
    'body, html {\n    width:100vw; min-height:100vh; overflow-x:hidden; overflow-y:auto;\n    font-family: -apple-system, BlinkMacSystemFont, \'Inter\', sans-serif;\n    cursor: default;\n    user-select: none;\n}',
    'body, html {\n    width:100vw; min-height:100vh; overflow-x:hidden; overflow-y:auto;\n    font-family: -apple-system, BlinkMacSystemFont, \'Inter\', sans-serif;\n    cursor: default;\n    user-select: none;\n    /* Unified dark background for the whole page */\n    background: #07070e;\n}'
);

// b) The wallpaper must now be FIXED (stays in place while you scroll)
css = css.replace(
    '.wallpaper {\n    position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;\n    background-image: url(\'wallpaper.jpg\');\n    background-size: cover;\n    background-position: center;\n    background-color: #000;\n}',
    '.wallpaper {\n    position: fixed;\n    top: 0; left: 0; width: 100vw; height: 100vh;\n    z-index: 0;\n    background-image: url(\'wallpaper.jpg\');\n    background-size: cover;\n    background-position: center;\n    background-color: #000;\n    /* The wallpaper fades out as you scroll down */\n    pointer-events: none;\n}'
);

// c) desktop-hero: remove overflow:hidden so it can extend naturally
// and make it auto height (not fixed 100vh clip)
css = css.replace(
    '#desktop-hero {\n    position: relative;\n    width: 100%;\n    height: 100vh;\n    z-index: 5;\n    overflow: hidden; /* clip everything inside */\n}',
    '#desktop-hero {\n    position: relative;\n    width: 100%;\n    min-height: 100vh;\n    height: 100vh;\n    z-index: 5;\n    /* Do NOT overflow:hidden — windows need to be draggable */\n}'
);

// d) Remove the separate portfolio background (make it transparent — wallpaper shows through)
css = css.replace(
    '#portfolio-scrollable-content {\n    background: #08080f;\n    background-image:\n        radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);\n    background-size: 30px 30px;\n    padding-bottom: 0;\n}',
    '#portfolio-scrollable-content {\n    background: transparent;\n    position: relative;\n    z-index: 5;\n    /* Portfolio lives in the same world as the desktop */\n}'
);

// e) Add the dot pattern to the BODY instead, so it covers the whole page
css = css.replace(
    'body, html {\n    width:100vw; min-height:100vh; overflow-x:hidden; overflow-y:auto;\n    font-family: -apple-system, BlinkMacSystemFont, \'Inter\', sans-serif;\n    cursor: default;\n    user-select: none;\n    /* Unified dark background for the whole page */\n    background: #07070e;\n}',
    'body, html {\n    width:100vw; min-height:100vh; overflow-x:hidden; overflow-y:auto;\n    font-family: -apple-system, BlinkMacSystemFont, \'Inter\', sans-serif;\n    cursor: default;\n    user-select: none;\n}'
);

// f) Add a pseudo-element overlay/gradient between desktop and portfolio so it blends
const seamCSS = `

/* ═══════════════════════════════════════════════════════════ */
/* SEAMLESS DESKTOP ↔ PORTFOLIO TRANSITION                     */
/* The wallpaper stays fixed. The desktop "extends" downward.  */
/* ═══════════════════════════════════════════════════════════ */

/* Unified background behind everything */
body {
    background:
        radial-gradient(ellipse at 20% 10%, rgba(80,20,200,0.2) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 15%, rgba(0,80,200,0.15) 0%, transparent 50%),
        linear-gradient(180deg,
            #05050e 0%,
            #08080f 30%,
            #07070e 100%
        );
    background-attachment: fixed;
}

/* The wallpaper image fades out as user scrolls */
.wallpaper {
    transition: opacity 0.1s linear;
}

/* Desktop hero is 100vh but NOT clip — mac windows can extend out of it */
#desktop-hero {
    height: 100vh;
    position: relative;
    z-index: 5;
}

/* The dot pattern covers the whole scrollable page (fixed) */
body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    pointer-events: none;
    z-index: 0;
    animation: grid-slow 40s linear infinite;
}
@keyframes grid-slow {
    from { background-position: 0 0; }
    to   { background-position: 60px 60px; }
}

/* Gradient "bridge" between desktop footer and portfolio */
#portfolio-scrollable-content {
    position: relative;
    z-index: 5;
    background: transparent;
    /* Soft top fade so the dock doesn't create a hard edge */
    padding-top: 0;
}
/* Blending overlay at the very top of the portfolio section */
#portfolio-scrollable-content::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 120px;
    background: linear-gradient(to bottom, rgba(7,7,14,0.0) 0%, rgba(7,7,14,0.0) 100%);
    pointer-events: none;
    z-index: 1;
}

/* Mac windows float above everything */
.mac-window {
    z-index: 200;
}

/* Desktop content stays in the viewport */
.desktop-content {
    position: relative;
    z-index: 5;
}

/* Dock stays fixed at the bottom always */
.dock-wrapper {
    position: fixed !important;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999 !important;
}

/* Menubar stays fixed at top */
.menubar {
    position: fixed !important;
    top: 0; left: 0; right: 0;
    z-index: 9998 !important;
}

/* Scroll indicator subtler */
.scroll-indicator {
    position: fixed !important;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    transition: opacity 0.5s;
}

/* Section label - visible on dark bg */
.section-label {
    color: #f2f2f7;
    position: relative; z-index: 10;
}

/* The portfolio container has some top padding so content starts below "viewport fold" */
#apple-bento-grid-container {
    padding-top: 100px;
    position: relative; z-index: 10;
}

/* All cards raised above the fixed bg */
.bg-card, .mac-cover-window, .project-cluster, .contacts-carousel-wrapper, .portfolio-footer {
    position: relative; z-index: 10;
}
`;

css += seamCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('CSS updated for seamless scroll!');

// ─── 2. Fix JS — Fade wallpaper as user scrolls ──────────────
let js = fs.readFileSync('script.js', 'utf8');

const fadeJS = `

// ═══════════════════════════════════════════════════════════
// WALLPAPER FADE — fades as you scroll into portfolio
// ═══════════════════════════════════════════════════════════
(function initWallpaperFade() {
    const wallpaper = document.querySelector('.wallpaper');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!wallpaper) return;
    
    function onScroll() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        
        // Fade wallpaper from 1 → 0 as you scroll through first viewport
        const fadeRatio = Math.min(scrollY / (vh * 0.7), 1);
        wallpaper.style.opacity = (1 - fadeRatio * 0.85).toString();
        
        // Hide scroll indicator once scrolled
        if (scrollIndicator) {
            scrollIndicator.style.opacity = scrollY > 50 ? '0' : '1';
            scrollIndicator.style.pointerEvents = scrollY > 50 ? 'none' : 'auto';
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial call
})();

// ═══════════════════════════════════════════════════════════
// DESKTOP HERO — allow overflow so windows can extend
// ═══════════════════════════════════════════════════════════
(function fixDesktopHero() {
    const hero = document.getElementById('desktop-hero');
    if (hero) {
        hero.style.overflow = 'visible';
    }
})();
`;

js += fadeJS;
fs.writeFileSync('script.js', js, 'utf8');
console.log('JS updated for wallpaper fade!');
