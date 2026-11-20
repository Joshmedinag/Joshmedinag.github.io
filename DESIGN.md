# Joshua Medina Portfolio — Design System

## Direction

Editorial and cinematic. A compact masthead puts the visitor's reel and CV actions above a full panel from the work. Locally hosted Roboto and warm charcoal surfaces frame real renders, with captions and controls placed outside the image.

## Typography

Roboto Regular, Medium, Bold and Italic from Joshua's font package; font-display swap and a regular preload. The name uses one H1; Lighting TD, Compositor and Technical Artist sit below it in smaller type. Pipeline TD is explicit in the About section and footer. Body text is generally 16px with a readable measure. Consolas / Courier New is reserved for code, measured data and keyboard hints.

## Tokens

Defined in css/site-system.css:

- Canvas #151411; surface #1d1b17; active #2a2721.
- Text #f3eee5; secondary #beb6a9; muted #a59d90.
- Hairlines rgba(248,242,232,.13); focus #f2d3a6.
- Gold #dfb77f for links, selection and copy confirmation.
- Motion uses existing short ease-out curves, with reduced-motion alternatives.

Neutral surfaces do not alter the render. No CSS brightness/saturation/contrast, gradient tint or regrade on project imagery. Matte control backgrounds preserve readability without dimming the entire picture.

## Composition

- Compact consistent navigation: Work / Showreel / About / CV / Contact. Static HTML provides a no-JS baseline; the mobile menu enhances it.
- Hero: name, roles and actions above an undimmed frame. Venator opens the gallery. The three labelled thumbnails change the shot and its case link.
- Showreel follows the introduction, with clear Play and visible external fallback.
- Recruiter scan: a compact introduction and prominent real frame lead to the reel and curated work. The reel uses a different genuine shot from the hero; repeated project-link lists are omitted.
- Four visual projects plus three technical projects create discoverable parallel paths. More Work is a native disclosure, not a hidden second half of the profile.
- Featured visual studies use a varied grid and one line of contribution. Technical studies pair a real screenshot with the problem solved and relevant tools. Case study imagery keeps its proportions; cover panels may use deliberate framing while the original remains accessible.
- Case studies put a short contribution and the finished image before toolkit, production context and section navigation. Cinematography preserves its reel-first entrance. Technical case studies lead with real visual evidence, a plain production problem and visible authorship; detailed implementation and workflows use native disclosures.
- About is concise and connects cinematography, CG craft and tool building. Detailed tools are optional disclosure content, avoiding three repeated skills presentations.
- Contact has a visible selectable address, separate Email me / Copy email actions and professional profile links. All project footers repeat the same four-part identity.

## Interaction and accessibility

- Click-to-load Vimeo keeps one player per location, a connecting state, handshake/error fallback and no automatic playback on arrival.
- Hero thumbnails select a frame with a click, tap or key. The caption and link follow the selection. Full images for the other shots load when requested. Reduced motion removes the fade.
- Zelda comparison opens on the final composite. Its native slider and touch presets reveal the aligned warm key pass. Both frames remain accessible through a disclosure without JavaScript.
- Each project grid has one enhanced tab stop with left/right arrows and native Enter. Without JS every card is a normal link. More Work filters apply only to additional studies.
- Galleries use a named dialog with visible Close, Escape, arrow navigation, original link and focus/scroll restoration.
- Copy confirmation is solid amber for 1.8 seconds after a successful write; failed clipboard access gives an actionable message. No-JS hides copy controls while preserving mailto and selectable text.
- No global overflow clipping hides layout defects. Image/iframe aspect ratios reserve space; responsive variants preserve original files. Focus remains visible below measured sticky navigation.
- Responsive review covers 320, 360, 390, 768, 1024 and 1440 CSS pixels, with browser/assistive technology limits documented in the review.

## Maintenance

Shared values live in site-config.js and shared styles. Headers/footers stay in static HTML across the homepage, case studies and translated editions; a reproducible check enforces consistency without introducing a build system. Tokens do not justify replacing original imagery with generated work. Existing source documents and CV are preserved.

Asset Publisher & Loader appears below AOVGuard and FarmFlow. Its native Publisher screenshot sits beside the contribution on desktop and above it on mobile. The case brings the native publish and rollback evidence near the opening; cursor cleanup is declared as a presentation edit.
