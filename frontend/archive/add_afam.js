const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const afamCluster = `
                <!-- AFAM CLUSTER -->
                <div class="canvas-window project-folder" style="top: 2550px; right: 10%; width: 300px; transform: rotate(1deg);">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                    </div>
                    <div class="folder-content">
                        <img src="./assets/icons/folder.png" alt="Folder" class="giant-folder-icon" style="filter: hue-rotate(330deg) saturate(1.2);">
                        <h2>AFAM</h2>
                        <p>Software Java</p>
                    </div>
                </div>
                
                <div class="canvas-window project-text" style="top: 2520px; right: calc(10% + 340px); width: 400px; transform: rotate(-1deg);">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">README.md</div>
                    </div>
                    <div class="textedit-style">
                        <h4>BRIEF</h4>
                        <p>Progetto universitario scritto interamente in Java per la gestione di accademie e conservatori.</p>
                        <h4 style="margin-top: 15px;">SFIDA</h4>
                        <p>Creare un'architettura object-oriented solida e scalabile, applicando design pattern avanzati e best practices dell'ingegneria del software.</p>
                    </div>
                </div>
                
                <div class="canvas-window project-media" style="top: 2750px; right: 15%; width: 700px;">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">Github-Repo.app</div>
                    </div>
                    <div class="media-content" style="background: #ffebee; padding: 50px; text-align: center;">
                        <img src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" alt="AFAM" style="width:120px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));">
                        <h1 style="color: #c62828; margin-top: 20px; font-weight: 900; font-size: 40px; font-family: 'Inter', sans-serif;">AFAM SOFTWARE</h1>
                        <p style="color: #555; margin-top: 10px; font-size: 18px;">GitHub Repository</p>
                        <button onclick="window.open('https://github.com/ingraocristianjoshua/afam', '_blank')" class="btn-canvas" style="margin-top:20px;">Vedi Codice</button>
                    </div>
                </div>
`;

// Insert it before the closing </div> of #projects-canvas
html = html.replace(
    `            </div>\n    </div>\n    <script src="script.js"></script>`,
    `${afamCluster}            </div>\n    </div>\n    <script src="script.js"></script>`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('AFAM added.');
