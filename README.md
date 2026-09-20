# 20 · 20 · 20 — Eye Relaxation & Digital Wellness PWA

A modern, responsive, and privacy-first **Progressive Web App (PWA)** designed to relieve digital eye strain and computer vision syndrome using the clinically recognized **20-20-20 Rule**.

> **The 20-20-20 Rule**: Every **20 minutes** spent looking at a screen, take a **20-second break** and gaze at an object at least **20 feet (6 meters)** away to relax your eyes' ciliary focusing muscles.

---

## ✨ Key Features

- **⏱️ 20-20-20 Smart Timer**:
  - 20-minute focus session paired with a 20-second eye relaxation break.
  - Drift-free `Date.now()` timestamp delta calculation — stays accurate even when the browser tab is hidden or minimized.
  - Instant **"Take 20s Break Now"** button to start an eye relaxation break at any moment.
  - Pause, Resume, Reset, and Skip Break controls.

- **🌐 Subpath & Reverse-Proxy Ready**:
  - Uses strictly relative asset paths (`./`) and service worker scoping (`./`).
  - Deploy at domain root (`https://app.example.com/`) or under any arbitrary subpath (`https://example.com/20-20-20/` or `https://example.com/tools/eye/`) without breaking asset resolution, manifest, or service worker registration.

- **🌍 Multi-Language (i18n)**:
  - Full native translations for **English (EN)**, **German (DE)**, **French (FR)**, and **Italian (IT)**.
  - Instant language switcher in the header with persistent `localStorage` preference.

- **🔔 Dual Reminder System**:
  - **In-App Modal Popup**: Accessible HTML5 `<dialog>` with backdrop blur, circular distance visualizer (`20 FEET / 6 METERS`), active 20-second countdown, and rotating eye-care tips (blinking, breathing, relaxing facial muscles).
  - **Desktop Notifications**: Standard Web Notifications API for background alerts when working in other tabs or apps.

- **🎵 Procedural Audio Chime**:
  - Pure Web Audio API synthesized singing bowl / meditation chime.
  - Zero external audio files required — 100% offline, zero network latency.
  - Adjustable volume slider and mute toggle in preferences.

- **🏢 Business Hours & Lunch Break Scheduling**:
  - **Start on Your Own Condition**: The timer does not automatically tick on page load; you choose when you sit down and begin.
  - **Lunch Break (11:30 – 13:00)**: Detects lunch hours, pauses active focus tracking, and displays a friendly notice banner to encourage screen-free meals (with a *"Work Anyway"* override).
  - **End of Workday (After 18:00)**: Automatically stops tracking in the evening with a *"Workday Completed"* banner to help you disconnect (with an option to start extra sessions).

- **🎨 Tailored Design System**:
  - Built strictly according to [design_system_ui_architecture.md](design_system_ui_architecture.md).
  - **Dark Mode by default** (`#091b2b`) with a seamless **Light Mode** toggle (`#f4f6f8`).
  - Accessible contrast, fluid typography, smooth SVG progress ring, and responsive layout for mobile and desktop.

- **📱 Offline PWA Support**:
  - Installable to desktop, iOS, and Android home screens.
  - Cache-first service worker (`sw.js`) for full offline availability.

---

## 📁 Project Structure

```text
20-20-20/
├── index.html                     # Semantic HTML5 app structure and dialogs
├── styles.css                     # Design tokens, themes, responsive CSS
├── app.js                         # Core timer engine, state & schedule controller
├── i18n.js                        # Translation dictionary (EN, DE, FR, IT)
├── audio.js                       # Procedural Web Audio API chime synthesizer
├── sw.js                          # Offline caching Service Worker (relative scope)
├── manifest.webmanifest           # Subpath-ready PWA web manifest
├── icons/
│   ├── icon.svg                   # Scalable vector app icon
│   ├── icon-192.png               # 192x192 PWA icon
│   └── icon-512.png               # 512x512 PWA icon
├── design_system_ui_architecture.md # Design tokens and UI architecture spec
└── README.md                      # Project documentation
```

---

## 🚀 Quick Start (Local Development)

Because this application is built with standard Vanilla HTML/CSS/JS modules, no build steps or heavy toolchains are required.

### Using Python:
```bash
# Start a simple HTTP server in the repository directory
python3 -m http.server 8080
```
Open your browser at:
- `http://localhost:8080/`

### Using Node / npx:
```bash
npx -y serve .
```

---

## 🌐 Reverse Proxy Deployment Examples

Because all paths are relative (`./`), the app can be served behind reverse proxies under any subpath.

### Nginx Subpath Example (`/20-20-20/`)
```nginx
server {
    listen 80;
    server_name example.com;

    location /20-20-20/ {
        alias /var/www/20-20-20/;
        index index.html;
        try_files $uri $uri/ /20-20-20/index.html;
    }
}
```

### Caddy Subpath Example
```caddy
example.com {
    handle_path /20-20-20/* {
        root * /var/www/20-20-20
        file_server
    }
}
```

### Docker / Static Container
You can run it with any lightweight web server container:
```bash
docker run -d --name 20-20-20 -p 8080:80 -v $(pwd):/usr/share/nginx/html:ro nginx:alpine
```

---

## ⚙️ Customization & Settings

Click the **Settings (gear icon)** in the top right to customize:
- **Focus Interval**: default `20` minutes (adjustable from 1 to 120 min).
- **Break Duration**: default `20` seconds (adjustable from 5 to 300 sec).
- **Audio Chime**: toggle sound on/off and adjust volume.
- **Desktop Notifications**: request browser notification permissions or test notifications.
- **Business Hours Enforcement**: toggle auto-stop after 18:00.
- **Lunch Break Enforcement**: toggle auto-pause between 11:30 and 13:00.
- **Demo / Fast Testing Mode**: temporarily switch to 10s focus / 5s break for instant demonstrations.

---

## 💡 Why the 20-20-20 Rule Matters

Staring continuously at digital screens locks your eye lenses into near-focus mode, leading to:
- Eyestrain and fatigue (asthenopia)
- Headaches
- Blurred vision
- Dry, irritated eyes (reduced blink rate)

Looking at a distant object (at least 20 feet / 6 meters away) allows the **ciliary muscles** inside your eyes to completely relax, resetting accommodation and encouraging natural blink frequency.

---

## 📄 License

MIT License. Free for personal, commercial, and educational use.
