const fs = require('fs');
let svg = fs.readFileSync('favicon_rounded.svg', 'utf8');

const regex = /<image width="128" height="128" clip-path="url\(#circleView\)" href="(data:image\/jpeg;base64,[^"]+)" \/>/;
const match = svg.match(regex);
if (match) {
    const base64 = match[1];
    const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <pattern id="img1" patternUnits="userSpaceOnUse" width="128" height="128">
      <image href="${base64}" x="0" y="0" width="128" height="128" />
    </pattern>
  </defs>
  <circle cx="64" cy="64" r="64" fill="url(#img1)" />
</svg>`;
    fs.writeFileSync('favicon_rounded.svg', newSvg);
    console.log("Updated SVG");
} else {
    console.log("Could not find base64 image in SVG");
}
