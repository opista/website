const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://www.googletagmanager.com https://*.google-analytics.com;
  connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  frame-src 'self' https://www.youtube-nocookie.com;
  block-all-mixed-content;
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [100, 75],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Permissions-Policy",
            value: "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/apps/avios-reminder",
        destination: "/apps/airmiles-reminder",
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
