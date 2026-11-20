import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

const assets = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpg,jpeg,png,webp}",
);

/** Loads a frontmatter path like "@assets/orrery/x.webp" as image metadata for <Image>. */
export async function loadImage(image: string): Promise<ImageMetadata> {
  const load = assets[image.replace(/^@assets\//, "/src/assets/")];
  if (!load) throw new Error(`image not found in src/assets: ${image}`);
  return (await load()).default;
}

/** Turns a frontmatter path like "@assets/orrery/x.webp" into an absolute URL of an optimized jpg. */
export async function resolveImage(image: string, site: URL): Promise<URL> {
  const { src } = await getImage({
    src: await loadImage(image),
    width: 1200,
    format: "jpg",
  });
  return new URL(src, site);
}
