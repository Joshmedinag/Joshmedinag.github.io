# Joshua Medina Portfolio — Design System

## Visual direction

The homepage and all twelve case studies combine cinematic imagery with the precision of a grading monitor and a VFX diagnostics console. The interface is a matte frame around Joshua's work. It uses no coloured glow, blurred glass, decorative light blobs or gradient text.

## Typography

- **Roboto** carries titles, editorial statements, navigation, body copy and controls. Regular, Medium, Bold and Italic are hosted locally from Joshua's supplied font package, with font-display swap and a regular-face preload.
- **Consolas / Courier New** carries verified media dimensions, software labels, AOV labels, indices, code and technical metadata.

## Palette

- Canvas: `#09090b`
- Graphite surface: `#111114`
- Active surface: `#202026`
- Primary text: `#f5f5f7`
- Secondary text: `#a3a3ad`
- Subtle hairline: `rgba(255,255,255,.1)`
- Record accent: `#e54d37`
- Tungsten metadata accent: `#d8a86a`

The record red marks live states and single focal details. Tungsten gold labels process and evidence. Neither is used as a background wash.

## Layout

- The hero is a framed cinematic image with compact role typography and factual project metadata.
- Homepage media fills its frame with deliberate focal positioning. Case-study evidence retains its original aspect ratio and can be enlarged in a keyboard-accessible image viewer.
- Project cards use closed 1px frames, mono numbering and minimal overlays.
- Pipeline content uses the same measured grid as desktop VFX software.
- Mobile keeps the hero image full bleed inside its frame and moves controls below essential subjects.
- Internal pages share a compact introduction, local section navigation, readable text columns and a contact action.

## Signature interactions

- Navigation uses a physical sliding selector that tracks hover, focus and the active section.
- Project filtering retains spatial context through FLIP motion.
- AOV comparators reveal the final image on the left and the technical stage on the right. Dragging uses damped spring movement and supports arrow keys.
- The showreel supports Darkroom mode and keyboard playback controls.
- Vimeo embeds use the official player handshake and provide a poster and direct link if loading fails. Playback failures do not fabricate privacy tokens or credentials.
- The pipeline console provides channel, code and architecture views. The Python sample uses the public AOVGuard API from the repository.
- Contact copies the email address and confirms the action with a compact telemetry toast.

## Motion and accessibility

- Motion uses short spring curves and direct press feedback.
- Controls compress to `0.97`–`0.98` while pressed.
- All core controls support the keyboard and use a visible white focus ring.
- Dialogs restore focus on close; image galleries support arrow keys and Escape.
- The fixed navigation is measured dynamically to keep linked headings visible.
- Reduced-motion mode removes transform transitions and comparator inertia.
- Text labels accompany icons and technical states remain understandable without colour.
