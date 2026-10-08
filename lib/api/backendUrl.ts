const RENDER_API_URL = "https://project-favorite-01-be.onrender.com/api";

const trimSlashes = (url: string) => url.replace(/\/+$/, "");

// server-side base URL of the backend API, always ending with /api
export const getBackendApiUrl = () => {
  const backendUrl = process.env.BACKEND_API_URL;
  if (backendUrl) {
    const base = trimSlashes(backendUrl);
    return base.endsWith("/api") ? base : `${base}/api`;
  }

  return trimSlashes(process.env.NEXT_PUBLIC_API_URL || RENDER_API_URL);
};
