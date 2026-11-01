import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

const assets = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpg,jpeg,png,webp}",
);

/** Turns a frontmatter path like "@assets/orrery/x.webp" into an absolute URL of an optimized jpg. */
export async function resolveImage(image: string, site: URL): Promise<URL> {
  const load = assets[image.replace(/^@assets\//, "/src/assets/")];
  if (!load) throw new Error(`image not found in src/assets: ${image}`);
  const { src } = await getImage({
    src: (await load()).default,
    width: 1200,
    format: "jpg",
  });
  return new URL(src, site);
}
