# App screenshots

These files are wired into the site automatically — replace any of them with
the same filename and it updates. A missing file falls back to a rendered mock
(never a broken image).

| File                        | Where it shows      |
| --------------------------- | ------------------- |
| `dashboard.jpg`             | Hero (top of page)  |
| `metabolism.jpg`            | Gallery — slot 1    |
| `sleep.jpg`                 | Gallery — slot 2    |
| `insights-detox.jpg`        | Gallery — slot 3    |
| `insigts-ai-premium.jpg`    | Gallery — slot 4    |
| `log-week.jpg`              | Gallery — slot 5    |

The other screenshots in this folder are unused spares — feel free to swap any
of them into the slots above by renaming.

## Notes
- The iPhone frame shows the **top** of each screenshot (`object-top`), so tall
  scroll-captures still look right. For a perfectly framed shot, use a single
  device-height screenshot (≈ 1170 × 2532).
- To change which file maps to which slot, edit `src/components/Hero.tsx`
  (hero) and `src/components/Gallery.tsx` (gallery).
