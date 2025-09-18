// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), mdx()],
  site: "https://justkevin.dev",
  markdown: {
    shikiConfig: {
      theme: "catppuccin-frappe",
    },
  },
});
