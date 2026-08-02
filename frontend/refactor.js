const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the win-titlebar and body start
const pattern = /<span class="win-title" style="display:flex; align-items:center; justify-content:center; gap:5px; margin: 0 auto;">\s*<img src="[^"]*" style="width:16px;">\s*(.*?)\s*<\/span>\s*<\/div>\s*<div class="win-body win-content-flex" style="background: #fafafa; padding:0;">/g;

html = html.replace(pattern, (match, title) => {
    title = title.trim();
    // capitalize first letter
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return `<span class="win-title">${title}</span>
        </div>
        <div class="win-toolbar">
            <div class="toolbar-btn">⟨ ⟩</div>
            <div class="toolbar-path">${title}</div>
        </div>
        <div class="win-content-flex">`;
});

// 2. Replace <div class="folder-grid"> with <div class="win-body finder-grid">
html = html.replace(/<div class="folder-grid">/g, '<div class="win-body finder-grid">');

// 3. Replace inline div
const pattern_inline = /<div style="text-align:center; width:80px; cursor:pointer;" (ondblclick="[^"]+")>/g;
html = html.replace(pattern_inline, '<div class="finder-file" onclick="selectFolder(this, event)" $1>');

// 4. In win-folder-uni, replace folder classes with finder-file
// We only want to replace it inside the FOLDER WINDOWS block.
// A simple way is to replace `<div class="folder"` with `<div class="finder-file"` 
// from the index where "<!-- FOLDER WINDOWS (FINDER) -->" appears.
const index = html.indexOf('<!-- FOLDER WINDOWS (FINDER) -->');
if (index !== -1) {
    const start = html.substring(0, index);
    let end = html.substring(index);
    end = end.replace(/<div class="folder"/g, '<div class="finder-file"');
    
    // Also, inside these folders, span.folder-name needs to be div.file-name
    end = end.replace(/<span class="folder-name">/g, '<div class="file-name">');
    end = end.replace(/<\/span>/g, '</div>');
    
    html = start + end;
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Done");
