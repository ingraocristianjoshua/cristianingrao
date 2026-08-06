const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const mobileCSS = `
        /* Mobile Portfolio Optimization */
        @media (max-width: 900px) {
            .hero-title { font-size: 50px !important; }
            .hero-badge { top: 15px; right: 15px; font-size: 11px; padding: 5px 12px; }
            .marquee-content span { font-size: 40px !important; margin: 0 20px !important; }
            .col-12, .col-8, .col-7, .col-6, .col-5, .col-4 { 
                width: 100% !important; 
                grid-column: span 12 !important; 
            }
            .windows-container {
                display: flex !important;
                flex-direction: column !important;
                gap: 20px !important;
                padding: 0 10px !important;
            }
            .mac-dock-container {
                overflow-x: auto;
                padding-bottom: 10px;
            }
            .mac-dock {
                justify-content: flex-start;
                flex-wrap: nowrap;
                width: max-content;
            }
            .win-body {
                padding: 20px !important;
            }
        }
        @media (max-width: 600px) {
            .hero-title { font-size: 38px !important; }
            .hero-subtitle { font-size: 13px !important; }
            .marquee-content span { font-size: 30px !important; margin: 0 15px !important; }
            .win-title { font-size: 12px; }
            .bio-text h2 { font-size: 20px !important; }
            .bio-text p { font-size: 14px !important; }
        }`;

if (!html.includes('/* Mobile Portfolio Optimization */')) {
    html = html.replace('</style>', mobileCSS + '\n    </style>');
    fs.writeFileSync('portfolio/index.html', html);
    console.log('Successfully injected mobile CSS to portfolio/index.html');
} else {
    console.log('Mobile CSS already exists in portfolio/index.html');
}
