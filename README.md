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

`public/images/mall-atrium.png`, `mall-exterior.png`, and `mall-retail.png` are locally bundled AI-generated photographic illustrations. They are conceptual mall images, **not real photographs of 23 Paskal**. Replace with approved actual mall photography before official publication. Higgsfield and Magnific were unavailable; these assets were generated with the available image generation tool. The reference site could not be accessed from this environment.

Floor plans and tenant assignments are dummy data explicitly authorized for this demo, not the actual mall layout or a verified tenant list. Edit `src/directory-data.js` to update tenant/floor data; schematic unit geometry lives in `src/enhancements.js`. Each floor has four interactive units.

Brand SVGs are bundled locally from Simple Icons 16.36.0. See `public/logos/ASSET-CREDITS.md`. Two logo rows move in opposite directions; hover or use the pause button to stop motion. Reduced-motion preferences disable automatic scrolling.

The mall page includes a concise history and a reference link. Historical information should be editorially reviewed before an official launch. Events and rewards remain conceptual.
