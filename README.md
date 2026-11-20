# ✨ Cinematic Birthday Web Application 💖 (For Shaista from Usama)

A romantic, interactive, and personalized birthday celebration website for Shaista, crafted with love by Usama with custom animations, continuous background music (`W-Audio.mpeg`), and starry memory gallery.

---

## 🎬 Interactive Storyline & Features (5 Sequential Scenes)

1. **Scene 1: Cover & Secure Alphanumeric Password Lock**
   - Polaroid-style couple photo frame with realistic tilt, subtle ribbon bow, and washi tape details.
   - **5s Auto-Swapping Cover Photos:** Cycles through the personal photos from `s` every 5 seconds with a smooth Ken Burns scale and crossfade animation, complete with dot indicators.
   - Smooth 3D card flip when tapped to reveal a frosted glassmorphic alphanumeric keypad (letters, numbers, space, shift, and unlock button).
   - Secret Password: **`Bunny 22 11`** (with error shake animation and hint toggle).
   - Transitions directly into the Interactive Heart Messages Canvas.

2. **Scene 2: Cute Lamp & Twinkle Lights with Custom Portrait Background**
   - Full-screen couple portrait background (`s u/WhatsApp Image 2026-11-20 at 2.30.27 PM (1).jpeg`).
   - Twinkling overhead fairy lights and cute interactive hanging lamp.
   - Dragging the string cord turns on the glowing lamp and reveals the 🔥 action button.

3. **Scene 3: Swipe / Slice the Cake Feature**
   - A multi-tiered strawberry shortcake with cream layers and animated flickering candles.
   - Interactive knife slicing: swipe horizontally or diagonally across the cake with your finger or mouse (with glowing silver trail).
   - Cake smoothly splits into two halves, accompanied by a realistic slice whoosh and a colorful multi-burst confetti cannon explosion.

4. **Scene 4: Heartfelt Typed Letter Modal**
   - Nostalgic wax seal opening animation.
   - Romantic letter for Shaista from Usama with typewriter effect.
   - Proceeding re-activates Scene 2 outro: pulling the string cord shuts off the lights into a dark cosmos.

5. **Scene 5: Starry Space Gallery (All 53 Memories from Bunny 🐰🫠)**
   - Complete collection of **53 photos** mapped across 18 floating space cards.
   - **Dynamic Auto-Swapping:** Each space card continuously auto-swaps its photos every 4.5s–6.5s with smooth crossfade and shimmer.
   - **Interactive 3D Parallax Tilt:** Moving the cursor over any card tilts and scales it in 3D perspective with glowing rose borders.
   - **Full Lightbox Modal:** Tap any card to view photos in high resolution with auto-swap, thumbnails, like button, and card navigation.
   - A 3D realistic vintage envelope sealed with a red wax heart.
   - Tapping the wax seal cracks it open, folds the top flap up in 3D perspective, and unfurls an authentic parchment love letter.
   - Smooth typewriter effect typing out heartfelt birthday wishes with soft mechanical key clicks and a blinking calligraphy pen cursor.
   - "Show Entire Letter" quick-skip button.

5. **Scene 5: Cinematic Starry Night Photo Gallery**
   - Seamless transition into a deep cosmic midnight sky (`#060913`) rendered on HTML5 Canvas with twinkling stars and animated shooting stars (meteors).
   - Floating polaroid memory cards with realistic washi tape and captions.
   - Tapping any polaroid opens a luxury Lightbox Modal with the high-resolution photo, romantic story note, like button (with floating heart bursts and counter), and instant download button.
   - Interactive buttons: "Send Birthday Love 💋", "Make a Wish 🌠" (spawns custom shooting star), and "Replay From Start ↺".

6. **🎵 Background Audio Song (`W-Audio.mpeg` on Continuous Repeat)**
   - Continuous romantic background song playing `W-Audio.mpeg` on an infinite loop.
   - Interactive audio control pill at top-right with live equalizer bars, floating musical notes (`🎵`, `🎶`, `💖`), and mute toggle.
   - Zero-latency tactile sound effects (card flips, keypad beeps, chime, wax seal crack, typewriter) synthesized natively.

---

## 🚀 How to Deploy to GitHub Pages (Get a Free Live Link)

You can host this website completely free on **GitHub Pages** in under 3 minutes:

### Step 1: Initialize Git and Commit Your Files
Open your terminal (PowerShell, Command Prompt, or Git Bash) inside this project folder:
```bash
git init
git add .
git commit -m "Initial commit: Cinematic Birthday App"
```

### Step 2: Create a New GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Enter a repository name (e.g., `happy-birthday` or `birthday-love`).
3. Set the repository to **Public**.
4. Leave "Add a README file" **unchecked**.
5. Click **Create repository**.

### Step 3: Link and Push to GitHub
Copy the commands shown on GitHub under **"…or push an existing repository from the command line"**:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```
*(Replace `<YOUR-USERNAME>` and `<YOUR-REPO-NAME>` with your actual GitHub username and repository name).*

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (tab at the top right).
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
5. Under **Branch**, select `main` and folder `/(root)`, then click **Save**.
6. Wait 1 to 2 minutes. Refresh the page, and GitHub will provide your live public URL:
   ```
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/
   ```
7. Send this link to your partner! 💖

---

## 🎨 How to Customize the Content

### Option A: Using the Live Customizer (No Coding Required!)
1. Open the website.
2. In **Scene 5**, click the **⚙️ (Settings)** button at the bottom.
3. Edit the **Partner's Name**, **Passcode**, **Passcode Hint**, and **Love Letter**.
4. Click **Save & Apply Live ✨** (changes are saved to local browser storage).

### Option B: Editing `script.js` directly
Open [`script.js`](file:///c:/Users/hp/Desktop/New%20folder%20%282%29/script.js) and customize the `DEFAULT_CONFIG` object at the very top:
- Change `partnerName` to your partner's nickname or name.
- Change `passcode` (e.g. your anniversary date `0418`, or birthdate).
- Edit `letterBody` with your personal heartfelt letter.
- Replace images in the `assets/` folder (`cover.jpg`, `memory-1.jpg`, `memory-2.jpg`, `memory-3.jpg`) with your own personal photos (keep the filenames the same for automatic pickup).

---

## 📁 File Structure
```
├── index.html       # Semantic HTML5 with 5 scenes, Tailwind CDN & Lucide icons
├── style.css        # 3D card flips, glassmorphism, cake slice, polaroid effects
├── script.js        # Scene state machine, Web Audio synth, touch gestures & canvas
├── README.md        # Deployment and customization documentation
├── W-Audio.mpeg     # Background romantic song (continuous repeat loop)
├── Bunny 🐰🫠/        # Personal photos & memories
└── assets/          # Generated romantic polaroid and memory photos
    ├── cover-1.jpg  # Main cover picture
    ├── cover.jpg
    ├── cake-pixel.png
    └── W-Audio.mpeg # Mirrored audio asset
```
