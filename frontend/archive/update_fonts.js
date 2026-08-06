const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const oldCss = `            animation: fontSwitch 8s ease-in-out infinite;
        }
        @keyframes fontSwitch {
            0%, 20%   { font-family: 'Inter', sans-serif; }
            25%, 45%  { font-family: 'Playfair Display', serif; }
            50%, 70%  { font-family: 'Space Grotesk', sans-serif; }
            75%, 95%  { font-family: 'Outfit', sans-serif; }
            100%      { font-family: 'Inter', sans-serif; }
        }`;

const newCss = `            animation: fontSwitch 3.5s ease-in-out infinite;
        }
        @keyframes fontSwitch {
            0%, 10%   { font-family: 'Inter', sans-serif; }
            12%, 22%  { font-family: 'Playfair Display', serif; }
            24%, 34%  { font-family: 'Space Grotesk', sans-serif; }
            36%, 46%  { font-family: 'Outfit', sans-serif; }
            48%, 58%  { font-family: 'Sora', sans-serif; }
            60%, 70%  { font-family: 'DM Sans', sans-serif; }
            72%, 82%  { font-family: 'Georgia', serif; }
            84%, 94%  { font-family: 'Courier New', monospace; }
            100%      { font-family: 'Inter', sans-serif; }
        }`;

if (html.includes(oldCss)) {
    html = html.replace(oldCss, newCss);
    fs.writeFileSync('portfolio/index.html', html);
    console.log('Successfully updated fontSwitch animation');
} else {
    console.log('Could not find old fontSwitch CSS');
}
