const fs = require('fs');

// ─── 1. Add carousel JS to script.js ────────────────────────
let js = fs.readFileSync('script.js', 'utf8');

const carouselJS = `

// ═══════════════════════════════════════════════════════════
// SOCIAL CAROUSEL
// ═══════════════════════════════════════════════════════════
(function initCarousel() {
    const track   = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!track) return;
    
    const slides = track.querySelectorAll('.carousel-slide');
    const total  = slides.length;
    let current  = 0;
    let isDragging = false, startX = 0, dragOffset = 0;
    
    // Build dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.onclick = () => goTo(i);
        dotsContainer.appendChild(dot);
    });
    
    function goTo(idx) {
        current = (idx + total) % total;
        track.style.transform = \`translateX(-\${current * 100}%)\`;
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }
    
    if (prevBtn) prevBtn.onclick = () => goTo(current - 1);
    if (nextBtn) nextBtn.onclick = () => goTo(current + 1);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const sec = document.getElementById('sec-contacts');
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;
        if (e.key === 'ArrowLeft')  goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });
    
    // Touch/drag support
    const container = track.parentElement;
    container.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    container.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    }, { passive: true });
    
    // Mouse drag
    container.addEventListener('mousedown', e => { isDragging = true; startX = e.clientX; });
    container.addEventListener('mousemove', e => { if (!isDragging) return; dragOffset = e.clientX - startX; });
    container.addEventListener('mouseup',   e => {
        if (!isDragging) return; isDragging = false;
        if (Math.abs(dragOffset) > 60) goTo(current + (dragOffset < 0 ? 1 : -1));
        dragOffset = 0;
    });
    
    // Auto-play
    setInterval(() => { if (!isDragging) goTo(current + 1); }, 5000);
})();

// ═══════════════════════════════════════════════════════════
// PARALLAX FOR FLOATING ICONS IN COVER
// ═══════════════════════════════════════════════════════════
(function initParallax() {
    const icons = document.querySelectorAll('.fi');
    if (!icons.length) return;
    
    document.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        
        icons.forEach((icon, i) => {
            const depth = (i + 1) * 6;
            icon.style.transform = \`translate(\${dx * depth}px, \${dy * depth}px)\`;
        });
    });
})();

// ═══════════════════════════════════════════════════════════
// TILT 3D ON BENTO CARDS + PROJECT CARDS
// ═══════════════════════════════════════════════════════════
(function initTilt() {
    const cards = document.querySelectorAll('.bg-card, .mac-cover-window');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = \`perspective(1200px) rotateY(\${x * 8}deg) rotateX(\${-y * 8}deg) translateY(-6px) scale(1.01)\`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

// ═══════════════════════════════════════════════════════════
// INTERSECTION OBSERVER — SCROLL ANIMATIONS
// ═══════════════════════════════════════════════════════════
(function initScrollAnim() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
    
    document.querySelectorAll('.animate-on-scroll, .section-label').forEach(el => {
        observer.observe(el);
    });
})();

// ═══════════════════════════════════════════════════════════
// CURSOR TRAIL (Desktop only)
// ═══════════════════════════════════════════════════════════
(function initTrail() {
    if (window.innerWidth < 768) return;
    const DOTS = 7;
    const dots = [];
    for (let i = 0; i < DOTS; i++) {
        const d = document.createElement('div');
        const s = 7 - i;
        d.style.cssText = \`position:fixed;width:\${s}px;height:\${s}px;
            border-radius:50%;pointer-events:none;z-index:99999;
            background:rgba(255,255,255,\${0.35 - i * 0.04});
            transform:translate(-50%,-50%);mix-blend-mode:overlay;\`;
        document.body.appendChild(d);
        dots.push({ el: d, x: 0, y: 0 });
    }
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    
    function tick() {
        let x = mx, y = my;
        dots.forEach((dot, i) => {
            const ease = 0.28 - i * 0.028;
            dot.x += (x - dot.x) * ease;
            dot.y += (y - dot.y) * ease;
            dot.el.style.left = dot.x + 'px';
            dot.el.style.top  = dot.y + 'px';
            x = dot.x; y = dot.y;
        });
        requestAnimationFrame(tick);
    }
    tick();
})();
`;

js += carouselJS;
fs.writeFileSync('script.js', js, 'utf8');
console.log('script.js updated! Lines:', js.split('\n').length);

// ─── 2. Fix HTML: update link rel stylesheet line ────────────
// Already using styles.css — no change needed

// ─── 3. Verify HTML structure ────────────────────────────────
let html = fs.readFileSync('index.html', 'utf8');
const sections = ['sec-hero', 'sec-about', 'sec-projects', 'sec-contacts'];
sections.forEach(s => {
    console.log(`Section #${s}:`, html.includes(s) ? '✓' : '✗ MISSING');
});
console.log('carousel-track:', html.includes('carousel-track') ? '✓' : '✗');
console.log('social-card:', html.includes('social-card') ? '✓' : '✗');
console.log('project-cluster:', html.includes('project-cluster') ? '✓' : '✗');
