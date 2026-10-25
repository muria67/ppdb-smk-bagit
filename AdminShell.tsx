"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const menu = [
  { label: "Dashboard", icon: "🏠", href: "/admin" },
  { label: "Pendaftar", icon: "👤", href: "/admin/pendaftar" },
  { label: "Verifikasi", icon: "✅", href: "/admin/verifikasi" },
  { label: "Soal Tes", icon: "📝", href: "/admin/soal-tes" },
  { label: "Jadwal Tes", icon: "📅", href: "/admin/jadwal-tes" },
  { label: "Hasil Seleksi", icon: "📄", href: "/admin/hasil-seleksi" },
  { label: "Pengumuman", icon: "📢", href: "/admin/pengumuman" },
  { label: "Pembayaran", icon: "💳", href: "/admin/pembayaran" },
];

export default function AdminShell({
  nama,
  children,
}: {
  nama: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");

  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  }

  async function keluar() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  // Cari global: buka halaman Pendaftar dengan kata kunci tersebut.
  function cari(e: React.FormEvent) {
    e.preventDefault();
    const kata = q.trim();
    if (pathname === "/admin/pendaftar") {
      window.dispatchEvent(new CustomEvent("admin-search", { detail: kata }));
    } else {
      router.push(`/admin/pendaftar?q=${encodeURIComponent(kata)}`);
    }
  }

  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-brand">
          <h1>SPMB</h1>
          <p>Sistem Penerimaan Murid Baru</p>
        </div>

        <nav className="adm-nav">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`adm-link ${isActive(m.href) ? "active" : ""}`}
            >
              <span className="adm-ico">{m.icon}</span>
              {m.label}
            </Link>
          ))}
        </nav>

        <button className="adm-logout" onClick={keluar}>
          <span className="adm-ico">🚪</span> Keluar
        </button>
      </aside>

      <section className="adm-main">
        <header className="adm-top">
          <form className="adm-search" onSubmit={cari}>
            <button type="submit" aria-label="Cari" style={{ background: "none", border: "none", cursor: "pointer" }}>🔍</button>
            <input
              type="search"
              placeholder="Cari data pendaftar... (tekan Enter)"
              aria-label="Cari data"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>
          <div className="adm-profile">
            <div className="adm-avatar">{(nama || "A").charAt(0).toUpperCase()}</div>
            <div>
              <strong>{nama || "Admin"}</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <div className="adm-content">{children}</div>
      </section>
    </div>
  );
}
