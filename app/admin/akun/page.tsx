import pool from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { formatTanggal } from "@/lib/akun";
import AkunClient from "./AkunClient";

export const dynamic = "force-dynamic";

export default async function KelolaAkunPage() {
  const session = await requireRole("admin");

  try {
    const [rows] = await pool.execute(
      "SELECT id, nama, email, role, created_at FROM users ORDER BY id ASC"
    );

    // Kolom password sengaja tidak diambil.
    const users = (rows as any[]).map((r) => ({
      id: Number(r.id),
      nama: String(r.nama),
      email: String(r.email),
      role: String(r.role),
      dibuat: formatTanggal(r.created_at),
    }));

    return <AkunClient awal={users} meId={Number(session.id)} />;
  } catch (error) {
    console.error("Gagal memuat akun:", error);

    return (
      <section className="card">
        <h2>Kelola Akun</h2>
        <p className="st-no">
          Gagal mengambil data akun dari database. Pastikan MySQL menyala dan
          koneksi di lib/db sudah benar.
        </p>
      </section>
    );
  }
}
