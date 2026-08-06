const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

// 1. Add CSS for marquee
const marqueeCSS = `
        /* Emoji Marquee Separator */
        .marquee-container {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            padding: 30px 0;
            position: relative;
            display: flex;
            align-items: center;
        }
        .marquee-container::before, .marquee-container::after {
            content: '';
            position: absolute;
            top: 0; bottom: 0;
            width: 150px;
            z-index: 2;
            pointer-events: none;
        }
        .marquee-container::before {
            left: 0;
            background: linear-gradient(to right, #0A0A0A, transparent);
        }
        .marquee-container::after {
            right: 0;
            background: linear-gradient(to left, #0A0A0A, transparent);
        }
        .marquee-content {
            display: inline-block;
            white-space: nowrap;
            animation: scroll-left-to-right 30s linear infinite;
        }
        .marquee-content span {
            font-size: 64px;
            margin: 0 40px;
            display: inline-block;
            filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .marquee-content span:hover {
            transform: scale(1.3) rotate(10deg);
        }
        @keyframes scroll-left-to-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
        }
`;

if (!html.includes('/* Emoji Marquee Separator */')) {
    html = html.replace('</style>', marqueeCSS + '\n    </style>');
}

// 2. Add HTML for marquee between BrickLink and Graduam
// Find the start of the Graduam Cluster
const graduamMarker = '<!-- GRADUAM CLUSTER -->';
const emojis = '🧱 🚀 💻 📱 🧠 ⚙️ 💡 🎓 🧮 🧩 🧪 🛠️ 🎨 🌐 📈 📚 🏆 👨‍💻';
// We duplicate the emojis to make the loop seamless
const emojiSpans = emojis.split(' ').map(e => `<span>${e}</span>`).join('');
const doubleEmojiSpans = emojiSpans + emojiSpans; // 2 sets in one content block
// Wait, for translateX(-50%) to 0%, the content needs to be twice as wide, so we put 2 identical sets inside the content.

const marqueeHTML = `
            <!-- EMOJI MARQUEE SEPARATOR -->
            <div class="col-12" style="margin: 20px 0;">
                <div class="marquee-container">
                    <div class="marquee-content">
                        ${doubleEmojiSpans}
                    </div>
                </div>
            </div>
            
            `;

if (html.includes(graduamMarker) && !html.includes('EMOJI MARQUEE SEPARATOR')) {
    html = html.replace(graduamMarker, marqueeHTML + graduamMarker);
}

fs.writeFileSync('portfolio/index.html', html);
console.log('Added emoji marquee successfully.');
