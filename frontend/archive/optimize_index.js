const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const mobileCSS = `
        /* Mobile Optimization */
        @media (max-width: 768px) {
            .menubar {
                padding: 0 10px;
                font-size: 12px;
            }
            .menubar-item {
                padding: 0 8px;
            }
            .menubar-right {
                gap: 10px;
            }
            .mac-window {
                width: 95vw !important;
                height: 80vh !important;
                left: 2.5vw !important;
                top: 10vh !important;
                max-width: 100vw;
            }
            #win-browser {
                height: 90vh !important;
                top: 5vh !important;
            }
            .desktop-icons {
                top: 60px;
                right: 10px;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-end;
                width: 100%;
                padding: 10px;
            }
            .desktop-icon {
                margin: 10px;
            }
            .mac-dock-container {
                bottom: 10px;
                width: 95%;
                margin: 0 auto;
            }
            .mac-dock {
                padding: 10px;
                overflow-x: auto;
                justify-content: flex-start;
                gap: 10px;
                border-radius: 20px;
            }
            .dock-icon {
                width: 45px !important;
                height: 45px !important;
            }
            .dock-icon-black {
                width: 25px !important;
                height: 25px !important;
            }
            .dock-item img[src="trash.png"] {
                width: 45px !important;
                height: 45px !important;
                margin-top: 0 !important;
            }
            .desktop-icon .folder-icon {
                width: 50px;
                height: 50px;
            }
            .desktop-icon .file-name {
                font-size: 11px;
            }
        }`;

if (!html.includes('/* Mobile Optimization */')) {
    html = html.replace('</style>', mobileCSS + '\n    </style>');
    fs.writeFileSync('index.html', html);
    console.log('Successfully injected mobile CSS to index.html');
} else {
    console.log('Mobile CSS already exists in index.html');
}
