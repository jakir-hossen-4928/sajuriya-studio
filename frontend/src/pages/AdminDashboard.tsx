import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, ExternalLink, Search, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getApps, saveApp, deleteApp, fetchSingleApp } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/AmbientBackground";
import { SEO } from "@/components/SEO";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";
import type { AppData } from "@/types/app";

function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSingleForm, setShowSingleForm] = useState(false);
  const [singlePkg, setSinglePkg] = useState("");
  const [fetchingSingle, setFetchingSingle] = useState(false);
  const [editingApp, setEditingApp] = useState<AppData | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [screenshots, setScreenshots] = useState<string[]>([""]);
  const [editScreenshots, setEditScreenshots] = useState<string[]>([""]);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    setLoading(true);
    try {
      const data = await getApps();
      setApps(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleDelete = async (packageName: string) => {
    if (!confirm("Delete this app?")) return;
    await deleteApp(packageName);
    setApps((prev) => prev.filter((a) => a.packageName !== packageName));
    toast.success("App deleted");
  };

  const handleEdit = (app: AppData) => {
    setEditingApp(app);
    setShowEditForm(true);
    // Initialize editScreenshots from the app's screenshots
    if (app.screenshots && Array.isArray(app.screenshots) && app.screenshots.length > 0) {
      setEditScreenshots(app.screenshots.filter((s: string) => s && s.trim() !== ""));
    } else {
      setEditScreenshots([""]);
    }
  };

  const handleUpdateApp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingApp) return;
    
    const fd = new FormData(e.currentTarget);
    const updatedApp: AppData = {
      ...editingApp,
      packageName: fd.get("packageName") as string,
      title: fd.get("title") as string,
      shortDescription: fd.get("shortDescription") as string,
      fullDescription: fd.get("fullDescription") as string,
      language: (fd.get("language") as string) || "en",
      icon: fd.get("icon") as string,
      screenshots: editScreenshots.filter(s => s.trim() !== ""),
      featuredImage: fd.get("featuredImage") as string,
      totalDownloads: Number(fd.get("totalDownloads")) || 0,
      rating: Number(fd.get("rating")) || 0,
      playStoreLink: (fd.get("playStoreLink") as string) || `https://play.google.com/store/apps/details?id=${fd.get("packageName")}`,
      updatedAt: new Date().toISOString(),
    };
    
    // If package name changed, delete old entry and save as new
    if (editingApp.packageName !== updatedApp.packageName) {
      await deleteApp(editingApp.packageName);
      setApps((prev) => prev.filter((a) => a.packageName !== editingApp.packageName));
    }
    
    await saveApp(updatedApp);
    setShowEditForm(false);
    setEditingApp(null);
    toast.success("App updated");
    loadApps();
  };

  const handleAddApp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newApp: AppData = {
      packageName: fd.get("packageName") as string,
      title: fd.get("title") as string,
      shortDescription: fd.get("shortDescription") as string,
      fullDescription: fd.get("fullDescription") as string,
      language: (fd.get("language") as string) || "en",
      icon: fd.get("icon") as string,
      screenshots: screenshots.filter(s => s.trim() !== ""),
      featuredImage: fd.get("featuredImage") as string,
      totalDownloads: Number(fd.get("totalDownloads")) || 0,
      rating: Number(fd.get("rating")) || 0,
      playStoreLink: (fd.get("playStoreLink") as string) || `https://play.google.com/store/apps/details?id=${fd.get("packageName")}`,
    };
    await saveApp(newApp);
    setShowAddForm(false);
    toast.success("App added");
    loadApps();
  };

  const handleFetchSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singlePkg.trim()) return;
    setFetchingSingle(true);
    try {
      const app = await fetchSingleApp(singlePkg.trim());
      toast.success(`Added: ${app.title}`);
      setSinglePkg("");
      setShowSingleForm(false);
      loadApps();
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch app. Check the package name.");
    }
    setFetchingSingle(false);
  };

  const handleSidebarAction = (action: string) => {
    if (action === "add") { 
      setShowAddForm(true); 
      setShowSingleForm(false); 
      setScreenshots([""]); // Reset screenshots for new app
    }
    if (action === "add-single") { 
      setShowSingleForm(true); 
      setShowAddForm(false); 
    }
  };

  // Add new screenshot field
  const addScreenshotField = (isEdit: boolean = false) => {
    if (isEdit) {
      setEditScreenshots([...editScreenshots, ""]);
    } else {
      setScreenshots([...screenshots, ""]);
    }
  };

  // Remove screenshot field
  const removeScreenshotField = (index: number, isEdit: boolean = false) => {
    if (isEdit) {
      const updated = editScreenshots.filter((_, i) => i !== index);
      setEditScreenshots(updated.length > 0 ? updated : [""]);
    } else {
      const updated = screenshots.filter((_, i) => i !== index);
      setScreenshots(updated.length > 0 ? updated : [""]);
    }
  };

  // Update screenshot URL
  const updateScreenshot = (index: number, value: string, isEdit: boolean = false) => {
    if (isEdit) {
      const updated = [...editScreenshots];
      updated[index] = value;
      setEditScreenshots(updated);
    } else {
      const updated = [...screenshots];
      updated[index] = value;
      setScreenshots(updated);
    }
  };

  if (authLoading) return null;

  return (
    <>
      <SEO title="Admin Dashboard" />
      <AmbientBackground />
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar onAction={handleSidebarAction} />

          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <header className="h-14 flex items-center gap-3 border-b border-white/[0.06] px-4 bg-background/80 backdrop-blur-xl">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-gradient">Admin Dashboard</h1>
              <span className="text-xs text-muted-foreground ml-auto">{apps.length} apps</span>
            </header>

            <main className="flex-1 p-4 md:p-6 overflow-auto">
              {/* Single app fetch form */}
              {showSingleForm && (
                <form onSubmit={handleFetchSingle} className="glass-card p-6 rounded-2xl mb-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Add Single App via API</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter the package name (e.g. <code className="text-primary">com.example.app</code>) to fetch from the backend API and save to Firestore.
                  </p>
                  <div className="flex gap-3">
                    <input
                      value={singlePkg}
                      onChange={(e) => setSinglePkg(e.target.value)}
                      placeholder="com.example.app"
                      className="flex-1 bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                    />
                    <Button type="submit" disabled={fetchingSingle}>
                      <Search className={`mr-2 h-4 w-4 ${fetchingSingle ? "animate-spin" : ""}`} />
                      {fetchingSingle ? "Fetching..." : "Fetch & Save"}
                    </Button>
                  </div>
                </form>
              )}

              {/* Manual add form */}
              {showAddForm && (
                <form onSubmit={handleAddApp} className="glass-card p-6 rounded-2xl mb-6 space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Add New App Manually</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "packageName", label: "Package Name", required: true },
                      { name: "title", label: "Title", required: true },
                      { name: "icon", label: "Icon URL" },
                      { name: "featuredImage", label: "Featured Image URL" },
                      { name: "playStoreLink", label: "Play Store Link" },
                      { name: "language", label: "Language", placeholder: "en" },
                      { name: "totalDownloads", label: "Downloads", type: "number" },
                      { name: "rating", label: "Rating", type: "number", step: "0.1" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="text-xs text-muted-foreground block mb-1">{f.label}</label>
                        <input
                          name={f.name}
                          type={f.type || "text"}
                          step={f.step}
                          required={f.required}
                          placeholder={f.placeholder}
                          className="w-full bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Short Description</label>
                    <input name="shortDescription" className="w-full bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Full Description</label>
                    <textarea name="fullDescription" rows={4} className="w-full bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none resize-none" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-2">Screenshots URLs</label>
                    <div className="space-y-2">
                      {screenshots.map((screenshot, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="url"
                            value={screenshot}
                            onChange={(e) => updateScreenshot(index, e.target.value)}
                            placeholder={`https://example.com/screenshot-${index + 1}.png`}
                            className="flex-1 bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                          />
                          {screenshots.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeScreenshotField(index)}
                              className="h-10 w-10 text-destructive hover:text-destructive"
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                      {screenshots.length < 8 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addScreenshotField()}
                          className="mt-2"
                        >
                          + Add Screenshot
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Add up to 8 screenshot URLs (PNG or JPG, recommended: 1080x1920px)</p>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Save App</Button>
                    <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  </div>
                </form>
              )}

              {/* Edit form */}
              {showEditForm && editingApp && (
                <form onSubmit={handleUpdateApp} className="glass-card p-6 rounded-2xl mb-6 space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Edit App</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "packageName", label: "Package Name", required: true },
                      { name: "title", label: "Title", required: true },
                      { name: "icon", label: "Icon URL" },
                      { name: "featuredImage", label: "Featured Image URL" },
                      { name: "playStoreLink", label: "Play Store Link" },
                      { name: "language", label: "Language", placeholder: "en" },
                      { name: "totalDownloads", label: "Downloads", type: "number" },
                      { name: "rating", label: "Rating", type: "number", step: "0.1" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="text-xs text-muted-foreground block mb-1">{f.label}</label>
                        <input
                          name={f.name}
                          type={f.type || "text"}
                          step={f.step}
                          required={f.required}
                          placeholder={f.placeholder}
                          defaultValue={editingApp[f.name as keyof AppData] ?? ""}
                          className="w-full bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Short Description</label>
                    <input name="shortDescription" defaultValue={editingApp.shortDescription} className="w-full bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Full Description</label>
                    <textarea name="fullDescription" rows={4} defaultValue={editingApp.fullDescription} className="w-full bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none resize-none" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-2">Screenshots URLs</label>
                    <div className="space-y-2">
                      {editScreenshots.map((screenshot, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="url"
                            value={screenshot}
                            onChange={(e) => updateScreenshot(index, e.target.value, true)}
                            placeholder={`https://example.com/screenshot-${index + 1}.png`}
                            className="flex-1 bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                          />
                          {editScreenshots.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeScreenshotField(index, true)}
                              className="h-10 w-10 text-destructive hover:text-destructive"
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                      {editScreenshots.length < 8 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addScreenshotField(true)}
                          className="mt-2"
                        >
                          + Add Screenshot
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Add up to 8 screenshot URLs (PNG or JPG, recommended: 1080x1920px)</p>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Update App</Button>
                    <Button type="button" variant="ghost" onClick={() => { setShowEditForm(false); setEditingApp(null); }}>Cancel</Button>
                  </div>
                </form>
              )}

              {/* Apps table */}
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/[0.06]">
                  <h2 className="text-sm font-semibold text-foreground">{apps.length} Apps</h2>
                </div>
                {loading ? (
                  <div className="p-8 text-center text-muted-foreground">Loading...</div>
                ) : (
                  <div className="divide-y divide-white/[0.06]">
                    {apps.map((app) => (
                      <div key={app.packageName} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors">
                        {app.icon ? (
                          <img 
                            src={app.icon} 
                            alt="" 
                            className="h-10 w-10 rounded-xl border border-white/10 object-cover bg-white/[0.05]"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`h-10 w-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-xs text-muted-foreground flex-shrink-0 ${app.icon ? 'hidden' : ''}`}>
                          {app.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{app.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{app.packageName}</p>
                          {app.screenshots && Array.isArray(app.screenshots) && app.screenshots.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {app.screenshots.filter((s: string) => s && s.trim() !== '').length} screenshot(s)
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(app)}>
                            <Edit className="h-4 w-4 text-primary" />
                          </Button>
                          <a href={app.playStoreLink} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon"><ExternalLink className="h-4 w-4" /></Button>
                          </a>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(app.packageName)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default AdminDashboard;
