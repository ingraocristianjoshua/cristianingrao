const fs = require('fs');
const css = `
/* BENTO SCATTERED DESKTOP UI */
.portfolio-bento {
    position: relative;
    width: 100%;
    min-height: 850px;
    background: #f4f5f7;
    overflow: hidden;
}
.bento-bg-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(#d1d1d6 2px, transparent 2px);
    background-size: 40px 40px;
    opacity: 0.5;
}

/* Base Window Style for Bento Items */
.bento-window {
    position: absolute;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 20px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.8);
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
    display: flex;
    flex-direction: column;
}
.bento-window:hover {
    transform: translateY(-8px) scale(1.02) !important;
    box-shadow: 0 20px 50px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,1);
    z-index: 50 !important;
}
.b-win-header {
    height: 35px;
    background: rgba(255,255,255,0.5);
    border-bottom: 1px solid rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    padding: 0 15px;
    position: relative;
}
.b-win-dots {
    display: flex;
    gap: 6px;
}
.b-win-dots span {
    width: 10px; height: 10px; border-radius: 50%; display: inline-block;
}
.b-win-dots .r { background: #ff5f56; }
.b-win-dots .y { background: #ffbd2e; }
.b-win-dots .g { background: #27c93f; }
.b-win-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    font-weight: 600;
    color: #444;
}
.b-win-body {
    padding: 25px;
    flex: 1;
}

/* Notes (Biografia) */
.bento-notes {
    top: 50px;
    left: 10%;
    width: 400px;
    transform: rotate(-2deg);
    z-index: 10;
}
.bento-notes h3 { font-size: 20px; font-weight: 800; margin-top: 0; color: #111; }
.bento-notes p { font-size: 14px; line-height: 1.5; color: #555; }

/* Photo Booth (Foto) */
.bento-photo {
    top: 300px;
    left: 8%;
    width: 300px;
    transform: rotate(3deg);
    z-index: 12;
}
.bento-photo .b-win-body { padding: 0; }
.bento-photo img { width: 100%; height: 300px; object-fit: cover; display: block; }
.b-win-footer { height: 60px; display: flex; justify-content: center; align-items: center; background: #fff;}
.b-shutter-btn { width: 40px; height: 40px; border-radius: 50%; background: #ff3b30; border: 3px solid #fff; box-shadow: 0 0 0 1px #ddd; cursor: pointer; transition: transform 0.2s;}
.b-shutter-btn:hover { transform: scale(0.9); }

/* Mail/Calendar (Formazione) */
.bento-edu {
    top: 80px;
    right: 12%;
    width: 380px;
    transform: rotate(1deg);
    z-index: 11;
}
.edu-item { margin-bottom: 20px; }
.edu-date { font-size: 11px; font-weight: 700; color: #888; margin-bottom: 5px; }
.edu-card { padding: 15px; border-radius: 12px; background: rgba(0,0,0,0.03); border-left: 4px solid #000; }
.edu-card.blue { border-left-color: #007aff; background: rgba(0, 122, 255, 0.05); }
.edu-card.green { border-left-color: #34c759; background: rgba(52, 199, 89, 0.05); }
.edu-card h4 { margin: 0 0 5px 0; font-size: 16px; color: #111; }
.edu-card p { margin: 0; font-size: 13px; color: #555; line-height: 1.4;}

/* Finder (Competenze) */
.bento-skills {
    top: 480px;
    right: 18%;
    width: 350px;
    transform: rotate(-1deg);
    z-index: 13;
}
.finder-grid-bento {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    justify-items: center;
}
.b-icon-file {
    display: flex; flex-direction: column; align-items: center; gap: 5px; cursor: pointer; transition: transform 0.2s;
}
.b-icon-file:hover { transform: scale(1.1); }
.b-icon-file img { width: 45px; height: 45px; object-fit: contain; }
.b-icon-file span { font-size: 11px; font-weight: 500; color: #333; }

/* Contatti Popup */
.bento-contact {
    top: 400px;
    left: 45%;
    width: 300px;
    transform: translateX(-50%) rotate(0deg);
    z-index: 15;
}
.contact-item { font-size: 13px; color: #333; margin-bottom: 8px; font-weight: 500; }

/* Mini Dock */
.bento-dock-container {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 20;
}
.bento-dock-label {
    background: rgba(255,255,255,0.8);
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: #444;
    margin-bottom: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.bento-dock {
    display: flex;
    gap: 15px;
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 12px 20px;
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.8);
}
.bento-dock-icon {
    width: 45px; height: 45px;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}
.bento-dock-icon:hover { transform: scale(1.3) translateY(-10px); }

/* ANIMATIONS */
.fade-up {
    opacity: 0;
    transform: translateY(50px) rotate(var(--rot, 0deg));
    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fade-up.visible {
    opacity: 1;
    /* Restore the original rotation logic via nth-child or specific classes. 
       We use a trick: we set --rot in inline style or redefine classes */
}
.bento-notes.visible { transform: translateY(0) rotate(-2deg); }
.bento-photo.visible { transform: translateY(0) rotate(3deg); }
.bento-edu.visible { transform: translateY(0) rotate(1deg); }
.bento-skills.visible { transform: translateY(0) rotate(-1deg); }
.bento-contact.visible { transform: translateX(-50%) translateY(0) rotate(0deg); }
.bento-dock-container.visible { transform: translateX(-50%) translateY(0); }

/* Floating animation overlay */
@keyframes bentoFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
.bento-window.visible { animation: bentoFloat 8s ease-in-out infinite; }
.bento-window:hover { animation-play-state: paused; }
.delay-1 { transition-delay: 0.1s; animation-delay: 0s; }
.delay-2 { transition-delay: 0.2s; animation-delay: -1.5s; }
.delay-3 { transition-delay: 0.3s; animation-delay: -3s; }
.delay-4 { transition-delay: 0.4s; animation-delay: -4.5s; }
.delay-5 { transition-delay: 0.5s; animation-delay: -6s; }
.delay-6 { transition-delay: 0.6s; animation-delay: -7.5s; }

/* Mobile Adjustments */
@media (max-width: 900px) {
    .portfolio-bento { display: flex; flex-direction: column; align-items: center; min-height: auto; padding: 40px 20px; gap: 30px;}
    .bento-window { position: relative; top: auto !important; left: auto !important; right: auto !important; transform: none !important; width: 100% !important; max-width: 400px; animation: none !important;}
    .bento-contact { transform: none !important; }
    .bento-dock-container { position: relative; bottom: auto; left: auto; transform: none !important; margin-top: 20px;}
    .bento-notes.visible, .bento-photo.visible, .bento-edu.visible, .bento-skills.visible, .bento-contact.visible, .bento-dock-container.visible { transform: translateY(0) !important; }
}
`;
fs.appendFileSync('styles.css', css, 'utf8');
console.log("Bento CSS Appended!");
