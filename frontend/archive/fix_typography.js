const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace inline dark colors with light ones
html = html.replace(/color: #555;/g, 'color: #aeaeb2;');
html = html.replace(/color: #111;/g, 'color: #f2f2f7;');
html = html.replace(/color:#111;/g, 'color:#f2f2f7;');
html = html.replace(/color:#444;/g, 'color:#f2f2f7;');

// Contact text colors
html = html.replace(/color: #333;/g, 'color: #f2f2f7;');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed inline typography colors for Dark Mode!');
