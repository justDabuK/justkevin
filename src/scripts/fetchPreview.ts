export interface Preview {
  title?: string;
  description?: string;
  image?: string;
}

const entities: Record<string, string> = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&lt;": "<",
  "&gt;": ">",
};

/** Reads a page's Open Graph tags at build time; returns {} if the page or its image is unreachable. */
export async function fetchPreview(url: string): Promise<Preview> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    // shortcut: expects `property` before `content`, as Astro renders it; use an HTML parser for foreign sites
    const og = (name: string) =>
      html
        .match(new RegExp(`<meta property="og:${name}" content="([^"]*)"`))?.[1]
        ?.replace(/&(amp|quot|#39|lt|gt);/g, (e) => entities[e]);
    let image = og("image");
    // a dead image URL would fail the build in <Image inferSize>
    if (image && !(await fetch(image, { method: "HEAD" })).ok)
      image = undefined;
    return { title: og("title"), description: og("description"), image };
  } catch (error) {
    console.warn(`no preview for ${url}:`, error);
    return {};
  }
}
