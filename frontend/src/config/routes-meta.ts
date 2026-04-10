/**
 * Centralized SEO Metadata Configuration
 * This file manages the metadata for different routes in the application.
 */

export const ROUTES_META = {
  home: {
    title: "Home",
    description: "Discover amazing Android apps by Sajuriya Studio. Quality mobile applications for productivity, education, and everyday life.",
    keywords: "android apps, mobile apps, sajuriya studio, productivity",
  },
  about: {
    title: "About Us",
    description: "Learn more about Sajuriya Studio, our mission, and our journey in building useful Android applications.",
    keywords: "sajuriya studio about, app development, cumilla apps",
  },
  privacy: {
    title: "Privacy Policy",
    description: "Our commitment to your privacy. Read the privacy policy for Sajuriya Studio apps and website.",
    keywords: "privacy policy, data protection, app privacy",
  },
  admin: {
    title: "Admin Dashboard",
    description: "Administrative interface for managing apps and syncing with backend services.",
    keywords: "admin, dashboard, management",
  },
} as const;

export type RouteKey = keyof typeof ROUTES_META;
