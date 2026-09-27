import { motion } from "framer-motion";
import { Mail, Shield, Database, Eye, Lock, AlertCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy — Sajuriya Studio"
        description="Privacy Policy for Sajuriya Studio and studio.sajuriya.com. Learn how we collect, use, and protect your data."
      />
      <AmbientBackground />
      <Navbar />

      <main className="min-h-screen pt-16">
        {/* Hero banner */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background/80 to-background" />
          <div className="relative container py-24 md:py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gradient leading-tight">
                Privacy Policy
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Website: <a href="https://jakirhossen.xyz" className="text-primary hover:underline">jakirhossen.xyz</a>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="space-y-8">
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sajuriya Studio ("we", "our", or "us") operates <a href="https://studio.sajuriya.com" className="text-primary hover:underline">studio.sajuriya.com</a> and publishes Android applications on the Google Play Store. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website or applications.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please read this privacy policy carefully. By accessing or using our services, you acknowledge that you have read and understood this policy.
                </p>
              </motion.div>

              {/* Information We Collect */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <div className="flex items-start gap-4 mb-6">
                  <Database className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Personal Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may collect personally identifiable information that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1">
                      <li>Contact us via email or phone</li>
                      <li>Subscribe to newsletters or updates</li>
                      <li>Submit feedback or support requests</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-2">
                      This may include your name, email address, phone number, and any other information you choose to provide.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">Automatically Collected Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      When you visit our website, certain information may be collected automatically, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1">
                      <li>IP address and browser type</li>
                      <li>Device information and operating system</li>
                      <li>Pages visited and time spent on our website</li>
                      <li>Referring website addresses</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* How We Use Your Information */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <div className="flex items-start gap-4 mb-6">
                  <Eye className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <h2 className="text-2xl font-semibold text-foreground">How We Use Your Information</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                  <li>Provide, operate, and maintain our website and applications</li>
                  <li>Improve user experience and develop new features</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Analyze usage patterns to enhance our services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </motion.div>

              {/* Data Protection */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <div className="flex items-start gap-4 mb-6">
                  <Lock className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <h2 className="text-2xl font-semibold text-foreground">Data Protection & Security</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </motion.div>

              {/* Third-Party Services */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our applications and website may integrate with third-party services, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                  <li><strong>Google Play Services:</strong> For app distribution and analytics</li>
                  <li><strong>Firebase:</strong> For authentication, analytics, and crash reporting</li>
                  <li><strong>Google Analytics:</strong> For website traffic analysis</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  These third-party services have their own privacy policies, and we recommend reviewing them to understand how they handle your data.
                </p>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Withdraw consent at any time (where processing is based on consent)</li>
                  <li>Request transfer of your data to another service provider</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, please contact us at the email address provided below.
                </p>
              </motion.div>

              {/* Children's Privacy */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <div className="flex items-start gap-4 mb-4">
                  <AlertCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <h2 className="text-2xl font-semibold text-foreground">Children's Privacy</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected such information, we will take steps to delete it promptly.
                </p>
              </motion.div>

              {/* Changes to This Policy */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="glass-card p-6 md:p-8 rounded-2xl border-2 border-primary/20"
              >
                <div className="flex items-start gap-4 mb-6">
                  <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">EMAIL</p>
                    <a
                      href="mailto:mdjakirkhan4928@gmail.com"
                      className="text-primary hover:underline transition-colors"
                    >
                      mdjakirkhan4928@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">WEBSITE</p>
                    <a
                      href="https://studio.sajuriya.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline transition-colors"
                    >
                      studio.sajuriya.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">ADDRESS</p>
                    <p className="text-sm text-foreground/80">
                      Kakoirkhola, Sukchail, Chauddagram<br />
                      Cumilla — 3583, Bangladesh (BD)
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
