const http = require('http');
const fs = require('fs');

async function testUrl(urlPath) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, length: data.length });
      });
    }).on('error', (err) => {
      resolve({ status: 500, error: err.message });
    });
  });
}

async function runTests() {
  console.log('--- Starting Comprehensive Test Suite ---');
  
  // 1. Test index.html
  const indexRes = await testUrl('/index.html');
  console.log('1. /index.html:', indexRes.status, `(${indexRes.length} bytes)`);

  // 2. Test style.css
  const cssRes = await testUrl('/style.css?v=20261121_0700');
  console.log('2. /style.css:', cssRes.status, `(${cssRes.length} bytes)`);

  // 3. Test script.js
  const jsRes = await testUrl('/script.js?v=20261121_0700');
  console.log('3. /script.js:', jsRes.status, `(${jsRes.length} bytes)`);

  // 4. Test Cover Photos from folder 's'
  const coverPics = [
    '/s/1.jpg',
    '/s/IMG_20260528_224653.jpg',
    '/s/WhatsApp%20Image%202026-11-20%20at%202.30.27%20PM%20(1).jpeg',
    '/s/WhatsApp%20Image%202026-11-20%20at%202.30.27%20PM.jpeg'
  ];
  console.log('4. Testing Cover Photos (s/):');
  for (const cp of coverPics) {
    const res = await testUrl(cp);
    console.log(`   ${cp.slice(0, 35)}... -> HTTP ${res.status}`);
  }

  // 5. Test Sample of Bunny Photos (all 53)
  const manifest = JSON.parse(fs.readFileSync('assets/bunny/manifest.json', 'utf8'));
  console.log(`5. Testing all ${manifest.length} Bunny Photos:`);
  let passedCount = 0;
  for (const item of manifest) {
    const res = await testUrl('/' + encodeURI(item.clean));
    if (res.status === 200 || res.status === 304) {
      passedCount++;
    } else {
      console.log(`   FAIL: ${item.clean} returned ${res.status}`);
    }
  }
  console.log(`   Passed: ${passedCount} / ${manifest.length} photos verified accessible!`);

  // 6. Test DOM and Features inside index.html and script.js
  const htmlContent = fs.readFileSync('index.html', 'utf8');
  const jsContent = fs.readFileSync('script.js', 'utf8');
  const cssContent = fs.readFileSync('style.css', 'utf8');

  console.log('6. Feature Verification:');
  console.log('   - #grid-gallery-53 in HTML:', htmlContent.includes('id="grid-gallery-53"'));
  console.log('   - #photos-grid-container in HTML:', htmlContent.includes('id="photos-grid-container"'));
  console.log('   - #view-cosmos-btn in HTML:', htmlContent.includes('id="view-cosmos-btn"'));
  console.log('   - #view-grid-btn in HTML:', htmlContent.includes('id="view-grid-btn"'));
  console.log('   - #auto-slideshow-btn in HTML:', htmlContent.includes('id="auto-slideshow-btn"'));
  console.log('   - #modal-quick-dl-btn in HTML:', htmlContent.includes('id="modal-quick-dl-btn"'));
  console.log('   - #toast-notify in HTML:', htmlContent.includes('id="toast-notify"'));
  console.log('   - downloadImage in script.js:', jsContent.includes('function downloadImage('));
  console.log('   - render53PhotosGrid in script.js:', jsContent.includes('function render53PhotosGrid('));
  console.log('   - Shooting stars (meteors) in script.js:', jsContent.includes('spawnMeteor'));
  console.log('   - Cosmic Nebulae in script.js:', jsContent.includes('nebulae'));
  console.log('   - Interactive Stardust in script.js:', jsContent.includes('addStardust'));
  console.log('   - Keypad responsive media queries in CSS:', cssContent.includes('@media (max-width: 480px)') && cssContent.includes('.key-btn'));
  console.log('   - Password "Bunny 22 11" preserved in script.js:', jsContent.includes('passcode: "Bunny 22 11"'));
  console.log('   - Names "Shaista" & "Usama" preserved in script.js:', jsContent.includes('Shaista') && jsContent.includes('Usama'));
  
  console.log('--- Test Suite Complete ---');
}

runTests();
