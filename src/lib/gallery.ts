import { galleryItems as fallbackItems, galleryTags as fallbackTags } from "@/content/site-data";
import { fetchFromStrapi, getStrapiUrl } from "@/lib/strapi";

type StrapiCollectionResponse<T> = {
  data: T[];
};

type StrapiTag = {
  id: number;
  name: string;
  slug: string | null;
  order: number | null;
};

type StrapiImageFormat = {
  url: string;
};

type StrapiGalleryItem = {
  id: number;
  title: string;
  order: number | null;
  image: {
    url: string;
    alternativeText: string | null;
    formats?: {
      large?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      small?: StrapiImageFormat;
      thumbnail?: StrapiImageFormat;
    };
  } | null;
  gallery_tag: StrapiTag | null;
};

export type GalleryItem = {
  id: number;
  title: string;
  image: string;
  alt: string;
  tag: string;
  height: string;
};

export type GalleryData = {
  tags: string[];
  items: GalleryItem[];
};

const masonryHeights = ["h-72", "h-[28rem]", "h-80", "h-64", "h-96", "h-72"];

function toAbsoluteImageUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return getStrapiUrl(url);
}

function formatTagName(tagName: string) {
  if (!tagName) {
    return "Sin categoría";
  }

  return tagName.charAt(0).toUpperCase() + tagName.slice(1);
}

export async function getGalleryData(): Promise<GalleryData> {
  try {
    const [tagsResponse, itemsResponse] = await Promise.all([
      fetchFromStrapi<StrapiCollectionResponse<StrapiTag>>(
        "/api/gallery-tags?sort[0]=order:asc&sort[1]=name:asc",
      ),
      fetchFromStrapi<StrapiCollectionResponse<StrapiGalleryItem>>(
        "/api/gallery-items?populate=*&sort[0]=order:asc&sort[1]=title:asc",
      ),
    ]);

    const tags = ["Todas", ...new Set(tagsResponse.data.map((tag) => formatTagName(tag.name)))];

    const items = itemsResponse.data
      .filter((item) => item.image?.url)
      .map((item, index) => ({
        id: item.id,
        title: item.title,
        image: toAbsoluteImageUrl(
          item.image?.formats?.large?.url ||
            item.image?.formats?.medium?.url ||
            item.image?.url ||
            "",
        ),
        alt: item.image?.alternativeText || item.title,
        tag: formatTagName(item.gallery_tag?.name || "Sin categoría"),
        height: masonryHeights[index % masonryHeights.length],
      }));

    if (!items.length) {
      return { tags: fallbackTags, items: fallbackItems.map((item, index) => ({ ...item, id: index + 1, alt: item.title })) };
    }

    return { tags, items };
  } catch {
    return {
      tags: fallbackTags,
      items: fallbackItems.map((item, index) => ({
        ...item,
        id: index + 1,
        alt: item.title,
      })),
    };
  }
}
