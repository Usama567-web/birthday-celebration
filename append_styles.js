const fs = require('fs');

const cssAdditions = `
/* ========================================================================= */
/* UNIVERSE CONTROLS & 53 PHOTOS GRID (Scene 5 Enhancements)                 */
/* ========================================================================= */
.universe-tab-btn {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  color: #fbcfe8;
  background: transparent;
  border: 1px solid transparent;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  user-select: none;
}

.universe-tab-btn:hover {
  background: rgba(244, 63, 94, 0.25);
  color: #ffffff;
  transform: translateY(-1px);
}

.universe-tab-btn.active {
  background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%);
  color: #ffffff;
  box-shadow: 0 0 14px rgba(244, 63, 94, 0.65);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Full 53 Photos Grid */
#grid-gallery-53 {
  animation: fadeInGrid 0.5s cubic-bezier(0.2, 0, 0.2, 1) forwards;
}

@keyframes fadeInGrid {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.grid-photo-card {
  position: relative;
  border-radius: 18px;
  background: #18141f;
  border: 1.5px solid rgba(244, 63, 94, 0.25);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.55), 0 0 15px rgba(244, 63, 94, 0.15);
  transition: all 0.32s cubic-bezier(0.2, 0, 0.2, 1);
  cursor: pointer;
  aspect-ratio: 3/4;
  backdrop-filter: blur(8px);
}

.grid-photo-card:hover {
  transform: translateY(-6px) scale(1.03);
  border-color: rgba(244, 63, 94, 0.85);
  box-shadow: 0 18px 40px rgba(244, 63, 94, 0.45), 0 0 25px rgba(236, 72, 153, 0.35);
  z-index: 25;
}

.grid-photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.2, 0, 0.2, 1);
}

.grid-photo-card:hover img {
  transform: scale(1.08);
}

.grid-photo-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  font-size: 10px;
  font-weight: 700;
  color: #fbcfe8;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 6px rgba(0,0,0,0.5);
  pointer-events: none;
  z-index: 5;
}

.grid-dl-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(244, 63, 94, 0.92);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 10;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.grid-dl-btn:hover {
  background: #e11d48;
  transform: scale(1.18);
  box-shadow: 0 0 16px rgba(244, 63, 94, 0.85);
}

.grid-dl-btn:active {
  transform: scale(0.95);
}

/* Toast Notification Styling */
#toast-notify {
  font-family: 'Quicksand', sans-serif;
  letter-spacing: 0.02em;
}

#toast-notify.show {
  opacity: 1 !important;
  transform: translate(-50%, 0) !important;
}

/* Space Card Cosmic Aurora Aura */
.space-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65), 0 0 22px rgba(244, 63, 94, 0.25);
}

.space-card::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(244, 63, 94, 0.4), rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.25), rgba(244, 63, 94, 0.4));
  z-index: -1;
  opacity: 0.7;
  filter: blur(4px);
  transition: opacity 0.3s ease;
}

.space-card:hover::after {
  opacity: 1;
  filter: blur(8px);
}

/* ========================================================================= */
/* COMPREHENSIVE RESPONSIVE DESIGN (ALL MOBILE, TABLET & DESKTOP SCREENS)    */
/* ========================================================================= */

/* General Mobile Safe Sizing */
html, body {
  overflow-x: hidden;
  max-width: 100vw;
  -webkit-text-size-adjust: 100%;
  touch-action: manipulation;
}

/* Mobile Screens <= 640px */
@media (max-width: 640px) {
  /* Header Sound Pill */
  #sound-control {
    top: 12px;
    right: 12px;
    padding: 4px 10px;
    gap: 6px;
  }
  #sound-control span {
    font-size: 11px;
  }

  /* Scene 1: Cover Card */
  .cover-card {
    width: min(340px, 94vw) !important;
    padding: 10px 10px 16px 10px !important;
    margin: 0 auto;
  }
  .cover-photo-wrapper {
    max-height: clamp(200px, 42vh, 320px);
  }

  /* Scene 5: Space Cards Responsive Bounds */
  .space-card {
    width: clamp(92px, 27vw, 125px) !important;
    max-width: 125px !important;
    border-radius: 10px;
  }
  .space-card-badge {
    font-size: 8px;
    padding: 1px 5px;
    bottom: 4px;
    left: 4px;
  }

  /* Lightbox Modal */
  #photo-modal {
    padding: 8px !important;
  }
  #photo-modal > div {
    max-width: 95vw !important;
    max-height: 94dvh !important;
    padding: 10px !important;
    border-radius: 20px !important;
  }
  #modal-img-container {
    max-height: 48vh !important;
  }
}

/* Compact Mobile Screens <= 480px (e.g. iPhone, Pixel, Galaxy) */
@media (max-width: 480px) {
  /* Alphanumeric Keypad: perfectly scales 10 keys per row */
  .keypad-wrapper {
    padding: 8px 6px !important;
  }
  .key-btn {
    height: 31px;
    min-width: 19px;
    font-size: 0.74rem;
    padding: 0 1px;
    border-radius: 6px;
  }
  .key-btn.action-key {
    font-size: 0.68rem;
  }
  .key-btn.space-key {
    font-size: 0.72rem;
  }
  .key-btn.unlock-btn {
    font-size: 0.72rem;
    padding: 0 8px;
  }
  #password-dots {
    height: 28px;
    font-size: 1.1rem;
    letter-spacing: 0.25em;
  }

  /* Cake Scene */
  #cake-interactive-box img {
    max-width: 75vw;
  }

  /* Letter Scene */
  .envelope {
    width: min(260px, 86vw);
    height: 165px;
  }
  .letter-card {
    width: 94vw;
    padding: 1.2rem 1rem;
  }
  #typewriter-body {
    font-size: 1.15rem;
  }
}

/* Ultra-compact Phones <= 375px (e.g. iPhone SE, Galaxy Mini) */
@media (max-width: 375px) {
  .key-btn {
    height: 28px;
    min-width: 16px;
    font-size: 0.68rem;
    border-radius: 5px;
  }
  .key-btn.action-key {
    font-size: 0.62rem;
  }
  .key-btn.space-key {
    font-size: 0.65rem;
  }
  .key-btn.unlock-btn {
    font-size: 0.68rem;
    padding: 0 6px;
  }
  .universe-tab-btn {
    padding: 3px 8px;
    font-size: 10px;
  }
}

/* Short Screens or Landscape Mobile Viewports (max-height: 650px) */
@media (max-height: 650px) {
  #lantern-stage {
    margin-top: 0.5rem !important;
    padding-top: 0.5rem !important;
  }
  .chain {
    height: 70px !important;
  }
  .lantern {
    width: 76px !important;
    height: 76px !important;
  }
  .lantern .eye { top: 34px !important; }
  .lantern .cheek { top: 42px !important; }
  .lantern .smile { top: 44px !important; }

  #modal-img-container {
    max-height: 38vh !important;
  }
  #modal-thumbnails {
    display: none !important;
  }
  .letter-paper-content {
    max-height: 36vh !important;
  }
}
`;

fs.appendFileSync('style.css', cssAdditions, 'utf8');
console.log('style.css updated with responsive & universe enhancements!');
