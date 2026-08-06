const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

const appleGridCSS = `
/* APPLE BENTO GRID */
#apple-bento-grid-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
}

.apple-canvas-title {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -1.5px;
    color: #111;
    margin-bottom: 40px;
}

.apple-bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 200px;
    gap: 30px;
}

/* Base Card Style */
.apple-card {
    background: #ffffff;
    border-radius: 32px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
}

.apple-card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05);
}

/* Column/Row Spans */
.a-col-1 { grid-column: span 1; }
.a-col-2 { grid-column: span 2; }
.a-col-3 { grid-column: span 3; }
.a-col-4 { grid-column: span 4; }

.a-row-1 { grid-row: span 1; }
.a-row-2 { grid-row: span 2; }
.a-row-3 { grid-row: span 3; }

/* Headers (macOS Style) */
.a-card-header {
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: #fdfdfd;
    border-bottom: 1px solid rgba(0,0,0,0.04);
    flex-shrink: 0;
}
.a-mac-dots {
    display: flex;
    gap: 8px;
}
.a-mac-dots span {
    width: 12px; height: 12px; border-radius: 50%;
    border: 0.5px solid rgba(0,0,0,0.1);
}
.a-mac-dots .r { background: #FF5F56; }
.a-mac-dots .y { background: #FFBD2E; }
.a-mac-dots .g { background: #27C93F; }

.a-header-title {
    flex: 1;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #888;
    margin-right: 56px; /* offset for dots */
}

/* Bodies */
.a-card-body {
    flex: 1;
    background: #ffffff;
    overflow: hidden;
}

/* Skills specific */
.a-skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 15px;
    padding: 20px;
}
.a-skills-grid img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 16px;
    transition: transform 0.2s;
}
.a-skills-grid img:hover { transform: scale(1.1); }


/* Project Media specific */
.a-project-media .a-card-body { padding: 0; }
.a-media-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 40px;
}
.a-proj-logo {
    width: 100px;
    height: 100px;
    object-fit: contain;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));
    margin-bottom: 20px;
}
.a-media-content h1 {
    font-weight: 900;
    font-size: 36px;
    letter-spacing: -1px;
    margin: 0;
}

/* Briefs */
.a-brief-title {
    font-size: 14px;
    font-weight: 800;
    color: #111;
    margin: 0 0 8px 0;
    letter-spacing: 1px;
}
.a-brief-text {
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    margin: 0;
}

/* Responsive Mobile */
@media (max-width: 1024px) {
    .apple-bento-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .a-col-3 { grid-column: span 2; }
}

@media (max-width: 650px) {
    .apple-bento-grid {
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
    }
    .a-col-2, .a-col-3 { grid-column: span 1; }
    .a-row-1, .a-row-2, .a-row-3 { grid-row: auto; min-height: 250px; }
    
    .apple-canvas-title { font-size: 36px; }
}
`;

css += '\n' + appleGridCSS;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('CSS updated to Apple Bento Grid!');
