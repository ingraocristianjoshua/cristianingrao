const fs = require('fs');
const append = `
/* Analog Clock Icon */
.analog-clock-icon {
    width: 55px; height: 55px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.15);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15), inset 0 0 5px rgba(0,0,0,0.05);
    position: relative;
    display: flex; justify-content: center; align-items: center;
}
.clock-face {
    width: 46px; height: 46px;
    border-radius: 50%;
    border: 1.5px solid #222;
    position: relative;
    background: #fff;
}
.hand { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2;}
.hour-hand::after { content: ''; position: absolute; bottom: 50%; left: 50%; transform: translateX(-50%); width: 3.5px; height: 12px; background: #222; border-radius: 4px; }
.min-hand::after { content: ''; position: absolute; bottom: 50%; left: 50%; transform: translateX(-50%); width: 2px; height: 17px; background: #222; border-radius: 4px; }
.second-hand::after { content: ''; position: absolute; bottom: 50%; left: 50%; transform: translateX(-50%); width: 1.5px; height: 21px; background: #ff3b30; border-radius: 2px; }
.clock-center { position: absolute; top: 50%; left: 50%; width: 4.5px; height: 4.5px; background: #ff3b30; border-radius: 50%; transform: translate(-50%, -50%); z-index: 3;}
`;
fs.appendFileSync('styles.css', append, 'utf8');
