const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

// Find the style block
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    const cssContent = styleMatch[1];
    
    // Read existing portfolio_final.css or create it
    let existingCss = '';
    if (fs.existsSync('portfolio_final.css')) {
        existingCss = fs.readFileSync('portfolio_final.css', 'utf8');
    }
    
    // Append or overwrite
    fs.writeFileSync('portfolio_final.css', cssContent + '\n' + existingCss);
    console.log('CSS extracted to portfolio_final.css');
    
    // Replace <style> block with a <link> tag
    html = html.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="../portfolio_final.css">');
    fs.writeFileSync('portfolio/index.html', html);
    console.log('portfolio/index.html updated to use portfolio_final.css');
} else {
    console.log('No <style> block found in portfolio/index.html');
}
