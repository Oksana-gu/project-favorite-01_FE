import { nextServer } from "@/lib/api/api";
import { cookies } from "next/headers";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};
