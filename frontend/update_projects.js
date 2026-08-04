const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const bricklinkOld = `
    <!-- BRICKLINK PROJECT WINDOW -->
    <div class="mac-window reveal" id="win-bricklink" >
        <div class="win-titlebar" >
            <div class="win-controls">
                <div class="tl red" ></div>
                <div class="tl yellow" ></div>
                <div class="tl green" ></div>
            </div>
            <span class="win-title">Progetto: BrickLink</span>
        </div>
        <div class="win-body" style="padding: 30px 40px; overflow-y: auto; line-height: 1.6; font-size: 15px; background: rgba(28,28,30,0.4); color: #EBEBF5; max-height: calc(80vh - 52px);">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="../assets/bricklink_logo.png" alt="BrickLink Logo" style="width: 48px; height: 48px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                <h1 style="font-size: 28px; font-weight: 700; margin: 0;">BrickLink</h1>
            </div>
            <p style="margin-bottom: 15px;"><strong>BrickLink</strong> è una web application mobile-first per la divulgazione digitale che supera la concezione tradizionale dell’articolo come blocco di testo statico e monolitico, per abbracciare una visione dell’informazione intesa come entità dinamica, granulare e strutturata.</p>
            <p style="margin-bottom: 15px;">Il principio fondante del progetto è che la conoscenza debba essere veicolata attraverso unità modulari e indipendenti denominate <strong>Brick</strong> (mattoncini logici): ogni articolo non è un documento indivisibile, ma una sequenza ordinata di Brick eterogenei — testo, immagini, gallerie, contenuti multimediali incorporati, snippet di codice e mappe geografiche — ciascuno con una propria semantica e un proprio modello dati.</p>
            <h3 style="margin: 25px 0 10px 0; font-size: 18px; color: #64D2FF;">Architettura dei Dati</h3>
            <p style="margin-bottom: 15px;">Questa scelta concettuale ha una diretta contropartita implementativa, verificabile in ogni strato del sistema. Sul piano dei dati, l’enum <code>BrickType</code> enumera esattamente sei tipologie — TEXT, IMAGE, EMBED, CODE, GALLERY, MAP — e ciascun Brick memorizza il proprio contenuto in una colonna JSONB polimorfa (<code>data: Record&lt;string, unknown&gt;</code>).</p>
            <p style="margin-bottom: 15px;">Il payload non è quindi HTML pre-renderizzato, ma un oggetto strutturato e tipizzato: è il client a decidere, in fase di lettura, quale componente Angular incaricare del rendering di ciascun tipo. Questa impostazione — che ricorre identica dal database (<code>Brick.data</code> di tipo jsonb) fino ai template dell’editor e della pagina di dettaglio — è il filo conduttore dell’intera architettura e rappresenta anche una difesa nativa contro gli attacchi di tipo injection: il server non conserva né restituisce mai markup eseguibile.</p>
            <h3 style="margin: 25px 0 10px 0; font-size: 18px; color: #64D2FF;">Stack Tecnologico</h3>
            <p style="margin-bottom: 10px;">La piattaforma è costruita come applicazione full-stack disaccoppiata:</p>
            <ul style="margin-bottom: 15px; margin-left: 20px; padding-left: 10px;">
                <li style="margin-bottom: 8px;"><strong>Client:</strong> Angular 20 / Ionic 8 / Capacitor (distribuibile come PWA e app nativa iOS/Android)</li>
                <li style="margin-bottom: 8px;"><strong>Server:</strong> Node.js / Express 4 con ORM TypeORM 0.3</li>
                <li style="margin-bottom: 8px;"><strong>Persistenza:</strong> PostgreSQL (dati relazionali) e Redis (dati volatili ad alta frequenza)</li>
            </ul>
            <p style="margin-bottom: 15px;">L’ecosistema è governato da una gerarchia di tre ruoli — Admin, Editor e User — con privilegi e interfacce differenziati, modellata dall’enum <code>UserRole</code> condiviso e applicata coerentemente sui due lati: guard funzionali sul client (<code>editorGuard</code>, <code>adminGuard</code>) e middleware RBAC sul server (<code>requireEditor</code>, <code>requireAdmin</code>).</p>
            <h3 style="margin: 25px 0 10px 0; font-size: 18px; color: #64D2FF;">Ecosistema e Gamification</h3>
            <p style="margin-bottom: 15px;">Oltre alla creazione e consultazione dei contenuti, BrickLink integra un ambiente di authoring dedicato (<strong>BrickLab</strong>), un sistema di interazione sociale (like con aggiornamento ottimistico e commenti annidati auto-referenziali), una dashboard amministrativa completa e un modulo di gamification (<strong>CruciBrick</strong>) che estrae dinamicamente le parole chiave dal testo dei Brick per generare sfide di ripasso, trasformando la consultazione passiva in un esercizio attivo di consolidamento della memoria. Ogni funzionalità è progettata secondo il principio della <em>difesa in profondità</em>: ciò che il client verifica per usabilità, il server lo impone per sicurezza.</p>
        </div>
    </div>`;

const bricklinkNew = `
    <!-- BRICKLINK PROJECT WINDOW -->
    <div class="mac-window reveal" id="win-bricklink" >
        <div class="win-titlebar" >
            <div class="win-controls">
                <div class="tl red" ></div>
                <div class="tl yellow" ></div>
                <div class="tl green" ></div>
            </div>
            <span class="win-title">Progetto: BrickLink</span>
        </div>
        <div class="win-body" style="padding: 30px 40px; overflow-y: auto; line-height: 1.6; font-size: 15px; background: rgba(28,28,30,0.4); color: #EBEBF5; max-height: calc(80vh - 52px);">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="../assets/bricklink_logo.png" alt="BrickLink Logo" style="width: 48px; height: 48px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                <h1 style="font-size: 28px; font-weight: 700; margin: 0;">BrickLink 🧱</h1>
            </div>
            
            <img src="../assets/images/bricklink_mockup.jpg" alt="BrickLink Mockup" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); margin-bottom: 25px; border: 1px solid rgba(255,255,255,0.05);">
            
            <p style="margin-bottom: 15px;"><strong>BrickLink</strong> è una web application mobile-first per la divulgazione digitale che supera la concezione tradizionale dell’articolo come blocco di testo statico e monolitico, per abbracciare una visione dell’informazione intesa come entità dinamica, granulare e strutturata.</p>
            <p style="margin-bottom: 15px;">Il principio fondante del progetto è che la conoscenza debba essere veicolata attraverso unità modulari e indipendenti denominate <strong>Brick</strong> 🧱 (mattoncini logici): ogni articolo non è un documento indivisibile, ma una sequenza ordinata di Brick eterogenei — testo, immagini 📸, gallerie, contenuti multimediali incorporati 🎬, snippet di codice 💻 e mappe geografiche 🗺️ — ciascuno con una propria semantica e un proprio modello dati.</p>
            
            <h3 style="margin: 25px 0 10px 0; font-size: 18px; color: #64D2FF;">🏗️ Architettura dei Dati</h3>
            <p style="margin-bottom: 15px;">Questa scelta concettuale ha una diretta contropartita implementativa, verificabile in ogni strato del sistema. Sul piano dei dati, l’enum <code>BrickType</code> enumera esattamente sei tipologie — TEXT, IMAGE, EMBED, CODE, GALLERY, MAP — e ciascun Brick memorizza il proprio contenuto in una colonna JSONB polimorfa (<code>data: Record&lt;string, unknown&gt;</code>).</p>
            <p style="margin-bottom: 15px;">Il payload non è quindi HTML pre-renderizzato, ma un oggetto strutturato e tipizzato: è il client a decidere, in fase di lettura, quale componente Angular incaricare del rendering di ciascun tipo. Questa impostazione — che ricorre identica dal database (<code>Brick.data</code> di tipo jsonb) fino ai template dell’editor e della pagina di dettaglio — è il filo conduttore dell’intera architettura e rappresenta anche una difesa nativa contro gli attacchi di tipo injection 🛡️: il server non conserva né restituisce mai markup eseguibile.</p>
            
            <h3 style="margin: 25px 0 10px 0; font-size: 18px; color: #64D2FF;">🚀 Stack Tecnologico</h3>
            <p style="margin-bottom: 10px;">La piattaforma è costruita come applicazione full-stack disaccoppiata:</p>
            <ul style="margin-bottom: 15px; margin-left: 20px; padding-left: 10px;">
                <li style="margin-bottom: 8px;">📱 <strong>Client:</strong> Angular 20 / Ionic 8 / Capacitor (distribuibile come PWA e app nativa iOS/Android)</li>
                <li style="margin-bottom: 8px;">⚙️ <strong>Server:</strong> Node.js / Express 4 con ORM TypeORM 0.3</li>
                <li style="margin-bottom: 8px;">🗄️ <strong>Persistenza:</strong> PostgreSQL (dati relazionali) e Redis (dati volatili ad alta frequenza)</li>
            </ul>
            <p style="margin-bottom: 15px;">L’ecosistema è governato da una gerarchia di tre ruoli — Admin 👑, Editor ✍️ e User 👤 — con privilegi e interfacce differenziati, modellata dall’enum <code>UserRole</code> condiviso e applicata coerentemente sui due lati: guard funzionali sul client (<code>editorGuard</code>, <code>adminGuard</code>) e middleware RBAC sul server (<code>requireEditor</code>, <code>requireAdmin</code>).</p>
            
            <h3 style="margin: 25px 0 10px 0; font-size: 18px; color: #64D2FF;">🎮 Ecosistema e Gamification</h3>
            <p style="margin-bottom: 15px;">Oltre alla creazione e consultazione dei contenuti, BrickLink integra un ambiente di authoring dedicato (<strong>BrickLab</strong> 🧪), un sistema di interazione sociale (like ❤️ con aggiornamento ottimistico e commenti annidati auto-referenziali), una dashboard amministrativa completa e un modulo di gamification (<strong>CruciBrick</strong> 🧩) che estrae dinamicamente le parole chiave dal testo dei Brick per generare sfide di ripasso, trasformando la consultazione passiva in un esercizio attivo di consolidamento della memoria. Ogni funzionalità è progettata secondo il principio della <em>difesa in profondità</em>: ciò che il client verifica per usabilità, il server lo impone per sicurezza.</p>
        </div>
    </div>`;

const graduamOld = `
<!-- GRADUAM PROJECT WINDOW -->
    <div class="mac-window reveal" id="win-graduam" >
        <div class="win-titlebar" >
            <div class="win-controls">
                <div class="tl red" ></div>
                <div class="tl yellow" ></div>
                <div class="tl green" ></div>
            </div>
            <span class="win-title">Progetto: Graduam</span>
        </div>
        <div class="win-body" style="padding: 30px 40px; overflow-y: auto; line-height: 1.6; font-size: 15px; background: rgba(28,28,30,0.4); color: #EBEBF5; max-height: calc(80vh - 52px);">
            <h1 style="margin-bottom: 20px; font-size: 28px; font-weight: 700;">Graduam</h1>
            <p style="margin-bottom: 15px;"><strong>Graduam - Milestone & Progression</strong> è un applicativo web innovativo incentrato sul tracciamento, l'analisi e la gestione avanzata dei percorsi formativi. Progettato per accompagnare l'utente nell'organizzazione dei propri traguardi accademici e obiettivi di crescita personale in modo visuale e stimolante.</p>
            <h3 style="margin: 25px 0 10px 0; font-size: 18px; color: #64D2FF;">La Sfida Tecnica</h3>
            <p style="margin-bottom: 15px;">L'obiettivo principale del progetto è stato creare un sistema di progressione matematicamente coerente e, allo stesso tempo, visivamente gratificante. Ogni aspetto dell'interfaccia utente è stato maniacalmente curato, partendo da un design system proprietario fino all'implementazione strutturata dei dati relazionali. Un'attenzione particolare è stata dedicata alla fluidità della tipografia e alle micro-interazioni per migliorare e "gamificare" l'esperienza utente ad ogni step di progressione superato.</p>
            <h3 style="margin: 25px 0 10px 0; font-size: 18px; color: #64D2FF;">Stack Tecnologico</h3>
            <p style="margin-bottom: 10px;">L'architettura del progetto si basa sulle tecnologie più moderne e reattive dell'ecosistema React:</p>
            <ul style="margin-bottom: 15px; margin-left: 20px; padding-left: 10px;">
                <li style="margin-bottom: 8px;"><strong>Framework:</strong> Next.js per garantire routing avanzato (App Router), Server-Side Rendering ed un'esperienza performante fin dal primo caricamento, curando anche la SEO.</li>
                <li style="margin-bottom: 8px;"><strong>Linguaggio:</strong> TypeScript per assicurare rigorosa tipizzazione statica, abbattere i bug a runtime e garantire la scalabilità e la manutenzione della codebase nel tempo.</li>
                <li style="margin-bottom: 8px;"><strong>Design:</strong> Tailwind CSS è stato adottato per prototipare rapidamente l'interfaccia, mantenendo una coerenza stilistica eccellente grazie all'utilizzo coerente di utility-classes e token personalizzati.</li>
            </ul>
        </div>
    </div>`;

const graduamNew = `
<!-- GRADUAM PROJECT WINDOW -->
    <div class="mac-window reveal" id="win-graduam" >
        <div class="win-titlebar" >
            <div class="win-controls">
                <div class="tl red" ></div>
                <div class="tl yellow" ></div>
                <div class="tl green" ></div>
            </div>
            <span class="win-title">Progetto: Graduam</span>
        </div>
        <div class="win-body" style="padding: 30px 40px; overflow-y: auto; line-height: 1.6; font-size: 15px; background: rgba(28,28,30,0.4); color: #EBEBF5; max-height: calc(80vh - 52px);">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #a855f7 0%, #f97316 100%); display:flex; align-items:center; justify-content:center; font-size:24px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">🎓</div>
                <h1 style="font-size: 28px; font-weight: 700; margin: 0;">Graduam 🚀</h1>
            </div>
            
            <img src="../assets/images/graduam_mockup.jpg" alt="Graduam Mockup" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); margin-bottom: 25px; border: 1px solid rgba(255,255,255,0.05);">
            
            <p style="margin-bottom: 15px;"><strong>Graduam - Milestone & Progression</strong> 📈 è un applicativo web innovativo incentrato sul tracciamento, l'analisi e la gestione avanzata dei percorsi formativi. Progettato per accompagnare l'utente nell'organizzazione dei propri traguardi accademici 🎓 e obiettivi di crescita personale in modo visuale e stimolante.</p>
            
            <h3 style="margin: 25px 0 10px 0; font-size: 18px; color: #64D2FF;">💡 La Sfida Tecnica</h3>
            <p style="margin-bottom: 15px;">L'obiettivo principale del progetto è stato creare un sistema di progressione matematicamente coerente 🧮 e, allo stesso tempo, visivamente gratificante ✨. Ogni aspetto dell'interfaccia utente è stato maniacalmente curato, partendo da un design system proprietario fino all'implementazione strutturata dei dati relazionali. Un'attenzione particolare è stata dedicata alla fluidità della tipografia 🖋️ e alle micro-interazioni per migliorare e "gamificare" l'esperienza utente 🎮 ad ogni step di progressione superato.</p>
            
            <h3 style="margin: 25px 0 10px 0; font-size: 18px; color: #64D2FF;">⚛️ Stack Tecnologico</h3>
            <p style="margin-bottom: 10px;">L'architettura del progetto si basa sulle tecnologie più moderne e reattive dell'ecosistema React:</p>
            <ul style="margin-bottom: 15px; margin-left: 20px; padding-left: 10px;">
                <li style="margin-bottom: 8px;">⚡ <strong>Framework:</strong> Next.js per garantire routing avanzato (App Router), Server-Side Rendering ed un'esperienza performante fin dal primo caricamento, curando anche la SEO 🔍.</li>
                <li style="margin-bottom: 8px;">🛡️ <strong>Linguaggio:</strong> TypeScript per assicurare rigorosa tipizzazione statica, abbattere i bug a runtime e garantire la scalabilità e la manutenzione della codebase nel tempo.</li>
                <li style="margin-bottom: 8px;">🎨 <strong>Design:</strong> Tailwind CSS è stato adottato per prototipare rapidamente l'interfaccia, mantenendo una coerenza stilistica eccellente grazie all'utilizzo coerente di utility-classes e token personalizzati.</li>
            </ul>
        </div>
    </div>`;

// Use simple string replacement 
html = html.replace(bricklinkOld.trim(), bricklinkNew.trim());
html = html.replace(graduamOld.trim(), graduamNew.trim());

fs.writeFileSync('portfolio/index.html', html);
console.log('Done replacing project sections');
