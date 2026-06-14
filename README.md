# Richard_L Personal Blog

Personal blog and project home for `Richardlxr`, built with Astro and deployed through GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

The local site runs at:

```text
http://127.0.0.1:4321/
```

## Build

```bash
npm run build
```

## Structure

- `src/pages/` - homepage, writing index, dynamic article route, project pages, and about page
- `src/content/posts/` - Markdown articles
- `src/content.config.ts` - article frontmatter schema
- `src/data/posts.ts` - article list helpers
- `src/data/projects.ts` - project metadata for cards
- `src/styles/global.css` - site theme, layout, motion, and responsive styles
- `public/images/profile-avatar.webp` - homepage avatar artwork
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow
- `docs/blog-writing-guide.md` - long-form Markdown writing guide

Original implementation plan:

```text
docs/plans/2026-06-10-github-pages-personal-site-plan.md
```
