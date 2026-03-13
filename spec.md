# Hands - Band Archive

## Current State
Site has all core pages: Landing, Home (case file cards), Music, Videos, Archive, Shows, Wall, Downloads, Secret. Core aesthetic established: dark bg, monospace fonts, film grain, scan lines, glitch, evidence cards, VHS, archival headers.

## Requested Changes (Diff)

### Add
- Evidence Locker section on Home: interactive shelf of clickable objects (cassettes, polaroids, envelopes, guitar picks, notebooks, tickets, folders) revealing archive content. Hover reveals handwritten notes.
- Vintage Theatre Poster Navigation: replace current nav with 1920s theatre poster/playbill style — distressed, slightly crooked, faded poster cards pinned to a backstage wall.
- Lost Recordings Radio at /radio: hidden underground radio station with analog interface, cassette deck player, flickering lights, streaming fake metadata ("Rehearsal Tape — 2019", "Van Recording — Somewhere in Wales"). Easter egg from handprint.
- Individual Case File pages /case/001-004: full police dossier per member with NAME, ALIAS, INSTRUMENT, LAST SEEN, KNOWN ASSOCIATES, CHARGES, archive artifacts, confidential notes, hidden triggers.
- Case Files index at /cases showing folder cards linking to each member.

### Modify
- Home page: add Evidence Locker section below existing case file cards.
- Navigation: overhaul to theatre poster style.
- Landing: change easter egg from /secret to /radio.
- RouteTree: add /radio, /cases, /case/$id routes.

### Remove
- Nothing

## Implementation Plan
1. Update Navigation.tsx to theatre poster card style
2. Create EvidenceLocker component with interactive shelf items
3. Add EvidenceLocker to Home.tsx
4. Create Radio.tsx (Lost Recordings Radio)
5. Create CasesIndex.tsx
6. Create CaseFile.tsx (parameterized dossier)
7. Update routeTree.tsx with new routes
8. Update Landing.tsx easter egg to navigate to /radio
