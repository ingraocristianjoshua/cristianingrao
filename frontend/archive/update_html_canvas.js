const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find the start and end of .portfolio-projects
const projectsStartStr = '<div class="portfolio-projects">';
const projectsStartIdx = html.indexOf(projectsStartStr);

if (projectsStartIdx !== -1) {
    // Find the end of this div. We know it ends before </div>\n    <div id="portfolio-scrollable-content"> ? No, it ends before the script tag.
    // Let's just use regex to replace everything from <div class="portfolio-projects"> to the last </div> before <script src="script.js">
    
    const replacementHTML = `
            <div id="projects-canvas">
                <div class="projects-canvas-title">I MIEI PROGETTI</div>
                
                <!-- BRICKLINK CLUSTER -->
                <div class="canvas-window project-folder" style="top: 150px; left: 10%; width: 300px; transform: rotate(-2deg);">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                    </div>
                    <div class="folder-content">
                        <img src="./assets/icons/folder.png" alt="Folder" class="giant-folder-icon">
                        <h2>Bricklink</h2>
                        <p>Piattaforma Educativa</p>
                    </div>
                </div>
                
                <div class="canvas-window project-text" style="top: 120px; left: calc(10% + 340px); width: 400px; transform: rotate(1deg);">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">Brief.txt</div>
                    </div>
                    <div class="textedit-style">
                        <h4>BRIEF</h4>
                        <p>Sviluppare un'enciclopedia interattiva basata sui mattoncini per imparare giocando.</p>
                        <h4 style="margin-top: 15px;">SFIDA</h4>
                        <p>Creare un'interfaccia immersiva e gamificata, in grado di gestire un database complesso in TypeScript, garantendo una user experience fluida per tutte le età.</p>
                    </div>
                </div>
                
                <div class="canvas-window project-media" style="top: 350px; left: 15%; width: 700px;">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">Bricklink-Web.mp4</div>
                    </div>
                    <div class="media-content" style="background: #e3f2fd; padding: 50px; text-align: center;">
                        <img src="https://bricklinkedu.it/assets/icon/favicon.png" alt="Bricklink" style="width:120px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));">
                        <h1 style="color: #0058d0; margin-top: 20px; font-weight: 900; font-size: 40px; font-family: 'Inter', sans-serif;">BRICKLINK</h1>
                        <p style="color: #555; margin-top: 10px; font-size: 18px;">www.bricklinkedu.it</p>
                        <button onclick="window.open('https://bricklinkedu.it', '_blank')" class="btn-canvas" style="margin-top:20px;">Visita il Sito</button>
                    </div>
                </div>

                <!-- GRADUAM CLUSTER -->
                <div class="canvas-window project-folder" style="top: 950px; right: 10%; width: 300px; transform: rotate(2deg);">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                    </div>
                    <div class="folder-content">
                        <img src="./assets/icons/folder.png" alt="Folder" class="giant-folder-icon" style="filter: hue-rotate(280deg) saturate(2);">
                        <h2>Graduam</h2>
                        <p>Web App (Next.js)</p>
                    </div>
                </div>
                
                <div class="canvas-window project-text" style="top: 920px; right: calc(10% + 340px); width: 400px; transform: rotate(-1deg);">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">Concept.rtf</div>
                    </div>
                    <div class="textedit-style">
                        <h4>BRIEF</h4>
                        <p>Un calcolatore universitario elegante per la media ponderata e il voto di laurea, dedicato agli studenti.</p>
                        <h4 style="margin-top: 15px;">SFIDA</h4>
                        <p>Trasformare uno strumento noioso (il calcolatore di voti) in una web app premium, fluida e dal design ispirato agli standard Apple, utilizzando Next.js e React.</p>
                    </div>
                </div>
                
                <div class="canvas-window project-media" style="top: 1150px; right: 15%; width: 700px;">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">Graduam-App.png</div>
                    </div>
                    <div class="media-content" style="background: #f3e5f5; padding: 50px; text-align: center;">
                        <img src="https://graduam.it/icon.svg?icon.0wxbkkq3j-bi5.svg" alt="Graduam" style="width:120px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));">
                        <h1 style="color: #6a1b9a; margin-top: 20px; font-weight: 900; font-size: 40px; font-family: 'Inter', sans-serif;">GRADUAM</h1>
                        <p style="color: #555; margin-top: 10px; font-size: 18px;">graduam.it</p>
                        <button onclick="window.open('https://graduam.it', '_blank')" class="btn-canvas" style="margin-top:20px;">Visita il Sito</button>
                    </div>
                </div>
                
                
                <!-- ECOPALMAPS CLUSTER -->
                <div class="canvas-window project-folder" style="top: 1750px; left: 10%; width: 300px; transform: rotate(-1.5deg);">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                    </div>
                    <div class="folder-content">
                        <img src="./assets/icons/folder.png" alt="Folder" class="giant-folder-icon" style="filter: hue-rotate(90deg) saturate(1.5);">
                        <h2>EcoPalMaps</h2>
                        <p>Piattaforma Ecologica</p>
                    </div>
                </div>
                
                <div class="canvas-window project-text" style="top: 1720px; left: calc(10% + 340px); width: 400px; transform: rotate(1.5deg);">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">Eco-Brief.txt</div>
                    </div>
                    <div class="textedit-style">
                        <h4>BRIEF</h4>
                        <p>Valorizzare i luoghi culturali del territorio di Palma di Montechiaro attraverso una mappa ecologica.</p>
                        <h4 style="margin-top: 15px;">SFIDA</h4>
                        <p>Integrare mappe dinamiche e percorsi naturalistici in un'unica piattaforma accessibile e veloce, per promuovere il turismo sostenibile.</p>
                    </div>
                </div>
                
                <div class="canvas-window project-media" style="top: 1950px; left: 15%; width: 700px;">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">EcoPalMaps.mp4</div>
                    </div>
                    <div class="media-content" style="background: #e8f5e9; padding: 50px; text-align: center;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Leaf_icon_15.svg" alt="EcoPalMaps" style="width:120px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));">
                        <h1 style="color: #2e7d32; margin-top: 20px; font-weight: 900; font-size: 40px; font-family: 'Inter', sans-serif;">ECOPALMAPS</h1>
                        <p style="color: #555; margin-top: 10px; font-size: 18px;">ecopalmaps.com</p>
                        <button onclick="window.open('https://ecopalmaps.com', '_blank')" class="btn-canvas" style="margin-top:20px;">Visita il Sito</button>
                    </div>
                </div>
                
            </div>
`;
    
    // Replace from <div class="portfolio-projects"> down to the last </div> before script tag
    const preProjects = html.substring(0, projectsStartIdx);
    
    // Find script tag
    const scriptIdx = html.indexOf('<script src="script.js"></script>');
    if(scriptIdx !== -1) {
        // We need to walk backwards from script tag to find the closing div of #portfolio-scrollable-content
        // Actually, #portfolio-scrollable-content is closed BEFORE script.
        const postProjects = html.substring(scriptIdx - 15); // approximate, we will just use a specific replace
        
        let newHtml = html.replace(/<div class="portfolio-projects">[\s\S]*?<\/div>\s*<\/div>\s*<script src="script.js"><\/script>/, 
            replacementHTML + '\n    </div>\n    <script src="script.js"></script>');
            
        fs.writeFileSync('index.html', newHtml, 'utf8');
        console.log('index.html updated with new projects layout!');
    } else {
        console.log('Could not find script tag');
    }
} else {
    console.log('Could not find .portfolio-projects');
}
