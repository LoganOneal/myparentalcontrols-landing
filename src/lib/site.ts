export const SITE_URL = "https://myparentalcontrols.com";
export const SITE_NAME = "Koda";
export const SITE_ALTERNATE_NAME = "Koda Safety";

export const SITE_DESCRIPTION =
  "Koda Safety is a parental control system for PC games, voice chat, and online child safety alerts.";

export const KODA_PRODUCT_DESCRIPTION =
  "Koda Safety monitors voice and chat across PC games and online platforms so parents can see risks like grooming, bullying, threats, and harmful language in real time.";

export const KODA_SOCIAL_LINKS = [
  "https://www.linkedin.com/company/myparentalcontrols/",
  "https://www.instagram.com/myparentalcontrols/",
  "https://www.tiktok.com/@myparentalcontrols",
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/seo/logo.png`,
  sameAs: KODA_SOCIAL_LINKS,
  description: SITE_DESCRIPTION,
  email: "support@myparentalcontrols.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "160 W. Camino Real #594",
    addressLocality: "Boca Raton",
    addressRegion: "FL",
    postalCode: "33432",
    addressCountry: "US",
  },
};

export const kodaSafetySoftwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/koda-safety#software`,
  name: "Koda Safety",
  alternateName: "Koda parental security",
  applicationCategory: "ParentalControlApplication",
  operatingSystem: "Windows, macOS",
  url: `${SITE_URL}/koda-safety`,
  image: `${SITE_URL}/seo/opengraph.jpg`,
  brand: {
    "@id": `${SITE_URL}/#organization`,
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  description: KODA_PRODUCT_DESCRIPTION,
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/#pricing`,
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
  },
};
