const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const heroHTML = `
                <!-- HERO WINDOW (PORTFOLIO) -->
                <div class="hero-window-wrapper">
                    <div class="apple-card hero-window">
                        <div class="a-card-header" style="position: absolute; top: 0; width: 100%; z-index: 20; background: rgba(44, 44, 46, 0.8); backdrop-filter: blur(10px);">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title" style="color: #fff;">Portfolio - Cristian Ingrao</div>
                        </div>
                        
                        <!-- Floating Icons -->
                        <img src="./assets/icons/folder.png" class="floating-icon icon-1 blur" alt="Folder">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" class="floating-icon icon-2" alt="React">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" class="floating-icon icon-3 blur" style="filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5)) invert(1) blur(3px);" alt="Apple">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" class="floating-icon icon-4" alt="TS">
                        
                        <!-- Center Text -->
                        <div class="hero-text-container">
                            <div class="hero-text-subtitle">Software Development</div>
                            <h2 class="hero-text-title">PORTFOLIO</h2>
                        </div>
                    </div>
                </div>
`;

// Insert before the <div class="apple-canvas-title" style="margin-top: 80px;">I Miei Progetti</div>
const targetString = '<div class="apple-canvas-title" style="margin-top: 80px;">I Miei Progetti</div>';
html = html.replace(targetString, heroHTML + '\n                ' + targetString);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Hero window added to HTML!');
