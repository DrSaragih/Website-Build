# 23 Paskal — Four layers, endless possibilities

Responsive multi-page mall website concept. The landing experience uses four overlapping photographic layers, a sticky scroll stage, independent photo parallax, depth transforms, pointer movement, and reduced-motion support.

Each photographic layer and navigation item opens a dedicated page:
- `/mall.html`: Mall history, photographic story, brand logos, and visit information.
- `/directory.html`: Interactive GF / Lantai 1 / Lantai 2 directory with floor-specific plans, synchronized tenant selection, category filters, and search.
- `/whats-next.html`: Event concepts and details.
- `/shopping-program.html`: Shopping program concept.

Pages include a return to the layers and navigation to the next chapter. Native links support browser back/forward and opening pages in new tabs. All five HTML entry points are built for static hosting.

## Development

Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Production: `npm run build`. Local production inspection: `npm run preview`.

## Asset and content notes

`public/images/mall-atrium.png`, `mall-exterior.png`, `mall-retail.png`, `mall-garden.png`, and `mall-cafe.png` are locally bundled AI-generated photographic illustrations. They are conceptual mall images, **not real photographs of 23 Paskal**. Replace with approved actual mall photography before official publication. Higgsfield and Magnific were unavailable; these assets were generated with the available image generation tool. The reference site could not be accessed from this environment.

Floor plans and tenant assignments are dummy data explicitly authorized for this demo, not the actual mall layout or a verified tenant list. Edit `src/directory-data.js` to update tenant/floor data; schematic unit geometry lives in `src/enhancements.js`. Each floor has eight interactive units. The expanded native dialog supports switching floors and selecting units; selections stay synchronized with the main plan.

Brand SVGs are bundled locally from Simple Icons 16.36.0. See `public/logos/ASSET-CREDITS.md`. Two logo rows move in opposite directions; hover or use the pause button to stop motion. Reduced-motion preferences disable automatic scrolling.

The mall page includes a concise history and a reference link. Historical information should be editorially reviewed before an official launch. Events and rewards remain conceptual.


## Immersive experience and location

`src/experience.js` and `src/experience.css` add a full-screen sticky photographic journey with independent background zoom, foreground travel, and moving display typography. Hero cards have stronger scroll depth and pointer parallax. Supporting photo stories use opposing scroll rates. Reduced-motion preferences retain content while disabling the immersive movement.

The home page and all chapter pages include a Google Maps embed querying **23 Paskal Shopping Center Bandung**, plus Google Maps location and directions links. No API key is required. External map content needs Internet access; the embed and route targets were checked, but Google's external content could not be verified from this environment. Existing links remain available alongside the map.

Copy spacing was checked at 1440, 1024, 768, 390, and 320 pixel widths. The site's mall photographs are AI-generated concepts, and the floor plans remain the user-authorized dummy layouts.
