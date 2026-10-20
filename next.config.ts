import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-server memory tuning (no effect on production builds).
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // The project's original Vercel address still serves the site. Send anyone
  // who lands there to the real domain so there is only one public address.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "portfolio-nu-khaki-xm3yeieivq.vercel.app" }],
        destination: "https://www.garydelacruz.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
