const STRAPI_URL = process.env.STRAPI_URL || process.env.STRAPI_DEV_URL || "";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

function buildHeaders() {
  const headers = new Headers();

  if (STRAPI_API_TOKEN) {
    headers.set("Authorization", `Bearer ${STRAPI_API_TOKEN}`);
  }

  return headers;
}

export function getStrapiUrl(path = "") {
  if (!STRAPI_URL) {
    return path;
  }

  return `${STRAPI_URL}${path}`;
}

export async function fetchFromStrapi<T>(path: string) {
  if (!STRAPI_URL) {
    throw new Error("STRAPI_URL is not configured");
  }

  const response = await fetch(getStrapiUrl(path), {
    headers: buildHeaders(),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}
