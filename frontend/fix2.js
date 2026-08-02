const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// replace `<span style="font-size:12px;">...</span>` with `<div class="file-name">...</div>`
html = html.replace(/<span style="font-size:12px;">(.*?)<\/span>/g, '<div class="file-name">$1</div>');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed span tags");
