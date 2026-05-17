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

After adding or editing files, the Next.js app will render the new content automatically.
