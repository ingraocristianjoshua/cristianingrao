const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

const newCSS = `

/* ═══════════════════════════════════════ */
/* HERO WINDOW FONT CYCLING ANIMATION      */
/* ═══════════════════════════════════════ */
.hero-text-title {
    font-size: 80px;
    font-weight: 100;
    letter-spacing: -2px;
    color: #ffffff;
    margin: 0;
    text-transform: uppercase;
    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
    animation: font-cycle 6s steps(1) infinite;
}

@keyframes font-cycle {
    0%   { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; font-weight: 100; letter-spacing: -2px; }
    20%  { font-family: 'Georgia', 'Times New Roman', serif;                             font-weight: 400; letter-spacing: 4px;  }
    40%  { font-family: 'Courier New', 'Courier', monospace;                             font-weight: 700; letter-spacing: 0px;  }
    60%  { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; font-weight: 900; letter-spacing: -4px; }
    80%  { font-family: 'Impact', 'Arial Black', sans-serif;                             font-weight: 900; letter-spacing: 8px;  }
    100% { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; font-weight: 100; letter-spacing: -2px; }
}

/* ═══════════════════════════════════════ */
/* CONTACTS SECTION — APPLE STYLE         */
/* ═══════════════════════════════════════ */
.contacts-grid {
    grid-template-columns: repeat(4, 1fr) !important;
    grid-auto-rows: 160px !important;
}

.contact-card {
    text-decoration: none;
    position: relative;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 0;
    cursor: pointer;
    overflow: visible;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
}

.contact-card:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
}

.contact-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0 0 24px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
    flex-shrink: 0;
}

.contact-label {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #636366;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding-left: 24px;
}

.contact-value {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #f2f2f7;
    padding: 0 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.contact-arrow {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 18px;
    color: #636366;
    transition: transform 0.2s, color 0.2s;
}
.contact-card:hover .contact-arrow {
    transform: translateX(4px);
    color: #f2f2f7;
}

@media (max-width: 900px) {
    .contacts-grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}
@media (max-width: 500px) {
    .contacts-grid {
        grid-template-columns: 1fr !important;
    }
    .hero-text-title { font-size: 48px !important; }
}
`;

css += newCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('CSS updated for contacts + font animation!');
