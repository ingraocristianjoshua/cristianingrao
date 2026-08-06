const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const oldHtml = `                    <div style="flex: 1; padding: 15px;">
                        <div style="width: 100%; height: 100%; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; background: #000; display: flex; justify-content: center; align-items: center;">
                            <img src="../profile_pic.jpg" alt="Cristian Ingrao" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                    <div style="height: 64px; background: #2C2C2E; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: center; align-items: center;">
                        <div style="width: 44px; height: 44px; border-radius: 50%; background: #ffffff; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: transform 0.1s; margin: 0 auto; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'">
                            <div style="width: 36px; height: 36px; border-radius: 50%; background: #ff3b30; border: 1px solid rgba(0,0,0,0.1);"></div>
                        </div>
                    </div>`;

const newHtml = `                    <div style="flex: 1; padding: 15px;">
                        <div id="pb-viewfinder" style="width: 100%; height: 100%; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; overflow: hidden; background: #000; display: flex; justify-content: center; align-items: center; position: relative; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);">
                            <img src="../profile_pic.jpg" alt="Cristian Ingrao" style="width: 100%; height: 100%; object-fit: cover; filter: contrast(1.05) brightness(1.05) saturate(1.1);">
                            <!-- Flash Overlay -->
                            <div id="pb-flash" style="position: absolute; top:0; left:0; width:100%; height:100%; background: white; opacity: 0; pointer-events: none; transition: opacity 0.15s ease-out; z-index: 10;"></div>
                            <!-- REC Indicator -->
                            <div style="position: absolute; top: 10px; left: 15px; display: flex; align-items: center; gap: 6px; z-index: 5;">
                                <div style="width: 8px; height: 8px; background: #ff3b30; border-radius: 50%; box-shadow: 0 0 5px #ff3b30; animation: blink 2s infinite;"></div>
                                <span style="color: white; font-size: 10px; font-weight: 600; font-family: -apple-system, sans-serif; letter-spacing: 1px; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">REC</span>
                            </div>
                            <!-- Camera Grid Lines -->
                            <div style="position: absolute; top: 33%; left: 0; width: 100%; height: 1px; background: rgba(255,255,255,0.1); pointer-events: none;"></div>
                            <div style="position: absolute; top: 66%; left: 0; width: 100%; height: 1px; background: rgba(255,255,255,0.1); pointer-events: none;"></div>
                            <div style="position: absolute; top: 0; left: 33%; width: 1px; height: 100%; background: rgba(255,255,255,0.1); pointer-events: none;"></div>
                            <div style="position: absolute; top: 0; left: 66%; width: 1px; height: 100%; background: rgba(255,255,255,0.1); pointer-events: none;"></div>
                        </div>
                    </div>
                    <div style="height: 64px; background: linear-gradient(to bottom, #2C2C2E, #1C1C1E); border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: center; align-items: center;">
                        <!-- Shutter Button -->
                        <div onclick="takePhoto()" style="width: 48px; height: 48px; border-radius: 50%; background: #ffffff; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: transform 0.1s; margin: 0 auto; box-shadow: 0 2px 5px rgba(0,0,0,0.5);" onmousedown="this.style.transform='scale(0.92)'" onmouseup="this.style.transform='scale(1)'">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: #ff3b30; border: 2px solid #fff; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);"></div>
                        </div>
                    </div>`;

if (html.includes(oldHtml)) {
    html = html.replace(oldHtml, newHtml);
    
    // Add blink keyframes
    const blinkCss = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
    `;
    html = html.replace('</style>', blinkCss + '\n    </style>');
    
    // Add JS for takePhoto
    const js = `
    <script>
        function takePhoto() {
            const flash = document.getElementById('pb-flash');
            if (flash) {
                // Play sound (optional, but requested later if needed)
                flash.style.transition = 'none';
                flash.style.opacity = '1';
                setTimeout(() => {
                    flash.style.transition = 'opacity 0.8s ease-out';
                    flash.style.opacity = '0';
                }, 50);
            }
        }
    </script>
</body>`;
    html = html.replace('</body>', js);
    
    fs.writeFileSync('portfolio/index.html', html);
    console.log('Successfully updated Photo Booth');
} else {
    console.log('Could not find old HTML for Photo Booth');
}
