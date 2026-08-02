const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(
`.edu-card h4 { margin: 0 0 5px 0; font-size: 16px; color: #111; }`,
`.edu-card h4 { margin: 0 0 5px 0; font-size: 16px; color: #f2f2f7; }`
);

css = css.replace(
`.edu-card p { margin: 0; font-size: 13px; color: #555; line-height: 1.4;}`,
`.edu-card p { margin: 0; font-size: 13px; color: #aeaeb2; line-height: 1.4;}`
);

// Bio generic colors
css += `
.apple-card h3 { color: #f2f2f7; }
.apple-card h4 { color: #f2f2f7; }
.apple-card p { color: #aeaeb2; }
`;

fs.writeFileSync('styles.css', css, 'utf8');
console.log('Fixed .edu-card typography in CSS!');
