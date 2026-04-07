import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { SEO } from "@/components/SEO";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import heroCoverMobile from "@/assets/hero-cover.jpg";
import heroCoverDesktop from "@/assets/desktop-hero-cover.png";
import developerBanner from "@/assets/developer-jakir-promotional-banner.png";

export default function About() {
  return (
    <>
      <SEO
        title="About — Sajuriya Studio"
        description="Sajuriya Studio builds and publishes simple Android apps focused on real-world usefulness."
      />
      <AmbientBackground />
      <Navbar />

      <main className="min-h-screen pt-16">
        {/* Hero banner with cover page */}
        <section className="relative overflow-hidden">
          {/* Mobile hero */}
          <div className="absolute inset-0 md:hidden">
            <img
              src={heroCoverMobile}
              alt="Sajuriya Studio cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
          </div>
          {/* Desktop hero */}
          <div className="absolute inset-0 hidden md:block">
            <img
              src={heroCoverDesktop}
              alt="Sajuriya Studio cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
          </div>
          <div className="relative container py-24 md:py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gradient leading-tight break-words">
                About Sajuriya Studio
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Sajuriya Studio builds and publishes simple Android apps focused on real-world usefulness.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cover Page Display */}
        {/* <section className="py-8">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-4 md:p-8 rounded-2xl overflow-hidden"
            >
           
              <img
                src={heroCoverMobile}
                alt="Sajuriya Studio Cover Page"
                className="w-full h-auto rounded-xl shadow-2xl md:hidden"
              />
             
              <img
                src={heroCoverDesktop}
                alt="Sajuriya Studio Cover Page"
                className="w-full h-auto rounded-xl shadow-2xl hidden md:block"
              />
            </motion.div>
          </div>
        </section> */}

        {/* Developer Promotion Banner */}
        <section className="py-8">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-4 md:p-6 rounded-2xl overflow-hidden"
            >
              <img
                src={developerBanner}
                alt="Developer Jakir - Promotional Banner"
                className="w-full h-auto rounded-xl shadow-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>

        {/* Info section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Organization details */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <h2 className="text-xl font-semibold text-foreground mb-6">Organization</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">ORGANIZATION NAME</p>
                    <p className="text-foreground font-medium">SAJURIYA</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">DEVELOPER NAME</p>
                    <p className="text-foreground font-medium">Sajuriya Studio</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">ADDRESS</p>
                      <p className="text-sm text-foreground/80">
                        Kakoirkhola, Sukchail, Chauddagram<br />
                        Cumilla — 3583<br />
                        Bangladesh (BD)
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <h2 className="text-xl font-semibold text-foreground mb-6">Contact</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">PHONE / WHATSAPP</p>
                      <a
                        href="https://wa.me/8801864091946"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/80 hover:text-primary transition-colors"
                      >
                        +880 1864 091946
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">EMAIL</p>
                      <a
                        href="mailto:mdjakirkhan4928@gmail.com"
                        className="text-sm text-foreground/80 hover:text-primary transition-colors"
                      >
                        mdjakirkhan4928@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ExternalLink className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">PLAY STORE</p>
                      <a
                        href="https://play.google.com/store/apps/dev?id=6495908705399463745"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/80 hover:text-primary transition-colors"
                      >
                        View Developer Page
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-6 md:p-8 rounded-2xl mt-8"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Sajuriya Studio, we believe in building simple, useful Android applications that solve real everyday problems.
                Our focus is on clean design, lightweight performance, and genuine utility. Every app we publish on the Google Play Store
                is crafted with attention to detail and a commitment to making technology accessible for everyone.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Based in Cumilla, Bangladesh, we are a small but passionate team dedicated to delivering quality mobile experiences.
                Whether it's productivity tools, educational resources, or everyday utilities — we build apps that matter.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
