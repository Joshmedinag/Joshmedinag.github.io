# Joshua Medina Portfolio — Design System

## Visual direction

The homepage combines an independent film monograph with the precision of a grading monitor and a VFX diagnostics console. The interface is a matte frame around Joshua's imagery. It uses no coloured glow, blurred glass, decorative light blobs or gradient text.

## Typography

- **Neue Montreal** carries titles, editorial statements, navigation, body copy and controls. The locally hosted family preserves the portfolio's original typographic identity and keeps external font requests out of the critical path.
- **Consolas / Courier New** carries camera telemetry, AOV labels, indices, code and technical metadata.

## Palette

- Canvas: `#09090b`
- Graphite surface: `#111114`
- Active surface: `#202026`
- Primary text: `#f5f5f7`
- Secondary text: `#94949e`
- Subtle hairline: `rgba(255,255,255,.08)`
- Record accent: `#e54d37`
- Tungsten metadata accent: `#d8a86a`

The record red marks live states and single focal details. Tungsten gold labels process and evidence. Neither is used as a background wash.

## Layout

- The hero is a framed anamorphic image with editorial copy and camera telemetry.
- Media fills its frame with deliberate focal positioning.
- Project cards use closed 1px frames, mono numbering and minimal overlays.
- Pipeline content uses the same measured grid as desktop VFX software.
- Mobile keeps the hero image full bleed inside its frame and moves controls below essential subjects.

## Signature interactions

- Navigation uses a physical sliding selector that tracks hover, focus and the active section.
- Project filtering retains spatial context through FLIP motion.
- AOV comparators reveal the final image on the left and the technical stage on the right. Dragging uses damped spring movement and supports arrow keys.
- The showreel supports Darkroom mode and keyboard playback controls.
- The pipeline console provides channel, code and architecture views. The Python sample uses the public AOVGuard API from the repository.
- Contact copies the email address and confirms the action with a compact telemetry toast.

## Motion and accessibility

- Motion uses short spring curves and direct press feedback.
- Controls compress to `0.97`–`0.98` while pressed.
- All core controls support the keyboard and use a one-pixel white focus ring.
- Reduced-motion mode removes transform transitions and comparator inertia.
- Text labels accompany icons and technical states remain understandable without colour.
