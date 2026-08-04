const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Privacy Policy icon to desktop
const privacyIconHtml = `
            <div class="folder" onclick="selectFolder(this, event)" ondblclick="openWindow('win-privacy')">
                <img src="./assets/icons/doc-rtf.svg" class="folder-icon" alt="Privacy">
                <span class="folder-name">Privacy_Policy.rtf</span>
            </div>`;
html = html.replace('<!-- RIGHT FILES -->\n        <div class="desktop-files-right">', '<!-- RIGHT FILES -->\n        <div class="desktop-files-right">' + privacyIconHtml);

// 2. Add Privacy Window
const privacyWindowHtml = `
    <!-- PRIVACY POLICY WINDOW -->
    <div class="mac-window" id="win-privacy" style="display:none; top:120px; left:220px; width:650px; height:500px;">
        <div class="win-titlebar titlebar-dark" onmousedown="startDrag(event, 'win-privacy')">
            <div class="traffic-lights">
                <div class="tl red" onclick="closeWin('win-privacy')"></div>
                <div class="tl yellow" onclick="minimizeWin(this.closest('.mac-window').id)"></div>
                <div class="tl green" onclick="maximizeWin(this.closest('.mac-window').id)"></div>
            </div>
            <span class="win-title" style="color:#ddd; font-weight:500;">Privacy_Policy.rtf</span>
        </div>
        <div class="win-body textedit-dark" style="padding: 30px; overflow-y: auto;">
            <h2 style="color: #fff; margin-bottom: 20px;">Informativa sulla Privacy (GDPR)</h2>
            <p style="color: #bbb; margin-bottom: 15px; font-size: 14px;">Ultimo aggiornamento: Agosto 2026</p>
            
            <h3 style="color: #64d2ff; margin: 20px 0 10px 0;">1. Titolare del Trattamento</h3>
            <p style="color: #ddd; margin-bottom: 15px;">Il Titolare del trattamento dei dati raccolti attraverso questo sito web è Cristian Ingrao. Per qualsiasi comunicazione o richiesta in merito alla privacy, è possibile contattare il titolare ai recapiti forniti nel CV o nel form di contatto (se presente).</p>
            
            <h3 style="color: #64d2ff; margin: 20px 0 10px 0;">2. Dati Raccolti</h3>
            <p style="color: #ddd; margin-bottom: 15px;">Questo sito web, strutturato come un portfolio interattivo (Single Page Application statica / Client-side), <strong>non fa uso di database per profilare gli utenti, né richiede registrazione</strong>. Tuttavia, raccogliamo i seguenti dati:</p>
            <ul style="color: #ddd; margin-bottom: 15px; padding-left: 20px;">
                <li style="margin-bottom: 5px;"><strong>Dati di navigazione:</strong> Gli header HTTP standard (Indirizzo IP anonimizzato, tipo di browser, orario di visita) elaborati automaticamente dai server di hosting (es. Vercel/GitHub Pages/Netlify) esclusivamente per finalità di sicurezza e diagnostica tecnica.</li>
                <li style="margin-bottom: 5px;"><strong>Cookie Tecnici:</strong> Utilizziamo cookie tecnici o il <code>localStorage</code> del browser <em>esclusivamente</em> per salvare le preferenze dell'interfaccia utente (es. finestre aperte, z-index). Nessun cookie di tracciamento pubblicitario o di profilazione viene installato.</li>
                <li style="margin-bottom: 5px;"><strong>Contenuti incorporati di terze parti:</strong> Alcune pagine (come la sezione "Easter Egg") potrebbero contenere iFrame di servizi esterni (es. YouTube). Questi servizi potrebbero impostare i propri cookie secondo le loro policy.</li>
            </ul>
            
            <h3 style="color: #64d2ff; margin: 20px 0 10px 0;">3. Base Giuridica e Finalità del Trattamento</h3>
            <p style="color: #ddd; margin-bottom: 15px;">I dati di navigazione e i cookie tecnici sono necessari (Base giuridica: Legittimo interesse) per garantire il corretto funzionamento dell'applicativo e un'esperienza utente interattiva coerente (emulazione OS).</p>
            
            <h3 style="color: #64d2ff; margin: 20px 0 10px 0;">4. Condivisione dei Dati</h3>
            <p style="color: #ddd; margin-bottom: 15px;">I tuoi dati non vengono venduti o scambiati con terze parti. Potrebbero essere condivisi esclusivamente con le infrastrutture tecniche essenziali (servizi di hosting) che agiscono nel rispetto del GDPR.</p>

            <h3 style="color: #64d2ff; margin: 20px 0 10px 0;">5. Diritti dell'Utente</h3>
            <p style="color: #ddd; margin-bottom: 15px;">Ai sensi del Regolamento (UE) 2016/679 (GDPR), l'utente ha il diritto di: accedere ai propri dati, chiederne la rettifica o la cancellazione (oblìo), opporsi al trattamento o richiederne la limitazione. Dato che il sito non profila né identifica nativamente gli utenti, tali richieste verranno evase nei limiti tecnologici dei log server anonimizzati.</p>
        </div>
    </div>
`;
html = html.replace('<!-- TRASH WINDOW -->', privacyWindowHtml + '\n    <!-- TRASH WINDOW -->');

fs.writeFileSync('index.html', html);
console.log('Privacy policy and icon added to index.html');
