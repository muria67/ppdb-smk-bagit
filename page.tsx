import Link from "next/link";
import { pendaftar } from "./data";

export default function AdminDashboard() {
  const total = pendaftar.length;
  const verif = pendaftar.filter((p) => p.status === "Terverifikasi").length;
  const belum = total - verif;
  const terbaru = pendaftar.slice(0, 5);

  const stats = [
    { icon: "👤", cls: "blue", n: total, label: "Total Pendaftar" },
    { icon: "✅", cls: "green", n: verif, label: "Terverifikasi" },
    { icon: "⛔", cls: "red", n: belum, label: "Belum Terverifikasi" },
    { icon: "🎓", cls: "purple", n: 4, label: "Lolos Seleksi" },
  ];

  return (
    <>
      <div className="pg-head">
        <div>
          <h1 className="pg-title">Selamat datang, Admin!</h1>
          <p className="pg-sub">Kelola seluruh proses penerimaan siswa baru dengan mudah.</p>
        </div>
      </div>

      <section className="stats">
        {stats.map((s) => (
          <article className="stat" key={s.label}>
            <div className={`stat-ico ${s.cls}`}>{s.icon}</div>
            <h3>{s.n}</h3>
            <p>{s.label}</p>
          </article>
        ))}
      </section>

      <section className="card">
        <div className="card-head">
          <h2>Data Pendaftar Terbaru</h2>
          <Link href="/admin/pendaftar">Lihat Semua →</Link>
        </div>
        <div className="tbl-wrap">
          <table className="grid">
            <thead>
              <tr>
                <th>No</th><th>Nama</th><th>NISN</th><th>Tanggal Daftar</th><th>Status</th><th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {terbaru.map((p) => (
                <tr key={p.no}>
                  <td>{p.no}</td>
                  <td>{p.nama}</td>
                  <td>{p.nisn}</td>
                  <td>{p.tanggal}</td>
                  <td className={p.status === "Terverifikasi" ? "st-ok" : p.status === "Pending" ? "st-wait" : "st-no"}>
                    {p.status}
                  </td>
                  <td><Link className="tag-btn" href="/admin/pendaftar">Lihat</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
