const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

// Fix 1: Marquee CSS mask
const oldMarqueeFade = `        .marquee-container::before, .marquee-container::after {
            content: '';
            position: absolute;
            top: 0; bottom: 0;
            width: 150px;
            z-index: 2;
            pointer-events: none;
        }
        .marquee-container::before {
            left: 0;
            background: linear-gradient(to right, #0A0A0A, transparent);
        }
        .marquee-container::after {
            right: 0;
            background: linear-gradient(to left, #0A0A0A, transparent);
        }`;
const newMarqueeFade = `        /* Fixed mask for seamless fading without blocking dots */
        .marquee-container {
            -webkit-mask-image: linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent);
            mask-image: linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent);
        }`;
if(html.includes(oldMarqueeFade)) {
    html = html.replace(oldMarqueeFade, newMarqueeFade);
}

// Fix 2: Marquee spacing
html = html.replace('<div class="col-12" style="margin: 20px 0;">', '<div class="col-12" style="margin: 60px 0;">');

// Fix 3: Note style background (make it blend better)
const oldNoteStyle = `        .win-titlebar.note-style {
            justify-content: center;
            background: rgba(255,255,255,0.02);
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }`;
const newNoteStyle = `        .win-titlebar.note-style {
            justify-content: center;
            background: rgba(20, 20, 22, 0.7);
            border-bottom: 1px solid rgba(255,255,255,0.03);
        }`;
if(html.includes(oldNoteStyle)) {
    html = html.replace(oldNoteStyle, newNoteStyle);
}

// Make the body of Note window match better
html = html.replace('background: rgba(0,0,0,0.4);', 'background: rgba(20, 20, 22, 0.4);');

fs.writeFileSync('portfolio/index.html', html);
console.log('Fixed styles.');
