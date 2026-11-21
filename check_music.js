const fs = require('fs');
const s = fs.readFileSync('script.js', 'utf8');
const lines = s.split('\n');
lines.forEach((l, i) => {
  if (l.includes('Alfaaz') || l.includes('Anuv_Jain') || l.includes('musicIndex') || l.includes('currentTrack') || l.includes('bgMusic')) {
    console.log(`${i+1}: ${l.slice(0, 95)}`);
  }
});
