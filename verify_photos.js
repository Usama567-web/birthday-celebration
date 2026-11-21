const fs = require('fs');
// Load script.js and extract APP_CONFIG
const s = fs.readFileSync('script.js', 'utf8');
const vm = require('vm');
const context = { window: {}, document: { addEventListener: ()=>{} }, navigator: {}, localStorage: { getItem: ()=>null, setItem: ()=>{} } };
vm.createContext(context);
try {
  // Extract just the config
  const cfgMatch = s.match(/const APP_CONFIG = {([\s\S]*?)};\s*\n\s*\/\//);
  if (cfgMatch) {
    console.log("Matched config!");
  }
} catch(e) {
  console.log(e);
}
// Let's count image occurrences in script.js:
const matches = s.match(/assets\/bunny\/photo-\d+\.(jpg|webp|jpeg)/g);
console.log("Total assets/bunny references in script.js:", matches ? matches.length : 0);
if (matches) {
  const unique = Array.from(new Set(matches));
  console.log("Unique bunny photo references:", unique.length);
}
