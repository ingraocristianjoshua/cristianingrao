const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const oldCss = `            animation: fontSwitch 3.5s ease-in-out infinite;`;
const newCss = `            animation: fontSwitch 7s ease-in-out infinite;`;

if (html.includes(oldCss)) {
    html = html.replace(oldCss, newCss);
    fs.writeFileSync('portfolio/index.html', html);
    console.log('Successfully slowed down fontSwitch animation');
} else {
    console.log('Could not find old fontSwitch CSS');
}
