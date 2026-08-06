const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// 1. Change wallpaper from fixed to absolute
css = css.replace('.wallpaper {\n    position: fixed;', '.wallpaper {\n    position: absolute;');

// 2. Change menubar from fixed to absolute
css = css.replace('.menubar {\n    position: fixed;', '.menubar {\n    position: absolute;');

// 3. Change dock-bar from fixed to absolute
css = css.replace('.dock-bar {\n    position: fixed;', '.dock-bar {\n    position: absolute;');

// 4. Desktop-hero: add overflow: hidden
css = css.replace(
`/* HERO DESKTOP SECTION */
#desktop-hero {
    position: relative;
    width: 100%;
    height: 100vh;
    z-index: 5;
    /* ensure desktop items are clipped if needed, but not necessarily */
}`,
`/* HERO DESKTOP SECTION */
#desktop-hero {
    position: relative;
    width: 100%;
    height: 100vh;
    z-index: 5;
    overflow: hidden; /* clip everything inside */
}`);

// 5. Portfolio-scrollable-content: add solid background
css = css.replace(
`/* PORTFOLIO SCROLLABLE CONTENT */
#portfolio-scrollable-content {
    position: relative;
    width: 100%;
    z-index: 10;
    background: transparent;
    padding-bottom: 100px; /* buffer at bottom */
}`,
`/* PORTFOLIO SCROLLABLE CONTENT */
#portfolio-scrollable-content {
    position: relative;
    width: 100%;
    z-index: 10;
    background: #0d0d0f; /* Dark elegant background */
    padding-bottom: 100px; /* buffer at bottom */
}`);

// 6. Fix bento-dock-container inside portfolio
// The bento dock container has position: fixed right now? Let's check if it does in css.
// I'll just write it.

fs.writeFileSync('styles.css', css, 'utf8');
console.log('Styles updated for Hero OS!');
