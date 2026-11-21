const https = require('https');
https.get('https://usama567-web.github.io/birthday-celebration/', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Length:', d.length);
    console.log('Has grid-gallery-53:', d.includes('grid-gallery-53'));
    console.log('Has toast-notify:', d.includes('toast-notify'));
    console.log('Has 53 Photos text:', d.includes('53 Photos'));
    console.log('Script tag in live GH pages:', d.match(/<script src="script\.js\?v=[^"]*"/));
  });
});
