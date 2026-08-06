const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const bricklinkStart = html.indexOf('<!-- BRICKLINK PROJECT WINDOW -->');
const graduamStart = html.indexOf('<!-- GRADUAM PROJECT WINDOW -->');
const scriptStart = html.indexOf('<script src="../script.js"></script>');

if (bricklinkStart !== -1 && graduamStart !== -1 && scriptStart !== -1) {
    const beforeBricklink = html.substring(0, bricklinkStart);
    const afterGraduam = html.substring(scriptStart);
    
    let winBricklinkStr = html.substring(bricklinkStart, graduamStart);
    let winGraduamStr = html.substring(graduamStart, scriptStart);

    // Remove them from the bottom
    html = beforeBricklink + afterGraduam;

    // Clean up the modal classes and styles
    winBricklinkStr = winBricklinkStr.replace('class="mac-window"', 'class="mac-window reveal"');
    winBricklinkStr = winBricklinkStr.replace(/style="display:none; position: fixed; top: 10vh; left: 15vw; width: 70vw; max-height: 80vh; z-index: 1000;"/g, '');
    winBricklinkStr = winBricklinkStr.replace(/onclick="closeWin\('win-bricklink'\)"/g, '');
    winBricklinkStr = winBricklinkStr.replace(/onclick="minimizeWin\(this.closest\('\.mac-window'\)\.id\)"/g, '');
    winBricklinkStr = winBricklinkStr.replace(/onclick="maximizeWin\(this.closest\('\.mac-window'\)\.id\)"/g, '');
    winBricklinkStr = winBricklinkStr.replace(/onmousedown="startDrag\(event, 'win-bricklink'\)"/g, '');

    winGraduamStr = winGraduamStr.replace('class="mac-window"', 'class="mac-window reveal"');
    winGraduamStr = winGraduamStr.replace(/style="display:none; position: fixed; top: 12vh; left: 20vw; width: 65vw; max-height: 80vh; z-index: 1000;"/g, '');
    winGraduamStr = winGraduamStr.replace(/onclick="closeWin\('win-graduam'\)"/g, '');
    winGraduamStr = winGraduamStr.replace(/onclick="minimizeWin\(this.closest\('\.mac-window'\)\.id\)"/g, '');
    winGraduamStr = winGraduamStr.replace(/onclick="maximizeWin\(this.closest\('\.mac-window'\)\.id\)"/g, '');
    winGraduamStr = winGraduamStr.replace(/onmousedown="startDrag\(event, 'win-graduam'\)"/g, '');

    // Insert into .windows-container right before win-edu
    const insertionPoint = html.indexOf('<!-- WIN: EDUCATION (Mail App) -->');
    if (insertionPoint !== -1) {
        html = html.substring(0, insertionPoint) + winBricklinkStr + '\n' + winGraduamStr + '\n            ' + html.substring(insertionPoint);
        fs.writeFileSync('portfolio/index.html', html);
        console.log('Restructured successfully');
    } else {
        console.log('Insertion point not found');
    }
} else {
    console.log('Could not find tags:', bricklinkStart, graduamStart, scriptStart);
}
