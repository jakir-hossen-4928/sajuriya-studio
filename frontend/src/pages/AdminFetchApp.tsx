import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSingleApp } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { Search, Loader2 } from "lucide-react";

export default function AdminFetchApp() {
  const navigate = useNavigate();
  const [singlePkg, setSinglePkg] = useState("");
  const [fetchingSingle, setFetchingSingle] = useState(false);

  const handleFetchSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    const pkg = singlePkg.trim();
    if (!pkg) return;

    setFetchingSingle(true);
    try {
      const app = await fetchSingleApp(pkg);
      toast.success(`Successfully fetched: ${app.title}`);
      setSinglePkg("");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch app. Please check the package name and ensure the backend is running.");
    } finally {
      setFetchingSingle(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <SEO title="Fetch App via API — Admin" />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Add Single App via API</h2>
        <Button variant="ghost" onClick={() => navigate("/admin")}>Cancel</Button>
      </div>

      <div className="glass-card p-8 rounded-2xl space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Import from Play Store</h3>
          <p className="text-sm text-muted-foreground">
            Enter a package name (e.g. <code className="text-primary font-mono px-1.5 py-0.5 bg-primary/10 rounded">com.whatsapp</code>)
            to automatically fetch metadata, icons, and screenshots from our backend API and save them to Firestore.
          </p>
        </div>

        <form onSubmit={handleFetchSingle} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground block">Package Name</label>
            <input
              value={singlePkg}
              onChange={(e) => setSinglePkg(e.target.value)}
              placeholder="com.example.app"
              disabled={fetchingSingle}
              required
              className="w-full bg-background-elevated border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-12"
            disabled={fetchingSingle || !singlePkg.trim()}
          >
            {fetchingSingle ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Fetching and Saving...</>
            ) : (
              <><Search className="mr-2 h-5 w-5" /> Fetch & Save</>
            )}
          </Button>
        </form>

        <div className="pt-4 border-t border-white/5 text-xs text-muted-foreground">
          Note: This process may take a few seconds as it fetches images and data directly from the Play Store backend.
        </div>
      </div>
    </div>
  );
}
