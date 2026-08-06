const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

// 1. Fix win-bio
const bioOld = `<div class="win-titlebar" onmousedown="startDrag(event, 'win-bio')" style="justify-content: space-between; padding: 0 16px;">
                    <div style="display: flex; align-items: center; gap: 24px;">
                        <div class="win-controls" style="position: static;">
                            <div class="tl red" onclick="closeWin('win-bio')"></div>
                            <div class="tl yellow"></div>
                            <div class="tl green"></div>
                        </div>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" stroke-width="1.5" style="margin-top: 2px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                    </div>
                    
                    <div class="win-title" style="flex-direction: column; align-items: center; gap: 2px;">
                        <span style="font-weight: 600; color: #FFFFFF;">Biografia</span>
                    </div>

                    <div style="display: flex; align-items: center; gap: 16px; color: #A0A0A5;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                </div>`;
const bioNew = `<div class="win-titlebar">
            <div class="win-controls">
                <div class="tl red"></div>
                <div class="tl yellow"></div>
                <div class="tl green"></div>
            </div>
            <span class="win-title">Biografia</span>
        </div>`;
html = html.replace(bioOld, bioNew);

// 2. Fix win-photo
const photoOld = `<div class="win-titlebar" onmousedown="startDrag(event, 'win-photo')">
                    <div class="win-controls">
                        <div class="tl red" onclick="closeWin('win-photo')"></div>
                        <div class="tl yellow"></div>
                        <div class="tl green"></div>
                    </div>
                    <span class="win-title">Photo Booth</span>
                </div>`;
const photoNew = `<div class="win-titlebar">
            <div class="win-controls">
                <div class="tl red"></div>
                <div class="tl yellow"></div>
                <div class="tl green"></div>
            </div>
            <span class="win-title">Photo Booth</span>
        </div>`;
html = html.replace(photoOld, photoNew);

// 3. Fix win-contacts
const contactsOld = `<div class="mac-window reveal" id="win-contacts">
            <div class="win-content" onmousedown="startDrag(event, 'win-contacts')" style="cursor: grab;">`;
const contactsNew = `<div class="mac-window reveal" id="win-contacts">
        <div class="win-titlebar">
            <div class="win-controls">
                <div class="tl red"></div>
                <div class="tl yellow"></div>
                <div class="tl green"></div>
            </div>
            <span class="win-title">Contatti</span>
        </div>
        <div class="win-body" style="background: transparent;">`;
html = html.replace(contactsOld, contactsNew);
html = html.replace('</div>\n                <div class="contact-list">', '<div class="contact-list">');

// change win-content to win-body for win-bio and win-photo
html = html.replace('<div class="win-content" style="background: transparent;">\n                    <div class="bio-content">', '<div class="win-body" style="background: transparent;">\n                    <div class="bio-content">');
html = html.replace('<div class="win-content p-0" style="display: flex; flex-direction: column; background: #1C1C1E;">', '<div class="win-body p-0" style="display: flex; flex-direction: column; background: #1C1C1E; height: 100%;">');

fs.writeFileSync('portfolio/index.html', html);
console.log('Fixed windows styles');
