const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Update Portfolio Scrollable Content Background
css = css.replace(
`#portfolio-scrollable-content {
    position: relative;
    width: 100%;
    z-index: 10;
    background: #0d0d0f; /* Dark elegant background */
    padding-bottom: 100px; /* buffer at bottom */
}`,
`#portfolio-scrollable-content {
    position: relative;
    width: 100%;
    z-index: 10;
    background: #f5f5f7;
    background-image: radial-gradient(#d1d1d6 2px, transparent 2px);
    background-size: 40px 40px;
    padding-bottom: 150px;
}`);

// 2. Change .portfolio-bento background transparent was already set, but let's check
css = css.replace(
`/* Fix bento container */
.portfolio-bento {
    background: transparent !important; /* use the OS wallpaper */
}`,
`/* Fix bento container */
.portfolio-bento {
    position: relative;
    background: transparent !important;
    min-height: 800px; /* ensure space for absolute items */
}`);

// 3. Redesign .bento-window
css = css.replace(
`/* Base Window Style for Bento Items */
.bento-window {
    position: absolute;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 20px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.8);
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
    display: flex;
    flex-direction: column;
}`,
`/* Base Window Style for Bento Items */
.bento-window, .canvas-window {
    position: absolute;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05);
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
    display: flex;
    flex-direction: column;
}`);

css = css.replace(
`.b-win-header {
    height: 38px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    background: rgba(255,255,255,0.4);
    border-bottom: 1px solid rgba(0,0,0,0.05);
}`,
`.b-win-header {
    height: 38px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    background: #ffffff;
    border-bottom: 1px solid rgba(0,0,0,0.06);
}`);

// 4. Update the Bento Header Title to be dark gray like macOS
css = css.replace(
`.b-win-title {
    flex: 1;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #333;
    margin-right: 42px; /* offset dots to center */
}`,
`.b-win-title {
    flex: 1;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #555;
    margin-right: 42px; /* offset dots to center */
}`);

// 5. Append new CSS for #projects-canvas
const canvasCss = `
/* PROJECTS CANVAS */
#projects-canvas {
    position: relative;
    width: 100%;
    min-height: 2500px;
    margin-top: 50px;
}
.projects-canvas-title {
    text-align: center;
    font-size: 60px;
    font-weight: 900;
    letter-spacing: -2px;
    color: rgba(0,0,0,0.05);
    position: absolute;
    top: 20px;
    width: 100%;
    font-family: 'Inter', sans-serif;
    pointer-events: none;
}
.folder-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: #ffffff;
}
.giant-folder-icon {
    width: 120px;
    height: 120px;
    object-fit: contain;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));
    margin-bottom: 20px;
}
.folder-content h2 {
    font-family: 'Inter', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #111;
    margin: 0 0 5px 0;
}
.folder-content p {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #666;
    margin: 0;
}
.textedit-style {
    flex: 1;
    padding: 30px;
    background: #ffffff;
}
.textedit-style h4 {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: #111;
    margin: 0 0 10px 0;
    letter-spacing: 1px;
}
.textedit-style p {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    margin: 0;
}
.media-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}
.btn-canvas {
    background: #111;
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 30px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    transition: transform 0.2s;
}
.btn-canvas:hover {
    transform: scale(1.05);
}

@media (max-width: 900px) {
    #projects-canvas {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        min-height: auto;
        padding: 40px 20px;
    }
    .canvas-window {
        position: relative !important;
        top: auto !important;
        left: auto !important;
        right: auto !important;
        transform: none !important;
        width: 100% !important;
        max-width: 400px;
    }
    .projects-canvas-title {
        position: relative;
        top: 0;
        font-size: 40px;
        margin-bottom: 20px;
    }
}
`;

css += '\n' + canvasCss;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('CSS updated for Light Theme Canvas');
