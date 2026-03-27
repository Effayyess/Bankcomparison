import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noIndex?: boolean;
  schema?: object;
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
}: SEOProps) {
  const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;

  return (
    <Helmet>
      {/* Primary meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* GEO Optimisation */}
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />

      {/* Open Graph */}
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
