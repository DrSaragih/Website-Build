# 23 Paskal — A place for every story

A responsive, multi-page mall website concept with an immersive four-layer introduction and an editorial home page.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Build: `npm run build`. Inspect production locally: `npm run preview`. Vite builds five HTML entry points; deploy the complete `dist` directory to a static host.

## Pages and features

- `/`: Four photographic parallax layers, a welcome story, dining/fashion/community experience cards, a garden scene, and practical visit links.
- `/mall.html`: Mall history, an immersive photographic journey, photo stories, brand logos, gallery, FAQ and Google Maps.
- `/directory.html`: GF / Lantai 1 / Lantai 2 directory with eight units per floor, category filters, tenant search, synchronized list/map selection, and an enlarged floor-plan dialog.
- `/whats-next.html`: Concept events, event details, photo gallery, FAQ and visitor information.
- `/shopping-program.html`: Concept shopping program, details, photo gallery, FAQ and visitor information.

Each chapter gallery supports a native image lightbox, previous/next buttons, wrapping arrow-key navigation and Escape. Normal links support browser back/forward and opening new tabs. Supported browsers add native cross-document view transitions; other browsers keep standard navigation.

Chapter headers provide cross-floor search and saved places. Saved places stay in localStorage on the current browser, without an account; unavailable storage falls back to the session. Deep links such as `/directory.html?floor=1&unit=102#directory` highlight a unit. `?category=dining` or `?category=fashion` opens a filtered directory. Unknown parameters are ignored.

Google Maps is embedded on chapter pages, with location/directions links and copy-address controls. No API key is needed. External map content requires Internet access and was not verified in this environment. Hours are deliberately not invented.

## Motion and implementation

- `src/layers.js`: Continuous hero card transforms, time-based damping, subtle pointer motion, active-layer navigation.
- `src/enhancements.js`: History, logo rows, floor plans and enlarged map.
- `src/directory-data.js`: Dummy floor/tenant assignments. Map geometry lives in `enhancements.js`.
- `src/experience.js`: Chapter imagery, immersive mall story, damped background/foreground parallax, maps.
- `src/customer.js`: Tenant finder, saved places, FAQ, copy-address and URL selection.
- `src/editorial.js`: Editorial home content, category links, chapter galleries, reveal animations, and garden parallax.

Motion honors reduced-motion preferences; keyboard focus reveals animated content. Animation loops stop once settled. Logo rows have pause controls. Layout was checked at 1440, 1024, 768, 390 and 320 pixel widths.

## Assets and demo content

Eight images are served as optimized WebP, about 2.5 MB combined versus about 22 MB of PNG originals. PNG files are retained as source assets. Images include the atrium, exterior, retail corridor, garden, cafe, fashion, community music, and shopping scenes. All are AI-generated conceptual photography, **not real photographs of 23 Paskal or actual events**. Higgsfield and Magnific were unavailable; the available image-generation tool created the visuals.

Tenant names, floor positions, unit numbers and plans are user-authorized dummy data. Events and shopping benefits are concepts, not official offers. Historical copy includes a reference link and should receive editorial review before an official launch.

Brand SVGs are bundled from Simple Icons 16.36.0. Credits and the upstream license are in `public/logos/`. Dummy placement does not verify tenant presence or imply brand partnership.
