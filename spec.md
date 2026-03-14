# Hands - Band Archive (Ultra Low-Tech Version)

## Current State
Full band archive site with investigation board, case files, evidence locker, secret radio, theatre poster nav, and community wall. Visually complex with multiple pages and interactions.

## Requested Changes (Diff)

### Add
- New single-page landing experience: ultra low-tech, stripped-back, almost brutalist
- A thick black border rectangle centered on the page — the main visual focus
- Inside the black border: a QR code (SVG-drawn, static, pointing to the site URL or placeholder)
- Below the QR code inside the border: large text "THE HAND" in typewriter/monospace font
- Smaller text below that listing band member names
- Click interaction on the black border: reveals a spherical/radial word cloud of navigation links that float outward in a circular/orbital pattern around the border
- Links in the sphere include: Music, Videos, Archive, Shows, Community, Downloads, Cases, Radio
- Ultra low-tech aesthetic: white or off-white background, black text, monospace font throughout, zero gradients, zero shadows, minimal decoration
- Navigation links in spherical layout use plain text, slightly scattered in orbit positions
- Clicking a link navigates to the relevant section/route
- A small "[click border]" hint text below the border before it's been clicked
- Once clicked, links appear and hint changes to "[click again to close]"
- Entire page has a raw HTML/early-internet feel: courier font, minimal color, no images

### Modify
- This is effectively a new standalone page/app variant — keep existing routes but replace the App.tsx entry with this new landing

### Remove
- Nothing removed from existing routes; this replaces only the default landing view

## Implementation Plan
1. Replace App.tsx landing/home route with new UltraLowTechLanding component
2. Build centered black-border box with SVG QR code inside
3. Add "THE HAND" + band member names text inside border
4. Implement click-to-reveal spherical word cloud using CSS absolute positioning in a radial pattern
5. Animate link appearance with simple CSS transitions (fade + scale, no fancy libs)
6. Apply global ultra-low-tech styles: white bg, black text, Courier/monospace, no decorations
7. Wire navigation links to existing routes
