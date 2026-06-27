# Caffy — Marketing Website

Premium, Apple-style landing site for the **Caffy** iOS app
([App Store](https://apps.apple.com/tr/app/caffy-caffeine-sleep/id6763036774)).

Standalone project — built with **Vite + React + TypeScript + Tailwind +
Framer Motion**. No backend.

## Features
- Interactive caffeine **metabolism calculator** (real half-life + 45-min
  absorption model, draggable drinks & bedtime, live sleep verdict)
- **5 languages** (EN · TR · DE · ES · JA) with live switching
- **Dark / light** theme (system default, toggle, `?theme=dark|light` override)
- Real app screenshots in a realistic iPhone frame + Privacy & Support pages
- Fully responsive, reduced-motion aware

## Develop
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build
```bash
npm run build      # type-checks then outputs to ./dist
npm run preview
```

## App screenshots
Live in [`public/screens/`](public/screens/). The site maps these files:
- `dashboard.jpg` → hero
- `metabolism.jpg`, `sleep.jpg`, `insights-detox.jpg`,
  `insigts-ai-premium.jpg`, `log-week.jpg` → gallery

Replace any of them (same filename) and it updates automatically. A missing
file falls back to a rendered mock — never a broken image.

## Deploy to GitHub Pages
`.github/workflows/deploy.yml` builds and deploys `./dist` on every push to
`main`. Enable once: **Settings → Pages → Source: GitHub Actions**.
Works from a project subpath (`user.github.io/<repo>/`) because
`vite.config.ts` uses `base: "./"` with hash-based routing.

## Edit content
- Copy/translations: `src/i18n/{en,tr,de,es,ja}.ts`
- Brand colors: `tailwind.config.js`
- App Store link: `APP_STORE_URL` in `src/components/ui.tsx`
- Support / privacy email: replace `[YOUR_EMAIL]` in the i18n files
