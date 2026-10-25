import { cookies } from "next/headers";
import { getSession, SESSION_COOKIE } from "@/lib/auth";

// Dipakai oleh API route: hanya mengembalikan sesi jika pemanggil benar-benar Admin.
// Halaman admin sudah dilindungi layout, tapi API bisa dipanggil langsung
// (mis. lewat curl), jadi tiap API wajib memeriksa sendiri.
export async function getAdminSession() {
  const store = await cookies();
  const session = await getSession(store.get(SESSION_COOKIE)?.value);

  return session && session.role === "admin" ? session : null;
}
