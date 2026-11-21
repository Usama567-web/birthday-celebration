const https = require('https');

function testUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => resolve({ url, error: e.message }));
  });
}

async function run() {
  const urls = [
    'https://usama567-web.github.io/birthday-celebration/index.html',
    'https://usama567-web.github.io/birthday-celebration/style.css?v=20261121_0700',
    'https://usama567-web.github.io/birthday-celebration/script.js?v=20261121_0700',
    'https://usama567-web.github.io/birthday-celebration/s/1.jpg',
    'https://usama567-web.github.io/birthday-celebration/assets/bunny/photo-01.jpg',
    'https://usama567-web.github.io/birthday-celebration/assets/bunny/photo-53.jpeg'
  ];

  for (const u of urls) {
    const r = await testUrl(u);
    console.log(r.status, u);
  }
}

run();
