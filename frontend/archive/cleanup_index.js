const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove Progetti.rtf from desktop-files-right
const progettiRtfStr = `            <div class="folder" onclick="selectFolder(this, event)" ondblclick="openWindow('win-projects')">
                <img src="./assets/icons/doc-rtf.svg" class="folder-icon" alt="File">
                <span class="folder-name">Progetti.rtf</span>
            </div>\n`;
html = html.replace(progettiRtfStr, '');

// 2. Remove win-projects, win-bricklink, win-graduam
function removeWindow(html, winId) {
    const searchStr = `<div class="mac-window" id="${winId}"`;
    const startIdx = html.indexOf(searchStr);
    if (startIdx === -1) return html;
    
    let endIdx = html.indexOf('<!-- ', startIdx + 10);
    if (endIdx === -1) {
        endIdx = html.indexOf('<!-- MAC DOCK -->', startIdx);
    }
    
    if (startIdx !== -1 && endIdx !== -1) {
        return html.substring(0, startIdx) + html.substring(endIdx);
    }
    return html;
}

html = removeWindow(html, 'win-projects');
html = removeWindow(html, 'win-bricklink');
html = removeWindow(html, 'win-graduam');

// Clean up any extra empty lines or leftover comments if needed.
html = html.replace(/<!-- PROJECTS WINDOW -->\n?/g, '');
html = html.replace(/<!-- BRICKLINK PROJECT WINDOW -->\n?/g, '');
html = html.replace(/<!-- GRADUAM PROJECT WINDOW -->\n?/g, '');

fs.writeFileSync('index.html', html);
console.log('Cleanup done');
