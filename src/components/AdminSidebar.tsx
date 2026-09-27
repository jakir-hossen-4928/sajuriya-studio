import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Plus, RefreshCw, Home, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  onAction?: (action: string) => void;
}

export function AdminSidebar({ onAction }: AdminSidebarProps) {
  const navigate = useNavigate();
  const { userData, logout } = useAuth();

  return (
    <Sidebar className="border-r border-white/[0.06]">
      <SidebarHeader className="p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <img src="/sajuriya-logo.png" alt="Sajuriya Studio" className="h-8 w-8 rounded-lg" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">Admin Panel</p>
            <p className="text-xs text-muted-foreground truncate">{userData?.email}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/admin")} tooltip="Admin Dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/admin/sync")} tooltip="Sync from Play Store">
                  <RefreshCw className="h-4 w-4" />
                  <span>Sync from Play Store</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onAction?.("add")} tooltip="Add App Manually">
                  <Plus className="h-4 w-4" />
                  <span>Add App Manually</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onAction?.("add-single")} tooltip="Add Single App via API">
                  <Settings className="h-4 w-4" />
                  <span>Add Single App (API)</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/")} tooltip="Back to Site">
                  <Home className="h-4 w-4" />
                  <span>Back to Site</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/[0.06]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip="Logout">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
