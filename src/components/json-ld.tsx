import { BASE_SITE_URL } from "@/constant";
import { safeJsonLdReplacer } from "@/util/safe-json-ld-replacer";

type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders JSON-LD structured data in a script tag.
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */
export const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: safeJsonLdReplacer(
          JSON.stringify({
            "@context": "https://schema.org",
            ...data,
          }),
        ),
      }}
      type="application/ld+json"
    />
  );
};

/**
 * Site-wide Organization schema
 */
export const OrganizationJsonLd = () => (
  <JsonLd
    data={{
      "@type": "Organization",
      logo: `${BASE_SITE_URL}/logo.png`,
      name: "OPISTA",
      url: BASE_SITE_URL,
    }}
  />
);

type ArticleJsonLdProps = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
};

/**
 * Article schema for blog posts
 */
export type FaqJsonLdProps = {
  items: { question: string; answer: string }[];
};

/**
 * FAQPage schema for FAQs
 */
export const FaqJsonLd = ({ items }: FaqJsonLdProps) => (
  <JsonLd
    data={{
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
        name: item.question,
      })),
    }}
  />
);

export type BreadcrumbListJsonLdProps = {
  items: { label: string; url?: string }[];
};

/**
 * BreadcrumbList schema for navigation
 */
export const BreadcrumbListJsonLd = ({ items }: BreadcrumbListJsonLdProps) => (
  <JsonLd
    data={{
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        name: item.label,
        position: index + 1,
        ...(item.url ? { item: item.url } : {}),
      })),
    }}
  />
);

export const ArticleJsonLd = ({
  dateModified,
  datePublished,
  description,
  image,
  title,
  url,
}: ArticleJsonLdProps) => (
  <JsonLd
    data={{
      "@type": "Article",
      author: {
        "@type": "Organization",
        name: "OPISTA",
        url: BASE_SITE_URL,
      },
      dateModified,
      datePublished,
      description,
      headline: title,
      image: image || `${BASE_SITE_URL}/logo.png`,
      publisher: {
        "@type": "Organization",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_SITE_URL}/logo.png`,
        },
        name: "OPISTA",
        url: BASE_SITE_URL,
      },
      url,
    }}
  />
);
