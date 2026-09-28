import type { NextRequest } from "next/server";
import { getAuthCookieHeader, proxyToBackend } from "@/lib/api/backendProxy";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  return proxyToBackend("/api/locations", {
    method: "POST",
    body: formData,
    headers: { Cookie: await getAuthCookieHeader() },
  });
}
