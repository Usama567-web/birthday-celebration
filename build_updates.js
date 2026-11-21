const fs = require('fs');

console.log('--- Updating index.html ---');
let html = fs.readFileSync('index.html', 'utf8');

// Update stylesheet link cache buster
html = html.replace(/href="style\.css\?v=[^"]*"/, 'href="style.css?v=20261121_0700"');

// Update script link cache buster
html = html.replace(/src="script\.js\?v=[^"]*"/, 'src="script.js?v=20261121_0700"');

// Replace Scene 5 header and add #grid-gallery-53
const s5Target = `      <!-- Floating Cosmic Gallery Header Pill -->
      <div class="sticky top-4 left-0 w-full flex justify-center z-40 px-4 pointer-events-none">
        <div
          class="pointer-events-auto inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/65 backdrop-blur-md border border-pink-500/35 shadow-lg shadow-pink-500/20 text-xs text-pink-200 font-medium">
          <span class="text-sm">🌌</span>
          <span>Our Sweet Memories • <strong class="text-pink-400 font-bold">53 Photos</strong></span>
          <span class="text-white/40">•</span>
          <span class="text-[11px] text-pink-300/85">Tap any card to view</span>
        </div>
      </div>

      <div id="polaroid-gallery" class="relative w-full min-h-[175vh] p-4 pb-20"></div>`;

const s5Replacement = `      <!-- Floating Cosmic Gallery Header & Controls Pill -->
      <div class="sticky top-3 left-0 w-full flex flex-col items-center z-40 px-2 pointer-events-none gap-2">
        <div
          class="pointer-events-auto inline-flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-pink-500/40 shadow-xl shadow-pink-500/25 text-xs text-pink-200 font-medium max-w-[96vw]">
          <div class="flex items-center gap-1.5">
            <span class="text-sm">🌌</span>
            <span class="hidden sm:inline">Bunny 🐰 Memories •</span>
            <strong class="text-pink-400 font-bold">53 Photos</strong>
          </div>

          <!-- Mode Switcher Buttons: Cosmos / All 53 Grid / Slideshow -->
          <div class="flex items-center gap-1 bg-white/10 p-0.5 rounded-full border border-white/15">
            <button id="view-cosmos-btn" class="universe-tab-btn active" title="3D Floating Cosmos View">
              <span>🌌 Cosmos</span>
            </button>
            <button id="view-grid-btn" class="universe-tab-btn" title="View All 53 Photos Grid">
              <span>📸 All 53 Photos</span>
            </button>
            <button id="auto-slideshow-btn" class="universe-tab-btn" title="Auto Slideshow Through All 53 Photos">
              <span>▶ Slideshow</span>
            </button>
          </div>
        </div>
      </div>

      <!-- View 1: 3D Floating Polaroid Space Gallery -->
      <div id="polaroid-gallery" class="relative w-full min-h-[175vh] p-4 pb-20"></div>

      <!-- View 2: Full 53 Photos Grid Gallery (Responsive Masonry Grid with 1-click Direct Download on every photo) -->
      <div id="grid-gallery-53" class="hidden relative w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-28 z-30">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6 bg-pink-950/40 backdrop-blur-md border border-pink-500/30 p-3 sm:p-4 rounded-2xl">
          <div>
            <h3 class="text-base sm:text-lg font-bold text-pink-200 flex items-center gap-2">
              <span>🐰</span> All 53 Bunny Memories
            </h3>
            <p class="text-[11px] sm:text-xs text-pink-300/80">Every single moment captured with love • Tap any photo to view or download directly!</p>
          </div>
          <button id="dl-all-btn" class="px-3.5 py-1.5 rounded-xl bg-pink-600/80 hover:bg-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-pink-500/30 cursor-pointer">
            <span>⬇</span> <span>Download Current</span>
          </button>
        </div>
        <div id="photos-grid-container" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4"></div>
      </div>`;

if (html.includes(s5Target)) {
  html = html.replace(s5Target, s5Replacement);
  console.log('✓ Scene 5 header and 53 photos grid replaced in index.html');
} else {
  console.log('⚠ Could not match s5Target directly, checking alternatives...');
}

// Add quick download button into #modal-img-container
const modalImgContainerTarget = `<div id="modal-img-container"
        class="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black/60 shadow-inner group">
        <img id="modal-img" src="" alt="Memory"
          class="w-full h-full object-cover rounded-2xl transition-opacity duration-500 ease-in-out">`;

const modalImgContainerReplacement = `<div id="modal-img-container"
        class="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black/60 shadow-inner group">
        <img id="modal-img" src="" alt="Memory"
          class="w-full h-full object-cover rounded-2xl transition-opacity duration-500 ease-in-out">

        <!-- Quick Direct Download Button on Image -->
        <button id="modal-quick-dl-btn"
          class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-pink-600/90 hover:bg-pink-500 text-white flex items-center justify-center transition-all z-10 text-xs shadow-lg shadow-pink-600/50 backdrop-blur-xs cursor-pointer"
          title="Download This Photo">⬇</button>`;

if (html.includes(modalImgContainerTarget)) {
  html = html.replace(modalImgContainerTarget, modalImgContainerReplacement);
  console.log('✓ Added #modal-quick-dl-btn in index.html');
} else {
  console.log('⚠ Could not match modalImgContainerTarget');
}

// Add toast notification before </body> if not present
if (!html.includes('id="toast-notify"')) {
  html = html.replace('</body>', `  <!-- Toast Notification Popup for Downloads & Actions -->
  <div id="toast-notify"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-black/85 text-pink-200 border border-pink-500/50 shadow-2xl backdrop-blur-md text-xs font-semibold transition-all duration-300 opacity-0 pointer-events-none transform translate-y-3">
  </div>
</body>`);
  console.log('✓ Added toast notification popup element');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully!');
