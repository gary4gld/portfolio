import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-server memory tuning (no effect on production builds).
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Security headers on every response. A full Content-Security-Policy is left
  // out on purpose: Next.js, the JSON-LD block and Vercel Analytics rely on
  // inline scripts, and a strict CSP would need nonces to avoid breaking them.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Don't let browsers guess file types (stops MIME-sniffing attacks)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send only the origin, not full URLs, to other sites
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Don't allow the site to be embedded in other sites (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          // The site never needs these browser features
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          // Always use HTTPS for two years (domain and subdomains)
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
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
