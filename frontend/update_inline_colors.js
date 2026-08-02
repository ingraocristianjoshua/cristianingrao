const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update Bricklink
html = html.replace('background: #e3f2fd;', 'background: #0a192f;');
html = html.replace('color: #0058d0;', 'color: #58a6ff;');

// Update Graduam
html = html.replace('background: #f3e5f5;', 'background: #1a0f2e;');
html = html.replace('color: #6a1b9a;', 'color: #d2a8ff;');

// Update EcoPalMaps
html = html.replace('background: #e8f5e9;', 'background: #0d2a15;');
html = html.replace('color: #2e7d32;', 'color: #7ee787;');

// Update AFAM
html = html.replace('background: #ffebee;', 'background: #300d11;');
html = html.replace('color: #c62828;', 'color: #ff7b72;');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Project card colors updated for Dark Mode!');
