const fs = require('fs');

let html = fs.readFileSync('portfolio/index.html', 'utf8');

// Fix BrickLink logo that was accidentally replaced
html = html.replace('<img src="../profile_pic.jpg" alt="Cristian Ingrao" style="width: 100%; height: 100%; object-fit: cover;">', '<img src="../assets/bricklink_logo.png" class="project-img-icon" alt="BrickLink" style="width: 80px; height: 80px; object-fit: contain;">');

// Fix Photo booth image path (there is only one left, or maybe it's still "./profile_pic.jpg")
html = html.replace('<img src="./profile_pic.jpg" alt="Cristian Ingrao" style="width: 100%; height: 100%; object-fit: cover;">', '<img src="../profile_pic.jpg" alt="Cristian Ingrao" style="width: 100%; height: 100%; object-fit: cover;">');

fs.writeFileSync('portfolio/index.html', html);
console.log('Fixed photos');
