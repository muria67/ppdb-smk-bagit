import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { dashboardPaths, isDbRole, type DbRole } from "@/lib/roles";

export type Session = {
  id?: number;
  sub?: string;
  nama: string;
  email?: string;
  role: string;
};

// Harus sama dengan nama cookie yang ditulis app/api/login/route.js
export const SESSION_COOKIE = "spmb_token";

// Harus sama dengan secret yang dipakai route.js untuk menandatangani token
// (route.js memakai JWT_SECRET; SESSION_SECRET dipakai sebagai cadangan).
function getSecret() {
  return process.env.JWT_SECRET || process.env.SESSION_SECRET || "";
}

export async function getSession(token?: string | null): Promise<Session | null> {
  const secret = getSecret();

  if (!token || !secret) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { algorithms: ["HS256"] }
    );

    return payload as unknown as Session;
  } catch {
    return null;
  }
}

// Nama lain yang boleh dipakai di halaman dashboard
// (supaya requireRole("siswa") sama artinya dengan requireRole("calon_siswa")).
const ALIAS: Record<string, DbRole> = { siswa: "calon_siswa" };

// Tahap 6: dipanggil di server pada setiap halaman dashboard.
// - belum login           -> /login
// - login tapi role salah -> dikembalikan ke dashboard miliknya sendiri
export async function requireRole(allowed: DbRole | "siswa"): Promise<Session> {
  const target: string = ALIAS[allowed] ?? allowed;

  // Salah ketik nama role akan membuat redirect berputar tanpa henti,
  // jadi lebih baik berhenti dengan pesan yang jelas.
  if (!isDbRole(target)) {
    throw new Error(
      `requireRole("${allowed}"): role tidak dikenal. ` +
        "Pakai salah satu: calon_siswa, admin, kepsek."
    );
  }

  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = await getSession(token);

  if (!session) {
    return redirect("/login");
  }

  if (session.role !== target) {
    return redirect(
      isDbRole(session.role) ? dashboardPaths[session.role] : "/login"
    );
  }

  return session;
}
