const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldTrash = '<img src="trash.png" alt="Cestino" style="width: 58px; height: 58px; object-fit: contain; margin-top: -3px;">';
const newTrash = '<img src="trash.png" alt="Cestino" style="width: 72px; height: 72px; object-fit: contain; margin-top: -8px;">';

if (html.includes(oldTrash)) {
    html = html.replace(oldTrash, newTrash);
    fs.writeFileSync('index.html', html);
    console.log('Successfully updated trash icon size');
} else {
    console.log('Could not find trash icon HTML to replace');
}
