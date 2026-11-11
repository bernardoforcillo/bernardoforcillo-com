---
draft: true
---
# Markdown CMS

This folder is the content source for your website CMS.

## Structure

- `blog/<category-slug>/<post-slug>.md`
- `projects/<project-slug>.md`
- `notes/<note-slug>.md`

## Blog frontmatter

```yaml
title: My Post
description: Short summary
date: 2026-04-16
tags:
  - nextjs
  - markdown
```

## Project frontmatter

```yaml
title: My Project
description: Short summary
date: 2026-04-16
stack:
  - nextjs
  - react
repoUrl: https://github.com/user/repo
demoUrl: https://example.com
```

## Notes frontmatter

```yaml
title: My Note
description: Short summary
date: 2026-04-16
```

## Math (LaTeX)

Write LaTeX inline as `$E = mc^2$` or as a block between `$$` lines. KaTeX
typesets it at build time, so the page ships finished HTML and no script:

```md
$$
t_{\text{early warning}} \le t_a + 24\,\text{h}
$$
```

A literal dollar sign is written `\$`.

After adding or editing files, run the build: the content is compiled to HTML and prerendered, so a new post ships with the next deploy.
