const fs = require('fs');

console.log('--- Preparing script.js updates ---');

const manifest = JSON.parse(fs.readFileSync('assets/bunny/manifest.json', 'utf8'));
console.log('Loaded manifest entries:', manifest.length);

let script = fs.readFileSync('script.js', 'utf8');

// 1. Inject allBunnyPhotos into APP_CONFIG
if (!script.includes('allBunnyPhotos:')) {
  const manifestJsonStr = JSON.stringify(manifest, null, 2);
  script = script.replace('memories: [', `allBunnyPhotos: ${manifestJsonStr},\n    memories: [`);
  console.log('✓ Injected allBunnyPhotos into APP_CONFIG');
}

// 2. Add downloadImage and showToast functions if not present
if (!script.includes('function downloadImage(')) {
  const downloadHelpers = `
// ----------------------------------------------------------------------------
// TOAST NOTIFICATIONS & DIRECT ONE-CLICK DOWNLOAD
// ----------------------------------------------------------------------------
function showToast(msg) {
  const toast = document.getElementById('toast-notify');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

async function downloadImage(url, filename) {
  if (!url) return;
  showToast('Downloading photo... 💖');
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Fetch failed with status ' + res.status);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename || url.split('/').pop() || 'Shaista_Bunny_Memory.jpeg';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }, 1200);
    showToast('Photo downloaded successfully! ✨');
  } catch (e) {
    console.warn('Blob download fallback:', e);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || url.split('/').pop() || 'Shaista_Bunny_Memory.jpeg';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    }, 500);
    showToast('Photo opened for download! ✨');
  }
}
`;
  script = downloadHelpers + '\n' + script;
  console.log('✓ Added downloadImage and showToast');
}

// 3. Update renderPolaroidGallery for responsive coordinates on mobile
const oldPosCoord = `  const pos = [
    [6, 3],   [58, 5],   [32, 13],
    [76, 19], [10, 26],  [50, 33],
    [74, 40], [14, 47],  [44, 54],
    [78, 62], [8, 69],   [52, 76],
    [26, 84], [72, 91],  [12, 99],
    [54, 107],[76, 115], [28, 123]
  ];`;

const newPosCoord = `  const isMobile = window.innerWidth <= 640;
  const rawPos = [
    [6, 3],   [58, 5],   [32, 13],
    [76, 19], [10, 26],  [50, 33],
    [74, 40], [14, 47],  [44, 54],
    [78, 62], [8, 69],   [52, 76],
    [26, 84], [72, 91],  [12, 99],
    [54, 107],[76, 115], [28, 123]
  ];
  const pos = rawPos.map(([rx, ry], idx) => {
    if (isMobile) {
      // Keep strictly within 4% and 64% so no cards overflow on small screens
      const clampedX = Math.min(64, Math.max(4, (rx * 0.72) + (idx % 2 === 0 ? 0 : 4)));
      return [clampedX, ry];
    }
    return [rx, ry];
  });`;

if (script.includes(oldPosCoord)) {
  script = script.replace(oldPosCoord, newPosCoord);
  console.log('✓ Updated space card coordinates for mobile responsiveness');
}

// 4. Update initStarryCanvas for beautiful cosmic animations
const oldStarryCanvasStart = `function initStarryCanvas() {
  const canvas = document.getElementById('starry-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const starCount = Math.floor((width * height) / 3500);
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    });
  }

  function drawStarfield(t) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    drawWire(ctx, width, height, t);

    stars.forEach(star => {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 0.95 || star.alpha < 0.2) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }
      ctx.fillStyle = \`rgba(255, 255, 255, \${star.alpha})\`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    starryCanvasAnimationId = requestAnimationFrame(drawStarfield);
  }

  cancelAnimationFrame(starryCanvasAnimationId);
  starryCanvasAnimationId = requestAnimationFrame(drawStarfield);
}`;

const newStarryCanvas = `function initStarryCanvas() {
  const canvas = document.getElementById('starry-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Multi-colored celestial star palette
  const starColors = [
    'rgba(255, 255, 255, ',   // Pure White
    'rgba(255, 215, 235, ',   // Soft Rose
    'rgba(254, 240, 138, ',   // Warm Gold
    'rgba(192, 132, 252, ',   // Lavender Violet
    'rgba(103, 232, 249, ',   // Celestial Cyan
    'rgba(251, 146, 60, '     // Cosmic Amber
  ];

  const stars = [];
  const starCount = Math.min(220, Math.floor((width * height) / 3200));
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.75 + 0.25,
      twinkleSpeed: (Math.random() * 0.02 + 0.006) * (Math.random() > 0.5 ? 1 : -1),
      colorPrefix: starColors[Math.floor(Math.random() * starColors.length)],
      hasCrossFlare: Math.random() < 0.15
    });
  }

  // Shooting Stars / Meteors
  const meteors = [];
  function spawnMeteor() {
    meteors.push({
      x: Math.random() * (width * 0.9),
      y: Math.random() * (height * 0.45),
      length: Math.random() * 90 + 60,
      speed: Math.random() * 7 + 8,
      angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
      alpha: 1,
      fade: Math.random() * 0.016 + 0.012,
      color: Math.random() > 0.45 ? '#f472b6' : '#67e8f9'
    });
  }

  // Pulsing Cosmic Nebulae
  const nebulae = [
    { x: width * 0.25, y: height * 0.28, r: Math.min(width, height) * 0.42, color: 'rgba(236, 72, 153, 0.05)', phase: 0 },
    { x: width * 0.75, y: height * 0.65, r: Math.min(width, height) * 0.48, color: 'rgba(147, 51, 234, 0.045)', phase: 1.8 },
    { x: width * 0.5, y: height * 0.15, r: Math.min(width, height) * 0.38, color: 'rgba(59, 130, 246, 0.038)', phase: 3.2 }
  ];

  // Interactive Stardust Particles on Move
  const stardust = [];
  function addStardust(px, py) {
    if (stardust.length > 40) stardust.shift();
    for (let k = 0; k < 2; k++) {
      stardust.push({
        x: px + (Math.random() - 0.5) * 12,
        y: py + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2 - 0.3,
        alpha: 0.9,
        size: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.5 ? '#f472b6' : '#fef08a'
      });
    }
  }

  window.addEventListener('pointermove', (e) => {
    const s5 = document.getElementById('scene-5');
    if (s5 && !s5.classList.contains('hidden')) {
      addStardust(e.clientX, e.clientY);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const s5 = document.getElementById('scene-5');
    if (s5 && !s5.classList.contains('hidden') && e.touches[0]) {
      addStardust(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  let lastMeteorTime = 0;

  function drawStarfield(t) {
    ctx.fillStyle = '#05020a';
    ctx.fillRect(0, 0, width, height);

    // 1. Draw Pulsing Cosmic Nebulae
    nebulae.forEach(neb => {
      neb.phase += 0.008;
      const pulse = 1 + Math.sin(neb.phase) * 0.18;
      const grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.r * pulse);
      grad.addColorStop(0, neb.color);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(neb.x, neb.y, neb.r * pulse, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Cyber wireframe grid
    drawWire(ctx, width, height, t);

    // 3. Multi-colored Twinkling Stars
    stars.forEach(star => {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 0.95 || star.alpha < 0.2) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }
      ctx.fillStyle = \`\${star.colorPrefix}\${star.alpha})\`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Subtle 4-point flare on brighter stars
      if (star.hasCrossFlare && star.alpha > 0.75) {
        ctx.strokeStyle = \`\${star.colorPrefix}\${star.alpha * 0.4})\`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(star.x - star.size * 3, star.y);
        ctx.lineTo(star.x + star.size * 3, star.y);
        ctx.moveTo(star.x, star.y - star.size * 3);
        ctx.lineTo(star.x, star.y + star.size * 3);
        ctx.stroke();
      }
    });

    // 4. Shooting Stars (Meteors)
    if (t - lastMeteorTime > 2600 && Math.random() < 0.35) {
      spawnMeteor();
      lastMeteorTime = t;
    }

    for (let m = meteors.length - 1; m >= 0; m--) {
      const met = meteors[m];
      met.x += Math.cos(met.angle) * met.speed;
      met.y += Math.sin(met.angle) * met.speed;
      met.alpha -= met.fade;

      if (met.alpha <= 0 || met.x > width + 100 || met.y > height + 100) {
        meteors.splice(m, 1);
        continue;
      }

      const tailX = met.x - Math.cos(met.angle) * met.length;
      const tailY = met.y - Math.sin(met.angle) * met.length;
      const grad = ctx.createLinearGradient(tailX, tailY, met.x, met.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.7, met.color);
      grad.addColorStop(1, '#ffffff');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(met.x, met.y);
      ctx.stroke();
    }

    // 5. Interactive Stardust Trails
    for (let s = stardust.length - 1; s >= 0; s--) {
      const p = stardust[s];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
      if (p.alpha <= 0) {
        stardust.splice(s, 1);
        continue;
      }
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    starryCanvasAnimationId = requestAnimationFrame(drawStarfield);
  }

  cancelAnimationFrame(starryCanvasAnimationId);
  starryCanvasAnimationId = requestAnimationFrame(drawStarfield);
}`;

if (script.includes(oldStarryCanvasStart)) {
  script = script.replace(oldStarryCanvasStart, newStarryCanvas);
  console.log('✓ Upgraded initStarryCanvas with meteors, multi-colored stars, nebulae, and interactive stardust');
} else {
  console.log('⚠ Could not match oldStarryCanvasStart exactly, checking...');
}

// 5. Add render53PhotosGrid and modal helpers
const additionalLogic = `
// ----------------------------------------------------------------------------
// FULL 53 PHOTOS GALLERY GRID & SLIDESHOW ENGINE
// ----------------------------------------------------------------------------
let currentGalleryMode = 'cosmos'; // 'cosmos' | 'grid'
let slideshowInterval = null;

function render53PhotosGrid() {
  const container = document.getElementById('photos-grid-container');
  if (!container || container.children.length > 0) return;
  container.innerHTML = '';

  const photos = APP_CONFIG.allBunnyPhotos || [];
  photos.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = 'grid-photo-card group';
    card.title = \`Memory #\${idx + 1}: \${photo.filename}\`;

    card.innerHTML = \`
      <img src="\${encodeURI(photo.clean)}" alt="Memory #\${idx + 1}" loading="lazy" class="w-full h-full object-cover">
      <div class="grid-photo-badge">#\${idx + 1}</div>
      <button class="grid-dl-btn" title="Download Photo #\${idx + 1}" data-idx="\${idx}">
        ⬇
      </button>
    \`;

    const dlBtn = card.querySelector('.grid-dl-btn');
    if (dlBtn) {
      dlBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sounds.playClick();
        downloadImage(photo.clean, photo.filename);
      });
    }

    card.addEventListener('click', () => {
      sounds.playClick();
      openModalForSingleBunnyPhoto(idx);
    });

    container.appendChild(card);
  });
}

function openModalForSingleBunnyPhoto(index) {
  const photos = APP_CONFIG.allBunnyPhotos || [];
  if (!photos[index]) return;
  const photo = photos[index];

  // Find corresponding memory or synthesize
  let targetMemIndex = Math.floor(index / 3);
  if (targetMemIndex >= APP_CONFIG.memories.length) {
    targetMemIndex = APP_CONFIG.memories.length - 1;
  }
  activeModalMemoryIndex = targetMemIndex;
  modalSlideIndex = index % 3;

  const modal = document.getElementById('photo-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  updatePhotoModalContent();
  applySlide(modalSlideIndex);
}

function startAutoSlideshow() {
  if (slideshowInterval) clearInterval(slideshowInterval);
  showToast('▶ Auto Slideshow Started ✨');

  const photos = APP_CONFIG.allBunnyPhotos || [];
  let sIndex = 0;
  openModalForSingleBunnyPhoto(sIndex);

  slideshowInterval = setInterval(() => {
    const modal = document.getElementById('photo-modal');
    if (!modal || modal.classList.contains('hidden')) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
      return;
    }
    sIndex = (sIndex + 1) % photos.length;
    openModalForSingleBunnyPhoto(sIndex);
  }, 3500);
}

function stopAutoSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
}

function setupUniverseControls() {
  const cosmosBtn = document.getElementById('view-cosmos-btn');
  const gridBtn = document.getElementById('view-grid-btn');
  const slideshowBtn = document.getElementById('auto-slideshow-btn');
  const dlAllBtn = document.getElementById('dl-all-btn');
  const polaroidGallery = document.getElementById('polaroid-gallery');
  const gridGallery = document.getElementById('grid-gallery-53');
  const modalQuickDlBtn = document.getElementById('modal-quick-dl-btn');
  const modalDownload = document.getElementById('modal-download');

  if (cosmosBtn) {
    cosmosBtn.addEventListener('click', () => {
      sounds.playClick();
      currentGalleryMode = 'cosmos';
      cosmosBtn.classList.add('active');
      if (gridBtn) gridBtn.classList.remove('active');
      if (polaroidGallery) polaroidGallery.classList.remove('hidden');
      if (gridGallery) gridGallery.classList.add('hidden');
      stopAutoSlideshow();
    });
  }

  if (gridBtn) {
    gridBtn.addEventListener('click', () => {
      sounds.playClick();
      currentGalleryMode = 'grid';
      gridBtn.classList.add('active');
      if (cosmosBtn) cosmosBtn.classList.remove('active');
      if (polaroidGallery) polaroidGallery.classList.add('hidden');
      if (gridGallery) {
        gridGallery.classList.remove('hidden');
        render53PhotosGrid();
      }
      stopAutoSlideshow();
    });
  }

  if (slideshowBtn) {
    slideshowBtn.addEventListener('click', () => {
      sounds.playClick();
      startAutoSlideshow();
    });
  }

  if (dlAllBtn) {
    dlAllBtn.addEventListener('click', () => {
      sounds.playClick();
      const mem = APP_CONFIG.memories[activeModalMemoryIndex];
      const src = mem && mem.images ? mem.images[modalSlideIndex] : (APP_CONFIG.allBunnyPhotos[0] ? APP_CONFIG.allBunnyPhotos[0].clean : '');
      const filename = src.split('/').pop() || 'bunny_photo.jpeg';
      downloadImage(src, filename);
    });
  }

  // Hook Quick Download Button on Image
  if (modalQuickDlBtn) {
    modalQuickDlBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playClick();
      const mem = APP_CONFIG.memories[activeModalMemoryIndex];
      if (mem && mem.images && mem.images[modalSlideIndex]) {
        const src = mem.images[modalSlideIndex];
        const filename = \`\${mem.title.replace(/\\s+/g, '_')}_photo_\${modalSlideIndex + 1}.jpeg\`;
        downloadImage(src, filename);
      }
    });
  }

  // Hook Modal Download Link
  if (modalDownload) {
    modalDownload.addEventListener('click', (e) => {
      e.preventDefault();
      sounds.playClick();
      const mem = APP_CONFIG.memories[activeModalMemoryIndex];
      if (mem) {
        if (mem.type === 'video') {
          downloadImage(mem.video, \`\${mem.title.replace(/\\s+/g, '_')}.mp4\`);
        } else if (mem.images && mem.images[modalSlideIndex]) {
          const src = mem.images[modalSlideIndex];
          const filename = \`\${mem.title.replace(/\\s+/g, '_')}_photo_\${modalSlideIndex + 1}.jpeg\`;
          downloadImage(src, filename);
        }
      }
    });
  }
}
`;

if (!script.includes('function setupUniverseControls()')) {
  script += '\n' + additionalLogic;
  console.log('✓ Added setupUniverseControls, render53PhotosGrid, slideshow & direct download wiring');
}

// Ensure setupUniverseControls() is called in setupScene5()
if (script.includes('function setupScene5() {')) {
  if (!script.includes('setupUniverseControls();')) {
    script = script.replace('function setupScene5() {', 'function setupScene5() {\n  setupUniverseControls();\n  render53PhotosGrid();');
    console.log('✓ Called setupUniverseControls() and render53PhotosGrid() inside setupScene5()');
  }
}

fs.writeFileSync('script.js', script, 'utf8');
console.log('script.js written successfully!');
