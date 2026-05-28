import { getAdminSession } from "@/lib/admin/session";

export async function requireAdminApiSession(): Promise<Response | null> {
  const session = await getAdminSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
