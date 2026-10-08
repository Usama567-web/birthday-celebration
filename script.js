/**
 * ============================================================================
 * CINEMATIC BIRTHDAY WEB APPLICATION - CORE LOGIC & ANIMATION ENGINE
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. CONFIGURATION & CUSTOMIZATION
// ----------------------------------------------------------------------------
const DEFAULT_CONFIG = {
  partnerName: "My Girl",
  passcode: "0910",
  passcodeHint: "✨ Tap card to enter passcode • 0910",
  letterDate: "October 5th, 2026",
  letterBody: `Happiest birthday my gurll🥳👸

I pray you achieve all your dreams, stay happy, and keep smiling the way you do...

because that smile is my favorite thing🫶

Everyday is your day because you are the main character... and YOU KNOW IT😌

Let's share unlimited laughs, love, fights, and happiness🫅😏

I love you forever and ever and ever

Thankyou for being my partner in every sense, happy 19th darlzzz🥳🫀💋
I love you darlzzzz please be with me…`,
  memories: [
    {
      id: 1,
      title: "Our Golden Hour",
      date: "September 14, 2024",
      image: "assets/cover.jpg",
      caption: "The way you laugh when we lose track of time...",
      story: "That unforgettable sunset evening where the lights strung across the trees matched the twinkle in your eyes.",
      likes: 1314
    },
    {
      id: 2,
      title: "Sunset by the Shore",
      date: "July 22, 2024",
      image: "assets/memory-1.jpg",
      caption: "Barefoot walks and salty ocean breezes...",
      story: "Walking hand-in-hand along the tide as the sky turned shades of cotton candy pink and warm gold.",
      likes: 999
    },
    {
      id: 3,
      title: "Underneath the Aurora & Stars",
      date: "December 30, 2024",
      image: "assets/memory-2.jpg",
      caption: "Wrapped in blankets, counting shooting stars...",
      story: "The night was freezing, but with you wrapped in that cozy blanket on the hill, watching the constellations.",
      likes: 2026
    },
    {
      id: 4,
      title: "Sweet Birthday Morning",
      date: "October 5, 2025",
      image: "assets/memory-3.jpg",
      caption: "A quiet corner cafe, a pastry, and your radiant smile...",
      story: "Seeing you smile as you blew out the tiny candle was the highlight of my entire year.",
      likes: 1520
    }
  ]
};

// Load saved config or fall back to default
let APP_CONFIG = loadSavedConfig();

function loadSavedConfig() {
  try {
    const saved = localStorage.getItem('birthday_app_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate from old default 1234 if present
      if (!parsed.passcode || parsed.passcode === "1234") {
        parsed.passcode = DEFAULT_CONFIG.passcode;
      }
      return { 
        ...DEFAULT_CONFIG, 
        ...parsed, 
        passcode: parsed.passcode === "1234" ? DEFAULT_CONFIG.passcode : (parsed.passcode || DEFAULT_CONFIG.passcode),
        letterBody: DEFAULT_CONFIG.letterBody, 
        passcodeHint: DEFAULT_CONFIG.passcodeHint 
      };
    }
  } catch (e) {
    console.warn("Could not load saved config from localStorage:", e);
  }
  return { ...DEFAULT_CONFIG };
}

function saveConfig(newConfig) {
  try {
    APP_CONFIG = { ...APP_CONFIG, ...newConfig };
    localStorage.setItem('birthday_app_config', JSON.stringify(APP_CONFIG));
    applyConfigToDOM();
  } catch (e) {
    console.error("Failed to save config:", e);
  }
}

// ----------------------------------------------------------------------------
// 2. SYNTHESIZED WEB AUDIO & SOUND EFFECTS ENGINE (Zero External 404s)
// ----------------------------------------------------------------------------
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isMusicPlaying = false;
    this.bgmTimer = null;
    this.chordStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.3, maxGain = 0.15) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(maxGain, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playKeypadBeep(digit = '1') {
    if (this.isMuted) return;
    const baseFreq = 520 + (parseInt(digit) || 5) * 45;
    this.playTone(baseFreq, 'sine', 0.08, 0.12);
  }

  playClick() {
    this.playTone(1200, 'triangle', 0.05, 0.08);
  }

  playError() {
    this.playTone(180, 'sawtooth', 0.25, 0.15);
  }

  playSuccessChime() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.8, 0.18);
      }, idx * 90);
    });
  }

  playPullString() {
    this.playTone(320, 'triangle', 0.1, 0.2);
    setTimeout(() => {
      this.playTone(880, 'sine', 0.6, 0.2);
    }, 80);
  }

  playWhoosh() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.15);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch (e) {}
  }

  playConfettiFanfare() {
    const fanfare = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    fanfare.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'triangle', 0.6, 0.15);
      }, i * 70);
    });
  }

  playWaxCrack() {
    this.playTone(280, 'square', 0.08, 0.12);
    setTimeout(() => this.playTone(450, 'sawtooth', 0.06, 0.1), 30);
  }

  playTypewriter() {
    const f = 800 + Math.random() * 400;
    this.playTone(f, 'triangle', 0.04, 0.06);
  }

  playHeartPop() {
    this.playTone(600, 'sine', 0.12, 0.15);
    setTimeout(() => this.playTone(900, 'sine', 0.15, 0.18), 50);
  }

  playShootingStar() {
    const chords = [1200, 1500, 1800, 2400];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.7, 0.1);
      }, idx * 60);
    });
  }

  toggleBGM() {
    this.init();
    if (this.isMusicPlaying) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
  }

  startBGM() {
    this.isMusicPlaying = true;
    const eqBars = document.getElementById('equalizer-bars');
    const audioLabel = document.getElementById('audio-label');
    if (eqBars) eqBars.classList.remove('paused');
    if (audioLabel) audioLabel.textContent = "Music: On";

    const progression = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    const playNextChord = () => {
      if (!this.isMusicPlaying) return;
      const chord = progression[this.chordStep % progression.length];
      this.chordStep++;

      chord.forEach((freq, i) => {
        setTimeout(() => {
          if (!this.isMusicPlaying) return;
          this.playTone(freq, 'sine', 2.8, 0.045);
        }, i * 140);
      });

      this.bgmTimer = setTimeout(playNextChord, 3600);
    };

    playNextChord();
  }

  stopBGM() {
    this.isMusicPlaying = false;
    clearTimeout(this.bgmTimer);
    const eqBars = document.getElementById('equalizer-bars');
    const audioLabel = document.getElementById('audio-label');
    if (eqBars) eqBars.classList.add('paused');
    if (audioLabel) audioLabel.textContent = "Music: Off";
  }
}

const sounds = new SoundEngine();

// ----------------------------------------------------------------------------
// 3. SCENE STATE MACHINE & OVERLAY TRANSITIONS
// ----------------------------------------------------------------------------
let currentScene = 1;
const TOTAL_SCENES = 5;

function setSceneProgress(sceneNum) {
  const progressBar = document.getElementById('scene-progress');
  if (progressBar) {
    const pct = (sceneNum / TOTAL_SCENES) * 100;
    progressBar.style.width = `${pct}%`;
  }
}

function playFlowerTransition(mid) {
  const o = document.getElementById('flower-overlay');
  if (!o) { mid(); return; }
  gsap.to(o, {
    opacity: 1,
    duration: .6,
    onComplete: () => {
      mid();
      gsap.to(o, { opacity: 0, delay: 2.4, duration: .8 });
    }
  });
}

function playFireTransition(mid) {
  const o = document.getElementById('fire-overlay');
  if (!o) { mid(); return; }
  gsap.fromTo(o, 
    { opacity: 0, scale: .3 }, 
    { 
      opacity: 1, 
      scale: 1.3, 
      duration: .9, 
      ease: 'power2.in',
      onComplete: () => { 
        mid(); 
        gsap.to(o, { opacity: 0, duration: 1 }); 
      } 
    }
  );
}

function switchScene(fromSceneId, toSceneId, options = {}) {
  const fromEl = document.getElementById(fromSceneId);
  const toEl = document.getElementById(toSceneId);
  if (!fromEl || !toEl) return;

  const targetSceneNum = parseInt(toSceneId.replace('scene-', '')) || 1;
  currentScene = targetSceneNum;
  setSceneProgress(currentScene);

  if (window.gsap) {
    gsap.to(fromEl, {
      opacity: 0,
      scale: 0.96,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        fromEl.classList.add('hidden');
        fromEl.classList.remove('active');
        
        toEl.classList.remove('hidden');
        toEl.classList.add('active');
        gsap.fromTo(toEl, 
          { opacity: 0, scale: 1.04 }, 
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
        );

        if (options.onEnter) options.onEnter();
      }
    });
  } else {
    fromEl.classList.add('hidden');
    toEl.classList.remove('hidden');
    if (options.onEnter) options.onEnter();
  }
}

// ----------------------------------------------------------------------------
// 4. SCENE 1: COVER POLAROID & SECURE PASSCODE LOGIC
// ----------------------------------------------------------------------------
let enteredPin = "";

function setupScene1() {
  const cardFlipper = document.getElementById('card-flipper');
  const cardFront = document.getElementById('card-front');
  const flipBackBtn = document.getElementById('flip-back-btn');
  const pinDisplay = document.getElementById('pin-display');
  const pinDots = document.querySelectorAll('#pin-display .pin-dot');
  const keyBtns = document.querySelectorAll('.key-btn');
  const errorMsg = document.getElementById('passcode-error');
  const passcodeHint = document.getElementById('passcode-hint');
  const hintToggleBtn = document.getElementById('hint-toggle-btn');
  const hintBubble = document.getElementById('hint-bubble');
  const hintBubbleText = document.getElementById('hint-bubble-text');
  const hintToggleLabel = document.getElementById('hint-toggle-label');

  if (passcodeHint) {
    passcodeHint.textContent = APP_CONFIG.passcodeHint;
  }
  if (hintBubbleText) {
    hintBubbleText.textContent = `✨ Passcode: ${APP_CONFIG.passcode}`;
  }

  // Interactive Hint Toggle on PIN Pad
  if (hintToggleBtn && hintBubble) {
    hintToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.init();
      sounds.playClick();
      const isHidden = hintBubble.classList.contains('hidden');
      if (isHidden) {
        hintBubble.classList.remove('hidden');
        if (hintToggleLabel) hintToggleLabel.textContent = 'Hide hint';
      } else {
        hintBubble.classList.add('hidden');
        if (hintToggleLabel) hintToggleLabel.textContent = 'Need a hint?';
      }
    });
  }

  // Smooth 3D card flip when tapped
  if (cardFront) {
    cardFront.addEventListener('click', () => {
      sounds.init();
      sounds.playWhoosh();
      if (cardFlipper) {
        cardFlipper.classList.add('is-flipped');
      }
    });
  }

  // Flip back to front photo
  if (flipBackBtn) {
    flipBackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playWhoosh();
      if (cardFlipper) {
        cardFlipper.classList.remove('is-flipped');
      }
      resetPin();
    });
  }

  // Keypad clicks
  keyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.init();

      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 120);

      const key = btn.dataset.key;
      const action = btn.dataset.action;

      if (action === 'delete') {
        if (enteredPin.length > 0) {
          sounds.playClick();
          enteredPin = enteredPin.slice(0, -1);
          updatePinDisplay();
        }
      } else if (action === 'clear') {
        if (enteredPin.length > 0) {
          sounds.playClick();
          resetPin();
        }
      } else if (key !== undefined) {
        if (enteredPin.length < 4) {
          sounds.playKeypadBeep(key);
          enteredPin += key;
          updatePinDisplay();

          if (enteredPin.length === 4) {
            validatePin();
          }
        }
      }
    });
  });

  // Physical keyboard navigation for desktop users
  window.addEventListener('keydown', (e) => {
    const scene1 = document.getElementById('scene-1');
    if (!scene1 || !scene1.classList.contains('active')) return;
    if (!cardFlipper || !cardFlipper.classList.contains('is-flipped')) return;

    if (e.key >= '0' && e.key <= '9') {
      if (enteredPin.length < 4) {
        sounds.init();
        sounds.playKeypadBeep(e.key);
        enteredPin += e.key;
        updatePinDisplay();
        if (enteredPin.length === 4) {
          validatePin();
        }
      }
    } else if (e.key === 'Backspace') {
      if (enteredPin.length > 0) {
        sounds.playClick();
        enteredPin = enteredPin.slice(0, -1);
        updatePinDisplay();
      }
    } else if (e.key === 'Escape') {
      if (cardFlipper) {
        sounds.playWhoosh();
        cardFlipper.classList.remove('is-flipped');
        resetPin();
      }
    }
  });

  function updatePinDisplay() {
    pinDots.forEach((dot, idx) => {
      if (idx < enteredPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
    if (errorMsg) errorMsg.style.opacity = '0';
  }

  function resetPin() {
    enteredPin = "";
    updatePinDisplay();
  }

  function validatePin() {
    if (enteredPin === APP_CONFIG.passcode) {
      sounds.playSuccessChime();
      pinDots.forEach(dot => dot.classList.add('success'));
      
      if (window.confetti) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }

      // Smooth flower transition into Scene 2 (intro)
      setTimeout(() => {
        playFlowerTransition(() => {
          switchScene('scene-1', 'scene-2', {
            onEnter: () => setupScene2('intro')
          });
        });
      }, 500);

    } else {
      sounds.playError();
      pinDots.forEach(dot => dot.classList.add('error'));
      if (pinDisplay) pinDisplay.classList.add('pin-shake');
      if (errorMsg) errorMsg.style.opacity = '1';

      setTimeout(() => {
        pinDots.forEach(dot => {
          dot.classList.remove('error');
          dot.classList.remove('success');
        });
        if (pinDisplay) pinDisplay.classList.remove('pin-shake');
        resetPin();
      }, 700);
    }
  }
}

// ----------------------------------------------------------------------------
// 5. SCENE 2: CUTE LANTERN & PULL STRING (Intro & Outro)
// ----------------------------------------------------------------------------
function setupScene2(mode = 'intro') {
  const $ = id => document.getElementById(id);
  const wrap = $('pull-cord-wrapper'), 
        stage = $('lantern-stage'), 
        txt = $('pull-text'),
        fireBtn = $('fire-btn'), 
        wash = $('scene2-wash');
  let pulled = false, startY = 0, drag = false;

  gsap.set([stage, txt], { opacity: 1 }); 
  gsap.set(wash, { opacity: 0 });
  if (fireBtn) fireBtn.classList.add('hidden');

  const pull = () => {
    if (pulled) return; 
    pulled = true;
    sounds.playPullString();
    gsap.timeline()
      .to(wrap, { y: 40, duration: .15 })
      .to(wrap, { y: 0, duration: .7, ease: 'elastic.out(1.2,.3)' });

    if (mode === 'intro') {
      gsap.to([stage, txt], { opacity: 0, duration: .8, delay: .3 });
      gsap.to(wash, { opacity: 1, duration: 1, delay: .3, onComplete: () => {
        if (fireBtn) {
          fireBtn.classList.remove('hidden');
          gsap.from(fireBtn, { scale: .6, opacity: 0, duration: .6 });
        }
      }});
    } else { 
      // outro: lights go out, then transition into the space gallery
      const f = $('flash-overlay');
      if (f) {
        f.style.background = '#000'; 
        f.style.transition = 'opacity 1.4s'; 
        f.style.opacity = '1';
        setTimeout(() => switchScene('scene-2', 'scene-5', { onEnter: setupScene5 }), 1500);
        setTimeout(() => { f.style.opacity = '0'; }, 2000);
        setTimeout(() => { f.style.background = ''; f.style.transition = ''; }, 3500);
      } else {
        switchScene('scene-2', 'scene-5', { onEnter: setupScene5 });
      }
    }
  };

  if (wrap) {
    wrap.onclick = pull;
    wrap.onpointerdown = e => { 
      startY = e.clientY; 
      drag = true; 
      wrap.setPointerCapture(e.pointerId); 
    };
    wrap.onpointermove = e => { 
      if (drag && e.clientY - startY > 40) { 
        drag = false; 
        pull(); 
      } 
    };
    wrap.onpointerup = () => { drag = false; };
  }

  if (fireBtn) {
    fireBtn.onclick = () => {
      sounds.playConfettiFanfare();
      playFireTransition(() => switchScene('scene-2', 'scene-3', { onEnter: setupScene3 }));
    };
  }
}

// ----------------------------------------------------------------------------
// 6. SCENE 3: SWIPE / SLICE THE CAKE
// ----------------------------------------------------------------------------
let isCakeSliced = false;

function setupScene3() {
  const $ = id => document.getElementById(id);
  const box = $('cake-interactive-box'), 
        ring = $('slice-ring-fg'), 
        pct = $('slice-pct'),
        title = $('cake-title'), 
        sub = $('cake-sub'), 
        next = $('goto-letter-btn');
  const C = 2 * Math.PI * 26;
  let progress = 0, last = null;
  isCakeSliced = false;

  const setP = p => { 
    if (ring) ring.style.strokeDashoffset = C * (1 - p / 100); 
    if (pct) pct.textContent = Math.round(p) + '%'; 
  };
  setP(0);
  if (title) {
    title.textContent = 'Swipe to Cut the Cake! 🎂';
    title.className = 'f-playfair text-4xl font-bold text-[#a8667a] leading-tight';
  }
  if (sub) sub.style.display = ''; 
  if (next) next.classList.add('opacity-0', 'pointer-events-none');

  const finish = () => {
    isCakeSliced = true;
    sounds.playWhoosh(); 
    setTimeout(() => sounds.playConfettiFanfare(), 250);
    if (title) {
      title.textContent = 'Happy Birthday, My Girl! 💗';
      title.className = 'f-script text-5xl text-[#c9a0b4] leading-tight';
    }
    if (sub) sub.style.display = 'none';
    if (window.confetti) {
      confetti({ 
        particleCount: 160, 
        spread: 100, 
        origin: { y: .25 }, 
        gravity: .6,
        colors: ['#fda4af', '#c4b5fd', '#fde68a', '#f9a8d4'] 
      });
    }
    if (next) next.classList.remove('opacity-0', 'pointer-events-none');
  };

  if (box) {
    box.onpointerdown = e => { 
      last = { x: e.clientX, y: e.clientY }; 
      box.setPointerCapture(e.pointerId); 
    };
    box.onpointermove = e => {
      if (!last || isCakeSliced) return;
      progress = Math.min(100, progress + Math.hypot(e.clientX - last.x, e.clientY - last.y) / 4);
      last = { x: e.clientX, y: e.clientY };
      setP(progress);
      if (progress >= 100) finish();
    };
    box.onpointerup = box.onpointercancel = () => { last = null; };
  }

  if (next) {
    next.onclick = () => {
      sounds.playClick();
      switchScene('scene-3', 'scene-4', { onEnter: setupScene4 });
    };
  }
}

// ----------------------------------------------------------------------------
// 7. SCENE 4: HEARTFELT UNSEALING LETTER
// ----------------------------------------------------------------------------
let typewriterInterval = null;
let isLetterOpened = false;

function setupScene4() {
  const envelopeBox = document.getElementById('envelope-box');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const letterModal = document.getElementById('letter-modal');
  const waxSeal = document.getElementById('wax-seal');
  const bodyEl = document.getElementById('typewriter-body');
  const cursorEl = document.getElementById('typewriter-cursor');
  const gotoStarryBtn = document.getElementById('goto-starry-btn');
  const closeLetterBtn = document.getElementById('close-letter-btn');

  isLetterOpened = false;
  if (gotoStarryBtn) gotoStarryBtn.classList.add('hidden');

  const openLetter = () => {
    if (isLetterOpened) return;
    isLetterOpened = true;

    sounds.playWaxCrack();
    if (envelopeBox) envelopeBox.classList.add('envelope-open');

    setTimeout(() => {
      sounds.playClick();
      if (envelopeWrapper) envelopeWrapper.classList.add('hidden');
      if (letterModal) {
        letterModal.classList.remove('hidden');
        if (window.gsap) {
          gsap.fromTo(letterModal, 
            { opacity: 0, scale: 0.9, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" }
          );
        }
        startTypewriter();
      }
    }, 750);
  };

  if (envelopeBox) envelopeBox.addEventListener('click', openLetter);
  if (waxSeal) waxSeal.addEventListener('click', (e) => { e.stopPropagation(); openLetter(); });

  if (closeLetterBtn) {
    closeLetterBtn.addEventListener('click', () => {
      sounds.playClick();
      if (letterModal) letterModal.classList.add('hidden');
      if (envelopeWrapper) envelopeWrapper.classList.remove('hidden');
      if (envelopeBox) envelopeBox.classList.remove('envelope-open');
      isLetterOpened = false;
    });
  }

  function startTypewriter() {
    if (!bodyEl) return;
    bodyEl.innerHTML = '';
    const fullText = APP_CONFIG.letterBody;
    let charIndex = 0;

    clearInterval(typewriterInterval);
    typewriterInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        const char = fullText[charIndex];
        if (char === '\n') {
          bodyEl.innerHTML += '<br/>';
        } else {
          bodyEl.innerHTML += char;
        }

        if (charIndex % 3 === 0 && char !== ' ' && char !== '\n') {
          sounds.playTypewriter();
        }

        charIndex++;
      } else {
        clearInterval(typewriterInterval);
        if (cursorEl) cursorEl.style.display = 'none';
        if (gotoStarryBtn) gotoStarryBtn.classList.remove('hidden');
      }
    }, 28);
  }

  if (gotoStarryBtn) {
    gotoStarryBtn.addEventListener('click', () => {
      sounds.playClick();
      switchScene('scene-4', 'scene-2', { onEnter: () => setupScene2('outro') });
    });
  }
}

// ----------------------------------------------------------------------------
// 8. SCENE 5: SPACE GALLERY & 3D WIREFRAME CYBER-SPACE
// ----------------------------------------------------------------------------
let activeModalMemoryIndex = 0;
let starryCanvasAnimationId = null;

function setupScene5() {
  renderPolaroidGallery();
  initStarryCanvas();
  setupPhotoModal();
}

function renderPolaroidGallery() {
  const gallery = document.getElementById('polaroid-gallery');
  if (!gallery) return;
  gallery.innerHTML = '';
  const pos = [[8,6],[58,10],[30,30],[68,38],[6,52],[44,58],[72,70],[20,78],[50,84]];
  pos.forEach(([x, y], i) => {
    const idx = i % APP_CONFIG.memories.length;
    const mem = APP_CONFIG.memories[idx];
    const card = document.createElement('div');
    card.className = 'space-card';
    card.style.cssText = `left:${x}%;top:${y}%;--r:${(i % 2 ? 1 : -1) * (4 + i % 4 * 3)}deg;` +
                         `animation-duration:${9 + i}s;animation-delay:-${i * 2}s`;
    card.innerHTML = `<img src="${mem.image}" alt="${mem.title}">`;
    card.onclick = () => { sounds.playClick(); openPhotoModal(idx); };
    gallery.appendChild(card);
  });
}

// Lightbox Modal
function setupPhotoModal() {
  const modal = document.getElementById('photo-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const prevBtn = document.getElementById('modal-prev-btn');
  const nextBtn = document.getElementById('modal-next-btn');
  const likeBtn = document.getElementById('modal-like-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sounds.playClick();
      modal.classList.add('hidden');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        sounds.playClick();
        modal.classList.add('hidden');
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      sounds.playClick();
      activeModalMemoryIndex = (activeModalMemoryIndex - 1 + APP_CONFIG.memories.length) % APP_CONFIG.memories.length;
      updatePhotoModalContent();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      sounds.playClick();
      activeModalMemoryIndex = (activeModalMemoryIndex + 1) % APP_CONFIG.memories.length;
      updatePhotoModalContent();
    });
  }

  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      sounds.playHeartPop();
      const mem = APP_CONFIG.memories[activeModalMemoryIndex];
      if (mem) {
        mem.likes = (mem.likes || 1000) + 1;
        likeBtn.innerHTML = '♥';
        likeBtn.classList.add('text-rose-400');
        spawnKissHearts();
      }
    });
  }
}

function openPhotoModal(index) {
  activeModalMemoryIndex = index;
  const modal = document.getElementById('photo-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  updatePhotoModalContent();
}

function updatePhotoModalContent() {
  const mem = APP_CONFIG.memories[activeModalMemoryIndex];
  if (!mem) return;

  const imgEl = document.getElementById('modal-img');
  const titleEl = document.getElementById('modal-title');
  const dateEl = document.getElementById('modal-date');
  const storyEl = document.getElementById('modal-story');
  const likeCountEl = document.getElementById('modal-like-count');
  const downloadEl = document.getElementById('modal-download');

  if (imgEl) imgEl.src = mem.image;
  if (titleEl) titleEl.textContent = mem.title;
  if (dateEl) dateEl.textContent = mem.date;
  if (storyEl) storyEl.textContent = mem.story;
  if (likeCountEl) likeCountEl.textContent = `${mem.likes.toLocaleString()} Likes`;
  if (downloadEl) {
    downloadEl.href = mem.image;
    downloadEl.download = `${mem.title.replace(/\s+/g, '_')}.jpg`;
  }
}

// ----------------------------------------------------------------------------
// 9. WIREFRAME CYBERSPACE CANVAS & STARS
// ----------------------------------------------------------------------------
function drawWire(ctx, w, h, t) {
  ctx.strokeStyle = 'rgba(255,255,255,.07)'; 
  ctx.lineWidth = 1;
  const hz = h * .45;
  for (let i = -12; i <= 12; i++) {                     // converging floor lines
    ctx.beginPath(); 
    ctx.moveTo(w / 2 + i * 20, hz); 
    ctx.lineTo(w / 2 + i * w * .25, h); 
    ctx.stroke();
  }
  for (let j = 0; j < 10; j++) {                         // scrolling horizontals
    const p = ((j + (t / 4000) % 1) / 10) ** 2, y = hz + (h - hz) * p;
    ctx.beginPath(); 
    ctx.moveTo(0, y); 
    ctx.lineTo(w, y); 
    ctx.stroke();
  }
  const cx = w / 2, cy = h * .62, r = Math.min(w, h) * .18;   // wireframe sphere
  for (let k = 0; k < 8; k++) {
    const a = t / 6000 + k * Math.PI / 8;
    ctx.beginPath(); 
    ctx.ellipse(cx, cy, Math.abs(Math.cos(a)) * r, r, 0, 0, Math.PI * 2); 
    ctx.stroke();
  }
  for (let k = -3; k <= 3; k++) {
    const y = cy + k * r / 4, rr = Math.sqrt(r * r - (k * r / 4) ** 2);
    ctx.beginPath(); 
    ctx.ellipse(cx, y, rr, rr * .25, 0, 0, Math.PI * 2); 
    ctx.stroke();
  }
}

function initStarryCanvas() {
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
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    starryCanvasAnimationId = requestAnimationFrame(drawStarfield);
  }

  cancelAnimationFrame(starryCanvasAnimationId);
  starryCanvasAnimationId = requestAnimationFrame(drawStarfield);
}

// ----------------------------------------------------------------------------
// 10. AMBIENT PARTICLES & FLOATING HEARTS
// ----------------------------------------------------------------------------
function spawnAmbientHearts() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 6,
      speedY: Math.random() * 0.8 + 0.3,
      sway: Math.random() * 0.02 + 0.01,
      swayOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.15
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.swayOffset += p.sway;
      const x = p.x + Math.sin(p.swayOffset) * 20;

      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }

      ctx.fillStyle = `rgba(253, 164, 175, ${p.opacity})`;
      ctx.font = `${p.size}px serif`;
      ctx.fillText('♥', x, p.y);
    });

    requestAnimationFrame(render);
  }

  render();
}

function spawnKissHearts() {
  const emojis = ['💋', '💖', '✨', '🌸', '💕'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.className = 'fixed pointer-events-none z-50 text-2xl select-none';
    el.style.left = `${Math.random() * 80 + 10}vw`;
    el.style.bottom = '10vh';
    document.body.appendChild(el);

    if (window.gsap) {
      gsap.to(el, {
        y: - (Math.random() * 300 + 200),
        x: (Math.random() - 0.5) * 120,
        opacity: 0,
        rotation: (Math.random() - 0.5) * 60,
        scale: Math.random() * 0.8 + 1,
        duration: Math.random() * 1.5 + 1.2,
        ease: "power1.out",
        onComplete: () => el.remove()
      });
    } else {
      setTimeout(() => el.remove(), 1500);
    }
  }
}

function applyConfigToDOM() {
  const recipientTitle = document.getElementById('recipient-title');
  if (recipientTitle) recipientTitle.textContent = `Happy Birthday!`;

  const passcodeHint = document.getElementById('passcode-hint');
  if (passcodeHint) passcodeHint.textContent = APP_CONFIG.passcodeHint;

  const hintBubbleText = document.getElementById('hint-bubble-text');
  if (hintBubbleText) hintBubbleText.textContent = `✨ Passcode: ${APP_CONFIG.passcode}`;
}

// ----------------------------------------------------------------------------
// 11. INITIALIZATION
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const toggleAudioBtn = document.getElementById('toggle-audio-btn');
  const toggleSfxBtn = document.getElementById('toggle-sfx-btn');

  if (toggleAudioBtn) {
    toggleAudioBtn.addEventListener('click', () => {
      sounds.toggleBGM();
    });
  }

  if (toggleSfxBtn) {
    toggleSfxBtn.addEventListener('click', () => {
      sounds.isMuted = !sounds.isMuted;
      sounds.playClick();
      toggleSfxBtn.innerHTML = sounds.isMuted 
        ? `<i data-lucide="volume-x" class="w-4 h-4 text-slate-400"></i>`
        : `<i data-lucide="volume-2" class="w-4 h-4"></i>`;
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // Graceful user interaction starts ambient audio
  window.addEventListener('click', () => {
    sounds.init();
    if (!sounds.isMusicPlaying) {
      sounds.startBGM();
    }
  }, { once: true });

  spawnAmbientHearts();
  applyConfigToDOM();

  // Start Scene 1
  setupScene1();
  setSceneProgress(1);
});
