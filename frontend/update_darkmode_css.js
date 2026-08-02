const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Update Portfolio Scrollable Content Background to Dark
css = css.replace(
`#portfolio-scrollable-content {
    position: relative;
    width: 100%;
    z-index: 10;
    background: #f5f5f7;
    background-image: radial-gradient(#d1d1d6 2px, transparent 2px);
    background-size: 40px 40px;
    padding-bottom: 150px;
}`,
`#portfolio-scrollable-content {
    position: relative;
    width: 100%;
    z-index: 10;
    background: #0d0d0f;
    background-image: radial-gradient(rgba(255,255,255,0.06) 2px, transparent 2px);
    background-size: 40px 40px;
    padding-bottom: 150px;
}`);

// 2. Update Apple Grid container & Typography to Dark Mode
css = css.replace(
`.apple-canvas-title {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -1.5px;
    color: #111;
    margin-bottom: 40px;
}`,
`.apple-canvas-title {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -1.5px;
    color: #f2f2f7;
    margin-bottom: 40px;
}`);

// 3. Update Base Card to Dark
css = css.replace(
`.apple-card {
    background: #ffffff;
    border-radius: 32px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
}`,
`.apple-card {
    background: #1c1c1e;
    border-radius: 32px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
}`);

css = css.replace(
`.apple-card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05);
}`,
`.apple-card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.1);
}`);

// 4. Update Header
css = css.replace(
`.a-card-header {
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: #fdfdfd;
    border-bottom: 1px solid rgba(0,0,0,0.04);
    flex-shrink: 0;
}`,
`.a-card-header {
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: #2c2c2e;
    border-bottom: 1px solid rgba(0,0,0,0.5);
    flex-shrink: 0;
}`);

css = css.replace(
`.a-header-title {
    flex: 1;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #888;
    margin-right: 56px; /* offset for dots */
}`,
`.a-header-title {
    flex: 1;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #98989d;
    margin-right: 56px; /* offset for dots */
}`);

// 5. Update Card Body
css = css.replace(
`.a-card-body {
    flex: 1;
    background: #ffffff;
    overflow: hidden;
}`,
`.a-card-body {
    flex: 1;
    background: #1c1c1e;
    overflow: hidden;
}`);

// 6. Fix Skills grid bg
css = css.replace(
`.a-skills-grid img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 16px;
    transition: transform 0.2s;
}`,
`.a-skills-grid img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
    background: #2c2c2e;
    border-radius: 16px;
    transition: transform 0.2s;
}`);

// 7. Fix Briefs
css = css.replace(
`.a-brief-title {
    font-size: 14px;
    font-weight: 800;
    color: #111;
    margin: 0 0 8px 0;
    letter-spacing: 1px;
}`,
`.a-brief-title {
    font-size: 14px;
    font-weight: 800;
    color: #f2f2f7;
    margin: 0 0 8px 0;
    letter-spacing: 1px;
}`);
css = css.replace(
`.a-brief-text {
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    margin: 0;
}`,
`.a-brief-text {
    font-size: 14px;
    line-height: 1.6;
    color: #aeaeb2;
    margin: 0;
}`);

// 8. Add Hero Window CSS
const heroCSS = `
/* HERO WINDOW - PORTFOLIO */
.hero-window-wrapper {
    margin-bottom: 60px;
    width: 100%;
}
.hero-window {
    width: 100%;
    height: 500px;
    background: radial-gradient(circle at center, #2c2c2e 0%, #1c1c1e 100%);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.hero-text-container {
    text-align: center;
    z-index: 10;
}
.hero-text-subtitle {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    font-size: 16px;
    letter-spacing: 4px;
    color: #aeaeb2;
    text-transform: uppercase;
    margin-bottom: 10px;
}
.hero-text-title {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    font-size: 80px;
    font-weight: 100;
    letter-spacing: -2px;
    color: #ffffff;
    margin: 0;
    text-transform: uppercase;
    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

/* FLOATING ICONS */
.floating-icon {
    position: absolute;
    width: 80px;
    height: 80px;
    object-fit: contain;
    filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5));
    border-radius: 20px;
    z-index: 5;
    animation: float-icon 8s ease-in-out infinite alternate;
}
.floating-icon.blur {
    filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5)) blur(4px);
    z-index: 1;
}

.icon-1 { top: 15%; left: 15%; animation-delay: 0s; width: 100px; height: 100px; }
.icon-2 { bottom: 20%; left: 25%; animation-delay: -2s; width: 70px; height: 70px; }
.icon-3 { top: 25%; right: 20%; animation-delay: -4s; width: 90px; height: 90px; }
.icon-4 { bottom: 15%; right: 15%; animation-delay: -1s; width: 120px; height: 120px; }

@keyframes float-icon {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(-30px) rotate(15deg); }
}

@media (max-width: 768px) {
    .hero-text-title { font-size: 50px; }
    .hero-window { height: 350px; }
    .floating-icon { width: 60px; height: 60px; }
    .icon-1 { width: 80px; height: 80px; }
    .icon-4 { width: 90px; height: 90px; }
}
`;

css += '\n' + heroCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('styles.css updated for Dark Mode!');
