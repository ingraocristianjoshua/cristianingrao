const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Remove all occurrences of </body> and </html>
html = html.replace(/<\/body>\s*<\/html>/g, '');

// The script tag might have been moved too. Let's find <script src="script.js"></script>
html = html.replace(/<script src="script.js"><\/script>/g, '');

// At the end of the file, we append them correctly
html = html + '\n    <script src="script.js"></script>\n</body>\n</html>\n';

fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML tags fixed.');
