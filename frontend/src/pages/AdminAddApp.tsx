import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveApp } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { Plus, Trash2 } from "lucide-react";
import type { AppData } from "@/types/app";

export default function AdminAddApp() {
  const navigate = useNavigate();
  const [screenshots, setScreenshots] = useState<string[]>([""]);

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
    
    try {
      await saveApp(newApp);
      toast.success("App added successfully");
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to add app");
    }
  };

  const addScreenshotField = () => setScreenshots([...screenshots, ""]);
  
  const removeScreenshotField = (index: number) => {
    const updated = screenshots.filter((_, i) => i !== index);
    setScreenshots(updated.length > 0 ? updated : [""]);
  };

  const updateScreenshot = (index: number, value: string) => {
    const updated = [...screenshots];
    updated[index] = value;
    setScreenshots(updated);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <SEO title="Add New App — Admin" />
      
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Add New App Manually</h2>
        <Button variant="ghost" onClick={() => navigate("/admin")}>Cancel</Button>
      </div>

      <form onSubmit={handleAddApp} className="glass-card p-6 rounded-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "packageName", label: "Package Name (e.g. com.example.app)", required: true },
            { name: "title", label: "App Title", required: true },
            { name: "icon", label: "Icon URL" },
            { name: "featuredImage", label: "Featured Image URL" },
            { name: "playStoreLink", label: "Play Store Link" },
            { name: "language", label: "Language Code", placeholder: "en" },
            { name: "totalDownloads", label: "Downloads Count", type: "number" },
            { name: "rating", label: "Rating (0-5)", type: "number", step: "0.1" },
          ].map((f) => (
            <div key={f.name} className="space-y-1.5">
              <label className="text-sm font-medium text-foreground block">{f.label}</label>
              <input
                name={f.name}
                type={f.type || "text"}
                step={f.step}
                required={f.required}
                placeholder={f.placeholder}
                className="w-full bg-background-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground block">Short Description</label>
          <input 
            name="shortDescription" 
            className="w-full bg-background-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all" 
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground block">Full Description</label>
          <textarea 
            name="fullDescription" 
            rows={5} 
            className="w-full bg-background-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none resize-none focus:ring-1 focus:ring-primary/50 transition-all" 
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground block">Screenshots URLs</label>
          <div className="space-y-3">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={screenshot}
                  onChange={(e) => updateScreenshot(index, e.target.value)}
                  placeholder={`https://example.com/screenshot-${index + 1}.png`}
                  className="flex-1 bg-background-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
                {screenshots.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeScreenshotField(index)}
                    className="h-10 w-10 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addScreenshotField}
              className="mt-2 border-dashed border-white/20 hover:border-primary/50"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Screenshot Field
            </Button>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="submit" size="lg" className="px-8">Save App</Button>
          <Button type="button" variant="ghost" size="lg" onClick={() => navigate("/admin")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
