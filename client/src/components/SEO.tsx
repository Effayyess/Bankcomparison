import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noIndex?: boolean;
  schema?: object | object[];
  dateModified?: string;
  datePublished?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const SITE_URL = 'https://businessbankcompare.co.uk';
const SITE_NAME = 'Business Bank Compare';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  schema,
  dateModified,
  datePublished,
  breadcrumbs,
}: SEOProps) {
  const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;
  const today = new Date().toISOString().split('T')[0];

  // Build breadcrumb schema if provided
  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      }
    : null;

  // Normalise schema to array for multi-schema support
  const schemas: object[] = [];
  if (schema) {
    if (Array.isArray(schema)) {
      schemas.push(...schema);
    } else {
      schemas.push(schema);
    }
  }
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  return (
    <Helmet>
      {/* Primary meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* hreflang — UK English targeting */}
      {canonical && <link rel="alternate" hrefLang="en-GB" href={canonical} />}
      {canonical && <link rel="alternate" hrefLang="x-default" href={canonical} />}

      {/* GEO Optimisation */}
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />
      <meta name="geo.position" content="54.7023545;-3.2765753" />
      <meta name="ICBM" content="54.7023545, -3.2765753" />

      {/* Date freshness signals */}
      {datePublished && <meta property="article:published_time" content={datePublished} />}
      <meta property="article:modified_time" content={dateModified || today} />

      {/* Open Graph */}
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@BizBankCompare" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org structured data — supports multiple schemas */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
