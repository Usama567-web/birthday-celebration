/**
 * ============================================================================
 * CINEMATIC BIRTHDAY WEB APPLICATION - CORE LOGIC & ANIMATION ENGINE
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. CONFIGURATION & CUSTOMIZATION
// ----------------------------------------------------------------------------
const DEFAULT_CONFIG = {
  partnerName: "Shaista",
  senderName: "Usama",
  passcode: "0910",
  passcodeHint: "✨ Tap card to enter passcode • 0910",
  letterDate: "October 9th, 2026",
  letterBody: `Happiest Birthday, my wonderful Shaista! 🥳👸💖

I pray you achieve every single one of your dreams, stay endlessly happy, and keep smiling the way you do...

because that beautiful smile is my favorite thing in the whole world🫶✨

Every day is your day because you are the main character... and YOU KNOW IT😌💖

Let's share unlimited laughs, love, cute moments, and lifelong happiness together🫅

Thank you for being in my life and for being the most precious part of it. Wishing you the happiest and most blessed birthday, Shaista! 🥳🫀💋

With all my love forever and always,
Your Usama 💖`,
  memories: [
    {
      id: 1,
      type: "image",
      title: "My Beautiful Queen 👸",
      date: "Special Times",
      image: "Bunny 🐰🫠/IMG_20260528_224653.jpg",
      images: [
        "Bunny 🐰🫠/IMG_20260528_224653.jpg",
        "Bunny 🐰🫠/IMG_20261024_230626.jpg",
        "Bunny 🐰🫠/IMG_20261024_230635.jpg"
      ],
      likes: 1314
    },
    {
      id: 2,
      type: "image",
      title: "Dua-e-Khair & Blessings ✨",
      date: "Blessed Moments",
      image: "Bunny 🐰🫠/IMG_20261024_230614.jpg",
      images: [
        "Bunny 🐰🫠/IMG_20261024_230614.jpg",
        "Bunny 🐰🫠/IMG_20261024_230602.jpg",
        "Bunny 🐰🫠/IMG_20261024_230537.jpg"
      ],
      likes: 2026
    },
    {
      id: 3,
      type: "image",
      title: "Sweet Surprises & Roses 🌹",
      date: "Beautiful Days",
      image: "Bunny 🐰🫠/IMG_20260901_104957.jpg",
      images: [
        "Bunny 🐰🫠/IMG_20260901_104957.jpg",
        "Bunny 🐰🫠/IMG_20260831_174941.jpg",
        "Bunny 🐰🫠/IMG_20260831_175014.jpg"
      ],
      likes: 1520
    },
    {
      id: 4,
      type: "image",
      title: "Our Bunny 🐰 Moments",
      date: "Forever Cute",
      image: "Bunny 🐰🫠/1008491785303523870.jpg",
      images: [
        "Bunny 🐰🫠/1008491785303523870.jpg",
        "Bunny 🐰🫠/IMG_20261024_230550.jpg",
        "Bunny 🐰🫠/c80ea4c095284c3d8efe2831807c3eaa.webp"
      ],
      likes: 1888
    },
    {
      id: 5,
      type: "image",
      title: "Late Night Talks & Smiles 💬",
      date: "Together Always",
      image: "Bunny 🐰🫠/Screenshot_20261023_213400.jpg",
      images: [
        "Bunny 🐰🫠/Screenshot_20261023_213400.jpg",
        "Bunny 🐰🫠/Screenshot_20261023_213410.jpg",
        "Bunny 🐰🫠/Screenshot_20261023_213432.jpg"
      ],
      likes: 1750
    },
    {
      id: 6,
      type: "image",
      title: "Every Day With You 💖",
      date: "Always & Forever",
      image: "Bunny 🐰🫠/Screenshot_20260910_222931.jpg",
      images: [
        "Bunny 🐰🫠/Screenshot_20260910_222931.jpg",
        "Bunny 🐰🫠/Screenshot_20260910_222936.jpg",
        "Bunny 🐰🫠/Screenshot_20260910_222131.jpg"
      ],
      likes: 2400
    },
    {
      id: 7,
      type: "image",
      title: "Heartfelt Memories 🌸",
      date: "Magic Moments",
      image: "Bunny 🐰🫠/Screenshot_20260528_224529.jpg",
      images: [
        "Bunny 🐰🫠/Screenshot_20260528_224529.jpg",
        "Bunny 🐰🫠/Screenshot_20260503_001433.jpg",
        "Bunny 🐰🫠/Screenshot_20260503_001449.jpg"
      ],
      likes: 1999
    },
    {
      id: 8,
      type: "image",
      title: "Endless Laughter & Love 🥰",
      date: "Forever With You",
      image: "Bunny 🐰🫠/Screenshot_20260111_233402.jpg",
      images: [
        "Bunny 🐰🫠/Screenshot_20260111_233402.jpg",
        "Bunny 🐰🫠/Screenshot_20260111_233403.jpg",
        "Bunny 🐰🫠/Screenshot_20260106_134951.jpg"
      ],
      likes: 2500
    },
    {
      id: 9,
      type: "image",
      title: "Our Beautiful Story 📖",
      date: "Every Single Day",
      image: "Bunny 🐰🫠/Screenshot_20251215_214740.jpg",
      images: [
        "Bunny 🐰🫠/Screenshot_20251215_214740.jpg",
        "Bunny 🐰🫠/Screenshot_20251029_190841.jpg",
        "Bunny 🐰🫠/Screenshot_20251019_003608.jpg"
      ],
      likes: 3100
    }
  ]
};

// Load saved config or fall back to default
let APP_CONFIG = loadSavedConfig();

function loadSavedConfig() {
  try {
    localStorage.removeItem('birthday_app_config');
  } catch (e) {
    console.warn("Could not clear old config from localStorage:", e);
  }
  return { ...DEFAULT_CONFIG };
}

function saveConfig(newConfig) {
  try {
    APP_CONFIG = { ...APP_CONFIG, ...newConfig, partnerName: "Shaista", senderName: "Usama", passcode: "0910" };
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
    this.bgmAudio = null;
    this.noteInterval = null;
  }

  init() {
    if (!this.bgmAudio) {
      this.bgmAudio = document.getElementById('bgm-music');
      if (!this.bgmAudio) {
        this.bgmAudio = new Audio('W-Audio.mpeg');
        this.bgmAudio.loop = true;
      }
    }
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
    this.init();
    this.isMusicPlaying = true;
    const eqBars = document.getElementById('equalizer-bars');
    const audioLabel = document.getElementById('audio-label');
    if (eqBars) eqBars.classList.remove('paused');
    if (audioLabel) audioLabel.textContent = "Music: On";

    if (this.bgmAudio) {
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = this.isMuted ? 0 : 0.75;
      const playPromise = this.bgmAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log("Audio awaiting user interaction:", e);
        });
      }
    }

    this.startMusicNotesEmitter();
  }

  stopBGM() {
    this.isMusicPlaying = false;
    const eqBars = document.getElementById('equalizer-bars');
    const audioLabel = document.getElementById('audio-label');
    if (eqBars) eqBars.classList.add('paused');
    if (audioLabel) audioLabel.textContent = "Music: Off";

    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
    this.stopMusicNotesEmitter();
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.bgmAudio) {
      this.bgmAudio.volume = this.isMuted ? 0 : 0.75;
    }
  }

  startMusicNotesEmitter() {
    if (this.noteInterval) clearInterval(this.noteInterval);
    const soundControl = document.getElementById('sound-control');
    if (!soundControl) return;

    this.noteInterval = setInterval(() => {
      if (!this.isMusicPlaying) return;
      const notes = ['🎵', '🎶', '✨', '💖'];
      const note = document.createElement('span');
      note.className = 'floating-note select-none';
      note.textContent = notes[Math.floor(Math.random() * notes.length)];
      
      const rect = soundControl.getBoundingClientRect();
      note.style.left = `${rect.left + Math.random() * rect.width * 0.6}px`;
      note.style.top = `${rect.top - 5}px`;
      
      document.body.appendChild(note);
      setTimeout(() => note.remove(), 2200);
    }, 1400);
  }

  stopMusicNotesEmitter() {
    if (this.noteInterval) {
      clearInterval(this.noteInterval);
      this.noteInterval = null;
    }
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
  if (mid) mid();
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
      sounds.startBGM();
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
      if (!sounds.isMusicPlaying) sounds.startBGM();

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
    sounds.startBGM();
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

      // Smooth direct transition into Scene 2: Cute Lantern & Twinkle Lights (No flower screen)
      setTimeout(() => {
        switchScene('scene-1', 'scene-2', {
          onEnter: setupScene2
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
// 5. SCENE 2: CUTE LANTERN & TWINKLING FAIRY LIGHTS ("LAMP LITE TWINK")
// ----------------------------------------------------------------------------
function setupScene2() {
  const wrap = document.getElementById('pull-cord-wrapper');
  const stage = document.getElementById('lantern-stage');
  const txt = document.getElementById('pull-text');
  const lantern = document.getElementById('lamp-lantern');
  const wishes = document.getElementById('lantern-wishes');
  const gotoHeartsBtn = document.getElementById('goto-hearts-btn');

  let pulled = false, startY = 0, drag = false;

  if (lantern) lantern.classList.remove('lit');
  if (wishes) wishes.classList.add('hidden');
  if (txt) txt.style.opacity = '1';
  if (stage) stage.style.opacity = '1';

  const pull = () => {
    if (pulled) return;
    pulled = true;
    sounds.playPullString();

    // Cord pull and elastic spring bounce animation
    if (window.gsap && wrap) {
      gsap.timeline()
        .to(wrap, { y: 45, duration: 0.15 })
        .to(wrap, { y: 0, duration: 0.8, ease: 'elastic.out(1.2, 0.3)' });
    }

    // Light up lantern & fairy lights
    setTimeout(() => {
      sounds.playSuccessChime();
      if (lantern) lantern.classList.add('lit');
      if (txt) gsap.to(txt, { opacity: 0, duration: 0.4 });
      if (wishes) {
        wishes.classList.remove('hidden');
        if (window.gsap) {
          gsap.fromTo(wishes, 
            { opacity: 0, y: 20, scale: 0.9 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" }
          );
        }
      }
      if (window.confetti) {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.4 }
        });
      }
    }, 200);
  };

  if (wrap) {
    wrap.onclick = pull;
    wrap.onpointerdown = e => {
      startY = e.clientY;
      drag = true;
      wrap.setPointerCapture(e.pointerId);
    };
    wrap.onpointermove = e => {
      if (drag && e.clientY - startY > 35) {
        drag = false;
        pull();
      }
    };
    wrap.onpointerup = () => { drag = false; };
  }

  if (gotoHeartsBtn) {
    gotoHeartsBtn.onclick = () => {
      sounds.playClick();
      switchScene('scene-2', 'scene-hearts', { onEnter: setupSceneHearts });
    };
  }
}

// ----------------------------------------------------------------------------
// 5B. SCENE HEARTS: HEART MESSAGES CANVAS PARTICLE ANIMATION ENGINE
// ----------------------------------------------------------------------------
const PARTICLES_PER_HEART_BURST = 60;
const TRAIL_THROTTLE_MS = 25;
const HEART_MESSAGES_LIST = [
  "Thinking of You 💖",
  "I Love You, Shaista ✨",
  "My Love 🌹",
  "You're My Favorite Person 🫶",
  "My Beautiful Queen 👸",
  "Forever & Always 💕",
  "With Love, Usama 🫀",
  "Happy Birthday, My Girl 🎂"
];

let heartCanvasAnimationId = null;
let heartParticles = [];
let heartMessages = [];
let ambientBokeh = [];
let lastTrailTime = 0;
let heartMessageIndex = 0;

function setupSceneHearts() {
  const canvas = document.getElementById('heart-canvas');
  const toCakeBtn = document.getElementById('heart-to-cake-btn');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let dpr = window.devicePixelRatio || 1;
  let width = window.innerWidth;
  let height = window.innerHeight;

  heartParticles = [];
  heartMessages = [];
  ambientBokeh = [];

  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Subtle ambient background bokeh particles in blue, cyan, soft pink, violet
  const BOKEH_COLORS = [
    'rgba(56, 189, 248, ',  // blue
    'rgba(34, 211, 238, ',  // cyan
    'rgba(244, 114, 182, ', // soft pink
    'rgba(192, 132, 252, '  // violet
  ];
  for (let i = 0; i < 50; i++) {
    ambientBokeh.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 4 + 1.5,
      baseAlpha: Math.random() * 0.35 + 0.1,
      alpha: 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseOffset: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      colorPrefix: BOKEH_COLORS[Math.floor(Math.random() * BOKEH_COLORS.length)]
    });
  }

  function triggerHeartBurst(x, y) {
    const BURST_COLORS = [
      '#ff4b8b', '#ff69b4', '#f43f5e', '#fb7185',
      '#38bdf8', '#22d3ee', '#c084fc', '#fda4af', '#fef08a'
    ];
    for (let i = 0; i < PARTICLES_PER_HEART_BURST; i++) {
      const t = (i / PARTICLES_PER_HEART_BURST) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      
      const dist = Math.hypot(hx, hy) || 1;
      const dirX = hx / dist;
      const dirY = hy / dist;
      const speed = Math.random() * 2.8 + 1.2;
      const spread = (Math.random() - 0.5) * 0.35;
      
      const color = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
      const maxLife = Math.floor(Math.random() * 30 + 55);

      heartParticles.push({
        formsHeartShape: true,
        x: x + hx * 0.9,
        y: y + hy * 0.9,
        vx: (dirX + spread) * speed,
        vy: (dirY + spread) * speed,
        radius: Math.random() * 2.5 + 1.8,
        color: color,
        alpha: 1,
        maxLife: maxLife,
        life: maxLife,
        damping: 0.965,
        shadowBlur: Math.random() * 10 + 10
      });
    }
  }

  function spawnTrailHeartParticle(x, y) {
    const now = performance.now();
    if (now - lastTrailTime < TRAIL_THROTTLE_MS) return;
    lastTrailTime = now;

    const TRAIL_COLORS = ['#ff69b4', '#38bdf8', '#c084fc', '#f43f5e', '#a78bfa'];
    for (let i = 0; i < 2; i++) {
      const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
      const maxLife = Math.floor(Math.random() * 18 + 22);
      heartParticles.push({
        formsHeartShape: false,
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 1.1,
        vy: -Math.random() * 1.4 - 0.3,
        radius: Math.random() * 2 + 1.2,
        color: color,
        alpha: 0.85,
        maxLife: maxLife,
        life: maxLife,
        damping: 0.92,
        shadowBlur: 7
      });
    }
  }

  function addHeartMessage(x, y) {
    const text = HEART_MESSAGES_LIST[heartMessageIndex % HEART_MESSAGES_LIST.length];
    heartMessageIndex++;

    heartMessages.push({
      text: text,
      x: x,
      y: y - 10,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -1.2 - Math.random() * 0.5,
      alpha: 1,
      maxLife: 80,
      life: 80
    });
  }

  canvas.onpointerdown = (e) => {
    sounds.init();
    sounds.playHeartPop();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    triggerHeartBurst(x, y);
    addHeartMessage(x, y);
  };

  canvas.onpointermove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnTrailHeartParticle(x, y);
  };

  if (toCakeBtn) {
    toCakeBtn.onclick = (e) => {
      e.stopPropagation();
      sounds.playConfettiFanfare();
      if (heartCanvasAnimationId) {
        cancelAnimationFrame(heartCanvasAnimationId);
      }
      playFireTransition(() => {
        switchScene('scene-hearts', 'scene-3', { onEnter: setupScene3 });
      });
    };
  }

  let tick = 0;
  function animate() {
    tick++;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#06040a';
    ctx.fillRect(0, 0, width, height);

    const grad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, Math.max(width, height) * 0.65);
    grad.addColorStop(0, 'rgba(45, 15, 35, 0.45)');
    grad.addColorStop(0.5, 'rgba(15, 10, 25, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ambientBokeh.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < 0) b.x = width;
      if (b.x > width) b.x = 0;
      if (b.y < 0) b.y = height;
      if (b.y > height) b.y = 0;

      const a = b.baseAlpha + Math.sin(tick * b.pulseSpeed + b.pulseOffset) * 0.15;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${b.colorPrefix}${Math.max(0, Math.min(1, a))})`;
      ctx.shadowColor = `${b.colorPrefix}0.6)`;
      ctx.shadowBlur = 8;
      ctx.fill();
    });

    ctx.save();
    for (let i = heartParticles.length - 1; i >= 0; i--) {
      const p = heartParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= p.damping;
      p.vy *= p.damping;
      if (!p.formsHeartShape) {
        p.vy -= 0.035;
      }
      p.life--;
      p.alpha = Math.max(0, p.life / p.maxLife);

      if (p.life <= 0) {
        heartParticles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.shadowBlur;
      ctx.fill();
    }
    ctx.restore();

    ctx.save();
    ctx.font = '600 18px "Dancing Script", "Quicksand", cursive, sans-serif';
    ctx.textAlign = 'center';
    for (let i = heartMessages.length - 1; i >= 0; i--) {
      const m = heartMessages[i];
      m.x += m.vx;
      m.y += m.vy;
      m.life--;
      m.alpha = Math.max(0, m.life / m.maxLife);

      if (m.life <= 0) {
        heartMessages.splice(i, 1);
        continue;
      }

      ctx.shadowColor = `rgba(244, 63, 94, ${m.alpha * 0.9})`;
      ctx.shadowBlur = 12;
      ctx.fillStyle = `rgba(255, 240, 245, ${m.alpha})`;
      ctx.fillText(m.text, m.x, m.y);
    }
    ctx.restore();

    heartCanvasAnimationId = requestAnimationFrame(animate);
  }

  cancelAnimationFrame(heartCanvasAnimationId);
  heartCanvasAnimationId = requestAnimationFrame(animate);
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
      switchScene('scene-4', 'scene-5', { onEnter: setupScene5 });
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

let modalSlideIndex = 0;
let autoSwapTimer = null;

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
    
    if (mem.type === 'video') {
      // 3 video cards that play continuously until page is closed
      card.innerHTML = `
        <video src="${encodeURI(mem.video)}" autoplay loop muted playsinline class="w-full h-full object-cover pointer-events-none"></video>
        <div class="video-card-badge">
          <span>▶ Video</span>
        </div>
      `;
      // Ensure video plays continuously
      const v = card.querySelector('video');
      if (v) {
        v.play().catch(() => {});
      }
    } else {
      card.innerHTML = `
        <img src="${encodeURI(mem.image)}" alt="${mem.title}" class="w-full h-full object-cover">
        <div class="photo-card-badge">
          <span>3 Photos 📷</span>
        </div>
      `;
    }

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
  const slidePrevBtn = document.getElementById('modal-slide-prev');
  const slideNextBtn = document.getElementById('modal-slide-next');
  const slideDots = document.querySelectorAll('.slide-dot');
  const thumbItems = document.querySelectorAll('.thumb-item');

  function closeModal() {
    sounds.playClick();
    if (autoSwapTimer) clearInterval(autoSwapTimer);
    const video = document.getElementById('modal-video');
    if (video) video.pause();
    if (modal) modal.classList.add('hidden');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Next / Prev Memory Navigation
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

  // Slide navigation within the single photo modal (3 photos)
  if (slidePrevBtn) {
    slidePrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playClick();
      stepSlide(-1);
    });
  }

  if (slideNextBtn) {
    slideNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playClick();
      stepSlide(1);
    });
  }

  slideDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playClick();
      const target = parseInt(dot.dataset.slide, 10);
      setSlide(target);
    });
  });

  thumbItems.forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playClick();
      const target = parseInt(thumb.dataset.thumb, 10);
      setSlide(target);
    });
  });

  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      sounds.playHeartPop();
      const mem = APP_CONFIG.memories[activeModalMemoryIndex];
      if (mem) {
        mem.likes = (mem.likes || 1000) + 1;
        const likeCountEl = document.getElementById('modal-like-count');
        if (likeCountEl) likeCountEl.textContent = `${mem.likes.toLocaleString()} Likes`;
        likeBtn.innerHTML = '♥';
        likeBtn.classList.add('text-rose-400');
        spawnKissHearts();
      }
    });
  }
}

function openPhotoModal(index) {
  activeModalMemoryIndex = index;
  modalSlideIndex = 0;
  const modal = document.getElementById('photo-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  updatePhotoModalContent();
}

function stepSlide(dir) {
  const mem = APP_CONFIG.memories[activeModalMemoryIndex];
  if (!mem || mem.type === 'video' || !mem.images) return;
  modalSlideIndex = (modalSlideIndex + dir + mem.images.length) % mem.images.length;
  applySlide(modalSlideIndex);
  restartAutoSwap();
}

function setSlide(idx) {
  const mem = APP_CONFIG.memories[activeModalMemoryIndex];
  if (!mem || mem.type === 'video' || !mem.images) return;
  modalSlideIndex = idx % mem.images.length;
  applySlide(modalSlideIndex);
  restartAutoSwap();
}

function restartAutoSwap() {
  if (autoSwapTimer) clearInterval(autoSwapTimer);
  const mem = APP_CONFIG.memories[activeModalMemoryIndex];
  if (mem && mem.type === 'image' && mem.images && mem.images.length > 1) {
    autoSwapTimer = setInterval(() => {
      modalSlideIndex = (modalSlideIndex + 1) % mem.images.length;
      applySlide(modalSlideIndex);
    }, 2800);
  }
}

function applySlide(idx) {
  const mem = APP_CONFIG.memories[activeModalMemoryIndex];
  if (!mem || !mem.images) return;

  const currentSrc = mem.images[idx];
  const imgEl = document.getElementById('modal-img');
  const downloadEl = document.getElementById('modal-download');
  const dots = document.querySelectorAll('.slide-dot');
  const thumbs = document.querySelectorAll('.thumb-item');

  if (imgEl) {
    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = encodeURI(currentSrc);
      imgEl.style.opacity = '1';
    }, 180);
  }

  if (downloadEl) {
    downloadEl.href = encodeURI(currentSrc);
    downloadEl.download = `${mem.title.replace(/\s+/g, '_')}_photo_${idx + 1}.jpeg`;
  }

  dots.forEach((dot, i) => {
    if (i === idx) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  thumbs.forEach((thumb, i) => {
    if (i === idx) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

function updatePhotoModalContent() {
  if (autoSwapTimer) clearInterval(autoSwapTimer);

  const mem = APP_CONFIG.memories[activeModalMemoryIndex];
  if (!mem) return;

  const imgContainer = document.getElementById('modal-img-container');
  const videoContainer = document.getElementById('modal-video-container');
  const thumbnailsContainer = document.getElementById('modal-thumbnails');
  const videoEl = document.getElementById('modal-video');
  const titleEl = document.getElementById('modal-title');
  const dateEl = document.getElementById('modal-date');
  const likeCountEl = document.getElementById('modal-like-count');
  const downloadEl = document.getElementById('modal-download');
  const thumbImgs = document.querySelectorAll('.thumb-img');

  if (titleEl) titleEl.textContent = mem.title;
  if (dateEl) dateEl.textContent = mem.date;
  if (likeCountEl) likeCountEl.textContent = `${mem.likes.toLocaleString()} Likes`;

  if (mem.type === 'video') {
    // Mode: Video Playback in Lightbox
    if (imgContainer) imgContainer.classList.add('hidden');
    if (thumbnailsContainer) thumbnailsContainer.classList.add('hidden');
    if (videoContainer) videoContainer.classList.remove('hidden');

    if (videoEl) {
      videoEl.src = encodeURI(mem.video);
      videoEl.play().catch(() => {});
    }

    if (downloadEl) {
      downloadEl.href = encodeURI(mem.video);
      downloadEl.download = `${mem.title.replace(/\s+/g, '_')}.mp4`;
    }
  } else {
    // Mode: 3 Images in Single Photo Modal with Auto-Swap
    if (videoEl) videoEl.pause();
    if (videoContainer) videoContainer.classList.add('hidden');
    if (imgContainer) imgContainer.classList.remove('hidden');
    if (thumbnailsContainer) thumbnailsContainer.classList.remove('hidden');

    // Populate thumbnail strip
    if (mem.images) {
      mem.images.forEach((src, i) => {
        if (thumbImgs[i]) thumbImgs[i].src = encodeURI(src);
      });
    }

    modalSlideIndex = 0;
    applySlide(modalSlideIndex);
    restartAutoSwap();
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
  if (recipientTitle) recipientTitle.textContent = `Happy Birthday ${APP_CONFIG.partnerName || 'Shaista'}!`;

  const senderSubtitle = document.getElementById('sender-subtitle');
  if (senderSubtitle) senderSubtitle.textContent = `With Love from ${APP_CONFIG.senderName || 'Usama'} 💖`;

  const letterGreeting = document.getElementById('letter-greeting');
  if (letterGreeting) letterGreeting.textContent = `Happy Birthday ${APP_CONFIG.partnerName || 'Shaista'} ✨`;

  const passcodeHint = document.getElementById('passcode-hint');
  if (passcodeHint) passcodeHint.textContent = APP_CONFIG.passcodeHint;

  const hintBubbleText = document.getElementById('hint-bubble-text');
  if (hintBubbleText) hintBubbleText.textContent = `✨ Passcode: ${APP_CONFIG.passcode}`;
}

function setupInteractiveClickSparkles() {
  const emojis = ['💖', '✨', '🌸', '💕', '⭐'];
  window.addEventListener('pointerdown', (e) => {
    // Avoid spawning when clicking inputs/buttons
    if (e.target && (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT')) return;
    for (let i = 0; i < 4; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'click-sparkle text-sm select-none pointer-events-none';
      sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      
      const offsetX = (Math.random() - 0.5) * 16;
      const offsetY = (Math.random() - 0.5) * 16;
      sparkle.style.left = `${e.clientX + offsetX}px`;
      sparkle.style.top = `${e.clientY + offsetY}px`;

      const tx = (Math.random() - 0.5) * 60;
      const ty = -(Math.random() * 50 + 30);
      const rot = (Math.random() - 0.5) * 90;
      sparkle.style.setProperty('--tx', `${tx}px`);
      sparkle.style.setProperty('--ty', `${ty}px`);
      sparkle.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1200);
    }
  });
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
      sounds.setMuted(sounds.isMuted);
      sounds.playClick();
      toggleSfxBtn.innerHTML = sounds.isMuted 
        ? `<i data-lucide="volume-x" class="w-4 h-4 text-slate-400"></i>`
        : `<i data-lucide="volume-2" class="w-4 h-4"></i>`;
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // Graceful user interaction starts background audio on continuous repeat
  const startAudioOnGesture = () => {
    sounds.init();
    if (!sounds.isMusicPlaying) {
      sounds.startBGM();
    }
  };
  window.addEventListener('click', startAudioOnGesture, { capture: true, once: true });
  window.addEventListener('touchstart', startAudioOnGesture, { capture: true, once: true });
  window.addEventListener('pointerdown', startAudioOnGesture, { capture: true, once: true });
  window.addEventListener('keydown', startAudioOnGesture, { capture: true, once: true });

  // Attempt to play BGM immediately if browser policy allows
  sounds.startBGM();

  spawnAmbientHearts();
  setupInteractiveClickSparkles();
  applyConfigToDOM();

  // Start Scene 1
  setupScene1();
  setSceneProgress(1);
});
