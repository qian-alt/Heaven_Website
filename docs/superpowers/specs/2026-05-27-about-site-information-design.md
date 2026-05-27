# About Site Information Design

## Goal

Extend the existing Chinese and English About pages with an Axi-inspired site information section describing distribution endpoints, copyright terms, and theme provenance, while preserving the current personal profile composition.

## Scope

- Update `/about` and `/en/about`.
- Keep the profile hero, biography, university progress, and education cards unchanged.
- Add the new information after the education section inside the existing About-page panel.
- Do not change home pages, deployment configuration, navigation, or blog content.

## Content Structure

Create one shared component that accepts localized labels and paragraphs. It renders:

1. A section heading: `站点信息` / `Site Information`.
2. A `网页分发` / `Distribution` subsection with introductory copy and two external destination cards.
3. A `版权` / `Copyright` subsection with a Creative Commons notice and third-party-rights note.
4. A `主题` / `Theme` subsection crediting Astro and Axi's Blog as a design reference.

## Distribution Destinations

Display two linked cards with restrained rounded-border styling consistent with existing cards:

| Label | URL | Display Host |
| --- | --- | --- |
| Vercel | `https://www.dearheaven.cn/` | `dearheaven.cn` |
| Cloudflare | `https://cloudflare.dearheaven.cn/` | `cloudflare.dearheaven.cn` |

Chinese introductory copy:

> 为了提供稳定的访问体验，本站提供以下部署入口，内容保持同步更新。

English introductory copy:

> To provide a reliable visiting experience, this site is available through the following synchronized deployments.

## Copyright Copy

Chinese:

> 除特别说明外，本站原创内容与原创页面设计采用 CC BY-NC-SA 4.0 协议授权。转载或改编时请注明作者与原文链接，不得用于商业目的，并以相同协议分享。
>
> 本站引用的第三方图片、字体、商标与其他素材，其权利归原作者或权利人所有。如有侵权，请联系我删除。

English:

> Unless otherwise stated, original content and original page design on this site are licensed under CC BY-NC-SA 4.0. Attribution and a link to the original are required; commercial use is not permitted; adaptations must use the same license.
>
> Third-party images, fonts, trademarks, and other materials remain the property of their respective rights holders. Please contact me for removal if any material infringes your rights.

Link `CC BY-NC-SA 4.0` to `https://creativecommons.org/licenses/by-nc-sa/4.0/`.

## Theme Copy

Chinese:

> 本站基于 Astro 构建，界面设计参考 Axi's Blog，并结合个人内容重新实现。

English:

> This site is built with Astro. Its interface design references Axi's Blog and has been reimplemented for my own content.

Link `Astro` to `https://astro.build/` and `Axi's Blog` to `https://axi404.top/`.

## Visual Design

- The site information section follows the About panel's vertical rhythm with a top divider and generous spacing after education.
- Distribution endpoints appear as a responsive two-card grid on wider screens and stack on small screens.
- Copyright and Theme appear as readable subsections below the cards, using muted paragraphs and accented inline links.
- Reuse existing theme tokens, borders, panel colors, and focus/hover treatments rather than copying Axi's article-page layout.

## Implementation Boundary

- Add `src/components/SiteInformation.astro` as the shared presentational component.
- Add localized props in `src/pages/about.astro` and `src/pages/en/about.astro`.
- Add scoped component classes in `src/styles/global.css`.
- Add a source-level regression test ensuring both About routes render the shared component with their localized labels and destination URLs.

## Verification

- Run focused tests and the complete Vitest suite.
- Run Astro production build if all content entries satisfy the existing schema.
- Inspect `/about` and `/en/about` at desktop and mobile widths in the browser.
- Preserve any existing untracked personal blog drafts; if an invalid draft blocks build, report it separately rather than altering it.
