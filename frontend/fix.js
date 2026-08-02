const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Fix the mismatched <span class="win-title">...</div> back to </span>
html = html.replace(/<span class="win-title">([^<]*)<\/div>/g, '<span class="win-title">$1</span>');

// Also, the previous script replaced `</span>` with `</div>` globally in the second half of the file.
// Let's restore the ones that were not supposed to be divs.
// Actually, `span` was only used for `.folder-name` and inline styles, but what if there were other spans?
// e.g. <span style="font-size:12px;"> was changed to <span style="font-size:12px;"> ... </div> (mismatched)
html = html.replace(/<span([^>]*)>([^<]*)<\/div>/g, '<span$1>$2</span>');

// And we need to make sure the app names in `.finder-file` are wrapped in `<div class="file-name">...</div>`.
// Our previous script replaced: `<span class="folder-name">` with `<div class="file-name">`, and `</span>` with `</div>`.
// Wait, the previous script did `end = end.replace(/<\/span>/g, '</div>');`. That means ALL `</span>` became `</div>`.
// So `<span style="font-size:12px;">Figma</div>` became that.
// The regex `<span([^>]*)>([^<]*)<\/div>` will fix this, turning it back into `<span...>...</span>`.
// But wait! If it turns `<div class="file-name">...</div>` into `<span>`? No, because the opening tag must be `<span`.

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed HTML");
