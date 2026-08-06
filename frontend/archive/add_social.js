const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const socialHTML = `
                <!-- Social iPhone Mockup -->
                <div class="bento-window bento-social fade-up delay-6">
                    <div class="iphone-17-mockup" onclick="window.open('https://instagram.com/cristianingrao', '_blank')">
                        <div class="iphone-notch"></div>
                        <img src="./assets/images/ig_screenshot.png" alt="Instagram Profile">
                        <div class="iphone-home-bar"></div>
                    </div>
                </div>
`;

html = html.replace('                <!-- Contatti Popup -->', socialHTML + '\n                <!-- Contatti Popup -->');

fs.writeFileSync('index.html', html, 'utf8');
console.log('iPhone mockup added to HTML!');
