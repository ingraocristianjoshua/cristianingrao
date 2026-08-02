const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldWindowRegex = /<div class="mac-window" id="win-folder-projects"[\s\S]*?<div class="mac-window" id="win-folder-miniature"/;

const newWindowHTML = `<div class="mac-window" id="win-portfolio" style="display:none; top:80px; left:150px; width:850px; height:650px;">
        <div class="win-titlebar titlebar-light" onmousedown="startDrag(event, 'win-portfolio')">
            <div class="traffic-lights">
                <div class="tl red" onclick="closeWin('win-portfolio')"></div>
                <div class="tl yellow" onclick="minimizeWin(this.closest('.mac-window').id)"></div>
                <div class="tl green" onclick="maximizeWin(this.closest('.mac-window').id)"></div>
            </div>
            <span class="win-title">Portfolio - Cristian Ingrao</span>
        </div>
        <div class="win-body" style="padding:0; background: #fafafa; overflow-y:auto; height: calc(100% - 30px); border-radius: 0 0 10px 10px;">
            <!-- HERO SECTION -->
            <div class="portfolio-hero">
                <div class="hero-bg-dots"></div>
                <div class="hero-content">
                    <h2 class="hero-subtitle">SOFTWARE ENGINEERING</h2>
                    <h1 class="hero-title">PORTFOLIO</h1>
                    <div class="hero-badge">Cristian Ingrao</div>
                    
                    <!-- Floating Icons -->
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" class="float-icon float-1" alt="Figma">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" class="float-icon float-2" alt="React">
                    <img src="https://img.icons8.com/color/512/mac-folder.png" class="float-icon float-3" alt="Folder">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" class="float-icon float-4" alt="JS">
                </div>
            </div>

            <!-- PROJECTS SECTION -->
            <div class="portfolio-projects">
                <h3 class="section-title">I Miei Progetti</h3>
                <div class="projects-grid">
                    
                    <!-- Bricklink -->
                    <div class="project-card">
                        <div class="project-img-wrapper" style="background: #e3f2fd;">
                            <img src="https://bricklinkedu.it/assets/icon/favicon.png" class="project-logo" alt="Bricklink">
                        </div>
                        <div class="project-info">
                            <h4>Bricklink</h4>
                            <p>Un'enciclopedia interattiva e piattaforma educativa basata sui mattoncini, sviluppata in TypeScript.</p>
                            <button onclick="window.open('https://bricklinkedu.it', '_blank')" class="btn-primary">Visita il Sito</button>
                        </div>
                    </div>

                    <!-- Gradly -->
                    <div class="project-card">
                        <div class="project-img-wrapper" style="background: #f3e5f5;">
                            <img src="https://togradly.vercel.app/icon.svg?icon.0wxbkkq3j-bi5.svg" class="project-logo" alt="Gradly">
                        </div>
                        <div class="project-info">
                            <h4>Gradly</h4>
                            <p>Il calcolatore universitario più elegante per media ponderata e voto di laurea. Piattaforma Next.js.</p>
                            <button onclick="window.open('https://togradly.vercel.app', '_blank')" class="btn-primary">Visita il Sito</button>
                        </div>
                    </div>

                    <!-- EcoPalMaps -->
                    <div class="project-card">
                        <div class="project-img-wrapper" style="background: #e8f5e9;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Leaf_icon_15.svg" class="project-logo" style="width: 50px;" alt="EcoPalMaps">
                        </div>
                        <div class="project-info">
                            <h4>EcoPalMaps</h4>
                            <p>Piattaforma ecologica per la valorizzazione dei luoghi culturali del territorio di Palma di Montechiaro.</p>
                            <button onclick="window.open('https://ecopalmaps.com', '_blank')" class="btn-primary">Visita il Sito</button>
                        </div>
                    </div>

                    <!-- AFAM -->
                    <div class="project-card">
                        <div class="project-img-wrapper" style="background: #ffebee;">
                            <img src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" class="project-logo" style="width: 50px;" alt="AFAM">
                        </div>
                        <div class="project-info">
                            <h4>AFAM</h4>
                            <p>Progetto software universitario scritto interamente in linguaggio Java.</p>
                            <button onclick="window.open('https://github.com/ingraocristianjoshua/afam', '_blank')" class="btn-secondary">Vedi Repository</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="mac-window" id="win-folder-miniature"`;

html = html.replace(oldWindowRegex, newWindowHTML);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed HTML with win-portfolio");
