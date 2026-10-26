# Joshua Medina Portfolio — Design System

## Direction

Editorial and cinematic. The work leads and the interface recedes. Preserve the existing graphite world and locally hosted Roboto; remove the diagnostics-dashboard scaffolding from the homepage. Real images are separate from the introduction so text does not cover the subject. The three featured frames compare different shots; the visitor controls the initially paused slideshow.

## Typography

Roboto Regular, Medium, Bold and Italic from Joshua's font package; font-display swap and a regular preload. Name uses one H1; four specialties occupy two readable lines at a smaller size. Body text is generally 16px with a readable measure, metadata no smaller than necessary. Consolas / Courier New is reserved for code, measured media data and keyboard hints. No novelty display font or arbitrary skill percentages.

## Tokens

Defined in css/site-system.css:

- Canvas #09090b; surface #111114; active #202026.
- Text #f5f5f7; secondary #a3a3ad; muted #92929e.
- Hairlines rgba(255,255,255,.1); focus white.
- Tungsten accent #d8a86a for links, evidence and copy confirmation. Record red is a restrained inherited detail, not a claim of availability.
- Motion uses existing short ease-out curves, with reduced-motion alternatives.

Neutral surfaces do not alter the render. No CSS brightness/saturation/contrast, gradient tint or regrade on project imagery. Matte control backgrounds preserve readability without dimming the entire picture.

## Composition

- Compact consistent navigation: Work / Showreel / About / CV / Contact. Static HTML provides a no-JS baseline; the mobile menu enhances it.
- Hero: readable text beside an undimmed real frame on desktop, text then image on mobile. No text-overlay hero, mandatory intro or full-viewport empty stage.
- Showreel follows the introduction, with clear Play and visible external fallback.
- Four visual projects plus three technical projects create discoverable parallel paths. More Work is a native disclosure, not a hidden second half of the profile.
- Visual cards show actual image, contribution, concrete scope and tools. Case study imagery keeps its proportions; thumbnails may use deliberate cover framing while the original remains accessible.
- About is concise and connects cinematography, CG craft and tool building. Detailed tools are optional disclosure content, avoiding three repeated skills presentations.
- Contact has a visible selectable address, separate Email me / Copy email actions and professional profile links. All project footers repeat the same four-part identity.

## Interaction and accessibility

- Click-to-load Vimeo keeps one player per location, a connecting state, handshake/error fallback and no automatic playback on arrival.
- Hero metadata follows the selected slide; opacity transition is brief and disabled for keyboard/reduced motion. The slideshow pauses on manual navigation and while out of view; only requested images are prepared.
- Comparators maintain aligned source imagery, keyboard arrows and Home/End, plus touch-friendly presets. pan-y preserves vertical scroll; reactive labels indicate the visible image area.
- Each project grid has one enhanced tab stop with left/right arrows and native Enter. Without JS every card is a normal link. More Work filters apply only to additional studies.
- Galleries use a named dialog with visible Close, Escape, arrow navigation, original link and focus/scroll restoration.
- Copy confirmation is solid amber for 1.8 seconds after a successful write; failed clipboard access gives an actionable message. No-JS hides copy controls while preserving mailto and selectable text.
- No global overflow clipping hides layout defects. Image/iframe aspect ratios reserve space; responsive variants preserve original files. Focus remains visible below measured sticky navigation.
- Responsive review covers 320, 360, 390, 768, 1024 and 1440 CSS pixels, with browser/assistive technology limits documented in the review.

## Maintenance

Shared values live in site-config.js and shared styles. Headers/footers stay in static HTML for fourteen pages; a reproducible check enforces consistency without introducing a build system. Tokens do not justify replacing original imagery with generated work. Existing source documents and CV are preserved.

The Asset Publisher & Loader card spans the technical grid below AOVGuard and FarmFlow, with its native Publisher image beside the contribution and scope. On mobile it returns to the existing vertical card layout. The case reuses the shared identity and native image viewer; cursor cleanup is declared as a presentation edit.
