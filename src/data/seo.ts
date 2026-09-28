import { site, type Service } from "./content";
import { getImage } from "./images";

const absolute = (path: string) => (path.startsWith("http") ? path : `${site.domain}${path}`);

export function pageHead(
  title: string,
  description: string,
  path: string,
  schema?: object | object[],
  imageSlot = "og-default",
) {
  const url = `${site.domain}${path}`;
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const image = getImage(imageSlot);
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: absolute(image.src) },
      { property: "og:image:alt", content: image.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absolute(image.src) },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: schemas.map((item) => ({
      type: "application/ld+json",
      children: JSON.stringify(item),
    })),
  };
}

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.domain}/#business`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.domain,
  logo: `${site.domain}/images/brand/logo-icon.png`,
  image: absolute(getImage("og-default").src),
  telephone: site.phone,
  email: site.email,
  sameAs: [site.facebook],
};

/** Crumbs after Home, e.g. breadcrumb(['Fascia Boards', '/services/fascia-boards']). */
export function breadcrumb(...crumbs: [name: string, path: string][]) {
  const items = [["Home", "/"] as [string, string], ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${site.domain}${path}`,
    })),
  };
}

export function faqSchema(faqs: readonly (readonly [string, string])[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.metaTitle,
    description: service.intro,
    url: `${site.domain}/services/${service.slug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${site.domain}/#business`,
      name: site.name,
    },
  };
}
