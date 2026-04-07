import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Play, Square, Trash2, Download, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { syncFromBackend, fetchSingleApp, getApps } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/AmbientBackground";
import { SEO } from "@/components/SEO";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";
import type { AppData } from "@/types/app";

interface LogEntry {
  id: string;
  timestamp: Date;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

function SyncPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState({ current: 0, total: 0 });
  const [syncedApps, setSyncedApps] = useState<AppData[]>([]);
  const [singlePkg, setSinglePkg] = useState("");
  const [fetchingSingle, setFetchingSingle] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, authLoading, navigate]);

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      message,
      type,
    };
    setLogs(prev => [...prev, newLog]);
  };

  const clearLogs = () => {
    setLogs([]);
    setSyncedApps([]);
    setSyncProgress({ current: 0, total: 0 });
    toast.success("Logs cleared");
  };

  const handleSyncAll = async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    setSyncProgress({ current: 0, total: 0 });
    addLog("Starting full sync from Play Store...", 'info');
    addLog("Fetching apps from backend API...", 'info');

    try {
      const synced = await syncFromBackend();
      setSyncedApps(synced);
      
      addLog(`Successfully synced ${synced.length} apps from Play Store`, 'success');
      addLog("Sync completed successfully!", 'success');
      
      toast.success(`Synced ${synced.length} apps`);
    } catch (error) {
      console.error("Sync failed:", error);
      addLog(`Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      toast.error("Sync failed");
    } finally {
      setIsSyncing(false);
      setSyncProgress({ current: 0, total: 0 });
    }
  };

  const handleFetchSingle = async () => {
    if (!singlePkg.trim() || fetchingSingle) return;
    
    setFetchingSingle(true);
    addLog(`Fetching single app: ${singlePkg.trim()}...`, 'info');

    try {
      const app = await fetchSingleApp(singlePkg.trim());
      addLog(`Successfully fetched and saved: ${app.title}`, 'success');
      setSinglePkg("");
      toast.success(`Added: ${app.title}`);
    } catch (error) {
      console.error("Failed to fetch app:", error);
      addLog(`Failed to fetch app: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      toast.error("Failed to fetch app. Check the package name.");
    } finally {
      setFetchingSingle(false);
    }
  };

  const handleSidebarAction = (action: string) => {
    if (action === "add") navigate("/admin");
    if (action === "add-single") navigate("/admin");
  };

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-blue-400';
    }
  };

  if (authLoading) return null;

  return (
    <>
      <SEO title="Sync Apps — Admin Dashboard" />
      <AmbientBackground />
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar onAction={handleSidebarAction} />

          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <header className="h-14 flex items-center gap-3 border-b border-white/[0.06] px-4 bg-background/80 backdrop-blur-xl">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-gradient">Sync from Play Store</h1>
              <div className="ml-auto flex items-center gap-2">
                {logs.length > 0 && (
                  <span className="text-xs text-muted-foreground">{logs.length} logs</span>
                )}
              </div>
            </header>

            <main className="flex-1 p-4 md:p-6 overflow-auto">
              <div className="max-w-5xl mx-auto space-y-6">
                {/* Sync Controls */}
                <div className="glass-card p-6 rounded-2xl">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Sync Controls</h2>
                  
                  {/* Full Sync */}
                  <div className="mb-6 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">Full Sync</h3>
                        <p className="text-sm text-muted-foreground">
                          Sync all apps from Play Store backend API
                        </p>
                      </div>
                      <Button
                        onClick={handleSyncAll}
                        disabled={isSyncing}
                        size="lg"
                      >
                        {isSyncing ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Syncing...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Start Sync
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {isSyncing && (
                      <div className="mt-3">
                        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{
                              width: syncProgress.total > 0
                                ? `${(syncProgress.current / syncProgress.total) * 100}%`
                                : '0%'
                            }}
                          />
                        </div>
                        {syncProgress.total > 0 && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Processing {syncProgress.current} of {syncProgress.total} apps
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Single App Fetch */}
                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                    <div className="mb-3">
                      <h3 className="text-base font-semibold text-foreground mb-1">Fetch Single App</h3>
                      <p className="text-sm text-muted-foreground">
                        Enter package name to fetch a specific app (e.g., com.example.app)
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <input
                        value={singlePkg}
                        onChange={(e) => setSinglePkg(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFetchSingle()}
                        placeholder="com.example.app"
                        disabled={fetchingSingle}
                        className="flex-1 bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-50"
                      />
                      <Button
                        onClick={handleFetchSingle}
                        disabled={fetchingSingle || !singlePkg.trim()}
                      >
                        {fetchingSingle ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Fetching...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Fetch & Save
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sync Results */}
                {syncedApps.length > 0 && (
                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Synced Apps ({syncedApps.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {syncedApps.slice(0, 12).map((app) => (
                        <div
                          key={app.packageName}
                          className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.06] flex items-center gap-3"
                        >
                          {app.icon ? (
                            <img
                              src={app.icon}
                              alt=""
                              className="h-10 w-10 rounded-lg object-cover bg-white/[0.05]"
                              referrerPolicy="no-referrer"
                              crossOrigin="anonymous"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-sm font-semibold text-muted-foreground">
                              {app.title.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">{app.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{app.packageName}</p>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                    {syncedApps.length > 12 && (
                      <p className="text-sm text-muted-foreground mt-4 text-center">
                        + {syncedApps.length - 12} more apps
                      </p>
                    )}
                  </div>
                )}

                {/* Real-time Logs */}
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-foreground">Sync Logs</h2>
                      {isSyncing && (
                        <span className="flex items-center gap-2 text-xs text-primary">
                          <RefreshCw className="h-3 w-3 animate-spin" />
                          Syncing in progress...
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearLogs}
                      disabled={logs.length === 0}
                    >
                      <Trash2 className="mr-2 h-3 w-3" />
                      Clear Logs
                    </Button>
                  </div>
                  
                  <div className="h-[500px] overflow-y-auto bg-black/20 p-4 font-mono text-sm">
                    {logs.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <Clock className="h-12 w-12 mx-auto mb-3 opacity-20" />
                          <p>No logs yet. Start a sync to see real-time updates.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {logs.map((log) => (
                          <div
                            key={log.id}
                            className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {getLogIcon(log.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3">
                                <p className={`break-all ${getLogColor(log.type)}`}>
                                  {log.message}
                                </p>
                                <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                                  {log.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={logsEndRef} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default SyncPage;
