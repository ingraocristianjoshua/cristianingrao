const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const injection = `
            <!-- BENTO / DESKTOP SECTION -->
            <div class="portfolio-bento">
                <div class="bento-bg-dots"></div>
                
                <!-- Notes: Biografia -->
                <div class="bento-window bento-notes fade-up delay-1">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">Biografia</div>
                    </div>
                    <div class="b-win-body">
                        <h3>Mi chiamo Cristian Ingrao e sono un Software Developer.</h3>
                        <p>Lavoro su <strong>Web Apps, Backend</strong> e <strong>Mobile</strong>. Il codice per me è come un grande <strong>puzzle</strong>, dove ogni pezzo deve incastrarsi perfettamente sotto un'architettura solida, mantenendo sempre un occhio di riguardo per l'estetica UI/UX.</p>
                        <p>Quando non programmo, esploro l'Intelligenza Artificiale, seguo le ultime innovazioni tecnologiche e gioco ai videogiochi.</p>
                    </div>
                </div>

                <!-- Photo Booth: Foto -->
                <div class="bento-window bento-photo fade-up delay-2">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">Photo Booth</div>
                    </div>
                    <div class="b-win-body">
                        <img src="./assets/images/profile.jpg" alt="Cristian Ingrao" id="bento-profile-img">
                    </div>
                    <div class="b-win-footer">
                        <div class="b-shutter-btn"></div>
                    </div>
                </div>

                <!-- Mail/Calendar: Formazione -->
                <div class="bento-window bento-edu fade-up delay-3">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">ESPERIENZE</div>
                    </div>
                    <div class="b-win-body">
                        <div class="edu-item">
                            <div class="edu-date">OTTOBRE 2022 - IN CORSO</div>
                            <div class="edu-card blue">
                                <h4>Laurea in Informatica</h4>
                                <p>Università degli Studi di Palermo. Sviluppo di architetture software complesse, algoritmi e progettazione web e mobile avanzata.</p>
                            </div>
                        </div>
                        <div class="edu-item" style="margin-top:15px;">
                            <div class="edu-date">SETTEMBRE 2024</div>
                            <div class="edu-card green">
                                <h4>Full-stack Developer</h4>
                                <p>Sviluppo di applicazioni Web (Next.js, React) e sistemi Backend per progetti come Graduam, EcoPalMaps e Bricklink.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Finder: Competenze -->
                <div class="bento-window bento-skills fade-up delay-4">
                    <div class="b-win-header">
                        <div class="b-win-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                        <div class="b-win-title">Caratteristiche</div>
                    </div>
                    <div class="b-win-body finder-grid-bento">
                        <div class="b-icon-file">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java">
                            <span>Java</span>
                        </div>
                        <div class="b-icon-file">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript">
                            <span>TypeScript</span>
                        </div>
                        <div class="b-icon-file">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React">
                            <span>React</span>
                        </div>
                        <div class="b-icon-file">
                            <img src="./assets/icons/folder.png" alt="Altri">
                            <span>Tante altre...</span>
                        </div>
                    </div>
                </div>

                <!-- Contatti Popup -->
                <div class="bento-window bento-contact fade-up delay-5">
                    <div class="b-win-body">
                        <h4 style="margin-top:0; color:#444;">Contatti</h4>
                        <div class="contact-list">
                            <div class="contact-item">📧 cristianingrao@gmail.com</div>
                            <div class="contact-item">📸 @cristian.ingrao</div>
                            <div class="contact-item">💼 linkedin.com/in/cristianingrao</div>
                            <div class="contact-item">🐙 github.com/ingraocristianjoshua</div>
                        </div>
                        <button class="btn-primary" style="width:100%; margin-top:15px; background: #007aff;">Disponibile per nuovi progetti</button>
                    </div>
                </div>

                <!-- Tools Mini Dock -->
                <div class="bento-dock-container fade-up delay-6">
                    <div class="bento-dock-label">Tool che utilizzo</div>
                    <div class="bento-dock">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" class="bento-dock-icon">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" class="bento-dock-icon">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" class="bento-dock-icon">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" class="bento-dock-icon">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" class="bento-dock-icon">
                    </div>
                </div>
            </div>
`;

if (html.includes('<div class="portfolio-projects">')) {
    html = html.replace('<div class="portfolio-projects">', injection + '\n            <div class="portfolio-projects">');
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("HTML Injected!");
} else {
    console.log("Anchor not found!");
}
