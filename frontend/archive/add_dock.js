const fs = require('fs');

let html = fs.readFileSync('portfolio/index.html', 'utf8');

// 1. Add CSS for dock
const cssToAdd = `
        /* MacOS Dock */
        .mac-dock-container {
            grid-column: 1 / -1;
            display: flex;
            justify-content: center;
            margin-top: 10px;
            margin-bottom: 20px;
            animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.5s;
            opacity: 0;
            transform: translateY(20px);
        }
        @keyframes slideUp {
            to { opacity: 1; transform: translateY(0); }
        }
        .mac-dock {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 14px;
            background: rgba(40, 40, 40, 0.5);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 24px;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .dock-app {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            object-fit: cover;
            cursor: pointer;
            transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), margin 0.2s;
            background: rgba(40,40,40,0.6);
            padding: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            border: 1px solid rgba(255,255,255,0.05);
        }
        .dock-app:hover {
            transform: scale(1.35) translateY(-8px);
            margin: 0 10px;
            z-index: 10;
        }
        .dock-app-yellow { background: #F7DF1E; padding: 4px; border-radius: 10px; }
        .dock-divider {
            width: 1px;
            height: 38px;
            background: rgba(255,255,255,0.2);
            margin: 0 4px;
        }
`;

html = html.replace('/* Windows Grid */', cssToAdd + '\n        /* Windows Grid */');


// 2. Remove tech stack from bio
const startTag = '<!-- TECH STACK DOCK INSIDE BIO -->';
const startIdx = html.indexOf(startTag);
if (startIdx !== -1) {
    const endIdx = html.indexOf('</div>\n                        </div>\n                    </div>\n                </div>\n            </div>', startIdx);
    if (endIdx !== -1) {
        html = html.substring(0, startIdx) + html.substring(endIdx);
    }
}

// 3. Add dock after win-photo
const photoEndTag = '</div>\n            </div>\n\n            <!-- WIN: PROJECTS -->';
const dockHtml = `</div>
            </div>

            <!-- MAC OS DOCK -->
            <div class="mac-dock-container">
                <div class="mac-dock">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" class="dock-app" title="Python">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" class="dock-app dock-app-yellow" title="JavaScript">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" class="dock-app" title="React">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" class="dock-app" title="Node.js">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" class="dock-app" title="C++">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" class="dock-app" title="MySQL">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" class="dock-app" title="Git">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" class="dock-app" title="Linux">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" class="dock-app" title="VS Code">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" class="dock-app" title="HTML5">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" class="dock-app" title="CSS3">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" class="dock-app" title="TypeScript">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" class="dock-app" title="Java">
                    
                    <div class="dock-divider"></div>
                    
                    <img src="../assets/instagram.png" class="dock-app" title="Instagram" style="padding: 0;">
                    <img src="../assets/linkedin.png" class="dock-app" title="LinkedIn" style="padding: 0;">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" class="dock-app" style="filter: invert(1);" title="GitHub">
                    
                    <div class="dock-divider"></div>
                    
                    <img src="../trash.png" class="dock-app" title="Cestino" style="padding: 4px; background: transparent; border: none; box-shadow: none;">
                </div>
            </div>

            <!-- WIN: PROJECTS -->`;

html = html.replace(photoEndTag, dockHtml);

fs.writeFileSync('portfolio/index.html', html);
console.log('Dock added successfully!');
