import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { SEO } from "@/components/SEO";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppCard } from "@/components/AppCard";
import { AppCardSkeleton } from "@/components/AppCardSkeleton";
import { getApps } from "@/lib/api";
import heroCoverMobile from "@/assets/hero-cover.jpg";
import heroCoverDesktop from "@/assets/desktop-hero-cover.png";
import type { AppData } from "@/types/app";

export default function Index() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApps()
      .then(setApps)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO />
      <AmbientBackground />
      <Navbar />

      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Cover background - Mobile */}
          <div className="absolute inset-0 md:hidden">
            <img src={heroCoverMobile} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          </div>
          {/* Cover background - Desktop */}
          <div className="absolute inset-0 hidden md:block">
            <img src={heroCoverDesktop} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          </div>

          <div className="container text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono tracking-widest text-primary mb-6">
                <Smartphone className="h-3 w-3" />
                ANDROID APPS
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gradient leading-tight">
                Apps by Sajuriya Studio
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Sajuriya Studio builds and publishes simple Android apps focused on real-world usefulness.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Apps Grid - Overlapping with Hero */}
        <section className="pb-24 md:pb-32 -mt-12 md:-mt-16 relative z-10">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <AppCardSkeleton key={i} />)
                : apps.map((app, i) => <AppCard key={app.packageName} app={app} index={i} />)}
            </div>

            {!loading && apps.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No apps available yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
