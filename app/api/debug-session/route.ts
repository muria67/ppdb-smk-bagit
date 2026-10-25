import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// SEMENTARA: untuk mencari tahu kenapa login balik ke halaman pilih role.
// Hapus folder app/api/debug-session setelah masalahnya ketemu.
// Hanya aktif saat development, dan tidak pernah menampilkan isi secret.
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const COOKIE_NAME = "spmb_session";
  const semuaCookie = cookies().getAll();
  const token = cookies().get(COOKIE_NAME)?.value;
  const secret = process.env.SESSION_SECRET;

  const info: Record<string, unknown> = {
    namaCookieYangDicari: COOKIE_NAME,
    namaCookieYangTerkirim: semuaCookie.map((c) => c.name),
    cookieSesiAda: Boolean(token),
    sessionSecretAda: Boolean(secret),
    panjangSessionSecret: secret?.length ?? 0,
  };

  if (!token) {
    info.hasil = "Cookie sesi TIDAK sampai ke server (cek nama cookie di atas).";
  } else if (!secret || secret.length < 32) {
    info.hasil = "SESSION_SECRET kosong atau kurang dari 32 karakter.";
  } else {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret),
        { algorithms: ["HS256"] }
      );
      info.hasil = "Sesi VALID.";
      info.nama = payload.nama;
      info.role = payload.role;
    } catch (error) {
      info.hasil = "Token TIDAK valid untuk SESSION_SECRET saat ini.";
      info.alasan = error instanceof Error ? error.message : String(error);
    }
  }

  return Response.json(info, { headers: { "Cache-Control": "no-store" } });
}
