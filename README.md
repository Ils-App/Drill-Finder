# Drill Finder

A practice-drill library for coaches: 5664 drills across 72 sports, filterable by sport, age group, difficulty, intensity, and duration. Built as an installable Progressive Web App (PWA) — it works offline and can be added to a phone's home screen like a native app.

## Run it locally

You'll need [Node.js](https://nodejs.org) (version 18 or newer) installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Deploy to Vercel (free, ~10 minutes)

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Create a new repository (e.g. `drill-finder`) and upload this entire folder. Easiest way without command-line Git: on the new repo page, click "uploading an existing file" and drag everything in **except the `node_modules` folder** (if present).
3. Create a free account at [vercel.com](https://vercel.com) and sign in with GitHub.
4. Click **Add New → Project**, pick your `drill-finder` repo, and click **Deploy**. Vercel auto-detects Vite — no settings needed.
5. In about a minute you'll have a live URL like `drill-finder.vercel.app`.

### Custom domain (optional, ~$12/year)

Buy a domain at Namecheap or Cloudflare, then in Vercel go to your project → **Settings → Domains** and follow the prompts. Vercel handles HTTPS automatically.

## What makes it installable

- `public/manifest.webmanifest` — tells phones the app's name, icon, and colors
- `public/sw.js` — a service worker that caches the app for offline use
- On iPhone: open the site in Safari → Share → **Add to Home Screen**
- On Android: Chrome shows an "Install app" prompt automatically

## Project structure

```
drill-finder/
├── index.html              # HTML shell + SEO/social meta tags
├── package.json            # dependencies and scripts
├── vite.config.js          # build config
├── public/
│   ├── manifest.webmanifest
│   ├── sw.js               # offline caching
│   ├── icon-192.png        # app icons (replace with your own branding)
│   └── icon-512.png
└── src/
    ├── main.jsx            # entry point + service worker registration
    └── App.jsx             # the entire app: drill data, filters, UI
```

## Editing drills

All drill data lives at the top of `src/App.jsx` in the `DRILLS` array. Each drill is one object — copy an existing line, change the fields, and redeploy (Vercel redeploys automatically on every GitHub commit).

## Next steps when you're ready

- **App stores:** wrap this project with [Capacitor](https://capacitorjs.com) to produce iOS/Android builds
- **Analytics:** enable Vercel Analytics in one click from your Vercel dashboard
- **Icons:** replace the placeholder icons in `public/` with professional ones before an App Store submission
