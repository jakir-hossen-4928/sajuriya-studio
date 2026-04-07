import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const LOGO = "/sajuriya-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-background-deep">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Sajuriya Studio" className="h-8 w-8 rounded-lg" />
            <span className="text-sm font-semibold text-foreground">Sajuriya Studio</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <a
              href="https://play.google.com/store/apps/dev?id=6495908705399463745"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              Play Store <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <div className="gradient-line mt-8" />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sajuriya Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
