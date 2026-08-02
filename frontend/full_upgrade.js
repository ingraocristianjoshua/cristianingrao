const fs = require('fs');

// Read all three files
let html = fs.readFileSync('index.html', 'utf8');
let css = fs.readFileSync('styles.css', 'utf8');
let js = fs.readFileSync('script.js', 'utf8');

// 1. Update <head> — add more fonts, meta tags
html = html.replace(
    '<title>cristianingrao</title>',
    `<title>Cristian Ingrao — Software Developer</title>
    <meta name="description" content="Portfolio di Cristian Ingrao, Software Developer specializzato in Web Apps, Next.js, React e Java.">
    <meta name="keywords" content="Cristian Ingrao, portfolio, software developer, web developer, React, Next.js, Java">
    <meta name="author" content="Cristian Ingrao">
    <meta property="og:title" content="Cristian Ingrao — Software Developer">
    <meta property="og:description" content="Portfolio interattivo in stile macOS">
    <meta property="og:type" content="website">`
);

// Add Inter font weights
html = html.replace(
    'family=Inter:wght@400;500;600;700;800;900',
    'family=Inter:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300'
);

// 2. Update canvas title colors (fix dark mode titles)
// Already white, OK

// 3. Add Intersection Observer classes to bento cards in portfolio section
// Add a data-animate attribute and will-change
const portfolioStart = html.indexOf('<div id="apple-bento-grid-container">');
if (portfolioStart !== -1) {
    // Add class to each .apple-card for stagger animation
    let portfolioSection = html.substring(portfolioStart);
    portfolioSection = portfolioSection.replace(/<div class="apple-card /g, '<div class="apple-card animate-on-scroll ');
    portfolioSection = portfolioSection.replace(/<a href=/g, (match, offset) => {
        // Only replace contact card anchors that have apple-card class
        return match;
    });
    html = html.substring(0, portfolioStart) + portfolioSection;
}

// 4. Add loading screen before body content
const loadingScreen = `
    <!-- LOADING SCREEN -->
    <div id="loading-screen">
        <div class="loading-logo">
            <svg viewBox="0 0 60 60" width="60" height="60">
                <circle cx="30" cy="30" r="28" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/>
                <circle cx="30" cy="30" r="28" stroke="#ffffff" stroke-width="2" fill="none" 
                    stroke-dasharray="175" stroke-dashoffset="175" 
                    style="animation: circle-progress 1.5s ease forwards; transform-origin: center; transform: rotate(-90deg)"/>
            </svg>
            <div class="loading-text">cristian ingrao</div>
        </div>
    </div>
`;

html = html.replace('<div id="desktop-hero">', loadingScreen + '\n    <div id="desktop-hero">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated!');

// ============================
// CSS ADDITIONS
// ============================
const cssAdditions = `

/* ═══════════════════════════════════════════ */
/* LOADING SCREEN                              */
/* ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════ */
/* DESKTOP ENTRY ANIMATION                     */
/* ═══════════════════════════════════════════ */
#desktop-hero {
    animation: desktop-appear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 1.6s;
    opacity: 0;
}
@keyframes desktop-appear {
    from { opacity: 0; transform: scale(0.98); }
    to   { opacity: 1; transform: scale(1); }
}

/* ═══════════════════════════════════════════ */
/* MENUBAR ENHANCEMENTS                        */
/* ═══════════════════════════════════════════ */
.menubar {
    backdrop-filter: blur(40px) saturate(200%) !important;
    -webkit-backdrop-filter: blur(40px) saturate(200%) !important;
    background: rgba(0,0,0,0.55) !important;
    border-bottom: 0.5px solid rgba(255,255,255,0.12) !important;
}

/* ═══════════════════════════════════════════ */
/* WALLPAPER — ANIMATED GRADIENT               */
/* ═══════════════════════════════════════════ */
.wallpaper {
    background: 
        radial-gradient(ellipse at 20% 50%, rgba(120, 40, 200, 0.3) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(0, 100, 255, 0.25) 0%, transparent 60%),
        radial-gradient(ellipse at 60% 80%, rgba(0, 200, 150, 0.15) 0%, transparent 60%),
        linear-gradient(135deg, #0a0a12 0%, #0d0d1a 50%, #0a0f1a 100%) !important;
    background-attachment: fixed !important;
    animation: wallpaper-shift 20s ease infinite alternate;
}
@keyframes wallpaper-shift {
    0%   { filter: hue-rotate(0deg) brightness(1); }
    50%  { filter: hue-rotate(15deg) brightness(1.05); }
    100% { filter: hue-rotate(-10deg) brightness(0.95); }
}

/* ═══════════════════════════════════════════ */
/* WIDGETS — GLASSMORPHISM UPGRADE             */
/* ═══════════════════════════════════════════ */
.widget {
    background: rgba(28, 28, 32, 0.7) !important;
    backdrop-filter: blur(30px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(30px) saturate(180%) !important;
    border: 0.5px solid rgba(255,255,255,0.12) !important;
    box-shadow: 0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08) !important;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease !important;
}
.widget:hover {
    transform: translateY(-5px) scale(1.02) !important;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15) !important;
}

/* ═══════════════════════════════════════════ */
/* MAC WINDOWS — OPEN/CLOSE ANIMATIONS         */
/* ═══════════════════════════════════════════ */
.mac-window {
    backdrop-filter: blur(30px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(30px) saturate(180%) !important;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.1) !important;
}
.mac-window.opening {
    animation: win-open 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
.mac-window.closing {
    animation: win-close 0.2s ease !important;
}
@keyframes win-open {
    from { transform: scale(0.85); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
}
@keyframes win-close {
    from { transform: scale(1);    opacity: 1; }
    to   { transform: scale(0.85); opacity: 0; }
}

/* ═══════════════════════════════════════════ */
/* DOCK — PREMIUM UPGRADE                      */
/* ═══════════════════════════════════════════ */
.dock-glass {
    background: rgba(28, 28, 32, 0.65) !important;
    backdrop-filter: blur(40px) saturate(200%) !important;
    -webkit-backdrop-filter: blur(40px) saturate(200%) !important;
    border: 0.5px solid rgba(255,255,255,0.14) !important;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1) !important;
}
.dock-item {
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
.dock-item:hover {
    transform: translateY(-14px) scale(1.3) !important;
}
.dock-item:active {
    transform: translateY(-6px) scale(1.1) !important;
    animation: dock-bounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
@keyframes dock-bounce {
    0%   { transform: translateY(-6px) scale(1.1); }
    50%  { transform: translateY(-20px) scale(1.2); }
    100% { transform: translateY(-14px) scale(1.3); }
}

/* ═══════════════════════════════════════════ */
/* DESKTOP FOLDERS — ENHANCED                  */
/* ═══════════════════════════════════════════ */
.folder {
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
.folder:hover {
    transform: scale(1.08) translateY(-4px) !important;
}
.folder:active {
    transform: scale(0.95) !important;
}

/* ═══════════════════════════════════════════ */
/* SCROLL TRANSITION SECTION                   */
/* ═══════════════════════════════════════════ */
#portfolio-scrollable-content {
    background: #080810 !important;
    background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px) !important;
    background-size: 32px 32px !important;
}

/* ═══════════════════════════════════════════ */
/* ANIMATE ON SCROLL — BENTO CARDS             */
/* ═══════════════════════════════════════════ */
.animate-on-scroll {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.animate-on-scroll.in-view {
    opacity: 1;
    transform: translateY(0);
}

/* STAGGER DELAYS */
.apple-bento-grid .animate-on-scroll:nth-child(1) { transition-delay: 0ms; }
.apple-bento-grid .animate-on-scroll:nth-child(2) { transition-delay: 80ms; }
.apple-bento-grid .animate-on-scroll:nth-child(3) { transition-delay: 160ms; }
.apple-bento-grid .animate-on-scroll:nth-child(4) { transition-delay: 240ms; }
.apple-bento-grid .animate-on-scroll:nth-child(5) { transition-delay: 320ms; }
.apple-bento-grid .animate-on-scroll:nth-child(6) { transition-delay: 400ms; }
.apple-bento-grid .animate-on-scroll:nth-child(7) { transition-delay: 480ms; }
.apple-bento-grid .animate-on-scroll:nth-child(8) { transition-delay: 560ms; }

/* ═══════════════════════════════════════════ */
/* SECTION TITLES — ANIMATED                   */
/* ═══════════════════════════════════════════ */
.apple-canvas-title {
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.apple-canvas-title.in-view {
    opacity: 1;
    transform: translateX(0);
}

/* ═══════════════════════════════════════════ */
/* HERO WINDOW — ENHANCED                      */
/* ═══════════════════════════════════════════ */
.hero-window {
    background: radial-gradient(ellipse at 30% 60%, rgba(100,50,200,0.4) 0%, transparent 55%),
                radial-gradient(ellipse at 70% 30%, rgba(0,120,255,0.3) 0%, transparent 55%),
                linear-gradient(135deg, #0d0d1a 0%, #13131f 100%) !important;
    border: 0.5px solid rgba(255,255,255,0.08) !important;
    overflow: hidden !important;
}

/* Particle animation in Hero */
.hero-window::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 28px 28px;
    z-index: 0;
    animation: hero-grid-pan 30s linear infinite;
}
@keyframes hero-grid-pan {
    from { background-position: 0 0; }
    to   { background-position: 56px 56px; }
}

/* Glowing orbs in hero */
.hero-window::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(100,50,255,0.15) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: orb-pulse 4s ease infinite;
    z-index: 0;
}
@keyframes orb-pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    50%       { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
}

.hero-text-container { z-index: 10; }
.hero-text-subtitle {
    animation: fade-in-up 1s ease forwards;
}
@keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

/* ═══════════════════════════════════════════ */
/* PROJECT MEDIA CARDS — HOVER REVEAL          */
/* ═══════════════════════════════════════════ */
.a-project-media {
    overflow: hidden;
}
.a-proj-logo {
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
.a-project-media:hover .a-proj-logo {
    transform: scale(1.1) translateY(-5px) !important;
}
.a-project-media:hover .btn-canvas {
    background: rgba(255,255,255,0.15) !important;
    box-shadow: 0 0 30px rgba(255,255,255,0.1) !important;
}

/* ═══════════════════════════════════════════ */
/* APPLE CARD — GLASSMORPHISM DARK             */
/* ═══════════════════════════════════════════ */
.apple-card {
    background: rgba(28, 28, 34, 0.9) !important;
    border: 0.5px solid rgba(255,255,255,0.1) !important;
    backdrop-filter: blur(10px) !important;
}
.apple-card:hover {
    border-color: rgba(255,255,255,0.2) !important;
}

/* ═══════════════════════════════════════════ */
/* CONTACT CARDS — GLOW ON HOVER               */
/* ═══════════════════════════════════════════ */
.contact-card:nth-child(1):hover { box-shadow: 0 30px 60px rgba(0,120,255,0.25), 0 0 0 0.5px rgba(0,120,255,0.3) !important; }
.contact-card:nth-child(2):hover { box-shadow: 0 30px 60px rgba(225,48,108,0.25), 0 0 0 0.5px rgba(225,48,108,0.3) !important; }
.contact-card:nth-child(3):hover { box-shadow: 0 30px 60px rgba(0,119,181,0.25), 0 0 0 0.5px rgba(0,119,181,0.3) !important; }
.contact-card:nth-child(4):hover { box-shadow: 0 30px 60px rgba(150,150,150,0.15), 0 0 0 0.5px rgba(200,200,200,0.2) !important; }

/* ═══════════════════════════════════════════ */
/* SCROLL INDICATOR — SUBTLE GRADIENT          */
/* ═══════════════════════════════════════════ */
.scroll-indicator {
    color: rgba(255,255,255,0.3) !important;
    font-size: 14px !important;
}

/* ═══════════════════════════════════════════ */
/* CLOCK WIDGET DISPLAY                        */
/* ═══════════════════════════════════════════ */
.clock-display {
    font-variant-numeric: tabular-nums;
    letter-spacing: -2px;
}

/* ═══════════════════════════════════════════ */
/* CURSOR MICRO-INTERACTION                    */
/* ═══════════════════════════════════════════ */
* { cursor: default; }
a, button, .folder, .dock-item, .contact-card, .apple-card, .widget, .menu-text { cursor: pointer !important; }
`;

css += cssAdditions;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('styles.css updated!');

// ============================
// JS ADDITIONS
// ============================
const jsAdditions = `

// ═══════════════════════════════════════════
// LOADING SCREEN
// ═══════════════════════════════════════════
window.addEventListener('load', () => {
    setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        if (ls) ls.classList.add('hidden');
    }, 1800);
});

// ═══════════════════════════════════════════
// INTERSECTION OBSERVER — SCROLL ANIMATIONS
// ═══════════════════════════════════════════
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

// Observe all animate-on-scroll elements and section titles
document.querySelectorAll('.animate-on-scroll, .apple-canvas-title').forEach(el => {
    scrollObserver.observe(el);
});

// Also observe hero window
const heroWrapper = document.querySelector('.hero-window-wrapper');
if (heroWrapper) {
    heroWrapper.style.opacity = '0';
    heroWrapper.style.transform = 'translateY(60px)';
    heroWrapper.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
    scrollObserver.observe(heroWrapper);
    // Override observer for hero (no class, inline)
}
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });
if (heroWrapper) heroObserver.observe(heroWrapper);

// ═══════════════════════════════════════════
// DOCK — MAGNETIC EFFECT
// ═══════════════════════════════════════════
const dockItems = document.querySelectorAll('.dock-item');
const dockGlass = document.querySelector('.dock-glass');

if (dockGlass) {
    dockGlass.addEventListener('mousemove', (e) => {
        const dockRect = dockGlass.getBoundingClientRect();
        const mouseX = e.clientX;
        
        dockItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const dist = Math.abs(mouseX - itemCenter);
            const maxDist = 100;
            
            if (dist < maxDist) {
                const scale = 1 + (1 - dist / maxDist) * 0.5;
                const translateY = -(1 - dist / maxDist) * 18;
                item.style.transform = \`scale(\${scale}) translateY(\${translateY}px)\`;
            } else {
                item.style.transform = '';
            }
        });
    });
    
    dockGlass.addEventListener('mouseleave', () => {
        dockItems.forEach(item => { item.style.transform = ''; });
    });
}

// ═══════════════════════════════════════════
// CURSOR TRAIL
// ═══════════════════════════════════════════
const desktopHero = document.getElementById('desktop-hero');
const trail = [];
const TRAIL_COUNT = 8;

for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = \`
        position: fixed; width: \${6 - i * 0.5}px; height: \${6 - i * 0.5}px;
        background: rgba(255,255,255,\${0.3 - i * 0.03});
        border-radius: 50%; pointer-events: none; z-index: 9999;
        transition: transform 0.1s; transform: translate(-50%, -50%);
        mix-blend-mode: screen;
    \`;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

function animateTrail() {
    let x = mouseX, y = mouseY;
    trail.forEach((t, i) => {
        t.x += (x - t.x) * (0.3 - i * 0.02);
        t.y += (y - t.y) * (0.3 - i * 0.02);
        t.el.style.left = t.x + 'px';
        t.el.style.top  = t.y + 'px';
        x = t.x; y = t.y;
    });
    requestAnimationFrame(animateTrail);
}
animateTrail();

// ═══════════════════════════════════════════
// PARALLAX FLOATING ICONS IN HERO
// ═══════════════════════════════════════════
const floatingIcons = document.querySelectorAll('.floating-icon');
document.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
    
    floatingIcons.forEach((icon, i) => {
        const depth = (i % 4 + 1) * 5;
        const x = xRatio * depth;
        const y = yRatio * depth;
        icon.style.transform = \`translate(\${x}px, \${y}px)\`;
    });
});

// ═══════════════════════════════════════════
// APPLE CARDS — TILT 3D EFFECT
// ═══════════════════════════════════════════
document.querySelectorAll('.apple-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * -10;
        const tiltY = (x - 0.5) * 10;
        card.style.transform = \`perspective(1000px) rotateX(\${tiltX}deg) rotateY(\${tiltY}deg) translateY(-8px) scale(1.02)\`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ═══════════════════════════════════════════
// KONAMI CODE EASTER EGG
// ═══════════════════════════════════════════
const konamiCode = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            openWindow('win-easteregg');
            konamiIndex = 0;
        }
    } else { konamiIndex = 0; }
});
`;

js += jsAdditions;
fs.writeFileSync('script.js', js, 'utf8');
console.log('script.js updated!');
