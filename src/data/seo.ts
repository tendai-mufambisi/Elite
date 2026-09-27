import { site } from './content';
export function pageHead(title: string, description: string, path: string, schema?: object | object[]) {
  const url = `${site.domain}${path === '/' ? '/' : path}`;
  return {
    meta: [
      { title: `${title} | Elite Gutters and Aluminium Products` },
      { name: 'description', content: description },
      { property: 'og:title', content: `${title} | Elite Gutters and Aluminium Products` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${title} | Elite Gutters and Aluminium Products` },
      { name: 'twitter:description', content: description },
    ],
    links: [{ rel: 'canonical', href: url }],
    ...(schema ? { scripts: [{ type: 'application/ld+json', children: JSON.stringify(schema) }] } : {}),
  };
}
export function breadcrumb(name: string, path: string) { return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: site.domain }, { '@type': 'ListItem', position: 2, name, item: `${site.domain}${path}` }] }; }
export function faqSchema(faqs: readonly (readonly [string, string])[]) { return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }; }
