const fs = require('fs');

let html = fs.readFileSync('portfolio/index.html', 'utf8');

const photoHtml = `
            <!-- WIN: PHOTO -->
            <div class="mac-window reveal" id="win-photo">
                <div class="win-titlebar" onmousedown="startDrag(event, 'win-photo')">
                    <div class="win-controls">
                        <div class="tl red" onclick="closeWin('win-photo')"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">Photo Booth</span>
                </div>
                <div class="win-content p-0" style="display: flex; flex-direction: column; background: #1C1C1E;">
                    <div style="flex: 1; padding: 15px;">
                        <div style="width: 100%; height: 100%; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; background: #000; display: flex; justify-content: center; align-items: center;">
                            <img src="../profile_pic.jpg" alt="Cristian Ingrao" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                    <div style="height: 64px; background: #2C2C2E; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: center; align-items: center;">
                        <div style="width: 44px; height: 44px; border-radius: 50%; background: #ffffff; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: transform 0.1s; margin: 0 auto; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'">
                            <div style="width: 36px; height: 36px; border-radius: 50%; background: #ff3b30; border: 1px solid rgba(0,0,0,0.1);"></div>
                        </div>
                    </div>
                </div>
            </div>
`;

// Insert photoHtml right before MAC OS DOCK
if (!html.includes('id="win-photo"')) {
    html = html.replace('            <!-- MAC OS DOCK -->', photoHtml + '\n            <!-- MAC OS DOCK -->');
    fs.writeFileSync('portfolio/index.html', html);
    console.log('Restored win-photo');
} else {
    console.log('win-photo already exists!');
}
