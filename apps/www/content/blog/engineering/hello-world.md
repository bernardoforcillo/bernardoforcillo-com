---
title: Hello World
description: Why this site is a static bundle of HTML served by a Go binary.
date: 2026-04-16
tags:
  - engineering
  - tanstack
---

This site has no request-time server requirement. There are no route handlers,
no middleware, and exactly one data source: markdown files on disk. Everything
you are reading was rendered once, at build time, and is now being handed to you
by a Go binary that embeds the whole site.

## Why prerender only

Prerendering writes a real `index.html` for every route. That matters for the
single most important URL on the site — the home page — because a client-only
shell would ship an empty document to every crawler that asks for it.

```ts
export const greet = (name: string): string => {
  return `Hello, ${name}!`;
};
```

## What it costs

A static bundle cannot personalise a response, and it cannot read a database.
Neither of those is a thing this site does.
