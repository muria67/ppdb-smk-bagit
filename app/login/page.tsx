import type { Metadata } from "next";
import Link from "next/link";
import { CheckMini, KepsekIcon } from "@/components/AuthIcons";

export const metadata: Metadata = {
  title: "Masuk | SPMB SMK BAGIT Balikpapan",
};

const cards = [
  {
    href: "/login/admin",
    title: "Admin",
    desc: "Kelola seluruh proses penerimaan siswa baru melalui halaman administrator.",
    points: ["Kelola data pendaftar", "Verifikasi berkas", "Kelola tes & pengumuman"],
    button: "Masuk sebagai Admin",
    tone: "blue",
    icon: <span aria-hidden="true">⚙️</span>,
  },
  {
    href: "/login/siswa",
    title: "Calon Siswa",
    desc: "Gunakan akun calon siswa untuk melakukan pendaftaran dan memantau proses seleksi.",
    points: ["Isi biodata & upload berkas", "Ikuti tes online", "Lihat hasil & pengumuman"],
    button: "Masuk sebagai Siswa",
    tone: "purple",
    icon: <span aria-hidden="true">🎓</span>,
  },
  {
    href: "/login/kepsek",
    title: "Kepala Sekolah",
    desc: "Pantau proses SPMB dan lihat ringkasan data serta hasil seleksi secara keseluruhan.",
    points: ["Monitoring pendaftar", "Lihat statistik & hasil tes", "Lihat dan unduh laporan"],
    button: "Masuk sebagai Kepsek",
    tone: "green",
    icon: <KepsekIcon />,
  },
];

export default function RolePage() {
  return (
    <main className="role-page">
      <span className="role-blob role-blob-tr" aria-hidden="true" />
      <span className="role-blob role-blob-bl" aria-hidden="true" />

      <header className="role-header">
        <Link href="/" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="Logo SMK BAGIT" />
          <div>
            <div className="brand-name">SMK BAGIT BALIKPAPAN</div>
            <div className="brand-sub">SPMB Online</div>
          </div>
        </Link>
        <span className="role-help">Butuh bantuan? Hubungi administrator</span>
      </header>

      <section className="role-hero">
        <p className="role-eyebrow">SELAMAT DATANG</p>
        <h1>Masuk sebagai siapa?</h1>
        <p className="role-lead">
          Pilih role sesuai dengan akun yang kamu gunakan untuk mengakses sistem
          SPMB Online.
        </p>
      </section>

      <section className="role-cards">
        {cards.map((c) => (
          <article className="role-card" key={c.title}>
            <div className={`role-icon ${c.tone}`}>{c.icon}</div>
            <h2>{c.title}</h2>
            <p className="role-desc">{c.desc}</p>
            <ul>
              {c.points.map((p) => (
                <li key={p}>
                  <CheckMini />
                  {p}
                </li>
              ))}
            </ul>
            <Link href={c.href} className={`role-btn ${c.tone}`}>
              {c.button} →
            </Link>
          </article>
        ))}
      </section>

      <footer className="role-footer">
        © 2026 SMK BAGIT • Sistem Penerimaan Siswa Baru
      </footer>
    </main>
  );
}
