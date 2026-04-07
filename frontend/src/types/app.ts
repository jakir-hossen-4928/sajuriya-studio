export interface AppData {
  id?: string;
  packageName: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  language: string;
  icon: string;
  screenshots: string[];
  featuredImage: string;
  totalDownloads: number;
  rating: number;
  playStoreLink: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "user";
}

export interface BackendApp {
  packageName: string;
  storeListing: {
    title: string;
    shortDescription: string;
    fullDescription: string;
    language: string;
    icon: string;
    screenshots: string[];
    featuredImage: string;
  };
  vitals: Record<string, unknown>;
}

export interface BackendResponse {
  status: string;
  totalApps: number;
  data: BackendApp[];
}
