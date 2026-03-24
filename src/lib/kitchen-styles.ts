import { styleProfiles as fallbackProfiles } from "@/content/site-data";
import { fetchFromStrapi, getStrapiUrl } from "@/lib/strapi";

type StrapiCollectionResponse<T> = {
  data: T[];
};

type StrapiImageFormat = {
  url: string;
};

type StrapiKitchenStyle = {
  id: number;
  name: string;
  description: string | null;
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
};

export type KitchenStyleProfile = {
  id: number;
  name: string;
  description: string;
  image: string;
  alt: string;
  details: string[];
};

function toAbsoluteImageUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return getStrapiUrl(url);
}

function getFallbackProfiles(): KitchenStyleProfile[] {
  return fallbackProfiles.map((profile, index) => ({
    id: index + 1,
    name: profile.name,
    description: profile.blurb,
    image: profile.image,
    alt: profile.name,
    details: profile.details,
  }));
}

export async function getKitchenStyleProfiles(): Promise<KitchenStyleProfile[]> {
  try {
    const response = await fetchFromStrapi<StrapiCollectionResponse<StrapiKitchenStyle>>(
      "/api/kitchen-styles?populate=*&sort[0]=order:asc&sort[1]=name:asc",
    );

    const profiles = response.data
      .filter((style) => style.image?.url)
      .map((style) => ({
        id: style.id,
        name: style.name,
        description: style.description || "",
        image: toAbsoluteImageUrl(
          style.image?.formats?.large?.url ||
            style.image?.formats?.medium?.url ||
            style.image?.url ||
            "",
        ),
        alt: style.image?.alternativeText || style.name,
        details: [],
      }));

    if (!profiles.length) {
      return getFallbackProfiles();
    }

    return profiles;
  } catch {
    return getFallbackProfiles();
  }
}
