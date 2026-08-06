const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const appleGridHTML = `
            <div id="apple-bento-grid-container">
                <div class="apple-canvas-title">Portfolio</div>
                
                <div class="apple-bento-grid">
                    
                    <!-- Bio (Large) -->
                    <div class="apple-card a-col-2 a-row-2">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Biografia</div>
                        </div>
                        <div class="a-card-body" style="padding: 30px;">
                            <h3 style="font-size: 24px; font-weight: 800; margin: 0 0 15px 0;">Mi chiamo Cristian Ingrao e sono un Software Developer.</h3>
                            <p style="font-size: 15px; line-height: 1.6; color: #555; margin-bottom: 15px;">Lavoro su <strong>Web Apps, Backend</strong> e <strong>Mobile</strong>. Il codice per me è come un grande <strong>puzzle</strong>, dove ogni pezzo deve incastrarsi perfettamente sotto un'architettura solida, mantenendo sempre un occhio di riguardo per l'estetica UI/UX.</p>
                            <p style="font-size: 15px; line-height: 1.6; color: #555; margin: 0;">Quando non programmo, esploro l'Intelligenza Artificiale, seguo le ultime innovazioni tecnologiche e gioco ai videogiochi.</p>
                        </div>
                    </div>

                    <!-- Photo (Tall) -->
                    <div class="apple-card a-col-1 a-row-2" style="display:flex; flex-direction:column;">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Photo Booth</div>
                        </div>
                        <div class="a-card-body" style="flex:1; display:flex; justify-content:center; align-items:center; padding: 20px;">
                            <img src="./assets/images/profile-new.jpg" alt="Cristian Ingrao" style="width: 180px; height: 180px; object-fit: cover; border-radius: 50%; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
                        </div>
                    </div>

                    <!-- Skills (Square) -->
                    <div class="apple-card a-col-1 a-row-1">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Skills</div>
                        </div>
                        <div class="a-card-body a-skills-grid">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="NodeJS">
                        </div>
                    </div>
                    
                    <!-- Social (Square) -->
                    <div class="apple-card a-col-1 a-row-1" style="background: transparent; box-shadow: none; border: none; overflow: visible;">
                        <div class="iphone-17-mockup" onclick="window.open('https://instagram.com/cristianingrao', '_blank')" style="margin: 0 auto; height: 100%;">
                            <div class="iphone-notch"></div>
                            <img src="./assets/images/ig_screenshot.png" alt="Instagram Profile">
                            <div class="iphone-home-bar"></div>
                        </div>
                    </div>
                    
                    <!-- Edu (Wide) -->
                    <div class="apple-card a-col-2 a-row-1">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Formazione</div>
                        </div>
                        <div class="a-card-body" style="padding: 20px; display: flex; gap: 20px; height: 100%;">
                            <div class="edu-card blue" style="flex: 1; margin: 0; display:flex; flex-direction:column; justify-content:center;">
                                <div class="edu-date">OTTOBRE 2022 - IN CORSO</div>
                                <h4>Laurea in Informatica</h4>
                                <p>Università di Palermo.</p>
                            </div>
                            <div class="edu-card green" style="flex: 1; margin: 0; display:flex; flex-direction:column; justify-content:center;">
                                <div class="edu-date">SETTEMBRE 2024</div>
                                <h4>Full-stack Developer</h4>
                                <p>App Web (Next.js, React) e Backend.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Contatti (Square) -->
                    <div class="apple-card a-col-1 a-row-1" style="display:flex; flex-direction:column; justify-content:center; padding: 20px;">
                        <h4 style="margin-top:0; color:#111; font-size:18px;">Contatti</h4>
                        <div class="contact-list" style="margin-top: 15px;">
                            <div class="contact-item">📧 cristianingrao@gmail.com</div>
                            <div class="contact-item">📸 @cristianingrao</div>
                            <div class="contact-item">💼 in/cristianingrao</div>
                        </div>
                    </div>

                </div>
                
                <div class="apple-canvas-title" style="margin-top: 80px;">I Miei Progetti</div>
                
                <div class="apple-bento-grid">
                
                    <!-- BRICKLINK -->
                    <div class="apple-card a-col-3 a-row-2 a-project-media">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Bricklink-Web.mp4</div>
                        </div>
                        <div class="a-media-content" style="background: #e3f2fd;">
                            <img src="https://bricklinkedu.it/assets/icon/favicon.png" alt="Bricklink" class="a-proj-logo">
                            <h1 style="color: #0058d0;">BRICKLINK</h1>
                            <p style="color: #555;">www.bricklinkedu.it</p>
                            <button onclick="window.open('https://bricklinkedu.it', '_blank')" class="btn-canvas">Visita il Sito</button>
                        </div>
                    </div>
                    
                    <div class="apple-card a-col-1 a-row-2">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Brief.txt</div>
                        </div>
                        <div class="a-card-body" style="padding: 25px;">
                            <h4 class="a-brief-title">BRIEF</h4>
                            <p class="a-brief-text">Sviluppare un'enciclopedia interattiva basata sui mattoncini per imparare giocando.</p>
                            <h4 class="a-brief-title" style="margin-top: 20px;">SFIDA</h4>
                            <p class="a-brief-text">Creare un'interfaccia immersiva e gamificata, in grado di gestire un database complesso in TypeScript.</p>
                        </div>
                    </div>

                    <!-- GRADUAM -->
                    <div class="apple-card a-col-1 a-row-2">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Concept.rtf</div>
                        </div>
                        <div class="a-card-body" style="padding: 25px;">
                            <h4 class="a-brief-title">BRIEF</h4>
                            <p class="a-brief-text">Un calcolatore universitario elegante per la media ponderata e il voto di laurea, dedicato agli studenti.</p>
                            <h4 class="a-brief-title" style="margin-top: 20px;">SFIDA</h4>
                            <p class="a-brief-text">Trasformare uno strumento noioso (il calcolatore di voti) in una web app premium, fluida e dal design Apple-like.</p>
                        </div>
                    </div>
                    
                    <div class="apple-card a-col-3 a-row-2 a-project-media">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Graduam-App.png</div>
                        </div>
                        <div class="a-media-content" style="background: #f3e5f5;">
                            <img src="https://graduam.it/icon.svg?icon.0wxbkkq3j-bi5.svg" alt="Graduam" class="a-proj-logo">
                            <h1 style="color: #6a1b9a;">GRADUAM</h1>
                            <p style="color: #555;">graduam.it</p>
                            <button onclick="window.open('https://graduam.it', '_blank')" class="btn-canvas">Visita il Sito</button>
                        </div>
                    </div>

                    <!-- ECOPALMAPS -->
                    <div class="apple-card a-col-3 a-row-2 a-project-media">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">EcoPalMaps.mp4</div>
                        </div>
                        <div class="a-media-content" style="background: #e8f5e9;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Leaf_icon_15.svg" alt="EcoPalMaps" class="a-proj-logo">
                            <h1 style="color: #2e7d32;">ECOPALMAPS</h1>
                            <p style="color: #555;">ecopalmaps.com</p>
                            <button onclick="window.open('https://ecopalmaps.com', '_blank')" class="btn-canvas">Visita il Sito</button>
                        </div>
                    </div>
                    
                    <div class="apple-card a-col-1 a-row-2">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Eco-Brief.txt</div>
                        </div>
                        <div class="a-card-body" style="padding: 25px;">
                            <h4 class="a-brief-title">BRIEF</h4>
                            <p class="a-brief-text">Valorizzare i luoghi culturali del territorio di Palma di Montechiaro attraverso una mappa ecologica.</p>
                            <h4 class="a-brief-title" style="margin-top: 20px;">SFIDA</h4>
                            <p class="a-brief-text">Integrare mappe dinamiche e percorsi naturalistici in un'unica piattaforma accessibile e veloce.</p>
                        </div>
                    </div>

                    <!-- AFAM -->
                    <div class="apple-card a-col-1 a-row-2">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">README.md</div>
                        </div>
                        <div class="a-card-body" style="padding: 25px;">
                            <h4 class="a-brief-title">BRIEF</h4>
                            <p class="a-brief-text">Progetto universitario scritto interamente in Java per la gestione di accademie e conservatori.</p>
                            <h4 class="a-brief-title" style="margin-top: 20px;">SFIDA</h4>
                            <p class="a-brief-text">Creare un'architettura object-oriented solida e scalabile, applicando design pattern avanzati.</p>
                        </div>
                    </div>
                    
                    <div class="apple-card a-col-3 a-row-2 a-project-media">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Github-Repo.app</div>
                        </div>
                        <div class="a-media-content" style="background: #ffebee;">
                            <img src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" alt="AFAM" class="a-proj-logo">
                            <h1 style="color: #c62828;">AFAM SOFTWARE</h1>
                            <p style="color: #555;">GitHub Repository</p>
                            <button onclick="window.open('https://github.com/ingraocristianjoshua/afam', '_blank')" class="btn-canvas">Vedi Codice</button>
                        </div>
                    </div>
                
                </div>
            </div>
`;

// Replace from <div class="portfolio-bento"> to the script tag minus the end div
const bentoStartIdx = html.indexOf('<div class="portfolio-bento">');
const scriptIdx = html.indexOf('<script src="script.js"></script>');

if (bentoStartIdx !== -1 && scriptIdx !== -1) {
    const preHTML = html.substring(0, bentoStartIdx);
    
    fs.writeFileSync('index.html', preHTML + appleGridHTML + '\n    </div>\n    <script src="script.js"></script>\n</body>\n</html>', 'utf8');
    console.log('HTML updated to Apple Bento Grid!');
} else {
    console.log('Error finding replace targets');
}
