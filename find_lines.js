const fs = require('fs');
const s = fs.readFileSync('script.js', 'utf8');
const lines = s.split('\n');
console.log('Total lines:', lines.length);
lines.forEach((l, i) => {
  if (l.includes('initStarryCanvas') || l.includes('renderPolaroidGallery') || l.includes('photo-modal') || l.includes('triggerDirectDownload') || l.includes('Bunny') || l.includes('assets/bunny')) {
    console.log(`${i+1}: ${l.slice(0, 90)}`);
  }
});
