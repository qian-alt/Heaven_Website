# Axi-Style Blog Index Design

**Date:** 2026-05-25
**Status:** Approved in conversation

## Goal

Redesign the blog index into an Axi-inspired reading hub while keeping the site's current clean visual language. The page should present substantial article cards in a primary column and browsing aids in a secondary sidebar.

## Scope

This increment changes the blog index presentation and its supporting content metadata:

- Add a required article `collection` value for grouping published posts.
- Render a wide article list with date, title, description, tags, and an optional cover treatment.
- Render a sidebar of collections and tags derived from published article metadata.
- Make collection and tag controls filter the visible articles without a backend.
- Keep keyword search available in a visually quieter form.
- Preserve the existing standalone article page, RSS output, navigation, theme handling, and homepage.

The navigation bar will keep a direct `博客` link for now. A blog dropdown menu is intentionally excluded until there are enough collections to justify permanent navigation choices.

## Content Model

Each entry in `src/content/blog/` gains:

```yaml
collection: "学习记录"
```

The existing fields remain unchanged: `title`, `description`, `publishedAt`, `tags`, `draft`, `pinned`, and optional `cover`.

`collection` is a non-empty string. Collections are inferred from published posts rather than maintained in a separate duplicated configuration file. This lets a new article create or reuse a collection by editing only its frontmatter.

The existing `cover` field remains optional. An entry without a cover uses a clean text-first card; no decorative placeholder image is manufactured for missing content.

## Layout

### Desktop

The blog page uses a two-column composition:

- Main column: page title, subtle search/filter feedback, then large stacked article cards.
- Sidebar: `合集` followed by `标签`, each showing controls generated from currently published posts.

Article cards use generous padding, rounded outlines, strong title hierarchy, date metadata, description, and pill-style tags. If `cover` exists, the card includes it as a softly integrated visual region that does not overpower the text.

### Mobile

On narrow screens the composition collapses to one column:

- Heading and search first.
- Collection and tag controls before the article list so filters remain discoverable.
- Article cards stay vertically stacked and readable.

## Filtering Behavior

The page initially shows all published posts.

- A collection selection restricts cards to that collection.
- A tag selection restricts cards to that tag.
- Keyword search matches title and description.
- Active collection, active tag, and keyword search combine.
- An `全部` control clears its corresponding selection.
- When no cards match, a friendly empty result message is displayed.

Filtering is client-side progressive enhancement; all article links and published content render into the initial static HTML.

## Components And Files

- `src/content.config.ts`: validate `collection`.
- `src/content/blog/hello-world.md`: assign its collection.
- `src/lib/content.ts`: add collection aggregation helper alongside existing tag helper.
- `src/lib/content.test.ts`: cover unique sorted collection derivation.
- `src/components/PostCard.astro`: change the simple row into the richer article card.
- `src/pages/blog/index.astro`: provide two-column layout, sidebar controls, and combined filtering attributes/script.
- `src/styles/global.css`: only add shared styling if utility classes become unreadable; prefer scoped utility composition first.

No personal profile or education data files are part of this change.

## Verification

- Unit tests prove published posts produce sorted unique collections and existing post filtering/sorting still passes.
- `astro check` and production build pass without errors or warnings.
- Browser verification checks desktop two-column arrangement, mobile stacked arrangement, collection filtering, tag filtering, keyword filtering, and the empty-results state.

