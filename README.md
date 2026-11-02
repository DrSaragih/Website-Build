# 23 Paskal — Four layers, endless possibilities

Responsive multi-page mall website concept. The landing experience uses four overlapping photographic layers, a sticky scroll stage, independent photo parallax, depth transforms, pointer movement, and reduced-motion support.

Each photographic layer and navigation item opens a dedicated page:
- `/mall.html`: The Mall and visit information.
- `/directory.html`: Searchable, filterable discovery directory.
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

`public/images/mall-atrium.png` and `mall-exterior.png` are locally bundled AI-generated photographic illustrations. They are conceptual mall images, **not real photographs of 23 Paskal**. Replace with approved actual mall photography before official publication. Higgsfield was unavailable; these assets were generated with the available image generation tool. The reference site could not be accessed from this environment.

Tenant discovery cards represent categories rather than a verified tenant list. Events and rewards are explicitly conceptual. Confirm all business content with the mall before publication.
