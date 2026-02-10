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
