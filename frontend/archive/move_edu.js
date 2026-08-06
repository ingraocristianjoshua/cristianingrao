const fs = require('fs');
let html = fs.readFileSync('portfolio/index.html', 'utf8');

const bottomClusterStart = '<!-- BOTTOM CLUSTER (EDU + CONTACTS) -->';
const bottomClusterEnd = '<!-- ABOUT WINDOW -->';
const bricklinkStart = '<!-- BRICKLINK CLUSTER -->';

const startIndex = html.indexOf(bottomClusterStart);
const endIndex = html.indexOf(bottomClusterEnd);
const bricklinkIndex = html.indexOf(bricklinkStart);

if (startIndex !== -1 && endIndex !== -1 && bricklinkIndex !== -1) {
    // Extract the bottom cluster
    // Note: there are a few </div> before <!-- ABOUT WINDOW --> that belong to the main layout.
    // Let's accurately extract just the two windows (col-7 and col-5).
    // The easiest way is to use a regex or string splitting.
    
    // Actually, I can just cut from bottomClusterStart up to the last </div></div></div> before ABOUT WINDOW
    // Wait, the structure is:
    // <!-- BOTTOM CLUSTER (EDU + CONTACTS) -->
    // <div class="mac-window reveal col-7"> ... </div>
    // <div class="mac-window reveal col-5" id="win-contacts"> ... </div>
    // </div>
    // </div>
    // </div>
    // <!-- ABOUT WINDOW -->
    
    // I only want to move the col-7 and col-5 divs, not the closing tags of the container.
    // So I will just find the exact chunk to move.
    
    const chunkStart = html.indexOf(bottomClusterStart);
    // Find the end of the win-contacts div.
    // "</div>\n            </div>\n        </div>\n    </div>\n</div>\n\n    <!-- ABOUT WINDOW -->"
    // I can look for "        </div>\n    </div>\n</div>\n\n    <!-- ABOUT WINDOW -->"
    
    const containerEndIndex = html.indexOf('        </div>\n    </div>\n</div>\n\n    <!-- ABOUT WINDOW -->');
    
    if (chunkStart !== -1 && containerEndIndex !== -1) {
        const chunkToMove = html.substring(chunkStart, containerEndIndex);
        
        // Remove the chunk from the bottom
        const withoutChunk = html.substring(0, chunkStart) + html.substring(containerEndIndex);
        
        // Insert it before BRICKLINK CLUSTER
        const newBricklinkIndex = withoutChunk.indexOf(bricklinkStart);
        const finalHtml = withoutChunk.substring(0, newBricklinkIndex) + chunkToMove + '\n            ' + withoutChunk.substring(newBricklinkIndex);
        
        fs.writeFileSync('portfolio/index.html', finalHtml);
        console.log('Moved Education and Contacts section before Projects successfully.');
    } else {
        console.log('Could not find exact container bounds.');
    }
} else {
    console.log('Could not find markers.');
}
