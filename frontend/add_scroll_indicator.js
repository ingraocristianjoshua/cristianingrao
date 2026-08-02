const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const scrollIndicator = `
    <!-- SCROLL INDICATOR -->
    <div class="scroll-indicator" onclick="window.scrollTo({top: window.innerHeight, behavior: 'smooth'})">
        <span>Scroll for Portfolio</span>
        <i class="fas fa-chevron-down"></i>
    </div>
`;

html = html.replace('    <!-- MAC DOCK -->', scrollIndicator + '\n    <!-- MAC DOCK -->');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Indicator injected!');
