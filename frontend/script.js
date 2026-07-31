// Drag and Drop Logic for Scrap Items
const draggableElements = document.querySelectorAll('.draggable');

let activeElement = null;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let highestZIndex = 100;

draggableElements.forEach(element => {
    // Only apply drag on desktop, disable on mobile (where they are statically positioned)
    if (window.innerWidth > 768) {
        element.addEventListener('mousedown', dragStart);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('mousemove', drag);
    }
});

function dragStart(e) {
    if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) {
        // Prevent dragging if clicking on a link
        return;
    }

    activeElement = e.currentTarget;
    
    // Bring to front
    highestZIndex++;
    activeElement.style.zIndex = highestZIndex;

    // Get current transform matrix or values to calculate offset correctly
    const style = window.getComputedStyle(activeElement);
    const matrix = new WebKitCSSMatrix(style.transform);
    
    xOffset = matrix.m41;
    yOffset = matrix.m42;

    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    activeElement = null;
}

let currentX;
let currentY;

function drag(e) {
    if (activeElement) {
        e.preventDefault();
    
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
    
        xOffset = currentX;
        yOffset = currentY;
        
        // Retain the element's original rotation while dragging
        // We stored the original rotation in the CSS or we can extract it.
        // For simplicity, we just extract the rotation from the matrix if needed, 
        // but applying a translation while keeping the existing rotation is tricky without a wrapper.
        // Let's use a simpler approach: store initial rotation in a dataset attribute.
        
        if (!activeElement.dataset.rotation) {
            // Very basic extraction of rotation angle from computed style
            const style = window.getComputedStyle(activeElement);
            const tr = style.getPropertyValue("-webkit-transform") || style.getPropertyValue("transform");
            let angle = 0;
            if (tr !== 'none') {
                const values = tr.split('(')[1].split(')')[0].split(',');
                const a = values[0];
                const b = values[1];
                angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
            }
            activeElement.dataset.rotation = angle;
        }

        const rotation = activeElement.dataset.rotation || 0;
        
        activeElement.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
    }
}

// Smooth scrolling for dock links
document.querySelectorAll('.dock-item[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Highlight the element slightly
                highestZIndex++;
                targetElement.style.zIndex = highestZIndex;
                targetElement.style.transition = 'transform 0.3s ease';
                targetElement.style.transform += ' scale(1.05)';
                setTimeout(() => {
                    targetElement.style.transform = targetElement.style.transform.replace(' scale(1.05)', '');
                }, 300);
            }
        }
    });
});

// --- API Integrations ---

// Fetch Projects from Backend
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/projects')
        .then(response => response.json())
        .then(data => {
            const projectList = document.querySelector('#projects .folder-body ul');
            if (data.projects && data.projects.length > 0) {
                projectList.innerHTML = ''; // Clear hardcoded
                data.projects.forEach(proj => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = proj.url;
                    // Mappa l'icona
                    const iconMap = {
                        'doc': '🎓',
                        'code': '💻',
                        'web': '🌐'
                    };
                    a.textContent = `${iconMap[proj.icon] || '📁'} ${proj.title}`;
                    li.appendChild(a);
                    projectList.appendChild(li);
                });
            }
        })
        .catch(err => console.error("Errore nel caricamento progetti:", err));
});

// Handle Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const statusEl = document.getElementById('form-status');
        
        statusEl.textContent = "Invio in corso...";
        statusEl.style.color = "var(--pop-blue)";

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                statusEl.textContent = "Messaggio inviato con successo! 🚀";
                statusEl.style.color = "var(--pop-green)";
                contactForm.reset();
            } else {
                statusEl.textContent = "Errore: " + (data.error || "Riprova più tardi.");
                statusEl.style.color = "red";
            }
        })
        .catch(err => {
            console.error(err);
            statusEl.textContent = "Errore di rete. Riprova.";
            statusEl.style.color = "red";
        });
    });
}

