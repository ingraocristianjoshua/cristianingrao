// ===== CLOCK =====
function updateClock() {
    const now = new Date();
    const days = ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'];
    const months = ['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic'];
    const d = days[now.getDay()];
    const dd = now.getDate();
    const m = months[now.getMonth()];
    const h = now.getHours().toString().padStart(2,'0');
    const min = now.getMinutes().toString().padStart(2,'0');
    document.getElementById('clock').textContent = `${d} ${dd} ${m}  ${h}:${min}`;
}
setInterval(updateClock, 1000);
updateClock();

// ===== WINDOW MANAGEMENT =====
let topZ = 200;

function openWindow(id) {
    const w = document.getElementById(id);
    if (!w) return;
    w.style.display = 'flex';
    topZ++;
    w.style.zIndex = topZ;
    // Update menu bar app name
    const title = w.querySelector('.win-title');
    if (title) document.getElementById('active-app').textContent = title.textContent;
}

function closeWin(id) {
    const w = document.getElementById(id);
    if (w) w.style.display = 'none';
    document.getElementById('active-app').textContent = 'Cristian Ingrao';
}

// Bring window to front on click
document.addEventListener('mousedown', (e) => {
    const win = e.target.closest('.mac-window');
    if (win) {
        topZ++;
        win.style.zIndex = topZ;
        const title = win.querySelector('.win-title');
        if (title) document.getElementById('active-app').textContent = title.textContent;
    }
});

// ===== DRAG WINDOWS =====
let dragWin = null, dragOffX = 0, dragOffY = 0;

function startDrag(e, id) {
    if (e.target.classList.contains('tl')) return;
    dragWin = document.getElementById(id);
    dragOffX = e.clientX - dragWin.offsetLeft;
    dragOffY = e.clientY - dragWin.offsetTop;
    topZ++;
    dragWin.style.zIndex = topZ;
}

document.addEventListener('mousemove', (e) => {
    if (!dragWin) return;
    e.preventDefault();
    dragWin.style.left = (e.clientX - dragOffX) + 'px';
    dragWin.style.top = (e.clientY - dragOffY) + 'px';
});

document.addEventListener('mouseup', () => { dragWin = null; });

// ===== FETCH PROJECTS FROM API =====
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/projects')
        .then(r => r.json())
        .then(data => {
            const grid = document.getElementById('projects-grid');
            if (data.projects && data.projects.length > 0) {
                grid.innerHTML = '';
                const iconMap = { doc:'📄', code:'💻', web:'🌐' };
                data.projects.forEach(p => {
                    const div = document.createElement('div');
                    div.className = 'finder-file';
                    div.innerHTML = `
                        <span class="file-icon">${iconMap[p.icon] || '📁'}</span>
                        <span class="file-name">${p.title}</span>
                    `;
                    grid.appendChild(div);
                });
            } else {
                grid.innerHTML = '<div class="loading-msg">Nessun progetto trovato.</div>';
            }
        })
        .catch(() => {
            document.getElementById('projects-grid').innerHTML =
                '<div class="loading-msg" style="color:#c00">Errore di connessione al server.</div>';
        });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const status = document.getElementById('form-status');

        status.textContent = 'Invio...';
        status.style.color = '#007AFF';

        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        })
        .then(r => r.json())
        .then(d => {
            if (d.success) {
                status.textContent = '✅ Messaggio inviato!';
                status.style.color = '#34C759';
                form.reset();
            } else {
                status.textContent = '❌ ' + (d.error || 'Errore');
                status.style.color = '#FF3B30';
            }
        })
        .catch(() => {
            status.textContent = '❌ Errore di rete.';
            status.style.color = '#FF3B30';
        });
    });
}
