import rss from "@astrojs/rss";
import type { APIContext, MarkdownInstance } from "astro";
import { resolveImage } from "../scripts/resolveImage";

interface Frontmatter {
  title: string;
  date: string;
  description?: string;
  image?: string;
}

export async function GET(context: APIContext) {
  const articles = Object.values(
    import.meta.glob<MarkdownInstance<Frontmatter>>("./**/*.{md,mdx}", {
      eager: true,
    }),
  ).sort(
    (a, b) =>
      new Date(a.frontmatter.date).getTime() -
      new Date(b.frontmatter.date).getTime(),
  );

  const items = await Promise.all(
    articles.map(async ({ frontmatter, url }) => ({
      title: frontmatter.title,
      pubDate: new Date(frontmatter.date),
      link: url,
      description: frontmatter.description,
      // media:content is what feed readers (Feedly, NetNewsWire, Inoreader...) use as the thumbnail
      customData: frontmatter.image
        ? `<media:content url="${await resolveImage(frontmatter.image, context.site!)}" medium="image" type="image/jpeg" />`
        : undefined,
    })),
  );

  return rss({
    title: "Kevin's tinkering diary",
    description: "I sometimes build, I certainly write, you may read",
    site: context.site!,
    xmlns: { media: "http://search.yahoo.com/mrss/" },
    items,
    customData: `<language>en-us</language>`,
  });
}
