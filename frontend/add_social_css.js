const fs = require('fs');

const css = `
/* iPhone 17 Mockup */
.bento-social {
    top: 150px;
    left: 70%;
    width: 250px;
    height: 520px;
    transform: rotate(2deg);
    z-index: 14;
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
}
.iphone-17-mockup {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    background: #000;
    box-shadow: 
        0 0 0 8px #1c1c1e,
        0 0 0 10px #333,
        0 20px 50px rgba(0,0,0,0.5);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.iphone-17-mockup:hover {
    transform: scale(1.03) translateY(-10px);
}
.iphone-17-mockup img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 32px;
}
/* Dynamic Island */
.iphone-notch {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 85px;
    height: 25px;
    background: #000;
    border-radius: 20px;
    z-index: 5;
    box-shadow: inset 0 0 2px rgba(255,255,255,0.1);
}
/* Home Bar */
.iphone-home-bar {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: #fff;
    border-radius: 4px;
    z-index: 5;
    opacity: 0.8;
}
.bento-social.visible { transform: translateY(0) rotate(2deg); }

/* Mobile Adjustments for social */
@media (max-width: 900px) {
    .bento-social {
        transform: none !important;
        left: auto !important;
        margin: 20px 0;
    }
}
`;
fs.appendFileSync('styles.css', css, 'utf8');
console.log('iPhone CSS added!');
