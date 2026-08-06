const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The new portfolio section: Hero Window first, then Bento Grid (no iPhone), then Projects, then Contacts
const newPortfolioSection = `
            <div id="apple-bento-grid-container">

                <!-- ═══════════════════════════════════════════ -->
                <!-- HERO WINDOW — PORTFOLIO                     -->
                <!-- ═══════════════════════════════════════════ -->
                <div class="hero-window-wrapper">
                    <div class="apple-card hero-window">
                        <div class="a-card-header" style="position: absolute; top: 0; width: 100%; z-index: 20; background: rgba(44,44,46,0.8); backdrop-filter: blur(10px);">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title" style="color: #aeaeb2;">Portfolio - Cristian Ingrao</div>
                        </div>

                        <!-- Floating Icons -->
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" class="floating-icon icon-1 blur" alt="Java">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" class="floating-icon icon-2" alt="React">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" class="floating-icon icon-3 blur" alt="TypeScript">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" class="floating-icon icon-4" alt="NextJS">

                        <!-- Animated Text Center -->
                        <div class="hero-text-container">
                            <div class="hero-text-subtitle">Software Development</div>
                            <h2 class="hero-text-title" id="hero-animated-title">PORTFOLIO</h2>
                        </div>
                    </div>
                </div>

                <!-- ═══════════════════════════════════════════ -->
                <!-- BENTO GRID — CHI SONO                       -->
                <!-- ═══════════════════════════════════════════ -->
                <div class="apple-canvas-title">Chi Sono</div>
                <div class="apple-bento-grid">

                    <!-- Bio (Large) -->
                    <div class="apple-card a-col-2 a-row-2">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Biografia.txt</div>
                        </div>
                        <div class="a-card-body" style="padding: 36px; display:flex; flex-direction:column; justify-content:center;">
                            <h3 style="font-size: 22px; font-weight: 800; margin: 0 0 16px 0; color:#f2f2f7; line-height:1.3;">Mi chiamo <span style="color:#007aff;">Cristian Ingrao</span> e sono un Software Developer.</h3>
                            <p style="font-size: 14px; line-height: 1.7; color: #aeaeb2; margin-bottom: 12px;">Lavoro su <strong style="color:#f2f2f7;">Web Apps, Backend</strong> e <strong style="color:#f2f2f7;">Mobile</strong>. Il codice per me è come un grande <strong style="color:#f2f2f7;">puzzle</strong>, dove ogni pezzo deve incastrarsi perfettamente sotto un'architettura solida, mantenendo sempre un occhio di riguardo per l'estetica UI/UX.</p>
                            <p style="font-size: 14px; line-height: 1.7; color: #aeaeb2; margin: 0;">Quando non programmo, esploro l'Intelligenza Artificiale, seguo le ultime innovazioni tecnologiche e gioco ai videogiochi.</p>
                        </div>
                    </div>

                    <!-- Photo -->
                    <div class="apple-card a-col-1 a-row-2" style="display:flex; flex-direction:column;">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Photo Booth</div>
                        </div>
                        <div class="a-card-body" style="flex:1; display:flex; justify-content:center; align-items:center; padding: 24px; background: linear-gradient(145deg, #1c1c1e, #2c2c2e);">
                            <img src="./assets/images/profile-new.jpg" alt="Cristian Ingrao" style="width: 160px; height: 160px; object-fit: cover; border-radius: 50%; border: 3px solid rgba(255,255,255,0.1); box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
                        </div>
                    </div>

                    <!-- Skills -->
                    <div class="apple-card a-col-1 a-row-1">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Skills</div>
                        </div>
                        <div class="a-card-body a-skills-grid">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" title="Java">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" title="TypeScript">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" title="React">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="NodeJS" title="NodeJS">
                        </div>
                    </div>

                    <!-- Formazione (Wide) -->
                    <div class="apple-card a-col-2 a-row-1">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Formazione</div>
                        </div>
                        <div class="a-card-body" style="padding: 20px; display: flex; gap: 16px; height: 100%;">
                            <div class="edu-card blue" style="flex: 1; margin: 0; display:flex; flex-direction:column; justify-content:center;">
                                <div class="edu-date">OTTOBRE 2023 - LAUREATO</div>
                                <h4>Laurea in Ingegneria Informatica</h4>
                                <p>Università di Palermo. Voto: 104/110.</p>
                            </div>
                            <div class="edu-card green" style="flex: 1; margin: 0; display:flex; flex-direction:column; justify-content:center;">
                                <div class="edu-date">SETTEMBRE 2024</div>
                                <h4>Full-stack Developer</h4>
                                <p>App Web (Next.js, React) e Backend.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Skills extra (1 col) -->
                    <div class="apple-card a-col-1 a-row-1" style="background: linear-gradient(145deg, #1a1a2e, #16213e);">
                        <div class="a-card-header" style="background: rgba(0,0,0,0.3);">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">More Skills</div>
                        </div>
                        <div class="a-card-body a-skills-grid" style="background: transparent;">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="NextJS" title="Next.js" style="background:#111; filter:invert(1);">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" title="Python">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" title="Git">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" title="MySQL">
                        </div>
                    </div>

                </div>

                <!-- ═══════════════════════════════════════════ -->
                <!-- BENTO GRID — I MIEI PROGETTI                -->
                <!-- ═══════════════════════════════════════════ -->
                <div class="apple-canvas-title" style="margin-top: 80px;">I Miei Progetti</div>
                <div class="apple-bento-grid">

                    <!-- BRICKLINK -->
                    <div class="apple-card a-col-3 a-row-2 a-project-media">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Bricklink-Web.mp4</div>
                        </div>
                        <div class="a-media-content" style="background: linear-gradient(135deg, #0a192f, #0d2037);">
                            <img src="https://bricklinkedu.it/assets/icon/favicon.png" alt="Bricklink" class="a-proj-logo">
                            <h1 style="color: #58a6ff;">BRICKLINK</h1>
                            <p style="color: #8b949e;">www.bricklinkedu.it</p>
                            <button onclick="window.open('https://bricklinkedu.it', '_blank')" class="btn-canvas">Visita il Sito →</button>
                        </div>
                    </div>
                    <div class="apple-card a-col-1 a-row-2">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Brief.txt</div>
                        </div>
                        <div class="a-card-body" style="padding: 28px;">
                            <h4 class="a-brief-title">BRIEF</h4>
                            <p class="a-brief-text">Enciclopedia interattiva basata sui mattoncini LEGO per imparare giocando.</p>
                            <h4 class="a-brief-title" style="margin-top: 22px;">SFIDA</h4>
                            <p class="a-brief-text">Interfaccia immersiva e gamificata con database complesso in TypeScript.</p>
                        </div>
                    </div>

                    <!-- GRADUAM -->
                    <div class="apple-card a-col-1 a-row-2">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Concept.rtf</div>
                        </div>
                        <div class="a-card-body" style="padding: 28px;">
                            <h4 class="a-brief-title">BRIEF</h4>
                            <p class="a-brief-text">Calcolatore universitario elegante per media ponderata e voto di laurea.</p>
                            <h4 class="a-brief-title" style="margin-top: 22px;">SFIDA</h4>
                            <p class="a-brief-text">Trasformare uno strumento noioso in una web app premium con design Apple-like in Next.js.</p>
                        </div>
                    </div>
                    <div class="apple-card a-col-3 a-row-2 a-project-media">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Graduam-App.png</div>
                        </div>
                        <div class="a-media-content" style="background: linear-gradient(135deg, #1a0f2e, #2d1b69);">
                            <img src="https://graduam.it/icon.svg?icon.0wxbkkq3j-bi5.svg" alt="Graduam" class="a-proj-logo">
                            <h1 style="color: #d2a8ff;">GRADUAM</h1>
                            <p style="color: #8b949e;">graduam.it</p>
                            <button onclick="window.open('https://graduam.it', '_blank')" class="btn-canvas">Visita il Sito →</button>
                        </div>
                    </div>

                    <!-- ECOPALMAPS -->
                    <div class="apple-card a-col-3 a-row-2 a-project-media">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">EcoPalMaps.mp4</div>
                        </div>
                        <div class="a-media-content" style="background: linear-gradient(135deg, #0d2a15, #0f3d1a);">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Leaf_icon_15.svg" alt="EcoPalMaps" class="a-proj-logo">
                            <h1 style="color: #7ee787;">ECOPALMAPS</h1>
                            <p style="color: #8b949e;">ecopalmaps.com</p>
                            <button onclick="window.open('https://ecopalmaps.com', '_blank')" class="btn-canvas">Visita il Sito →</button>
                        </div>
                    </div>
                    <div class="apple-card a-col-1 a-row-2">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Eco-Brief.txt</div>
                        </div>
                        <div class="a-card-body" style="padding: 28px;">
                            <h4 class="a-brief-title">BRIEF</h4>
                            <p class="a-brief-text">Valorizzare i luoghi culturali del territorio di Palma di Montechiaro con una mappa ecologica.</p>
                            <h4 class="a-brief-title" style="margin-top: 22px;">SFIDA</h4>
                            <p class="a-brief-text">Mappe dinamiche e percorsi naturalistici in un'unica piattaforma accessibile.</p>
                        </div>
                    </div>

                    <!-- AFAM -->
                    <div class="apple-card a-col-1 a-row-2">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">README.md</div>
                        </div>
                        <div class="a-card-body" style="padding: 28px;">
                            <h4 class="a-brief-title">BRIEF</h4>
                            <p class="a-brief-text">Software in Java per la gestione di accademie e conservatori musicali.</p>
                            <h4 class="a-brief-title" style="margin-top: 22px;">SFIDA</h4>
                            <p class="a-brief-text">Architettura object-oriented solida con design pattern avanzati.</p>
                        </div>
                    </div>
                    <div class="apple-card a-col-3 a-row-2 a-project-media">
                        <div class="a-card-header">
                            <div class="a-mac-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
                            <div class="a-header-title">Github-Repo.app</div>
                        </div>
                        <div class="a-media-content" style="background: linear-gradient(135deg, #1a0a0d, #2e1215);">
                            <img src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" alt="AFAM" class="a-proj-logo">
                            <h1 style="color: #ff7b72;">AFAM SOFTWARE</h1>
                            <p style="color: #8b949e;">GitHub Repository</p>
                            <button onclick="window.open('https://github.com/ingraocristianjoshua/afam', '_blank')" class="btn-canvas">Vedi Codice →</button>
                        </div>
                    </div>

                </div>

                <!-- ═══════════════════════════════════════════ -->
                <!-- CONTATTI — APPLE STYLE                      -->
                <!-- ═══════════════════════════════════════════ -->
                <div class="apple-canvas-title" style="margin-top: 80px;">Contatti</div>
                <div class="apple-bento-grid contacts-grid">

                    <!-- Email -->
                    <a href="mailto:cristianingrao@gmail.com" class="apple-card contact-card a-col-1 a-row-1">
                        <div class="contact-icon-wrap" style="background: linear-gradient(135deg, #007aff, #00c7ff);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </div>
                        <div class="contact-label">Email</div>
                        <div class="contact-value">cristianingrao@gmail.com</div>
                        <div class="contact-arrow">→</div>
                    </a>

                    <!-- Instagram -->
                    <a href="https://instagram.com/cristianingrao" target="_blank" class="apple-card contact-card a-col-1 a-row-1">
                        <div class="contact-icon-wrap" style="background: linear-gradient(135deg, #e1306c, #f77737, #fcaf45);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        </div>
                        <div class="contact-label">Instagram</div>
                        <div class="contact-value">@cristianingrao</div>
                        <div class="contact-arrow">→</div>
                    </a>

                    <!-- LinkedIn -->
                    <a href="https://linkedin.com/in/cristianingrao" target="_blank" class="apple-card contact-card a-col-1 a-row-1">
                        <div class="contact-icon-wrap" style="background: linear-gradient(135deg, #0077b5, #005885);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </div>
                        <div class="contact-label">LinkedIn</div>
                        <div class="contact-value">in/cristianingrao</div>
                        <div class="contact-arrow">→</div>
                    </a>

                    <!-- GitHub -->
                    <a href="https://github.com/ingraocristianjoshua" target="_blank" class="apple-card contact-card a-col-1 a-row-1">
                        <div class="contact-icon-wrap" style="background: linear-gradient(135deg, #24292f, #3d444d);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </div>
                        <div class="contact-label">GitHub</div>
                        <div class="contact-value">ingraocristianjoshua</div>
                        <div class="contact-arrow">→</div>
                    </a>

                </div>

            </div>
`;

// Replace the entire apple-bento-grid-container content
const startTag = '<div id="apple-bento-grid-container">';
const endTag = '</div>\n\n    </div>\n    <script src="script.js"></script>';

const startIdx = html.indexOf(startTag);
const endIdx = html.indexOf(endTag);

if (startIdx !== -1 && endIdx !== -1) {
    const before = html.substring(0, startIdx);
    const after = html.substring(endIdx + startTag.length); // keep from the outer </div> etc.
    // Just use endTag detection
    const afterFull = '\n    </div>\n    <script src="script.js"></script>\n</body>\n</html>';
    fs.writeFileSync('index.html', before + newPortfolioSection + afterFull, 'utf8');
    console.log('Done! Portfolio section rebuilt.');
} else {
    console.log('Error: could not find markers. startIdx=' + startIdx + ' endIdx=' + endIdx);
}
