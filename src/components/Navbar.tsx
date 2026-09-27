import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { MobileSidebar } from "@/components/MobileSidebar";

const LOGO = "/sajuriya-logo.png";

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, userData, signInWithGoogle, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO} alt="Sajuriya Studio" className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-semibold text-foreground">Sajuriya Studio</span>
          </Link>

          {/* Mobile hamburger menu - Right side */}
          <button className="md:hidden text-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Apps
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <a
              href="https://play.google.com/store/apps/dev?id=6495908705399463745"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Play Store
            </a>
            {isAdmin && (
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
                <LayoutDashboard className="mr-1 h-4 w-4" />
                Dashboard
              </Button>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <img src={userData?.avatar || user.photoURL || ""} alt="" className="h-8 w-8 rounded-full border border-white/10" />
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={signInWithGoogle}>
                <LogIn className="mr-1 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <MobileSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </>
  );
}
