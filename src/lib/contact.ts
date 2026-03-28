import { contactDetails as fallbackContactDetails } from "@/content/site-data";
import { fetchFromStrapi } from "@/lib/strapi";

type StrapiSingleResponse<T> = {
  data: T | null;
};

type StrapiContact = {
  mail: string | null;
  phone: string | null;
  address: string | null;
};

export type ContactDetails = {
  email: string;
  phone: string;
  address: string;
};

function hasValue(value: string | null | undefined) {
  return Boolean(value && value.trim().length > 0);
}

function withFallback(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function formatPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length !== 11) {
    return phone;
  }

  const prefix = digits.slice(0, 2);
  const body = digits.slice(2);

  return `+${prefix} ${body.slice(0, 3)} ${body.slice(3, 5)} ${body.slice(5, 7)} ${body.slice(7, 9)}`;
}

export async function getContactDetails(): Promise<ContactDetails> {
  try {
    const response = await fetchFromStrapi<StrapiSingleResponse<StrapiContact>>(
      "/api/contact",
    );

    const contact = response.data;

    if (!contact) {
      return fallbackContactDetails;
    }

    return {
      email: withFallback(contact.mail, fallbackContactDetails.email),
      phone: formatPhoneNumber(withFallback(contact.phone, fallbackContactDetails.phone)),
      address: withFallback(contact.address, fallbackContactDetails.address),
    };
  } catch {
    return fallbackContactDetails;
  }
}
