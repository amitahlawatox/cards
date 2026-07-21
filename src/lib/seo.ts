import { SITE, absoluteUrl } from './site';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.domain,
    logo: absoluteUrl(SITE.ogImage),
    email: SITE.email,
    description: SITE.defaultDescription,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE.email,
        availableLanguage: ['English'],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.domain}/occasions/`,
      'query-input': 'required name=occasion',
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function howToSchema({
  name,
  description,
  path,
  steps,
}: {
  name: string;
  description: string;
  path: string;
  steps: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url: absoluteUrl(path),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step,
      text: step,
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
  type = 'Article',
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'Article' | 'BlogPosting' | 'WebPage';
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: Record<string, unknown>;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(path),
    },
    image: absoluteUrl(image ?? SITE.ogImage),
    author: author ?? {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.domain,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.domain,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(SITE.ogImage),
      },
    },
  };

  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;

  return schema;
}
