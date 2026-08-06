const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace('.clock-widget {\n    position:fixed;', '.clock-widget {\n    position:absolute;');
css = css.replace('.desktop-icon { position:fixed;', '.desktop-icon { position:absolute;');
css = css.replace('.desktop-content { position:fixed;', '.desktop-content { position:absolute;');

fs.writeFileSync('styles.css', css, 'utf8');
console.log('Fixed more absolute positions.');
