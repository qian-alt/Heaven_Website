# Axi-Style Home About Section Design

## Goal

Adjust the homepage About section to follow the open, horizontal layout shown on Axi's homepage while retaining the site's existing content and routes.

## Scope

- Update the Chinese homepage About section.
- Apply the same composition to the English homepage About section.
- Add a clear link from each homepage About section to its corresponding full About page.
- Keep existing navigation, education cards, project cards, personal data, and page routes otherwise unchanged.

## Layout

On desktop widths, the About section uses a two-column composition consistent with the Education section:

- A compact left column containing the section title: `关于我` on the Chinese page and `About` on the English page.
- A flexible right column containing:
  - the short identity line (`学生 /` for Chinese, an equivalent English label for English);
  - the introductory paragraph below it;
  - an outlined action button aligned to the lower right.

The Chinese action label is `更多关于我`; it links to `/about`.
The English action label is `More about me`; it links to `/en/about`.

On small screens, content stacks vertically in reading order: title, identity line, introduction, button. The button remains easily tappable and aligns naturally without forcing horizontal overflow.

## Visual Treatment

- The About content should read as an open page section rather than a nested card.
- Typography and muted text colors should use the existing site tokens and styles.
- Spacing should echo the Education area directly below it, producing a continuous left-label/right-content rhythm.
- The button uses a restrained outlined treatment with a right arrow and hover/focus feedback compatible with the existing theme.

## Content Handling

- Reuse the Chinese homepage's current introduction text rather than replacing personal wording.
- Reuse `englishProfile.intro` for the English paragraph.
- No new content management structure is introduced for this narrow presentation adjustment.

## Verification

- Verify Chinese and English homepage markup expose the correct About-page link targets.
- Run the existing automated tests and Astro production build.
- Visually check desktop horizontal layout and mobile stacked layout in the local preview when an application browser pane is available.
