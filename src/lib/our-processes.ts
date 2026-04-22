import { detailedProcess as fallbackDetailedProcess } from "@/content/site-data";
import { fetchFromStrapi, getStrapiUrl } from "@/lib/strapi";

type StrapiCollectionResponse<T> = {
  data: T[];
};

type StrapiImageFormat = {
  url: string;
};

type StrapiOurProcess = {
  id: number;
  step: number | null;
  title: string;
  description: string | null;
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

export type ProcessStep = {
  id: number;
  stepNumber: number;
  title: string;
  body: string;
  image: string;
  alt: string;
};

function toAbsoluteImageUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return getStrapiUrl(url);
}

function normalizeText(value: string | null | undefined) {
  return value?.trim() || "";
}

function getFallbackProcessSteps(): ProcessStep[] {
  return fallbackDetailedProcess.map((step, index) => ({
    id: index + 1,
    stepNumber: index + 1,
    title: step.title.replace(/^\d+\.\s*/, ""),
    body: step.body,
    image: step.image,
    alt: step.title,
  }));
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const response = await fetchFromStrapi<StrapiCollectionResponse<StrapiOurProcess>>(
      "/api/our-processes?populate=*",
    );

    const steps = response.data
      .filter((item) => item.image?.url)
      .sort((a, b) => (a.step ?? Number.MAX_SAFE_INTEGER) - (b.step ?? Number.MAX_SAFE_INTEGER))
      .map((item, index) => ({
        id: item.id,
        stepNumber: item.step ?? index + 1,
        title: normalizeText(item.title) || `Fase ${index + 1}`,
        body: normalizeText(item.description),
        image: toAbsoluteImageUrl(
          item.image?.formats?.large?.url ||
            item.image?.formats?.medium?.url ||
            item.image?.formats?.small?.url ||
            item.image?.url ||
            "",
        ),
        alt: normalizeText(item.image?.alternativeText) || normalizeText(item.title) || `Fase ${index + 1}`,
      }))
      .filter((item) => item.body.length > 0);

    if (!steps.length) {
      return getFallbackProcessSteps();
    }

    return steps;
  } catch {
    return getFallbackProcessSteps();
  }
}
