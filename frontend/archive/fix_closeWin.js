const fs = require('fs');
let script = fs.readFileSync('script.js', 'utf8');

const target = `function closeWin(id) {
    const win = document.getElementById(id);
    if(win) {
        win.classList.add('closing');
        setTimeout(() => {
            win.style.display = 'none';
            win.classList.remove('closing');
        }, 200);
    }
}`;

const replacement = `function closeWin(id) {
    const win = document.getElementById(id);
    if(win) {
        win.classList.add('closing');
        setTimeout(() => {
            win.style.display = 'none';
            win.classList.remove('closing');
            
            if (id === 'win-easteregg') {
                const iframe = document.getElementById('easteregg-iframe');
                if (iframe) iframe.src = '';
            }
        }, 200);
    }
}`;

script = script.replace(target, replacement);
fs.writeFileSync('script.js', script);
console.log('Fixed closeWin');
