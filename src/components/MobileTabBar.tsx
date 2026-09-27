import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Info, ExternalLink, LayoutDashboard, LogIn, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "About", url: "/about", icon: Info },
  { title: "Play Store", url: "https://play.google.com/store/apps/dev?id=6495908705399463745", icon: ExternalLink, external: true },
];

export function MobileTabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userData, isAdmin, signInWithGoogle, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Floating tab bar with backdrop blur */}
      <div className="mx-3 mb-3">
        <div className="bg-background/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl">
          <div className="flex items-center justify-around px-2 py-2">
            {/* Main nav items */}
            {navItems.map((item) => {
              const active = item.external ? false : isActive(item.url);
              
              if (item.external) {
                return (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center min-w-[60px] flex-1 py-2 px-3 rounded-xl text-muted-foreground hover:text-foreground transition-all"
                  >
                    <item.icon className="h-5 w-5 mb-1" />
                    <span className="text-[10px] font-medium">{item.title}</span>
                  </a>
                );
              }

              return (
                <Link
                  key={item.url}
                  to={item.url}
                  className={`flex flex-col items-center justify-center min-w-[60px] flex-1 py-2 px-3 rounded-xl transition-all ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                  }`}
                >
                  <item.icon className="h-5 w-5 mb-1" />
                  <span className="text-[10px] font-medium">{item.title}</span>
                </Link>
              );
            })}

            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-col items-center justify-center min-w-[60px] flex-1 py-2 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-all">
                    {userData?.avatar || user.photoURL ? (
                      <img
                        src={userData?.avatar || user.photoURL || ""}
                        alt=""
                        className="h-5 w-5 rounded-full mb-1 border border-white/10"
                      />
                    ) : (
                      <User className="h-5 w-5 mb-1" />
                    )}
                    <span className="text-[10px] font-medium">Profile</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="mb-2 mx-auto min-w-[200px]">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-sm font-medium">{userData?.name || user.displayName}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">{user.email}</p>
                  </div>
                  
                  {/* Admin Dashboard */}
                  {isAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex flex-col items-center justify-center min-w-[60px] flex-1 py-2 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-all"
              >
                <LogIn className="h-5 w-5 mb-1" />
                <span className="text-[10px] font-medium">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
