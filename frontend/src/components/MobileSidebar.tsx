import { Link, useLocation } from "react-router-dom";
import { Home, Info, ExternalLink, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LOGO = "/sajuriya-logo.png";

const navItems = [
  { title: "Apps", url: "/", icon: Home },
  { title: "About", url: "/about", icon: Info },
];

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const location = useLocation();
  const { user, userData, signInWithGoogle, logout, isAdmin } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-72 bg-background/95 backdrop-blur-xl border-r border-white/[0.06] p-0 [&>button]:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Logo header */}
          <div className="p-4 border-b border-white/[0.06]">
            <Link to="/" className="flex items-center gap-3" onClick={() => onOpenChange(false)}>
              <img src={LOGO} alt="Sajuriya Studio" className="h-8 w-8 rounded-lg" />
              <span className="text-lg font-semibold text-foreground">Sajuriya Studio</span>
            </Link>
          </div>

          {/* Nav items */}
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                onClick={() => onOpenChange(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive(item.url)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}

            <a
              href="https://play.google.com/store/apps/dev?id=6495908705399463745"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Play Store
            </a>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => onOpenChange(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive("/admin")
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/[0.06]">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={userData?.avatar || user.photoURL || ""}
                    alt=""
                    className="h-8 w-8 rounded-full border border-white/10"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{userData?.name || user.displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { logout(); onOpenChange(false); }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="default" className="w-full" onClick={signInWithGoogle}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In with Google
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
