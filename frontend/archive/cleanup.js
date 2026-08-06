const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

// Replace titlebar-dark
content = content.replace(
    /class="win-titlebar" onmousedown="(.*?)" style="background: rgba\([34]0,\s?[34]0,\s?[34]0,\s?0\.95\); border-bottom:1px solid rgba\(255,255,255,0\.1\);?"/g,
    'class="win-titlebar titlebar-dark" onmousedown="$1"'
);

// Replace Easter Egg specific titlebar
content = content.replace(
    /class="win-titlebar" onmousedown="(.*?)" style="background: rgba\(40,40,40,0\.95\); border-bottom:1px solid #222;"/g,
    'class="win-titlebar titlebar-dark" onmousedown="$1"'
);

// Replace titlebar-light
content = content.replace(
    /class="win-titlebar" onmousedown="(.*?)" style="background: rgba\(240,240,240,0\.9\);?"/g,
    'class="win-titlebar titlebar-light" onmousedown="$1"'
);

fs.writeFileSync('index.html', content);
console.log('Replaced!');
