import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import remarkMath from "remark-math";
import rehypeKatex from 'rehype-katex';
import partytown from "@astrojs/partytown";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), tailwind(), icon(), partytown(), react()],
  markdown: {
    // Applied to .md and .mdx files
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});