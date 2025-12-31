const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

module.exports = withPlugins([[withBundleAnalyzer]], {
  images: {
    qualities: [100, 75],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/apps/avios-reminder",
        destination: "/apps/airmiles-reminder",
        permanent: true,
      },
    ];
  },
});
