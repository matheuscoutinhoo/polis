import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Only honored by browsers over HTTPS (production on Railway).
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

// Addresses from before each reference current got its own module. The lessons
// were moved (progress is kept); the old combined modules point to the new ones.
const MOVED_LESSONS: Array<[from: string, to: string]> = [
  ["liberalismos-e-conservadorismos/liberalismos", "liberalismos/individuo-direitos-e-limites-ao-poder"],
  ["liberalismos-e-conservadorismos/conservadorismos", "conservadorismos/tradicao-e-continuidade"],
  ["social-democracia-socialismos-e-comunismo/social-democracia", "social-democracia/reformas-direitos-sociais-e-mercado"],
  ["social-democracia-socialismos-e-comunismo/socialismos-e-comunismo", "socialismos/propriedade-classes-e-transicao"],
  ["anarquismos-e-libertarianismos/anarquismos", "anarquismos/autoridade-e-estado"],
  ["anarquismos-e-libertarianismos/libertarianismos", "libertarianismos/liberdade-individual-e-justica"],
];
const MOVED_MODULES = ["liberalismos-e-conservadorismos", "social-democracia-socialismos-e-comunismo", "anarquismos-e-libertarianismos"];

const nextConfig: NextConfig = {
  // Personalized, privacy-sensitive pages render per request (previous caching
  // model), so private questionnaire results never enter a shared cache.
  cacheComponents: false,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      ...MOVED_LESSONS.map(([from, to]) => ({ source: `/aprender/${from}`, destination: `/aprender/${to}`, permanent: true })),
      ...MOVED_MODULES.map((slug) => ({ source: `/aprender/${slug}`, destination: "/aprender?tema=ideias", permanent: true })),
    ];
  },
};

export default nextConfig;
