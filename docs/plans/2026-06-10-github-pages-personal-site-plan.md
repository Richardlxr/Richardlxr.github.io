---
status: active
created: 2026-06-10
project: Richardlxr.github.io
target_repo: Richardlxr/Richardlxr.github.io
target_url: https://richardlxr.github.io/
recommended_stack: Astro + TypeScript + Markdown + GitHub Pages
---

# GitHub Pages Personal Site Plan

## Problem Frame

Profile README is good for a quick GitHub identity card, but it is constrained by GitHub's README renderer. The personal site should become the richer public home for Richard: a place to show the learning path, Skillpkg, C++/data-structure notes, AI-agent workflow, and selected projects with better navigation and visual control.

The site should be static and low-maintenance. GitHub Pages will serve the final HTML/CSS/JS, while the local project can use a build tool to generate those files.

## Scope

Build a GitHub Pages user site for `Richardlxr`:

- Homepage at `/` with a strong first-screen identity.
- Project section with Skillpkg as the primary featured build.
- Learning section for C++ and data structures.
- Notes/project links for `DataStructure` and `SJTU_InformationGrabber`.
- About/contact section with email and GitHub profile.
- Static deployment through GitHub Pages.

Out of scope for the first version:

- Login, comments, database, or server backend.
- Full blog CMS.
- Complex 3D scenes or heavy animation.
- Custom domain setup, unless requested later.

## Key Decisions

### 1. Use `Richardlxr.github.io` as the repository

GitHub Pages user sites are conventionally created with the repository name `username.github.io`. For this account, the repository should be:

```text
Richardlxr/Richardlxr.github.io
```

The default public URL will be:

```text
https://richardlxr.github.io/
```

### 2. Use Astro instead of plain HTML, Hexo, or React-only Vite

Astro is the best fit for this site because it is static-first, Markdown-friendly, and flexible enough for a portfolio plus notes. It avoids committing to a full React app while still allowing interactive islands later.

Rationale:

- Better than raw HTML for maintainable multi-page content.
- More flexible than Hexo for a personal website that is not only a blog.
- Lighter than React/Vite for a mostly static identity and learning site.
- Official Astro docs include a GitHub Pages deployment path using GitHub Actions.

### 3. Keep dynamic effects local-first

The Profile README already showed that remote SVG services can fail. The website should prefer local assets and CSS/SVG animations. External images are acceptable only when they are stable, intentional, and replaceable.

### 4. Treat content as structured data

Projects and notes should live as Markdown/MDX content entries, not hard-coded directly into pages. That keeps future updates easy.

Proposed content paths:

```text
src/content/projects/skillpkg.md
src/content/projects/sjtu-information-grabber.md
src/content/notes/data-structure.md
src/data/profile.ts
src/data/links.ts
```

### 5. Use GitHub Actions as the Pages publishing source

Because Astro requires a build step, GitHub Pages should deploy through GitHub Actions rather than raw branch publishing.

Proposed workflow path:

```text
.github/workflows/deploy.yml
```

## Site Structure

### `/`

Homepage. This should be the main experience, not a marketing splash page.

Content:

- Name: Richard_L / Richardlxr.
- Short positioning: C++ learner, data-structure learner, AI-agent builder.
- Primary feature: Skillpkg.
- Secondary links: DataStructure, SJTU InformationGrabber, GitHub Profile README.
- Current learning focus.
- Contact link.

### `/projects/`

Project index.

Initial projects:

- Skillpkg
- SJTU InformationGrabber
- GitHub Profile README
- DataStructure learning notes, if public or intentionally linked

### `/projects/skillpkg/`

Case-study page for Skillpkg.

Content:

- What it is.
- Why it matters.
- What was vibe-coded.
- What was learned about AI agents.
- Screenshots or architecture diagrams later.

### `/notes/`

Learning notes index.

Initial content:

- C++ foundations
- Data structures
- AI-agent workflow notes

### `/notes/data-structure/`

Data-structure learning page.

Important assumption: `Richardlxr/DataStructure` appears accessible through authenticated Git operations but may not be public to anonymous visitors. If it should be a public learning artifact, make the repository public before treating it as a public link.

### `/about/`

Short personal context:

- Shanghai Jiao Tong University student.
- Current learning stage.
- C++ and data structures.
- AI-agent workflow.
- Contact.

## Visual Direction

The site should feel like a personal engineering notebook with a polished public face:

- Clean technical typography.
- Dark/light support from the start.
- More "focused builder" than "portfolio template".
- Use restrained color contrast: blue for engineering, green for learning/growth, amber/red as accents.
- Avoid depending on one hue family.
- Use local SVG diagrams for agent loops and learning maps.
- Keep animation purposeful: small motion in hero, project diagrams, and hover states.

First viewport should make the person and focus obvious:

```text
Richard_L
C++ learner | Data structures | AI-agent builder
Featured build: Skillpkg
```

## Proposed File Layout

```text
package.json
astro.config.mjs
tsconfig.json
.github/workflows/deploy.yml
public/favicon.svg
public/og-image.png
src/pages/index.astro
src/pages/about.astro
src/pages/projects/index.astro
src/pages/projects/skillpkg.astro
src/pages/notes/index.astro
src/pages/notes/data-structure.astro
src/layouts/BaseLayout.astro
src/components/SiteNav.astro
src/components/Hero.astro
src/components/ProjectCard.astro
src/components/SkillpkgFeature.astro
src/components/LearningMap.astro
src/components/Footer.astro
src/content/projects/skillpkg.md
src/content/projects/sjtu-information-grabber.md
src/content/notes/data-structure.md
src/data/profile.ts
src/data/links.ts
src/styles/global.css
tests/smoke/home.spec.ts
tests/smoke/navigation.spec.ts
tests/smoke/content.spec.ts
tests/visual/home.spec.ts
```

## Implementation Units

### Unit 1: Astro scaffold and deploy foundation

Files:

```text
package.json
astro.config.mjs
tsconfig.json
.github/workflows/deploy.yml
public/favicon.svg
```

Responsibilities:

- Create an Astro static site.
- Configure `site` as `https://richardlxr.github.io`.
- Use GitHub Actions deployment.
- Keep the deployment source compatible with GitHub Pages.

Tests:

```text
tests/smoke/home.spec.ts
```

Scenarios:

- Production build generates `dist/index.html`.
- Local preview serves the homepage.
- Homepage title and primary heading exist.
- No 404 for core static assets.

### Unit 2: Base layout and design system

Files:

```text
src/layouts/BaseLayout.astro
src/styles/global.css
src/components/SiteNav.astro
src/components/Footer.astro
```

Responsibilities:

- Shared HTML shell.
- SEO metadata.
- Responsive navigation.
- Color tokens, typography, spacing, dark/light mode.

Tests:

```text
tests/smoke/navigation.spec.ts
tests/visual/home.spec.ts
```

Scenarios:

- Nav links work at desktop and mobile widths.
- Text does not overlap at narrow widths.
- Page is usable in dark and light themes.
- Footer links are visible and clickable.

### Unit 3: Homepage experience

Files:

```text
src/pages/index.astro
src/components/Hero.astro
src/components/SkillpkgFeature.astro
src/components/LearningMap.astro
src/data/profile.ts
src/data/links.ts
```

Responsibilities:

- Present identity immediately.
- Feature Skillpkg strongly.
- Show current learning focus.
- Link to DataStructure and SJTU InformationGrabber.

Tests:

```text
tests/smoke/home.spec.ts
tests/visual/home.spec.ts
```

Scenarios:

- First viewport clearly shows `Richard_L`.
- Skillpkg is visible without scrolling too far.
- Email and GitHub links resolve.
- Project links have accessible names.
- Hero and card text remain readable on mobile.

### Unit 4: Projects section

Files:

```text
src/pages/projects/index.astro
src/pages/projects/skillpkg.astro
src/components/ProjectCard.astro
src/content/projects/skillpkg.md
src/content/projects/sjtu-information-grabber.md
```

Responsibilities:

- Provide a project index.
- Make Skillpkg a proper case study.
- Keep project metadata editable through content files.

Tests:

```text
tests/smoke/content.spec.ts
tests/smoke/navigation.spec.ts
```

Scenarios:

- Project index renders all project content entries.
- Skillpkg page has title, summary, and repository link.
- Missing optional fields do not break rendering.
- Project cards remain aligned with long names.

### Unit 5: Notes and learning section

Files:

```text
src/pages/notes/index.astro
src/pages/notes/data-structure.astro
src/content/notes/data-structure.md
```

Responsibilities:

- Present data-structure learning as a visible theme.
- Link to the repository only if visibility is intentional.
- Provide a place to expand notes later.

Tests:

```text
tests/smoke/content.spec.ts
```

Scenarios:

- Notes index renders at least one note.
- Data-structure page links back to notes index.
- DataStructure repo link is either public or clearly labeled.
- Long note titles wrap cleanly.

### Unit 6: Deployment verification

Files:

```text
.github/workflows/deploy.yml
tests/smoke/home.spec.ts
tests/smoke/navigation.spec.ts
tests/visual/home.spec.ts
```

Responsibilities:

- Verify build before deploy.
- Deploy with GitHub Actions.
- Check the live GitHub Pages URL after first push.

Tests:

```text
tests/smoke/home.spec.ts
tests/smoke/navigation.spec.ts
tests/visual/home.spec.ts
```

Scenarios:

- GitHub Actions completes successfully.
- Live site loads at `https://richardlxr.github.io/`.
- No broken images in the first screen.
- Links to GitHub profile, Skillpkg, and contact work.

## Sequencing

1. Scaffold Astro project.
2. Add base layout, theme tokens, and navigation.
3. Build homepage MVP.
4. Add project and notes content pages.
5. Add Playwright smoke and visual checks.
6. Add GitHub Actions deployment workflow.
7. Create `Richardlxr/Richardlxr.github.io` remote repository.
8. Push and enable Pages with GitHub Actions source.
9. Verify the live page in browser.
10. Polish copy, visuals, and responsive details.

## Risks

### Private DataStructure repository

The profile contribution feed references `Richardlxr/DataStructure`, but anonymous access appears unavailable. If this site is meant for public visitors, either make the repo public or describe the learning notes directly on the site without relying on the repo link.

### GitHub Pages cache delay

GitHub Pages and GitHub README rendering can cache aggressively. Verification should check both raw repository content and the live rendered page after deployment.

### Overbuilding the first version

The first version should not become a full blog engine. Start with a small static site that can grow.

### Third-party image failure

Avoid remote badge/stat services for core UI. Use local SVG and local assets for important visuals.

## Open Questions

These do not block scaffolding, but they affect polish:

- Should the site language be English, Chinese, or bilingual?
- Should `DataStructure` become public?
- Do you want a custom domain later?
- Should the site include a blog-style notes feed or only curated pages?

## References

- GitHub Pages quickstart: https://docs.github.com/pages/quickstart
- GitHub Pages publishing source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Creating a GitHub Pages site: https://docs.github.com/articles/creating-project-pages-manually
- Astro GitHub Pages deploy guide: https://docs.astro.build/en/guides/deploy/github/
- Vite GitHub Pages deployment reference: https://vite.dev/guide/static-deploy

