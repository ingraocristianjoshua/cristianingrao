const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const unifiedSidebar = `<div class="finder-sidebar">
                <div class="sb-section">Preferiti</div>
                <div class="sb-item" onclick="switchFinderTab(this, 'win-folder-miniature')">📱 Applicazioni</div>
                <div class="sb-item" onclick="switchFinderTab(this, 'win-folder-video')">🎥 Recenti</div>
                <div class="sb-item" onclick="switchFinderTab(this, 'win-folder-uni')">📄 Documenti</div>
                <div class="sb-item" onclick="closeWin(this.closest('.mac-window').id)">🖥️ Desktop</div>
                <div class="sb-item" onclick="switchFinderTab(this, 'win-trash')">🗑️ Cestino</div>
            </div>`;

// We want to replace everything from `<div class="finder-sidebar">` to its closing `</div>`.
// Since regex with nested divs is tricky, we can use a simpler approach.
// We know what's inside the sidebars. Let's just do it with a loop or regex if it's consistent.

const pattern = /<div class="finder-sidebar">[\s\S]*?<\/div>\s*<div class="win-body finder-grid">/g;

html = html.replace(pattern, unifiedSidebar + '\n            <div class="win-body finder-grid">');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated sidebars");
