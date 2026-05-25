# Axi-Inspired Blog Card And Light Background Design

## Goal

Refine Heaven's Blog toward the calm, editorial feel of Axi's blog without copying its assets or turning the site into a replica. This iteration focuses on the two largest visual differences found in browser comparison:

- The blog list needs a stronger image-led reading card.
- The light theme background needs to be quieter so content becomes the primary visual focus.

## Approved Direction

Use a compatibility-first article card design:

- Articles with a `cover` value show an atmospheric image layer with a soft fade behind the content.
- Articles without a `cover` value continue to render as clean text cards.
- The first published article receives an original, low-saturation landscape-style cover created for this site.
- The light theme keeps a trace of the existing blue/pink personality, but the glow becomes substantially fainter and more peripheral.
- The dark theme remains structurally unchanged except for any small compatibility adjustments required for card legibility.

This preserves the site's identity while bringing the blog experience closer to the restrained, content-led quality the user likes in Axi's site.

## Cover Artwork

The initial blog cover is an original wide illustration for the article "开始搭建属于自己的个人网站".

Visual characteristics:

- Horizontal composition suited to a wide article card.
- Soft daylight or hazy sky atmosphere with distant landscape/architecture-like forms.
- Low contrast and low saturation so the artwork supports rather than competes with text.
- No borrowed Axi artwork, recognizable copyrighted character, logo, or copied composition.
- Enough calm detail on the right side to remain visible behind the fade layer.

The image is stored as a local site asset and referenced through the article frontmatter `cover` field.

## Blog Card Behavior

The existing `cover` field remains the content interface; no new content model is needed.

Desktop presentation:

- A covered card spans the current article-list width.
- The cover occupies the rightward visual field of the card.
- A panel-colored fade extends from the text side into the image so title, excerpt, metadata, and tags retain high contrast.
- The arrow and hover affordance remain subtle.

Mobile presentation:

- Reading comfort takes priority over the decorative image.
- The card remains compact and text-first; the decorative cover is hidden below the desktop/tablet breakpoint.
- No horizontal overflow or cramped tag row is introduced.

No-cover fallback:

- Cards without images retain the existing neutral panel presentation.
- The layout must not produce an empty image area.

## Background Adjustment

The light theme background moves from an obvious pink/blue wash toward an almost-white editorial surface:

- Base canvas stays softly cool rather than pure white.
- Blue and pink radial glows are reduced in opacity/strength and moved toward the edges.
- Panels remain perceptible through their faint border and translucent fill, not through heavy shadow or high color contrast.

This adjustment applies consistently across home, blog, links, projects, and about pages because it is a global theme characteristic.

The dark theme preserves its existing moody atmosphere and readable panel contrast.

## Accessibility And Resilience

- Text remains readable regardless of whether an image loads.
- The decorative cover image uses empty alternative text because article text already supplies the link meaning.
- Missing cover assets must not obstruct navigation or article card content.
- Existing keyboard links and responsive behavior remain intact.

## Implementation Surface

Expected implementation files:

- `src/components/PostCard.astro`: covered-card presentation and fallback behavior.
- `src/content/blog/hello-world.md`: add the initial local cover reference.
- `src/styles/global.css`: reduce light-theme background glow and, if needed, add card-specific styling.
- `public/` asset location: store the generated original cover image.
- Focused tests near existing content/layout tests to assert cover wiring and maintained fallback structure.

## Verification

Automated checks:

- A focused test fails before implementation when the initial article does not reference a cover and/or the card lacks the intended covered state.
- Test suite passes after implementation.
- Astro production build completes without diagnostics.
- `git diff --check` reports no whitespace errors.

Browser checks:

- `/blog` in the light theme shows the initial article with the new atmospheric cover and readable text.
- The light theme background looks calmer on both `/` and `/blog`.
- `/blog` remains legible in the dark theme.
- Mobile-width `/blog` maintains readable card content without overflow.

## Out Of Scope

- Redesigning the entire blog taxonomy, title header, or sidebar structure.
- Adding multiple sample posts only to fill the page.
- Copying Axi's illustrations, exact color values, or content.
- Broad dark-theme redesign.
