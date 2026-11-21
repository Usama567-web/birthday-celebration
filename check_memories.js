const fs = require('fs');
const s = fs.readFileSync('script.js', 'utf8');
const start = s.indexOf('memories: [');
const end = s.indexOf('musicTracks: [');
console.log('Memories block found:', start !== -1, end !== -1);
if (start !== -1) {
  const block = s.slice(start, end > start ? end : start + 3000);
  console.log('Sample length:', block.length);
}
