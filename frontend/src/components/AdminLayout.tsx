import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AmbientBackground } from "@/components/AmbientBackground";
import { toast } from "sonner";

export function AdminLayout() {
  const { isAdmin, loading: authLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast.error("Please sign in to access the dashboard");
        navigate("/");
      } else if (!isAdmin) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
      }
    }
  }, [isAdmin, authLoading, navigate, user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <AmbientBackground />
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
            <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleSidebarAction = (action: string) => {
    if (action === "add") {
      navigate("/admin/add");
    } else if (action === "add-single") {
      navigate("/admin/fetch");
    } else if (action === "sync") {
      navigate("/admin/sync");
    }
  };

  // Determine current page title
  const getPageTitle = () => {
    const path = window.location.pathname;
    if (path.includes("/admin/sync")) return "Sync from Play Store";
    if (path.includes("/admin/add")) return "Add New App";
    if (path.includes("/admin/fetch")) return "Fetch via API";
    return "Admin Dashboard";
  };

  return (
    <>
      <AmbientBackground />
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar onAction={handleSidebarAction} />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 flex items-center gap-3 border-b border-white/[0.06] px-4 bg-background/80 backdrop-blur-xl shrink-0 overflow-hidden">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-gradient truncate">{getPageTitle()}</h1>
            </header>
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
