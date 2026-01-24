# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server at localhost:4321
- `npm run build` - Type check and build the site (runs `astro check && astro build`)
- `npm run preview` - Preview the built site locally
- `npm run local-present` - Start dev server with network access

## Architecture Overview

This is an Astro-based personal blog with a client/server monorepo structure:

### Client (`/client/`)
- **Framework**: Astro 4 with React, and Tailwind CSS
- **Content**: MDX-based blog posts in `src/content/posts/`
- **Components**: Mix of Astro components and React components for interactive features
- **Styling**: Tailwind CSS with custom font (Space Grotesk Variable)
- **Math**: KaTeX integration for mathematical expressions
- **Analytics**: PostHog integration via Partytown for performance

### Server (`/server/`)
- Backend services using Docker and Typesense for full-text search

### Key Files and Patterns
- `src/content/config.ts` - Defines content collections schema for blog posts
- `src/consts.ts` - Global site constants (SITE_TITLE, SITE_DESCRIPTION)
- `src/layouts/` - Page and blog post layout templates
- `src/components/` - Reusable Astro and React components
- `astro.config.mjs` - Astro configuration with integrations for MDX, React, Tailwind, etc.

### Content Management
- Blog posts are MDX files in `src/content/posts/[slug]/index.mdx`
- Each post includes frontmatter with title, dates, description, heroImagePath
- Draft posts can be marked with `draft: true` in frontmatter
- Images are stored alongside posts in their respective directories

### Development Workflow
- All client-side development happens in the `/client/` directory
- TypeScript is configured with strict mode and React JSX support
- The project uses Astro content collections for type-safe content management
- Components support both server-side rendering and client-side hydration when needed