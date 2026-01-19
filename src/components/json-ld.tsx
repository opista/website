import { BASE_SITE_URL } from "@/constant";

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
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }),
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
      name: "OPISTA",
      url: BASE_SITE_URL,
      logo: `${BASE_SITE_URL}/logo.png`,
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
export const ArticleJsonLd = ({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: ArticleJsonLdProps) => (
  <JsonLd
    data={{
      "@type": "Article",
      headline: title,
      description,
      url,
      datePublished,
      dateModified,
      image: image || `${BASE_SITE_URL}/logo.png`,
      author: {
        "@type": "Organization",
        name: "OPISTA",
        url: BASE_SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "OPISTA",
        url: BASE_SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_SITE_URL}/logo.png`,
        },
      },
    }}
  />
);
