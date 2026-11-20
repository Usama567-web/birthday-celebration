const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');
const mems = JSON.parse(fs.readFileSync('assets/bunny/memories_53.json', 'utf8'));

// 1. Replace memories array
const start = js.indexOf('  memories: [');
const endMarker = '  ]\n};';
const end = js.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  console.error('Could not find memories boundaries');
  process.exit(1);
}

const memsJson = JSON.stringify(mems, null, 4);
js = js.substring(0, start) + '  memories: ' + memsJson + js.substring(end + endMarker.length - 2);

// 2. Add setupCoverSlideshow logic before setupScene1
const coverSlideshowCode = `let coverSlideIndex = 0;
let coverSlideTimer = null;

function setupCoverSlideshow() {
  const slides = [
    document.getElementById('cover-photo-1'),
    document.getElementById('cover-photo-2'),
    document.getElementById('cover-photo-3')
  ].filter(Boolean);

  const dots = document.querySelectorAll('.cover-dot');
  if (slides.length === 0) return;

  function showSlide(idx) {
    coverSlideIndex = (idx + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      if (i === coverSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === coverSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetIdx = parseInt(dot.dataset.index, 10);
      showSlide(targetIdx);
      restartCoverTimer();
    });
  });

  function restartCoverTimer() {
    if (coverSlideTimer) clearInterval(coverSlideTimer);
    coverSlideTimer = setInterval(() => {
      showSlide(coverSlideIndex + 1);
    }, 5000);
  }

  restartCoverTimer();
}

`;

if (!js.includes('function setupCoverSlideshow()')) {
  js = js.replace('function setupScene1() {', coverSlideshowCode + 'function setupScene1() {\n  setupCoverSlideshow();');
}

// 3. Replace renderPolaroidGallery
const galleryStart = js.indexOf('function renderPolaroidGallery() {');
const galleryEndMarker = '  });\n}';
const galleryEnd = js.indexOf(galleryEndMarker, galleryStart);

if (galleryStart !== -1 && galleryEnd !== -1) {
  const newGalleryFunc = `function renderPolaroidGallery() {
  const gallery = document.getElementById('polaroid-gallery');
  if (!gallery) return;
  gallery.innerHTML = '';

  const pos = [
    [6, 3],   [58, 5],   [32, 13],
    [76, 19], [10, 26],  [50, 33],
    [74, 40], [14, 47],  [44, 54],
    [78, 62], [8, 69],   [52, 76],
    [26, 84], [72, 91],  [12, 99],
    [54, 107],[76, 115], [28, 123]
  ];

  APP_CONFIG.memories.forEach((mem, i) => {
    const [x, y] = pos[i % pos.length];
    const card = document.createElement('div');
    card.className = 'space-card';
    card.style.cssText = \`left:\${x}%;top:\${y}%;--r:\${(i % 2 ? 1 : -1) * (3 + (i % 5) * 2)}deg;\` +
                         \`animation-duration:\${8 + (i % 6)}s;animation-delay:-\${i * 1.5}s\`;

    let currentPhotoIdx = 0;
    const photoCount = mem.images ? mem.images.length : 1;

    card.innerHTML = \`
      <div class="space-card-inner relative w-full h-full overflow-hidden">
        <img class="space-card-img w-full h-full object-cover transition-all duration-700 ease-out" src="\${encodeURI(mem.images[0])}" alt="\${mem.title}">
        <div class="space-card-badge">
          <span>\${photoCount} Photos 📷</span>
        </div>
        <div class="space-card-shimmer"></div>
      </div>
    \`;

    if (photoCount > 1) {
      setInterval(() => {
        const s5 = document.getElementById('scene-5');
        if (!s5 || s5.classList.contains('hidden')) return;
        currentPhotoIdx = (currentPhotoIdx + 1) % photoCount;
        const img = card.querySelector('.space-card-img');
        if (img) {
          img.style.opacity = '0.35';
          img.style.transform = 'scale(1.06)';
          setTimeout(() => {
            img.src = encodeURI(mem.images[currentPhotoIdx]);
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
          }, 320);
        }
      }, 4500 + (i % 5) * 600);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = \`scale(1.12) rotateX(\${-dy * 14}deg) rotateY(\${dx * 14}deg)\`;
      card.style.zIndex = '50';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.zIndex = '';
    });

    card.onclick = () => {
      sounds.playClick();
      openPhotoModal(i);
    };

    gallery.appendChild(card);
  });
}`;
  js = js.substring(0, galleryStart) + newGalleryFunc + js.substring(galleryEnd + galleryEndMarker.length);
}

// 4. Update updatePhotoModalContent
const modalContentStart = js.indexOf('function updatePhotoModalContent() {');
const modalContentEndMarker = '  }\n}\n\n// ----------------------------------------------------------------------------\n// 10. LIGHTBOX & FULLSCREEN MODAL CONTROLS';
let modalContentEnd = js.indexOf(modalContentEndMarker, modalContentStart);

if (modalContentStart !== -1 && modalContentEnd !== -1) {
  const newModalContentFunc = `function updatePhotoModalContent() {
  if (autoSwapTimer) clearInterval(autoSwapTimer);

  const mem = APP_CONFIG.memories[activeModalMemoryIndex];
  if (!mem) return;

  const imgContainer = document.getElementById('modal-img-container');
  const videoContainer = document.getElementById('modal-video-container');
  const thumbnailsContainer = document.getElementById('modal-thumbnails');
  const dotsContainer = document.getElementById('modal-slide-dots');
  const videoEl = document.getElementById('modal-video');
  const titleEl = document.getElementById('modal-title');
  const dateEl = document.getElementById('modal-date');
  const likeCountEl = document.getElementById('modal-like-count');
  const swapLabel = document.getElementById('modal-swap-label');

  if (titleEl) titleEl.textContent = \`\${mem.title} (\${activeModalMemoryIndex + 1}/\${APP_CONFIG.memories.length})\`;
  if (dateEl) dateEl.textContent = mem.date;
  if (likeCountEl) likeCountEl.textContent = \`\${(mem.likes || 1200).toLocaleString()} Likes\`;

  if (mem.type === 'video') {
    if (imgContainer) imgContainer.classList.add('hidden');
    if (videoContainer) videoContainer.classList.remove('hidden');
    if (thumbnailsContainer) thumbnailsContainer.classList.add('hidden');
    if (videoEl) {
      videoEl.src = encodeURI(mem.video);
      videoEl.play().catch(() => {});
    }
  } else {
    if (videoContainer) {
      videoContainer.classList.add('hidden');
      if (videoEl) videoEl.pause();
    }
    if (imgContainer) imgContainer.classList.remove('hidden');

    if (swapLabel) {
      swapLabel.textContent = \`Auto-swapping \${mem.images.length} photos\`;
    }

    if (dotsContainer && mem.images) {
      dotsContainer.innerHTML = '';
      mem.images.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = 'slide-dot w-2 h-2 rounded-full bg-white/40 transition-all cursor-pointer' + (idx === modalSlideIndex ? ' active bg-pink-400' : '');
        dot.onclick = (e) => {
          e.stopPropagation();
          sounds.playClick();
          setSlide(idx);
        };
        dotsContainer.appendChild(dot);
      });
    }

    if (thumbnailsContainer && mem.images) {
      thumbnailsContainer.classList.remove('hidden');
      thumbnailsContainer.innerHTML = '';
      thumbnailsContainer.className = \`grid grid-cols-\${Math.min(mem.images.length, 4)} gap-2\`;
      mem.images.forEach((src, idx) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumb-item cursor-pointer rounded-xl overflow-hidden aspect-[4/3] border-2 border-transparent transition-all hover:scale-105' + (idx === modalSlideIndex ? ' active border-pink-400' : '');
        thumb.innerHTML = \`<img class="thumb-img w-full h-full object-cover" src="\${encodeURI(src)}" alt="Photo \${idx + 1}">\`;
        thumb.onclick = (e) => {
          e.stopPropagation();
          sounds.playClick();
          setSlide(idx);
        };
        thumbnailsContainer.appendChild(thumb);
      });
    }

    applySlide(modalSlideIndex);
    restartAutoSwap();
  }`;

  js = js.substring(0, modalContentStart) + newModalContentFunc + js.substring(modalContentEnd + 4);
}

fs.writeFileSync('script.js', js, 'utf8');
console.log('script.js successfully updated with all 53 photos and 5s cover swap!');
