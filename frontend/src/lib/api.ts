import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AppData, BackendApp, BackendResponse } from "@/types/app";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://sajuriya-studio-backend.vercel.app";

// Fetch apps from Firestore
export async function getApps(): Promise<AppData[]> {
  const q = query(collection(db, "apps"), orderBy("title"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as AppData));
}

// Save app to Firestore
export async function saveApp(app: AppData): Promise<void> {
  const ref = doc(db, "apps", app.packageName);
  await setDoc(ref, { ...app, updatedAt: new Date().toISOString() }, { merge: true });
}

// Delete app from Firestore
export async function deleteApp(packageName: string): Promise<void> {
  await deleteDoc(doc(db, "apps", packageName));
}

// Sync all apps from backend API
export async function syncFromBackend(): Promise<AppData[]> {
  const res = await fetch(`${BACKEND_URL}/export-all`);
  const json: BackendResponse = await res.json();

  const apps: AppData[] = json.data.map((b: BackendApp) => ({
    packageName: b.packageName,
    title: b.storeListing.title,
    shortDescription: b.storeListing.shortDescription,
    fullDescription: b.storeListing.fullDescription,
    language: b.storeListing.language,
    icon: b.storeListing.icon || "",
    screenshots: b.storeListing.screenshots || [],
    featuredImage: b.storeListing.featuredImage || "",
    totalDownloads: 0,
    rating: 0,
    playStoreLink: `https://play.google.com/store/apps/details?id=${b.packageName}`,
    updatedAt: new Date().toISOString(),
  }));

  for (const app of apps) {
    await saveApp(app);
  }

  return apps;
}

// Fetch a single app from backend by package name and save to Firestore
export async function fetchSingleApp(packageName: string): Promise<AppData> {
  const res = await fetch(`${BACKEND_URL}/export/${packageName}`);
  if (!res.ok) throw new Error(`Failed to fetch app: ${res.statusText}`);
  const json = await res.json();

  // The backend may return { status, data } or direct app data
  const b: BackendApp = json.data || json;

  const app: AppData = {
    packageName: b.packageName,
    title: b.storeListing.title,
    shortDescription: b.storeListing.shortDescription,
    fullDescription: b.storeListing.fullDescription,
    language: b.storeListing.language,
    icon: b.storeListing.icon || "",
    screenshots: b.storeListing.screenshots || [],
    featuredImage: b.storeListing.featuredImage || "",
    totalDownloads: 0,
    rating: 0,
    playStoreLink: `https://play.google.com/store/apps/details?id=${b.packageName}`,
    updatedAt: new Date().toISOString(),
  };

  await saveApp(app);
  return app;
}
