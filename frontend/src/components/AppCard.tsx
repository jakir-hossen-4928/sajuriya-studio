import { Link } from "react-router-dom";
import { Star, Download, Image } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { AppData } from "@/types/app";

interface AppCardProps {
  app: AppData;
  index: number;
}

export function AppCard({ app, index }: AppCardProps) {
  const [imageError, setImageError] = useState(false);
  const [iconError, setIconError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/app/${app.packageName}`}
        className="group block glass-card p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
      >
        {/* Featured Image - 512x250px (2.05:1 aspect ratio) */}
        {app.featuredImage && !imageError ? (
          <div className="relative mb-4 overflow-hidden rounded-xl bg-white/[0.05]" style={{ aspectRatio: '512/250' }}>
            <img
              src={app.featuredImage}
              alt={app.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ) : app.featuredImage && imageError ? (
          <div className="relative mb-4 overflow-hidden rounded-xl bg-white/[0.05] flex items-center justify-center" style={{ aspectRatio: '512/250' }}>
            <Image className="h-12 w-12 text-muted-foreground/50" />
          </div>
        ) : null}

        <div className="flex items-start gap-4">
          {/* Icon */}
          {app.icon && !iconError ? (
            <img
              src={app.icon}
              alt={`${app.title} icon`}
              className="h-14 w-14 rounded-xl border border-white/10 flex-shrink-0 object-cover bg-white/[0.05]"
              loading="lazy"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={() => setIconError(true)}
            />
          ) : (
            <div className="h-14 w-14 rounded-xl border border-white/10 flex-shrink-0 bg-white/[0.05] flex items-center justify-center">
              <span className="text-lg font-semibold text-muted-foreground">
                {app.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-foreground truncate group-hover:text-gradient-accent transition-colors">
              {app.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {app.shortDescription}
            </p>

            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              {app.rating > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  {app.rating.toFixed(1)}
                </span>
              )}
              {app.totalDownloads > 0 && (
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {app.totalDownloads.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
