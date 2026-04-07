import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Download, ExternalLink, Image } from "lucide-react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import type { AppData } from "@/types/app";

export default function AppDetail() {
  const { packageName } = useParams<{ packageName: string }>();
  const [app, setApp] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [iconError, setIconError] = useState(false);
  const [featuredImageError, setFeaturedImageError] = useState(false);
  const [screenshotErrors, setScreenshotErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!packageName) return;
    getDoc(doc(db, "apps", packageName))
      .then((snap) => {
        if (snap.exists()) setApp({ id: snap.id, ...snap.data() } as AppData);
      })
      .finally(() => setLoading(false));
  }, [packageName]);

  if (loading) {
    return (
      <>
        <AmbientBackground />
        <Navbar />
        <main className="min-h-screen pt-24">
          <div className="container">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-48 rounded bg-white/[0.05]" />
              <div className="h-64 rounded-2xl bg-white/[0.05]" />
              <div className="h-4 w-3/4 rounded bg-white/[0.05]" />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!app) {
    return (
      <>
        <AmbientBackground />
        <Navbar />
        <main className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground">App not found</h1>
            <Link to="/" className="mt-4 inline-block text-primary hover:underline">
              Back to apps
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title={app.title}
        description={app.shortDescription}
        image={app.featuredImage || app.icon}
        url={`https://studio.sajuriya.com/app/${app.packageName}`}
        type="article"
        keywords={`${app.title}, android app, ${app.shortDescription}, mobile app, sajuriya studio`}
        publishedTime={app.createdAt}
        modifiedTime={app.updatedAt}
        author="Sajuriya Studio"
        section="Android Apps"
        tags={[app.title, 'Android App', 'Mobile App', 'Google Play']}
      />
      
      {/* MobileApplication Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            name: app.title,
            description: app.fullDescription || app.shortDescription,
            url: `https://studio.sajuriya.com/app/${app.packageName}`,
            image: app.featuredImage || app.icon,
            applicationCategory: "Application",
            operatingSystem: "Android",
            softwareVersion: "1.0",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: app.rating > 0 ? {
              "@type": "AggregateRating",
              ratingValue: app.rating.toFixed(1),
              ratingCount: Math.round(app.totalDownloads / 10),
              bestRating: "5",
              worstRating: "1",
            } : undefined,
            author: {
              "@type": "Organization",
              name: "Sajuriya Studio",
              url: "https://studio.sajuriya.com",
            },
          })}
        </script>
      </Helmet>
      
      <AmbientBackground />
      <Navbar />

      <main className="min-h-screen pt-20 pb-24">
        <div className="container max-w-4xl">
          {/* Back */}
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to apps
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {app.icon && !iconError ? (
                <img 
                  src={app.icon} 
                  alt={app.title} 
                  className="h-20 w-20 rounded-2xl border border-white/10 object-cover bg-white/[0.05]"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={() => setIconError(true)}
                />
              ) : (
                <div className="h-20 w-20 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-semibold text-muted-foreground">
                    {app.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-semibold text-gradient tracking-tight">{app.title}</h1>
                <p className="mt-2 text-muted-foreground">{app.shortDescription}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {app.rating > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> {app.rating.toFixed(1)}
                    </span>
                  )}
                  {app.totalDownloads > 0 && (
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" /> {app.totalDownloads.toLocaleString()} downloads
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <a href={app.playStoreLink} target="_blank" rel="noopener noreferrer">
                    <Button>
                      <ExternalLink className="mr-2 h-4 w-4" /> View on Play Store
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Featured Image - 512x250px (2.05:1 aspect ratio) */}
            {app.featuredImage && !featuredImageError ? (
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.05]" style={{ aspectRatio: '512/250' }}>
                <img 
                  src={app.featuredImage} 
                  alt={`${app.title} featured`} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={() => setFeaturedImageError(true)}
                />
              </div>
            ) : app.featuredImage && featuredImageError ? (
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.05] flex items-center justify-center" style={{ aspectRatio: '512/250' }}>
                <Image className="h-16 w-16 text-muted-foreground/50" />
              </div>
            ) : null}

            {/* Screenshots */}
            {app.screenshots && Array.isArray(app.screenshots) && app.screenshots.length > 0 ? (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Screenshots</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                  {app.screenshots.filter(src => src && src.trim() !== '').map((src, i) => (
                    screenshotErrors[i] ? (
                      <div
                        key={i}
                        className="h-80 w-[180px] rounded-xl border border-white/[0.06] bg-white/[0.05] flex-shrink-0 flex items-center justify-center"
                      >
                        <Image className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    ) : (
                      <img
                        key={i}
                        src={src.trim()}
                        alt={`${app.title} screenshot ${i + 1}`}
                        className="h-80 w-[180px] rounded-xl border border-white/[0.06] flex-shrink-0 object-cover bg-white/[0.05]"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          console.error(`Failed to load screenshot ${i + 1}:`, src);
                          setScreenshotErrors((prev) => ({ ...prev, [i]: true }));
                        }}
                      />
                    )
                  ))}
                </div>
                {app.screenshots.filter(src => src && src.trim() !== '').length === 0 && (
                  <p className="text-muted-foreground text-sm">No screenshots available</p>
                )}
              </div>
            ) : (
              <div className="mt-8 glass-card p-6 rounded-2xl">
                <p className="text-muted-foreground text-sm">No screenshots available for this app</p>
              </div>
            )}

            {/* Description */}
            <div className="mt-8 glass-card p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">About this app</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{app.fullDescription}</p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
