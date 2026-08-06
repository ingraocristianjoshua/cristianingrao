const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const oldEmojis = '🧱 🚀 💻 📱 🧠 ⚙️ 💡 🎓 🧮 🧩 🧪 🛠️ 🎨 🌐 📈 📚 🏆 👨‍💻';
const newEmojis = '💻 ⌨️ ⚙️ ⚡️ 📱 ⌚️ 🧠 🧱 🎓 📊 🌐 📁 🔐 🛠️ 🚀 👨‍💻 🎨 ☕️';

const emojiSpans = oldEmojis.split(' ').map(e => `<span>${e}</span>`).join('');
const doubleEmojiSpansOld = emojiSpans + emojiSpans;

const newEmojiSpans = newEmojis.split(' ').map(e => `<span>${e}</span>`).join('');
const doubleEmojiSpansNew = newEmojiSpans + newEmojiSpans;

if (html.includes(doubleEmojiSpansOld)) {
    html = html.replace(doubleEmojiSpansOld, doubleEmojiSpansNew);
    fs.writeFileSync('portfolio/index.html', html);
    console.log('Successfully updated emojis');
} else {
    console.log('Could not find old emojis');
}
