import { useEffect, useState } from "react";
import { Plus, Trash2, ExternalLink, Search, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getApps, saveApp, deleteApp, fetchSingleApp } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import type { AppData } from "@/types/app";

function AdminDashboard() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingApp, setEditingApp] = useState<AppData | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editScreenshots, setEditScreenshots] = useState<string[]>([""]);

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

    if (editingApp.packageName !== updatedApp.packageName) {
      await deleteApp(editingApp.packageName);
    }

    await saveApp(updatedApp);
    setShowEditForm(false);
    setEditingApp(null);
    toast.success("App updated");
    loadApps();
  };

  const addScreenshotField = (isEdit: boolean = false) => {
    if (isEdit) {
      setEditScreenshots([...editScreenshots, ""]);
    }
  };

  const removeScreenshotField = (index: number, isEdit: boolean = false) => {
    if (isEdit) {
      const updated = editScreenshots.filter((_, i) => i !== index);
      setEditScreenshots(updated.length > 0 ? updated : [""]);
    }
  };

  const updateScreenshot = (index: number, value: string, isEdit: boolean = false) => {
    if (isEdit) {
      const updated = [...editScreenshots];
      updated[index] = value;
      setEditScreenshots(updated);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <SEO title="Admin Dashboard" />

      {/* Edit form */}
      {showEditForm && editingApp && (
        <form onSubmit={handleUpdateApp} className="glass-card p-6 rounded-2xl space-y-4">
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
                  className="w-full bg-background-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button type="submit">Update App</Button>
            <Button type="button" variant="ghost" onClick={() => { setShowEditForm(false); setEditingApp(null); }}>Cancel</Button>
          </div>
        </form>
      )}

      {/* Apps table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
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
                    className="h-10 w-10 rounded-xl border border-white/10 object-cover bg-white/[0.05] flex-shrink-0"
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
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(app)}><Edit className="h-4 w-4 text-primary" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(app.packageName)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
