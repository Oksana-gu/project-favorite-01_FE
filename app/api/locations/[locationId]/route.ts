import type { NextRequest } from "next/server";
import { getAuthCookieHeader, proxyToBackend } from "@/lib/api/backendProxy";

interface RouteContext {
  params: Promise<{ locationId: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { locationId } = await params;

  return proxyToBackend(`/api/locations/${encodeURIComponent(locationId)}`);
}

// TODO: перевірити після мерджа PATCH /api/locations/:id на бекенді
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { locationId } = await params;
  const formData = await request.formData();

  return proxyToBackend(`/api/locations/${encodeURIComponent(locationId)}`, {
    method: "PATCH",
    body: formData,
    headers: { Cookie: await getAuthCookieHeader() },
  });
}
