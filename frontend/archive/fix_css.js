const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const newCss = `        /* Windows Grid (Modular Masonry) */
        .windows-container {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            justify-content: center;
            align-items: start;
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .col-12 { grid-column: span 12; }
        .col-8 { grid-column: span 8; }
        .col-7 { grid-column: span 7; }
        .col-6 { grid-column: span 6; }
        .col-5 { grid-column: span 5; }
        .col-4 { grid-column: span 4; }
        
        .mac-window {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .win-body {
            flex-grow: 1;
        }
        .win-titlebar.note-style {
            justify-content: center;
            background: rgba(255,255,255,0.02);
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .win-titlebar.folder-style {
            justify-content: flex-start;
            background: rgba(255,255,255,0.02);
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .win-titlebar.blank-style {
            display: none;
        }
        
        .portfolio-dock {
            background: rgba(28, 28, 30, 0.7);
            backdrop-filter: blur(40px) saturate(180%);
            -webkit-backdrop-filter: blur(40px) saturate(180%);
            border-radius: 28px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 15px 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }`;

// Replace everything between /* Windows Grid */ and /* Projects (Finder App) */ or something similar
const startIndex = html.indexOf('/* Windows Grid */');
const endIndex = html.indexOf('/* Contacts */');

if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + newCss + '\n\n        ' + html.substring(endIndex);
    
    // Also fix mobile queries
    html = html.replace('.windows-container { grid-template-columns: 1fr; }', '.windows-container { display: flex; flex-direction: column; } \n            .col-12, .col-8, .col-7, .col-6, .col-5, .col-4 { width: 100%; grid-column: span 12 !important; }');
    
    fs.writeFileSync('portfolio/index.html', html);
    console.log('CSS replaced successfully');
} else {
    console.log('Could not find CSS boundaries');
}
