const fs = require('fs');

const js = `
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
`;
fs.appendFileSync('script.js', js, 'utf8');
console.log("Bento JS Appended!");
