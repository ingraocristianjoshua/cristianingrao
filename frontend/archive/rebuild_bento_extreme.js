const fs = require('fs');

const bentoHTML = `
            <!-- BIO ROW -->
            <div class="mac-window reveal col-7" id="win-bio">
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
                            <span class="bio-date">Palermo, Italia &nbsp;|&nbsp; <span id="bento-time">--:--</span></span>
                            <h2>Ciao, sono Cristian Joshua Ingrao.</h2>
                            <p>Sono un Ingegnere Informatico (Laurea L-8). Il mio percorso professionale si sviluppa all'intersezione tra l'ingegneria del software e il design delle interfacce. Sono specializzato nella progettazione di architetture di sistema scalabili e nello sviluppo di applicazioni web full-stack, con un focus sull'ottimizzazione delle performance e sulla qualità del codice.</p>
                            <p>Oltre al rigore algoritmico e alla progettazione backend, nutro un forte interesse per lo sviluppo frontend moderno (React, Next.js) e per i principi della User Experience. Il mio obiettivo è realizzare prodotti digitali che non solo risolvano problemi complessi in modo efficiente, ma che offrano interfacce intuitive, accessibili e curate in ogni singolo dettaglio.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mac-window reveal col-5" id="win-photo">
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
                        <div id="pb-viewfinder" style="width: 100%; height: 100%; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; overflow: hidden; background: #000; display: flex; justify-content: center; align-items: center; position: relative; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);">
                            <img src="../profile_pic.jpg" alt="Cristian Ingrao" style="width: 100%; height: 100%; object-fit: cover;">
                            <!-- Flash Overlay -->
                            <div id="pb-flash" style="position: absolute; top:0; left:0; width:100%; height:100%; background: white; opacity: 0; pointer-events: none; transition: opacity 0.15s ease-out; z-index: 10;"></div>
                            <!-- REC Indicator -->
                            <div style="position: absolute; top: 10px; left: 15px; display: flex; align-items: center; gap: 6px; z-index: 5;">
                                <div style="width: 8px; height: 8px; background: #ff3b30; border-radius: 50%; box-shadow: 0 0 5px #ff3b30; animation: blink 2s infinite;"></div>
                                <span style="color: white; font-size: 10px; font-weight: 600; font-family: -apple-system, sans-serif; letter-spacing: 1px; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">REC</span>
                            </div>
                        </div>
                    </div>
                    <div style="height: 64px; background: linear-gradient(to bottom, #2C2C2E, #1C1C1E); border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: center; align-items: center;">
                        <!-- Shutter Button -->
                        <div onclick="takePhoto()" style="width: 48px; height: 48px; border-radius: 50%; background: #ffffff; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: transform 0.1s; margin: 0 auto; box-shadow: 0 2px 5px rgba(0,0,0,0.5);" onmousedown="this.style.transform='scale(0.92)'" onmouseup="this.style.transform='scale(1)'">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: #ff3b30; border: 2px solid #fff; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);"></div>
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
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" class="dock-app dock-app-orange" title="HTML5">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" class="dock-app" title="CSS3">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" class="dock-app dock-app-orange" title="Git">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" class="dock-app" title="Docker">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" class="dock-app" title="PostgreSQL">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" class="dock-app" title="MySQL">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" class="dock-app dock-app-green" title="MongoDB">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" class="dock-app dock-app-yellow" title="Firebase">
                </div>
            </div>

            <!-- EDUCATION FULL WIDTH -->
            <div class="mac-window reveal col-12">
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

            <!-- BRICKLINK BENTO EXTREME -->
            <div class="mac-window reveal col-4" style="border-color: rgba(100, 210, 255, 0.3);">
                <div class="win-titlebar folder-style">
                    <span class="win-title" style="padding-left: 10px; color: #64D2FF; font-weight: 600;">Progetto.app</span>
                </div>
                <div class="win-body" style="padding: 30px; background: rgba(28,28,30,0.6); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; height: 100%;">
                    <img src="../assets/bricklink_logo.png" alt="BrickLink Logo" style="width: 80px; height: 80px; border-radius: 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.4); object-fit: cover; margin-bottom: 20px;">
                    <h1 style="font-size: 28px; font-weight: 800; margin: 0;">BrickLink 🧱</h1>
                </div>
            </div>

            <div class="mac-window reveal col-8">
                <div class="win-titlebar">
                    <div class="win-controls">
                        <div class="tl red"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">Visione.md</span>
                </div>
                <div class="win-body" style="padding: 30px; background: rgba(28,28,30,0.4); display:flex; align-items:center;">
                    <p style="margin: 0; font-size: 16px; color: #EBEBF5; line-height: 1.7;"><strong>BrickLink</strong> è una web application mobile-first per la divulgazione digitale che supera la concezione tradizionale dell’articolo come blocco di testo statico e monolitico, per abbracciare una visione dell’informazione intesa come entità dinamica, granulare e strutturata.</p>
                </div>
            </div>

            <div class="mac-window reveal col-5">
                <div class="win-titlebar">
                    <div class="win-controls">
                        <div class="tl red"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">Stack_Tecnologico.json</span>
                </div>
                <div class="win-body" style="padding: 25px; background: rgba(0,0,0,0.4);">
                    <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #64D2FF;">🚀 Architettura</h3>
                    <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #EBEBF5; line-height: 1.8;">
                        <li>📱 <strong>Client:</strong> Angular 20 / Ionic 8 / Capacitor</li>
                        <li>⚙️ <strong>Server:</strong> Node.js / Express 4 / TypeORM</li>
                        <li>🗄️ <strong>DB:</strong> PostgreSQL + Redis</li>
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
                    <span class="win-title">dashboard_preview.jpg</span>
                </div>
                <div class="win-body p-0" style="display:flex; justify-content:center; align-items:center; background: #000; overflow: hidden; height: 100%;">
                    <img src="../assets/images/bricklink_mockup.jpg" alt="BrickLink Mockup" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
            </div>

            <!-- MARQUEE -->
            <div class="col-12" style="margin: 60px 0;">
                <div class="marquee-container">
                    <div class="marquee-content">
                        <span>💻</span><span>⌨️</span><span>⚙️</span><span>⚡️</span><span>📱</span><span>⌚️</span><span>🧠</span><span>🎓</span><span>📊</span><span>🌐</span><span>📁</span><span>🔐</span><span>🛠️</span><span>🚀</span><span>👨‍💻</span><span>🎨</span><span>☕️</span><span>💻</span><span>⌨️</span><span>⚙️</span><span>⚡️</span><span>📱</span><span>⌚️</span><span>🧠</span><span>🎓</span><span>📊</span><span>🌐</span><span>📁</span><span>🔐</span><span>🛠️</span><span>🚀</span><span>👨‍💻</span><span>🎨</span><span>☕️</span>
                    </div>
                </div>
            </div>

            <!-- GRADUAM BENTO EXTREME -->
            <div class="mac-window reveal col-4" style="border-color: rgba(168, 85, 247, 0.3);">
                <div class="win-titlebar folder-style">
                    <span class="win-title" style="padding-left: 10px; color: #a855f7; font-weight: 600;">Progetto.app</span>
                </div>
                <div class="win-body" style="padding: 30px; background: rgba(28,28,30,0.6); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; height: 100%;">
                    <img src="../assets/images/graduam_real.png" alt="Graduam Logo" style="width: 80px; height: 80px; border-radius: 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.4); object-fit: cover; margin-bottom: 20px;">
                    <h1 style="font-size: 28px; font-weight: 800; margin: 0;">Graduam 🚀</h1>
                </div>
            </div>

            <div class="mac-window reveal col-4">
                <div class="win-titlebar">
                    <div class="win-controls">
                        <div class="tl red"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">Overview.md</span>
                </div>
                <div class="win-body" style="padding: 25px; background: rgba(28,28,30,0.4); display:flex; align-items:center;">
                    <p style="margin: 0; font-size: 15px; color: #EBEBF5; line-height: 1.6;"><strong>Graduam - Milestone & Progression</strong> 📈 è un applicativo web innovativo incentrato sul tracciamento, l'analisi e la gestione avanzata dei percorsi formativi in modo visuale e stimolante.</p>
                </div>
            </div>

            <div class="mac-window reveal col-4">
                <div class="win-titlebar">
                    <div class="win-controls">
                        <div class="tl red"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">Stack.json</span>
                </div>
                <div class="win-body" style="padding: 25px; background: rgba(0,0,0,0.4);">
                    <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #f97316;">⚛️ Core Tech</h3>
                    <ul style="margin: 0; padding-left: 15px; font-size: 14px; color: #EBEBF5; line-height: 1.6;">
                        <li>Vite + React</li>
                        <li>TypeScript</li>
                        <li>TailwindCSS</li>
                        <li>Framer Motion</li>
                        <li>Recharts</li>
                        <li>Supabase</li>
                    </ul>
                </div>
            </div>

            <div class="mac-window reveal col-12">
                <div class="win-titlebar">
                    <div class="win-controls">
                        <div class="tl red"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">ui_preview.png</span>
                </div>
                <div class="win-body p-0" style="display:flex; justify-content:center; align-items:center; background: #000; overflow: hidden; max-height: 400px;">
                    <img src="../assets/images/graduam_real.png" alt="Graduam Screenshot" style="width: 100%; object-fit: cover;">
                </div>
            </div>

            <!-- SOCIAL CONTROL CENTER -->
            <div class="mac-window reveal col-6" id="win-social">
                <div class="win-titlebar note-style">
                    <span class="win-title" style="color: #0A84FF; font-weight: 600;">Control Center</span>
                </div>
                <div class="win-body" style="background: rgba(28,28,30,0.5); padding: 25px;">
                    <h3 style="margin: 0 0 20px 0; font-size: 18px; color: #fff;">Social Network</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <a href="https://linkedin.com/in/cristianingrao" target="_blank" style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 15px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; text-decoration: none; color: #fff; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.05);" onmouseover="this.style.background='rgba(10, 132, 255, 0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
                            <div style="width: 44px; height: 44px; border-radius: 50%; background: #0A84FF; display: flex; align-items: center; justify-content: center;">
                                <svg viewBox="0 0 24 24" fill="white" style="width: 20px; height: 20px;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </div>
                            <span style="font-size: 13px; font-weight: 600;">LinkedIn</span>
                        </a>
                        <a href="https://github.com/ingraocristianjoshua" target="_blank" style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 15px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; text-decoration: none; color: #fff; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.05);" onmouseover="this.style.background='rgba(255, 255, 255, 0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
                            <div style="width: 44px; height: 44px; border-radius: 50%; background: #333; display: flex; align-items: center; justify-content: center;">
                                <svg viewBox="0 0 24 24" fill="white" style="width: 24px; height: 24px;"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            </div>
                            <span style="font-size: 13px; font-weight: 600;">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- CONTACTS -->
            <div class="mac-window reveal col-6" id="win-contacts">
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
                            <span>info@cristianingrao.it</span>
                        </a>
                    </div>
                </div>
            </div>
`;

let html = fs.readFileSync('portfolio/index.html', 'utf8');
const startTag = '<div class="windows-container">';
const endTag = '<!-- ABOUT WINDOW -->';

const startIndex = html.indexOf(startTag) + startTag.length;
const endIndex = html.indexOf(endTag);

const before = html.substring(0, startIndex);
// Find the outer closing div of the windows-container right before ABOUT WINDOW
const innerHtml = html.substring(startIndex, endIndex);
const lastDivIndex = innerHtml.lastIndexOf('</div>');
const containerClose = innerHtml.substring(lastDivIndex);

const after = html.substring(endIndex);

// Add missing responsive media queries for the new col classes just in case
let finalHtml = before + '\\n' + bentoHTML + '\\n' + containerClose + '\\n    ' + after;

// Ensure new columns are responsive on mobile
const responsiveCols = '.col-12, .col-8, .col-7, .col-6, .col-5, .col-4 {';
if (finalHtml.includes(responsiveCols)) {
    finalHtml = finalHtml.replace(responsiveCols, '.col-12, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-9 {');
}

fs.writeFileSync('portfolio/index.html', finalHtml);
console.log('Rebuilt Bento Grid with extreme fragmentation and Mobile Optimization');
