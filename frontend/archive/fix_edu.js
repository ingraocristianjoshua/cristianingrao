const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const eduOldStart = `            <!-- WIN: EDUCATION (Mail App) -->
            <div class="mac-window reveal" id="win-edu">`;
const eduOldEnd = `                </div>
            </div>`;

// We need to carefully replace the win-edu div.
// Let's find the exact string.

const fileContent = html;
const startIdx = fileContent.indexOf('<!-- WIN: EDUCATION (Mail App) -->');
const nextWinIdx = fileContent.indexOf('<!-- WIN: CONTACTS -->');

if (startIdx !== -1 && nextWinIdx !== -1) {
    const newEduHtml = `<!-- WIN: EDUCATION -->
    <div class="mac-window reveal" id="win-edu">
        <div class="win-titlebar">
            <div class="win-controls">
                <div class="tl red"></div>
                <div class="tl yellow"></div>
                <div class="tl green"></div>
            </div>
            <span class="win-title">Formazione ed Educazione</span>
        </div>
        <div class="win-body" style="padding: 30px 40px; overflow-y: auto; line-height: 1.6; font-size: 15px; background: rgba(28,28,30,0.4); color: #EBEBF5;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #0A84FF 0%, #00C6FF 100%); display:flex; align-items:center; justify-content:center; font-size:24px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">🎓</div>
                <h1 style="font-size: 28px; font-weight: 700; margin: 0;">Percorso di Studi</h1>
            </div>
            
            <div class="edu-card" style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; flex-wrap: wrap; gap: 10px;">
                    <h3 style="font-size: 20px; color: #64D2FF; margin: 0;">Laurea in Ingegneria Informatica (Classe L-8)</h3>
                    <span style="background: rgba(100, 210, 255, 0.15); color: #64D2FF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">30 LUG 2026</span>
                </div>
                <p style="font-size: 16px; font-weight: 500; margin-bottom: 15px; color: #fff;">Università degli Studi di Palermo - UniPa</p>
                <div style="display: inline-block; padding: 8px 15px; background: rgba(52, 199, 89, 0.15); border-left: 3px solid #34c759; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
                    <strong style="color: #34c759;">Votazione Finale: 104 / 110</strong>
                </div>
                <p style="color: #bbb; margin-bottom: 0;">Solida preparazione teorica e pratica nello sviluppo software, algoritmi, architetture di sistemi complessi e ingegneria dei dati, coniugata con una spiccata attitudine alla produzione multimediale e alla comunicazione visiva.</p>
            </div>
        </div>
    </div>
    
    `;
    
    html = html.substring(0, startIdx) + newEduHtml + html.substring(nextWinIdx);
    fs.writeFileSync('portfolio/index.html', html);
    console.log('Successfully updated win-edu');
} else {
    console.log('Could not find win-edu section');
}
