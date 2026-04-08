import rss from "@astrojs/rss";
import type {MarkdownInstance} from "astro";

interface Frontmatter {
  title: string;
  date: string;
}

export async function GET(context) {
  const rssReadyArticles = Object.values(
      import.meta.glob<MarkdownInstance<Frontmatter>>("./**/*.{md,mdx}", { eager: true }),
  ).sort(
      (a, b) => new Date(a.frontmatter.date) - new Date(b.frontmatter.date),
  ).map((article) => ({
    title: article.frontmatter.title,
    pubDate: new Date(article.frontmatter.date),
    link: article.url
  }));

  return rss({
    title: "Kevin's tinkering diary",
    description: "I sometimes build, I certainly write, you may read",
    site: context.site,
    items: rssReadyArticles,
    customData: `<language>en-us</language>`,
  });
}
