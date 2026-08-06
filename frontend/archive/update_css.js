const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');
const startIndex = css.indexOf('/* PORTFOLIO APP */');

const newCSS = `/* PORTFOLIO APP */
.portfolio-hero {
    position: relative;
    width: 100%;
    height: 480px;
    background: radial-gradient(circle at center, #ffffff 0%, #fef9e6 50%, #fbe8a6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.hero-bg-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.7;
}

.hero-content {
    position: relative;
    text-align: center;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.hero-subtitle {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 4px;
    color: #444;
    margin-bottom: -15px;
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
}

.hero-title {
    font-size: 120px;
    font-weight: 900;
    letter-spacing: -4px;
    color: #111;
    margin: 0;
    font-family: 'Inter', sans-serif;
    line-height: 1.1;
    background: linear-gradient(180deg, #111 0%, #333 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0px 4px 20px rgba(0,0,0,0.05));
}

.hero-badge {
    display: inline-block;
    padding: 10px 30px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 40px;
    font-weight: 700;
    font-size: 16px;
    color: #111;
    margin-top: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

/* Floating Icons */
.float-icon {
    position: absolute;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.2));
    animation: floatAnim 8s ease-in-out infinite;
    z-index: 5;
    border-radius: 16px;
}

.float-1 { top: 15%; left: 12%; --rot: -12deg; animation-delay: 0s; width: 75px; }
.float-2 { bottom: 18%; right: 15%; --rot: 12deg; animation-delay: -2s; width: 95px; }
.float-3 { bottom: 18%; left: 22%; --rot: 18deg; animation-delay: -4s; width: 85px; }
.float-4 { top: 20%; right: 18%; --rot: -20deg; animation-delay: -6s; width: 80px; }

@keyframes floatAnim {
    0%, 100% { transform: translateY(0) rotate(var(--rot)); }
    50% { transform: translateY(-25px) rotate(var(--rot)); }
}

/* PROJECTS SECTION */
.portfolio-projects {
    padding: 60px 40px;
    background: #f4f5f7;
    position: relative;
}

.section-title {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 40px;
    color: #111;
    font-family: 'Inter', sans-serif;
    text-align: center;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
}

.project-card {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.8);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
}

.project-card:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 50px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,1);
}

.project-img-wrapper {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid rgba(0,0,0,0.03);
}

.project-logo {
    width: 90px;
    height: 90px;
    object-fit: contain;
    filter: drop-shadow(0 12px 24px rgba(0,0,0,0.15));
    z-index: 2;
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.project-card:hover .project-logo {
    transform: scale(1.15);
}

.project-info {
    padding: 35px 30px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.project-info h4 {
    margin: 0 0 15px 0;
    font-size: 24px;
    font-weight: 800;
    color: #111;
    font-family: 'Inter', sans-serif;
}

.project-info p {
    margin: 0 0 30px 0;
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    flex: 1;
    font-family: 'Inter', sans-serif;
}

.btn-primary, .btn-secondary {
    padding: 14px 24px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    text-align: center;
    border: none;
    transition: all 0.25s ease;
    font-family: 'Inter', sans-serif;
    width: 100%;
}

.btn-primary {
    background: #111;
    color: white;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.btn-primary:hover {
    background: #000;
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.2);
}

.btn-secondary {
    background: #f2f2f7;
    color: #111;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.btn-secondary:hover {
    background: #e5e5ea;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
}`;

if(startIndex !== -1) {
    const finalCSS = css.substring(0, startIndex) + newCSS + "\n";
    fs.writeFileSync('styles.css', finalCSS, 'utf8');
    console.log("Portfolio CSS updated!");
} else {
    console.log("Could not find Portfolio section");
}
