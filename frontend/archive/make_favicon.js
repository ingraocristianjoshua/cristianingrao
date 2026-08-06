const Jimp = require('jimp');

async function createRoundedIcon() {
    try {
        const image = await Jimp.read('profile_pic.jpg');
        const size = Math.min(image.bitmap.width, image.bitmap.height);
        
        image.cover(size, size); // ensure it's square
        
        const circleMask = new Jimp(size, size, 0x00000000);
        circleMask.scan(0, 0, size, size, function(x, y, idx) {
            const centerX = size / 2;
            const centerY = size / 2;
            const radius = size / 2;
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            
            // Antialiasing for smooth edges
            let alpha = 255;
            if (distance > radius) {
                alpha = 0;
            } else if (distance > radius - 1) {
                alpha = (radius - distance) * 255;
            }
            
            this.bitmap.data[idx + 0] = 255;
            this.bitmap.data[idx + 1] = 255;
            this.bitmap.data[idx + 2] = 255;
            this.bitmap.data[idx + 3] = alpha;
        });

        image.mask(circleMask, 0, 0);
        
        image.resize(512, 512);
        await image.writeAsync('favicon_rounded.png');
        console.log('Successfully created favicon_rounded.png');
    } catch (err) {
        console.error('Error:', err);
    }
}

createRoundedIcon();
