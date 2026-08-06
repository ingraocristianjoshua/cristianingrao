const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const startIndex = html.indexOf('<div class="windows-container">');
const endIndexStr = '<!-- ABOUT WINDOW -->';
const endIndex = html.indexOf(endIndexStr);

if (startIndex !== -1 && endIndex !== -1) {
    const before = html.substring(0, startIndex);
    // Find where the windows-container exactly ends. 
    // It's followed by some closing divs before <!-- ABOUT WINDOW -->.
    // Let's just grab the remaining part of the file starting from <!-- ABOUT WINDOW -->
    // and manually add the missing closing divs (if any).
    // Actually, looking at the previous grep, the structure is:
    //         </div>
    //     </div>
    // </div>
    // <!-- ABOUT WINDOW -->
    // So there are 3 closing divs. If I just replace everything from <div class="windows-container"> down to <!-- ABOUT WINDOW -->, I can rewrite it.

    const after = html.substring(endIndex);

    const newWindowsHtml = `<div class="windows-container">
            <!-- BIO ROW -->
            <div class="mac-window reveal col-8" id="win-bio">
                <div class="win-titlebar">
                    <div class="win-controls">
                        <div class="tl red"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">Biografia</span>
                </div>
                <div class="win-body" style="background: transparent;">
                    <div class="bio-content">
                        <div class="bio-text">
                            <span class="bio-date">Milano, Italia &nbsp;|&nbsp; <span id="bento-time">--:--</span></span>
                            <h2>Ciao, sono Cristian Joshua Ingrao.</h2>
                            <p>Sono un Ingegnere Informatico (Laurea L-8). Il mio percorso professionale si sviluppa all'intersezione tra l'ingegneria del software e il design delle interfacce. Sono specializzato nella progettazione di architetture di sistema scalabili e nello sviluppo di applicazioni web full-stack, con un focus sull'ottimizzazione delle performance e sulla qualità del codice.</p>
                            <p>Oltre al rigore algoritmico e alla progettazione backend, nutro un forte interesse per lo sviluppo frontend moderno (React, Next.js) e per i principi della User Experience. Il mio obiettivo è realizzare prodotti digitali che non solo risolvano problemi complessi in modo efficiente, ma che offrano interfacce intuitive, accessibili e curate in ogni singolo dettaglio.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mac-window reveal col-4" id="win-photo">
                <div class="win-titlebar">
                    <div class="win-controls">
                        <div class="tl red"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">Photo Booth</span>
                </div>
                <div class="win-body p-0" style="display: flex; flex-direction: column; background: #1C1C1E; height: 100%;">
                    <div style="flex: 1; padding: 15px;">
                        <div style="width: 100%; height: 100%; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; background: #000; display: flex; justify-content: center; align-items: center;">
                            <img src="../profile_pic.jpg" alt="Cristian Ingrao" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                    <div style="height: 64px; background: #2C2C2E; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: center; align-items: center;">
                        <div style="width: 44px; height: 44px; border-radius: 50%; background: #ffffff; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: transform 0.1s; margin: 0 auto; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'">
                            <div style="width: 36px; height: 36px; border-radius: 50%; background: #ff3b30; border: 1px solid rgba(0,0,0,0.1);"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MAC OS DOCK ROW -->
            <div class="mac-dock-container col-12">
                <div class="mac-dock">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" class="dock-app" title="Python">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" class="dock-app dock-app-yellow" title="JavaScript">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" class="dock-app" title="React">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" class="dock-app" title="Node.js">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" class="dock-app" title="C++">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" class="dock-app" title="MySQL">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" class="dock-app" title="Git">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" class="dock-app" title="Linux">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" class="dock-app" title="VS Code">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" class="dock-app" title="HTML5">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" class="dock-app" title="CSS3">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" class="dock-app" title="TypeScript">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" class="dock-app" title="Java">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" class="dock-app" style="filter: invert(1);" title="GitHub">
                </div>
            </div>

            <!-- BRICKLINK CLUSTER -->
            <div class="mac-window reveal col-5" style="border-color: rgba(100, 210, 255, 0.3);">
                <div class="win-titlebar folder-style">
                    <span class="win-title" style="padding-left: 10px; color: #64D2FF; font-weight: 600;">Progetto_BrickLink.folder</span>
                </div>
                <div class="win-body" style="padding: 30px; background: rgba(28,28,30,0.6);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <img src="../assets/bricklink_logo.png" alt="BrickLink Logo" style="width: 48px; height: 48px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                        <h1 style="font-size: 26px; font-weight: 700; margin: 0;">BrickLink 🧱</h1>
                    </div>
                    <p style="margin-bottom: 15px; font-size: 15px; color: #EBEBF5; line-height: 1.6;"><strong>BrickLink</strong> è una web application mobile-first per la divulgazione digitale che supera la concezione tradizionale dell’articolo come blocco di testo statico e monolitico, per abbracciare una visione dell’informazione intesa come entità dinamica, granulare e strutturata.</p>
                    
                    <h3 style="margin: 25px 0 10px 0; font-size: 16px; color: #64D2FF;">🚀 Stack Tecnologico</h3>
                    <ul style="margin-bottom: 15px; margin-left: 20px; padding-left: 5px; font-size: 14px; color: #EBEBF5; line-height: 1.5;">
                        <li style="margin-bottom: 6px;">📱 <strong>Client:</strong> Angular 20 / Ionic 8 / Capacitor</li>
                        <li style="margin-bottom: 6px;">⚙️ <strong>Server:</strong> Node.js / Express 4 / TypeORM</li>
                        <li style="margin-bottom: 6px;">🗄️ <strong>DB:</strong> PostgreSQL + Redis</li>
                    </ul>
                </div>
            </div>

            <div class="mac-window reveal col-7">
                <div class="win-titlebar">
                    <div class="win-controls">
                        <div class="tl red"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">mockup_dashboard.jpg</span>
                </div>
                <div class="win-body p-0" style="display:flex; justify-content:center; align-items:center; background: #000; overflow: hidden; position: relative;">
                    <img src="../assets/images/bricklink_mockup.jpg" alt="BrickLink Mockup" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
            </div>

            <div class="mac-window reveal col-12">
                <div class="win-titlebar note-style">
                    <span class="win-title" style="color: #F7DF1E;">📝 Note_Architettura.txt</span>
                </div>
                <div class="win-body" style="padding: 25px 35px; font-family: monospace; font-size: 14px; line-height: 1.6; background: rgba(0,0,0,0.4); color: #A0A0A5;">
                    <strong style="color: #fff; font-size: 16px;">// Architettura dei Dati e Gamification</strong><br><br>
                    Il principio fondante è che la conoscenza debba essere veicolata attraverso unità modulari (Brick). Sul piano dei dati, l’enum <code>BrickType</code> enumera 6 tipologie (TEXT, IMAGE, EMBED, CODE, GALLERY, MAP). Ogni Brick memorizza il contenuto in JSONB polimorfa.<br><br>
                    Oltre alla creazione e consultazione, BrickLink integra un ambiente di authoring (<strong>BrickLab</strong>), interazione sociale (like con aggiornamento ottimistico), e un modulo di gamification (<strong>CruciBrick</strong>) che estrae dinamicamente le parole chiave dai Brick per generare sfide di ripasso attive.
                </div>
            </div>

            <!-- GRADUAM CLUSTER -->
            <div class="mac-window reveal col-8">
                <div class="win-titlebar">
                    <div class="win-controls">
                        <div class="tl red"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">graduam_app.png</span>
                </div>
                <div class="win-body p-0" style="display:flex; justify-content:center; align-items:center; background: #000; overflow: hidden;">
                    <img src="../assets/images/graduam_real.png" alt="Graduam Screenshot" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
            </div>

            <div class="mac-window reveal col-4" style="border-color: rgba(168, 85, 247, 0.3);">
                <div class="win-titlebar folder-style">
                    <span class="win-title" style="padding-left: 10px; color: #a855f7; font-weight: 600;">Progetto_Graduam.folder</span>
                </div>
                <div class="win-body" style="padding: 25px; background: rgba(28,28,30,0.6);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #a855f7 0%, #f97316 100%); display:flex; align-items:center; justify-content:center; font-size:20px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">🎓</div>
                        <h1 style="font-size: 22px; font-weight: 700; margin: 0;">Graduam 🚀</h1>
                    </div>
                    <p style="margin-bottom: 15px; font-size: 14px; color: #EBEBF5; line-height: 1.6;"><strong>Graduam - Milestone & Progression</strong> 📈 è un applicativo web innovativo incentrato sul tracciamento, l'analisi e la gestione avanzata dei percorsi formativi in modo visuale e stimolante.</p>
                    
                    <h3 style="margin: 20px 0 10px 0; font-size: 15px; color: #f97316;">⚛️ Stack React</h3>
                    <ul style="margin-bottom: 10px; margin-left: 15px; padding-left: 5px; font-size: 13px; color: #EBEBF5; line-height: 1.5;">
                        <li style="margin-bottom: 4px;">⚡ <strong>Next.js</strong> (App Router, SSR)</li>
                        <li style="margin-bottom: 4px;">🛡️ <strong>TypeScript</strong> (Tipizzazione statica)</li>
                        <li style="margin-bottom: 4px;">🎨 <strong>Tailwind CSS</strong> (Design System)</li>
                    </ul>
                </div>
            </div>

            <!-- BOTTOM CLUSTER (EDU + CONTACTS) -->
            <div class="mac-window reveal col-7">
                <div class="win-titlebar">
                    <div class="win-controls">
                        <div class="tl red"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">Formazione ed Educazione</span>
                </div>
                <div class="win-body" style="padding: 30px; background: rgba(28,28,30,0.4); color: #EBEBF5;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                        <div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #0A84FF 0%, #00C6FF 100%); display:flex; align-items:center; justify-content:center; font-size:20px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">🎓</div>
                        <h2 style="font-size: 22px; font-weight: 700; margin: 0;">Percorso di Studi</h2>
                    </div>
                    
                    <div class="edu-card" style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; flex-wrap: wrap; gap: 10px;">
                            <h3 style="font-size: 18px; color: #64D2FF; margin: 0;">Laurea in Ingegneria Informatica (Classe L-8)</h3>
                            <span style="background: rgba(100, 210, 255, 0.15); color: #64D2FF; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;">30 LUG 2026</span>
                        </div>
                        <p style="font-size: 15px; font-weight: 500; margin-bottom: 12px; color: #fff;">Università degli Studi di Palermo - UniPa</p>
                        <div style="display: inline-block; padding: 6px 12px; background: rgba(52, 199, 89, 0.15); border-left: 3px solid #34c759; margin-bottom: 15px; border-radius: 0 8px 8px 0;">
                            <strong style="color: #34c759; font-size: 14px;">Votazione Finale: 104 / 110</strong>
                        </div>
                        <p style="color: #bbb; margin-bottom: 0; font-size: 14px;">Solida preparazione teorica e pratica nello sviluppo software, algoritmi, architetture di sistemi complessi e ingegneria dei dati, coniugata con una spiccata attitudine alla produzione multimediale e alla comunicazione visiva.</p>
                    </div>
                </div>
            </div>

            <div class="mac-window reveal col-5" id="win-contacts">
                <div class="win-titlebar note-style">
                    <span class="win-title" style="color: #34c759; font-weight: 600;">Contatti.app</span>
                </div>
                <div class="win-body" style="background: transparent; display: flex; flex-direction: column;">
                    <div style="padding: 20px; padding-bottom: 0;">
                        <div style="padding: 15px; background: rgba(52, 199, 89, 0.15); border-radius: 8px; border: 1px solid rgba(52, 199, 89, 0.4); display: flex; align-items: flex-start; gap: 10px;">
                            <div style="width: 10px; height: 10px; background: #34c759; border-radius: 50%; margin-top: 5px; box-shadow: 0 0 8px rgba(52, 199, 89, 0.8);"></div>
                            <span style="font-size: 13px; color: #34c759; font-weight: 500; line-height: 1.4;">Disponibile per nuovi progetti e collaborazioni.</span>
                        </div>
                    </div>
                    <div class="contact-list" style="display: flex; flex-direction: column; gap: 10px; padding: 20px;">
                        <a href="mailto:info@cristianingrao.it" class="contact-item" style="padding: 15px; flex-direction: row; justify-content: flex-start; gap: 20px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <span>Email</span>
                        </a>
                        <a href="https://linkedin.com/in/cristianingrao" target="_blank" class="contact-item" style="padding: 15px; flex-direction: row; justify-content: flex-start; gap: 20px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            <span>LinkedIn</span>
                        </a>
                        <a href="https://github.com/ingraocristianjoshua" target="_blank" class="contact-item" style="padding: 15px; flex-direction: row; justify-content: flex-start; gap: 20px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
\n    `;
    
    html = before + newWindowsHtml + after;
    fs.writeFileSync('portfolio/index.html', html);
    console.log('Successfully injected the new masonry windows container.');
} else {
    console.log('Could not find start or end index.');
}
