"use client";

import { useState } from "react";
import { pengumuman as dataAwal } from "../data";

type Item = (typeof dataAwal)[number];

const tglIndo = (d: Date) =>
  d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

export default function PengumumanPage() {
  const [list, setList] = useState<Item[]>(dataAwal);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [editNo, setEditNo] = useState<number | null>(null);
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [status, setStatus] = useState("Draft");
  const [isi, setIsi] = useState("");
  const [toast, setToast] = useState("");

  const rows = list.filter(
    (p) =>
      p.judul.toLowerCase().includes(q.toLowerCase()) &&
      (filter === "Semua" || p.status === filter)
  );

  function info(t: string) {
    setToast(t);
    setTimeout(() => setToast(""), 2500);
  }

  function reset() {
    setEditNo(null); setJudul(""); setTanggal(""); setIsi(""); setStatus("Draft");
  }

  function edit(p: Item) {
    setEditNo(p.no);
    setJudul(p.judul);
    setIsi(p.ringkas);
    setStatus(p.status);
    setTanggal("");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  function simpan(st: "Draft" | "Dipublikasi") {
    if (!judul.trim()) return alert("Judul pengumuman wajib diisi.");
    const tgl = tglIndo(tanggal ? new Date(tanggal) : new Date());
    const hari = tglIndo(new Date());

    if (editNo === null) {
      setList((l) =>
        [{ no: 0, judul, ringkas: isi.slice(0, 60) || "-", tanggal: tgl, status: st, diubah: hari }, ...l].map((p, i) => ({ ...p, no: i + 1 }))
      );
    } else {
      setList((l) =>
        l.map((p) =>
          p.no === editNo
            ? { ...p, judul, ringkas: isi.slice(0, 60) || "-", status: st, tanggal: tanggal ? tgl : p.tanggal, diubah: hari }
            : p
        )
      );
    }
    info(st === "Draft" ? "Draft tersimpan." : "Pengumuman dipublikasikan.");
    reset();
  }

  return (
    <>
      <div className="pg-head">
        <div>
          <h1 className="pg-title">Pengumuman</h1>
          <p className="pg-sub">Kelola Pengumuman untuk calon siswa</p>
        </div>
      </div>

      <section className="card">
        <div className="toolbar">
          <input className="field" style={{ flex: 1 }} placeholder="Cari pengumuman..." value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter status">
            <option>Semua</option>
            <option>Dipublikasi</option>
            <option>Draft</option>
          </select>
        </div>
        <table className="soft">
          <thead>
            <tr><th>No</th><th>Judul Pengumuman</th><th>Tanggal</th><th>Status</th><th>Terakhir Diubah</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {rows.map((p, i) => (
              <tr key={p.no}>
                <td>{i + 1}</td>
                <td><b>{p.judul}</b><br /><small>{p.ringkas}</small></td>
                <td>{p.tanggal}</td>
                <td><span className={p.status === "Draft" ? "draft" : "pub"}>{p.status}</span></td>
                <td>{p.diubah}</td>
                <td><button className="tag-btn edit" onClick={() => edit(p)}>Edit</button></td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center" }}>Pengumuman tidak ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>{editNo === null ? "Pengumuman Baru" : "Edit Pengumuman"}</h2>
        <label className="lbl" style={{ marginTop: 0 }}>Judul Pengumuman</label>
        <input className="field" placeholder="Contoh: Pengumuman Hasil Seleksi SPMB 2026" value={judul} onChange={(e) => setJudul(e.target.value)} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label className="lbl">Tanggal Publikasi</label>
            <input className="field" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
          </div>
          <div>
            <label className="lbl">Status Saat Ini</label>
            <input className="field" value={status} readOnly />
          </div>
        </div>

        <label className="lbl">Isi Pengumuman</label>
        <textarea className="field" placeholder="Tuliskan informasi pengumuman di sini..." value={isi} onChange={(e) => setIsi(e.target.value)} />

        <div className="toolbar" style={{ justifyContent: "space-between", marginTop: 18, marginBottom: 0 }}>
          <button className="btn soft" onClick={reset}>Batal</button>
          <div className="acts">
            <button className="btn soft" onClick={() => simpan("Draft")}>Simpan Draft</button>
            <button className="btn" onClick={() => simpan("Dipublikasi")}>Publikasikan</button>
          </div>
        </div>
      </section>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
