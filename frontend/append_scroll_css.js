const fs = require('fs');

const css = `
/* HERO DESKTOP SECTION */
#desktop-hero {
    position: relative;
    width: 100%;
    height: 100vh;
    z-index: 5;
    /* ensure desktop items are clipped if needed, but not necessarily */
}

/* PORTFOLIO SCROLLABLE CONTENT */
#portfolio-scrollable-content {
    position: relative;
    width: 100%;
    z-index: 10;
    background: transparent;
    padding-bottom: 100px; /* buffer at bottom */
}

/* Fix bento container */
.portfolio-bento {
    background: transparent !important; /* use the OS wallpaper */
}
.bento-bg-dots {
    display: none; /* remove dots, let wallpaper show through, or keep if preferred? I'll keep them but faint */
}
.bento-bg-dots {
    display: block;
    background-image: radial-gradient(rgba(255,255,255,0.2) 2px, transparent 2px) !important;
}

/* Adjust projects section */
.portfolio-projects {
    padding: 50px;
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(30px);
    border-radius: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    margin-top: 50px;
    border: 1px solid rgba(255,255,255,0.1);
}
.portfolio-projects h3 {
    color: #fff;
}
.project-info {
    color: #eee;
}

/* SCROLL INDICATOR */
.scroll-indicator {
    position: absolute;
    bottom: 90px; /* above dock */
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 24px;
    z-index: 9;
    animation: bounce 2s infinite;
    cursor: pointer;
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.scroll-indicator span {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.8;
}
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-15px) translateX(-50%); }
    60% { transform: translateY(-7px) translateX(-50%); }
}
`;
fs.appendFileSync('styles.css', css, 'utf8');
console.log('Scroll CSS appended!');
