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
let highestZ = 100;
function openWindow(id) {
    const win = document.getElementById(id);
    if(win) {
        win.style.display = 'flex';
        win.style.zIndex = ++highestZ;
    }
}
function closeWin(id) {
    const win = document.getElementById(id);
    if(win) win.style.display = 'none';
}
function startDrag(e, id) {
    const win = document.getElementById(id);
    win.style.zIndex = ++highestZ;
    let startX = e.clientX, startY = e.clientY;
    let rect = win.getBoundingClientRect();
    let initLeft = rect.left, initTop = rect.top;
    
    function onMouseMove(e) {
        win.style.left = (initLeft + e.clientX - startX) + 'px';
        win.style.top = (initTop + e.clientY - startY) + 'px';
    }
    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// FOLDER SELECTION
function selectFolder(el, e) {
    e.stopPropagation();
    // Deselect all folders
    document.querySelectorAll('.folder').forEach(f => f.classList.remove('selected'));
    // Select current folder
    el.classList.add('selected');
}

// DESELECT ON DESKTOP CLICK
document.addEventListener('click', function(e) {
    if (!e.target.closest('.folder')) {
        document.querySelectorAll('.folder').forEach(f => f.classList.remove('selected'));
    }
});

// Dynamic App Viewer
function openApp(appName, iconUrl) {
    document.getElementById('app-viewer-title').textContent = appName;
    document.getElementById('app-viewer-icon').src = iconUrl;
    document.getElementById('app-viewer-desc').textContent = 'Ambiente di sviluppo per ' + appName;
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
    
    // Try to get title and icon from the window
    let title = "Finestra";
    let iconUrl = win.getAttribute('data-dock-icon') || "https://img.icons8.com/color/512/mac-folder.png";
    let isApp = false;
    
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
    img.className = isApp ? 'dock-icon-black' : 'dock-icon';
    
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
        dockItem.remove();
    };
    
    // Add to the very end of the dock
    document.querySelector('.dock-glass').appendChild(dockItem);
}
