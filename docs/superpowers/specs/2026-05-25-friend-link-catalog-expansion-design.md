# Friend Link Catalog Expansion Design

## Goal

Populate the existing friends page with the six user-provided sites while retaining its current compact avatar-card presentation.

## Scope

- Add six friend entries to the validated `friendLinks` data catalog:
  - 糖糖毬
  - 想玩电脑の秋雨样
  - piterの小窝
  - woodfish
  - 江西财经大学网络安全协会
  - 富贵夫斯基
- Keep the existing Axi entry already present in the catalog.
- Do not change the friends page layout or the `FriendCard` presentation.
- Do not display or model the supplied `siteshot` value in this iteration.

## Data Mapping

The submitted fields are normalized into the site's existing model:

- `name` remains `name`.
- `link` is stored as `href`.
- `avatar` is stored as `avatar`.
- The submitted `avator` spelling for 富贵夫斯基 is corrected to `avatar`.
- `descr` is stored as `description`.

For 富贵夫斯基, which was supplied without a description, use its name as a minimal non-empty description so it satisfies the existing validated data model without inventing biographical copy.

## Validation

- Keep the existing Zod schema requiring non-empty `name`, URL `href`, optional `avatar`, and non-empty `description`.
- Add an automated test that verifies the newly supplied friend names and their normalized destinations appear in the validated catalog.
- Run the full test suite and production build.
- Open `/links` in the Codex browser to verify all cards render within the existing responsive grid and missing or inaccessible remote images fall back through the existing placeholder behavior.
