function updateClock() {
    const now = new Date();
    
    // Format: 16:41
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    // Top bar clock format: Ven 31 lug 16:41
    const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    const months = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
    
    const dayName = days[now.getDay()];
    const dayNum = now.getDate();
    const monthName = months[now.getMonth()];
    
    const topBarStr = `${dayName} ${dayNum} ${monthName} ${timeStr}`;
    
    // Update elements
    const topClock = document.getElementById('clock');
    if (topClock) topClock.textContent = topBarStr;
    
    const widgetClock = document.getElementById('widget-clock');
    if (widgetClock) widgetClock.textContent = timeStr;
    
    // Update window clock
    const winClockDisplay = document.getElementById('win-clock-display');
    if (winClockDisplay) winClockDisplay.textContent = timeStr;
    
    const winClockDate = document.getElementById('win-clock-date');
    if (winClockDate) {
        const fullDateStr = `${dayName} ${dayNum} ${monthName} ${now.getFullYear()}`;
        winClockDate.textContent = fullDateStr;
    }
    
    // Update analog clock in dock
    const dockHour = document.getElementById('dock-hour');
    const dockMin = document.getElementById('dock-min');
    const dockSec = document.getElementById('dock-sec');
    if (dockHour && dockMin && dockSec) {
        const h = now.getHours() % 12;
        const m = now.getMinutes();
        const s = now.getSeconds();
        
        const hDeg = h * 30 + m * 0.5;
        const mDeg = m * 6 + s * 0.1;
        const sDeg = s * 6;
        
        dockHour.style.transform = `rotate(${hDeg}deg)`;
        dockMin.style.transform = `rotate(${mDeg}deg)`;
        dockSec.style.transform = `rotate(${sDeg}deg)`;
    }
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// WEATHER WIDGET LOGIC
const weatherCodes = {
    0: '☀️', // Clear sky
    1: '🌤️', // Mainly clear
    2: '⛅', // Partly cloudy
    3: '☁️', // Overcast
    45: '🌫️', // Fog
    48: '🌫️', // Depositing rime fog
    51: '🌧️', // Drizzle light
    53: '🌧️', // Drizzle moderate
    55: '🌧️', // Drizzle dense
    61: '🌧️', // Rain slight
    63: '🌧️', // Rain moderate
    65: '🌧️', // Rain heavy
    71: '❄️', // Snow fall slight
    73: '❄️', // Snow fall moderate
    75: '❄️', // Snow fall heavy
    95: '⛈️', // Thunderstorm
    96: '⛈️', // Thunderstorm with hail
    99: '⛈️'
};

async function getCityName(lat, lon) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await res.json();
        return data.address.city || data.address.town || data.address.village || 'Sconosciuta';
    } catch (e) {
        return 'Posizione';
    }
}

async function fetchWeather(lat, lon) {
    try {
        const city = await getCityName(lat, lon);
        
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();
        
        const current = data.current_weather;
        const icon = weatherCodes[current.weathercode] || '☀️';
        const temp = Math.round(current.temperature);
        
        // Update Widget
        document.getElementById('weather-city').innerHTML = `${city} <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L22 20L12 17L2 20L12 2Z"/></svg>`;
        document.getElementById('weather-temp').textContent = `${temp}°`;
        document.getElementById('weather-icon').textContent = icon;
        
        let alertMsg = "";
        if(temp >= 30) {
             alertMsg = "Allerta arancione per temperature elevate.";
             document.getElementById('weather-desc').textContent = alertMsg;
             document.getElementById('weather-desc').style.display = "block";
        } else if(temp < 10) {
             alertMsg = "Temperature in forte calo, copriti bene!";
             document.getElementById('weather-desc').textContent = alertMsg;
             document.getElementById('weather-desc').style.display = "block";
        } else {
             document.getElementById('weather-desc').style.display = "none";
        }
        
        // Populate widget forecast (next 5 hours)
        let forecastHTML = '';
        const currentHour = new Date().getHours();
        for(let i = 1; i <= 5; i++) {
            const index = currentHour + i;
            if(index < data.hourly.temperature_2m.length) {
                const hourTemp = Math.round(data.hourly.temperature_2m[index]);
                const hourCode = data.hourly.weathercode[index];
                const hourIcon = weatherCodes[hourCode] || '☁️';
                let displayHour = new Date(data.hourly.time[index]).getHours();
                forecastHTML += `
                    <div class="forecast-item">
                        <span>${displayHour}:00</span>
                        <span>${hourIcon}</span>
                        <span>${hourTemp}°</span>
                    </div>
                `;
            }
        }
        const forecastContainer = document.getElementById('weather-forecast');
        if(forecastContainer) forecastContainer.innerHTML = forecastHTML;

        // Update Weather Window
        const winCity = document.getElementById('win-weather-city');
        if (winCity) {
            winCity.textContent = city;
            document.getElementById('win-weather-temp').textContent = `${temp}°`;
            document.getElementById('win-weather-desc').textContent = alertMsg || "Condizioni stabili.";
            
            let dailyHTML = '';
            const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
            for(let i = 0; i < 5; i++) {
                if(data.daily && data.daily.time && i < data.daily.time.length) {
                    const dateObj = new Date(data.daily.time[i]);
                    const dayName = i === 0 ? 'Oggi' : days[dateObj.getDay()];
                    const dCode = data.daily.weathercode[i];
                    const dIcon = weatherCodes[dCode] || '☁️';
                    const maxT = Math.round(data.daily.temperature_2m_max[i]);
                    const minT = Math.round(data.daily.temperature_2m_min[i]);
                    
                    dailyHTML += `
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                            <span style="flex:1; font-weight:600;">${dayName}</span>
                            <span style="flex:1; text-align:center; font-size:24px;">${dIcon}</span>
                            <span style="flex:1; text-align:right;">${minT}° / <span style="font-weight:600;">${maxT}°</span></span>
                        </div>
                    `;
                }
            }
            document.getElementById('win-weather-daily').innerHTML = dailyHTML;
        }

    } catch (err) {
        document.getElementById('weather-desc').textContent = "Errore di connessione.";
    }
}

function initWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                // Fallback to default city (Vicari) if permission denied
                fetchWeather(37.8286, 13.5707); 
            }
        );
    } else {
        // Fallback
        fetchWeather(37.8286, 13.5707);
    }
}

function generateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    
    const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    
    // Update title
    const winTitle = document.getElementById('win-calendar-title');
    if (winTitle) winTitle.textContent = `${months[month]} ${year}`;
    
    // Calculate days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Convert Sunday=0 to Monday=0
    let startDay = firstDay === 0 ? 6 : firstDay - 1; 
    
    let gridHTML = '';
    
    // Empty slots for start of month
    for (let i = 0; i < startDay; i++) {
        gridHTML += `<span></span>`;
    }
    
    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        if (i === today) {
            gridHTML += `<span class="active-day" style="background:#FF3B30; color:white; border-radius:50%; width:24px; height:24px;">${i}</span>`;
        } else {
            gridHTML += `<span>${i}</span>`;
        }
    }
    
    // Update window
    const winGrid = document.getElementById('win-calendar-grid');
    if (winGrid) winGrid.innerHTML = gridHTML;
    
    // Update widget
    const widgetHeader = document.getElementById('widget-cal-header');
    if (widgetHeader) widgetHeader.textContent = months[month].toUpperCase();
    
    // For widget, we need smaller active day styles so we just rely on CSS class
    let widgetGridHTML = '';
    for (let i = 0; i < startDay; i++) widgetGridHTML += `<span></span>`;
    for (let i = 1; i <= daysInMonth; i++) {
        if (i === today) {
            widgetGridHTML += `<span class="active-day">${i}</span>`;
        } else {
            widgetGridHTML += `<span>${i}</span>`;
        }
    }
    const widgetGrid = document.getElementById('widget-cal-grid');
    if (widgetGrid) widgetGrid.innerHTML = widgetGridHTML;
}

initWeather();
generateCalendar();

// WINDOW SYSTEM
let zIndexCounter = 100;

function switchFinderTab(el, targetId) {
    const currentWin = el.closest('.mac-window');
    if (currentWin.id === targetId) return;
    
    // Position target window exactly where current window is
    const targetWin = document.getElementById(targetId);
    if (targetWin) {
        targetWin.style.top = currentWin.style.top;
        targetWin.style.left = currentWin.style.left;
        targetWin.style.width = currentWin.style.width;
        targetWin.style.height = currentWin.style.height;
    }
    
    // Close current
    currentWin.style.display = 'none';
    currentWin.classList.remove('active');
    
    // Remove from dock if it was minimized (edge case handling)
    const dockItem = document.getElementById('minimized-' + currentWin.id);
    if(dockItem) dockItem.remove();
    
    // Open target
    openWindow(targetId);
}

let highestZ = 100;

// ═══════════════════════════════════════════
function launchPortfolio(e, folderEl) {
    if(e) e.preventDefault();
    
    // Check if folderEl exists, fallback to center of screen
    let rect = { top: window.innerHeight/2, left: window.innerWidth/2, width: 0, height: 0 };
    if (folderEl) {
        rect = folderEl.getBoundingClientRect();
    }
    
    // Create an expanding element starting from the folder's position
    const expander = document.createElement('div');
    expander.style.cssText = `
        position: fixed;
        top: ${rect.top + rect.height/2}px;
        left: ${rect.left + rect.width/2}px;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle at center, #FFD60A 0%, #FF375F 40%, #007AFF 70%, #0A0A0A 100%);
        border-radius: 50%;
        z-index: 99999;
        transform: translate(-50%, -50%) scale(1);
        transition: transform 0.8s cubic-bezier(0.7, 0, 0.2, 1);
        pointer-events: none;
        box-shadow: 0 0 100px rgba(0, 122, 255, 0.8), 0 0 150px rgba(255, 55, 95, 0.6);
        filter: blur(8px);
    `;
    
    document.body.appendChild(expander);

    // Zoom out and fade the desktop
    const desktop = document.querySelector('.desktop-content') || document.body;
    desktop.style.transition = 'transform 0.7s cubic-bezier(0.7, 0, 0.2, 1), filter 0.7s, opacity 0.7s';
    desktop.style.transform = 'scale(0.9)';
    desktop.style.filter = 'blur(15px)';
    desktop.style.opacity = '0.5';
    
    // Trigger expansion
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Scale large enough to cover the screen
            const maxDim = Math.max(window.innerWidth, window.innerHeight);
            const scale = (maxDim * 3) / 10;
            
            expander.style.transform = `translate(-50%, -50%) scale(${scale})`;
            
            setTimeout(() => {
                window.location.href = '/portfolio';
            }, 750);
        });
    });
}

document.addEventListener('mousedown', function(e) {
    const win = e.target.closest('.mac-window');
    if(win) {
        win.style.zIndex = ++highestZ;
    }
});

function openWindow(id) {
    const win = document.getElementById(id);
    if(win) {
        win.style.display = 'flex';
        win.style.zIndex = ++highestZ;
        win.classList.remove('closing');
        win.classList.add('opening');
        setTimeout(() => win.classList.remove('opening'), 250);
        
        if (id === 'win-easteregg') {
            const iframe = document.getElementById('easteregg-iframe');
            if (iframe && !iframe.src) {
                iframe.src = iframe.getAttribute('data-src');
            }
        }
    }
}
function closeWin(id) {
    const win = document.getElementById(id);
    if(win) {
        win.classList.add('closing');
        setTimeout(() => {
            win.style.display = 'none';
            win.classList.remove('closing');
        }, 200);
        
        // Remove from dock if it was minimized there
        const dockItem = document.getElementById('minimized-' + id);
        if(dockItem) {
            dockItem.remove();
        }
        
        // Remove active indicator from permanent dock item if it exists
        const existingPermanent = document.querySelector(`.dock-item[onclick*="openWindow('${id}')"]`);
        if (existingPermanent) {
            const ind = existingPermanent.querySelector('.active-indicator');
            if (ind) ind.remove();
        }
    }
}
function startDrag(e, id) {
    const win = document.getElementById(id);
    win.style.zIndex = ++highestZ;
    let startX = e.clientX, startY = e.clientY;
    let initLeft = win.offsetLeft, initTop = win.offsetTop;
    
    function onMouseMove(e) {
        let newX = initLeft + e.clientX - startX;
        let newY = initTop + e.clientY - startY;
        
        let parentWidth = win.offsetParent ? win.offsetParent.clientWidth : window.innerWidth;
        let parentHeight = win.offsetParent ? win.offsetParent.clientHeight : window.innerHeight;
        
        // Boundaries relative to offsetParent
        newX = Math.max(0, Math.min(newX, parentWidth - win.offsetWidth));
        newY = Math.max(0, Math.min(newY, parentHeight - win.offsetHeight));
        
        win.style.left = newX + 'px';
        win.style.top = newY + 'px';
    }
    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// FOLDER SELECTION
let lastTap = 0;
function selectFolder(el, e) {
    e.stopPropagation();
    // Deselect all folders
    document.querySelectorAll('.folder, .finder-file').forEach(f => f.classList.remove('selected'));
    // Select current folder
    el.classList.add('selected');
    // Check for double tap on mobile
    if (window.innerWidth <= 768) {
        let currentTime = new Date().getTime();
        let tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
            // Trigger the ondblclick event manually
            if (el.hasAttribute('ondblclick')) {
                const action = el.getAttribute('ondblclick');
                const func = new Function('event', action);
                func.call(el, e);
            }
        }
        lastTap = currentTime;
    }
}

// DESELECT ON DESKTOP CLICK
document.addEventListener('click', function(e) {
    if (!e.target.closest('.folder')) {
        document.querySelectorAll('.folder, .finder-file').forEach(f => f.classList.remove('selected'));
    }
});

// Image Viewer
function openImage(url, title) {
    document.getElementById('image-viewer-title').textContent = title;
    document.getElementById('image-viewer-content').src = url;
    openWindow('win-image-viewer');
}

// Dynamic App Viewer
function openApp(appName, iconUrl) {
    document.getElementById('app-viewer-title').textContent = appName;
    document.getElementById('app-viewer-icon').src = iconUrl;
    
    let description = 'Ambiente di sviluppo per ' + appName;
    switch(appName) {
        case 'Java':
            description = "Sviluppo del progetto AFAM e applicazioni accademiche (Algoritmica & Strutture Dati).";
            break;
        case 'TypeScript':
            description = "Sviluppo di piattaforme web moderne e type-safe come Ecopalmaps, Gradly e Bricklink.";
            break;
        case 'HTML5':
        case 'CSS3':
        case 'JavaScript':
            description = "Front-end moderno e UI design interattivo. Sviluppo del mio macOS Portfolio e varie web apps.";
            break;
        case 'React':
            description = "Creazione di interfacce utente dinamiche, dashboard e Single Page Applications fluide.";
            break;
        case 'Node.js':
            description = "Sviluppo di servizi backend scalabili e architetture server-side per web application.";
            break;
        case 'C++':
            description = "Progetti accademici universitari incentrati su logiche complesse, algoritmi e strutture dati.";
            break;
        case 'Python':
            description = "Scripting, automazione e analisi dati. Risoluzione di problemi logici e computazionali.";
            break;
        case 'MySQL':
            description = "Progettazione di database relazionali per la gestione e l'archiviazione sicura dei dati backend.";
            break;
        case 'VS Code':
            description = "Il mio editor principale per scrivere codice, gestire versionamenti e sviluppare i miei progetti.";
            break;
        case 'Git':
            description = "Gestione del codice sorgente e version control per tutti i miei progetti ospitati su GitHub.";
            break;
        case 'Linux':
            description = "Gestione server, ambienti di sviluppo e utilizzo del terminale per deployment di web apps.";
            break;
    }
    
    document.getElementById('app-viewer-desc').textContent = description;
    openWindow('win-app-viewer');
}

// Maximize window
function maximizeWin(id) {
    const win = document.getElementById(id);
    if (!win) return;
    if (win.classList.contains('maximized')) {
        win.classList.remove('maximized');
    } else {
        win.classList.add('maximized');
    }
}

// Minimize window to dock
function minimizeWin(id) {
    const win = document.getElementById(id);
    if (!win) return;
    
    win.style.display = 'none';
    win.classList.remove('active');
    
    if (document.getElementById('minimized-' + id)) return;
    
    // Check if the dock already has a permanent icon for this window
    const existingPermanent = document.querySelector(`.dock-item[onclick*="openWindow('${id}')"]`);
    if (existingPermanent) {
        // Add an active indicator if it doesn't have one
        if (!existingPermanent.querySelector('.active-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'active-indicator';
            indicator.style.width = '4px';
            indicator.style.height = '4px';
            indicator.style.background = 'rgba(255, 255, 255, 0.8)';
            indicator.style.borderRadius = '50%';
            indicator.style.position = 'absolute';
            indicator.style.bottom = '-8px';
            indicator.style.left = '50%';
            indicator.style.transform = 'translateX(-50%)';
            existingPermanent.appendChild(indicator);
        }
        return; // Do not create a duplicate minimized icon
    }
    
    // Try to get title and icon from the window
    let title = "Finestra";
    let iconUrl = win.getAttribute('data-dock-icon') || "https://img.icons8.com/color/512/mac-folder.png";
    let isApp = false;
    let isSystemApp = false;
    
    if (win.hasAttribute('data-dock-icon')) {
        isSystemApp = true;
    }
    
    if (id === 'win-app-viewer') {
        title = document.getElementById('app-viewer-title').innerText;
        iconUrl = document.getElementById('app-viewer-icon').src;
        isApp = true;
    } else {
        const titleSpan = win.querySelector('.win-title');
        if (titleSpan) {
            title = titleSpan.innerText.trim();
            if (!win.hasAttribute('data-dock-icon')) {
                const img = titleSpan.querySelector('img');
                if (img) iconUrl = img.src;
            }
        }
    }
    
    const dockItem = document.createElement('div');
    dockItem.className = 'dock-item minimized-app';
    dockItem.id = 'minimized-' + id;
    dockItem.setAttribute('data-title', title);
    
    const img = document.createElement('img');
    img.src = iconUrl;
    img.className = isSystemApp ? 'system-icon-dock' : (isApp ? 'dock-icon-black' : 'dock-icon');
    
    const indicator = document.createElement('div');
    indicator.style.width = '4px';
    indicator.style.height = '4px';
    indicator.style.background = 'rgba(255, 255, 255, 0.8)';
    indicator.style.borderRadius = '50%';
    indicator.style.position = 'absolute';
    indicator.style.bottom = '-8px';
    indicator.style.left = '50%';
    indicator.style.transform = 'translateX(-50%)';
    
    dockItem.appendChild(img);
    dockItem.appendChild(indicator);
    
    dockItem.onclick = function() {
        openWindow(id);
    };
    
    // Add to the very end of the dock
    document.querySelector('.dock-glass').appendChild(dockItem);
}

// Update Calendar Icon Dynamically
function updateCalendarIcon() {
    const date = new Date();
    const dayName = date.toLocaleDateString('it-IT', { weekday: 'short' }).toUpperCase();
    const dayNumber = date.getDate();
    
    const svgStr = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="22.5" fill="#1c1c1e"/>
  <path d="M0 22.5 C0 10 10 0 22.5 0 L77.5 0 C90 0 100 10 100 22.5 L100 28 L0 28 Z" fill="#ff3b30"/>
  <text x="50" y="20" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">${dayName}</text>
  <text x="50" y="78" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="48" font-weight="400" fill="#fff" text-anchor="middle">${dayNumber}</text>
</svg>`;
    
    const base64Svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgStr)));
    const winCal = document.getElementById('win-calendar');
    if (winCal) {
        winCal.setAttribute('data-dock-icon', base64Svg);
    }
    const minCalImg = document.querySelector('#minimized-win-calendar img');
    if (minCalImg) {
        minCalImg.src = base64Svg;
    }
}

// Call on load and schedule next update at midnight
updateCalendarIcon();
setInterval(() => {
    const d = new Date();
    if (d.getHours() === 0 && d.getMinutes() === 0) {
        updateCalendarIcon();
    }
}, 60000);

// Note App functionality
function switchNote(noteId, element) {
    // Nascondi tutti i contenuti
    const allNotes = document.querySelectorAll('.note-content');
    allNotes.forEach(note => {
        note.style.display = 'none';
    });
    
    // Mostra la nota selezionata
    const targetNote = document.getElementById(noteId);
    if(targetNote) {
        targetNote.style.display = 'block';
    }
    
    // Aggiorna gli stili degli elementi della lista
    const listItems = document.querySelectorAll('.note-item');
    listItems.forEach(item => {
        item.classList.remove('active');
        item.style.background = 'transparent';
    });
    
    // Evidenzia l'elemento cliccato
    element.classList.add('active');
    element.style.background = 'rgba(228, 168, 51, 0.2)';
}

// Intersection Observer for Bento Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    const bentoElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    bentoElements.forEach(el => observer.observe(el));
});


// ═══════════════════════════════════════════
// INTERSECTION OBSERVER — SCROLL ANIMATIONS
// ═══════════════════════════════════════════
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

// Observe all animate-on-scroll elements and section titles
document.querySelectorAll('.animate-on-scroll, .apple-canvas-title').forEach(el => {
    scrollObserver.observe(el);
});

// Also observe hero window
const heroWrapper = document.querySelector('.hero-window-wrapper');
if (heroWrapper) {
    heroWrapper.style.opacity = '0';
    heroWrapper.style.transform = 'translateY(60px)';
    heroWrapper.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
    scrollObserver.observe(heroWrapper);
    // Override observer for hero (no class, inline)
}
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });
if (heroWrapper) heroObserver.observe(heroWrapper);

// ═══════════════════════════════════════════
// DOCK — MAGNETIC EFFECT
// ═══════════════════════════════════════════
const dockItems = document.querySelectorAll('.dock-item');
const dockGlass = document.querySelector('.dock-glass');

if (dockGlass) {
    dockGlass.addEventListener('mousemove', (e) => {
        const dockRect = dockGlass.getBoundingClientRect();
        const mouseX = e.clientX;
        
        dockItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const dist = Math.abs(mouseX - itemCenter);
            const maxDist = 100;
            
            if (dist < maxDist) {
                const scale = 1 + (1 - dist / maxDist) * 0.5;
                const translateY = -(1 - dist / maxDist) * 18;
                item.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            } else {
                item.style.transform = '';
            }
        });
    });
    
    dockGlass.addEventListener('mouseleave', () => {
        dockItems.forEach(item => { item.style.transform = ''; });
    });
}


// ═══════════════════════════════════════════
// PARALLAX FLOATING ICONS IN HERO
// ═══════════════════════════════════════════
const floatingIcons = document.querySelectorAll('.floating-icon');
document.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
    
    floatingIcons.forEach((icon, i) => {
        const depth = (i % 4 + 1) * 5;
        const x = xRatio * depth;
        const y = yRatio * depth;
        icon.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ═══════════════════════════════════════════
// APPLE CARDS — TILT 3D EFFECT
// ═══════════════════════════════════════════
document.querySelectorAll('.apple-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * -10;
        const tiltY = (x - 0.5) * 10;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ═══════════════════════════════════════════
// KONAMI CODE EASTER EGG
// ═══════════════════════════════════════════
const konamiCode = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            openWindow('win-easteregg');
            konamiIndex = 0;
        }
    } else { konamiIndex = 0; }
});


// ═══════════════════════════════════════════════════════════
// SOCIAL CAROUSEL
// ═══════════════════════════════════════════════════════════
(function initCarousel() {
    const track   = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!track) return;
    
    const slides = track.querySelectorAll('.carousel-slide');
    const total  = slides.length;
    let current  = 0;
    let isDragging = false, startX = 0, dragOffset = 0;
    
    // Build dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.onclick = () => goTo(i);
        dotsContainer.appendChild(dot);
    });
    
    function goTo(idx) {
        current = (idx + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }
    
    if (prevBtn) prevBtn.onclick = () => goTo(current - 1);
    if (nextBtn) nextBtn.onclick = () => goTo(current + 1);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const sec = document.getElementById('sec-contacts');
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;
        if (e.key === 'ArrowLeft')  goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });
    
    // Touch/drag support
    const container = track.parentElement;
    container.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    container.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    }, { passive: true });
    
    // Mouse drag
    container.addEventListener('mousedown', e => { isDragging = true; startX = e.clientX; });
    container.addEventListener('mousemove', e => { if (!isDragging) return; dragOffset = e.clientX - startX; });
    container.addEventListener('mouseup',   e => {
        if (!isDragging) return; isDragging = false;
        if (Math.abs(dragOffset) > 60) goTo(current + (dragOffset < 0 ? 1 : -1));
        dragOffset = 0;
    });
    
    // Auto-play
    setInterval(() => { if (!isDragging) goTo(current + 1); }, 5000);
})();

// ═══════════════════════════════════════════════════════════
// PARALLAX FOR FLOATING ICONS IN COVER
// ═══════════════════════════════════════════════════════════
(function initParallax() {
    const icons = document.querySelectorAll('.fi');
    if (!icons.length) return;
    
    document.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        
        icons.forEach((icon, i) => {
            const depth = (i + 1) * 6;
            icon.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
        });
    });
})();

// ═══════════════════════════════════════════════════════════
// TILT 3D ON BENTO CARDS + PROJECT CARDS
// ═══════════════════════════════════════════════════════════
(function initTilt() {
    const cards = document.querySelectorAll('.bg-card, .mac-cover-window');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px) scale(1.01)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

// ═══════════════════════════════════════════════════════════
// INTERSECTION OBSERVER — SCROLL ANIMATIONS
// ═══════════════════════════════════════════════════════════
(function initScrollAnim() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
    
    document.querySelectorAll('.animate-on-scroll, .section-label').forEach(el => {
        observer.observe(el);
    });
})();


