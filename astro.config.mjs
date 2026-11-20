// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), mdx()],
  site: "https://justkevin.dev",
  image: {
    // portfolio cards load the projects' Open Graph images at build time
    domains: ["drakkenheim-beyond.vercel.app", "spell-overview.vercel.app"],
  },
  markdown: {
    shikiConfig: {
      theme: "catppuccin-frappe",
    },
  },
});
