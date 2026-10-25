"use client";

import { useState } from "react";
import { hasil, NILAI_LULUS } from "../data";
import Modal from "../Modal";

const PER_HALAMAN = 5;

export default function HasilSeleksiPage() {
  const [filter, setFilter] = useState<"Semua" | "Lulus" | "Tidak Lulus">("Semua");
  const [hal, setHal] = useState(1);
  const [detail, setDetail] = useState<(typeof hasil)[number] | null>(null);

  const rows = hasil.filter((h) => {
    const lulus = h.nilai >= NILAI_LULUS;
    return filter === "Semua" || (filter === "Lulus" ? lulus : !lulus);
  });
  const totalHal = Math.max(1, Math.ceil(rows.length / PER_HALAMAN));
  const tampil = rows.slice((hal - 1) * PER_HALAMAN, hal * PER_HALAMAN);

  return (
    <>
      <div className="pg-head">
        <div>
          <h1 className="pg-title">Hasil Seleksi</h1>
          <p className="pg-sub">Lihat hasil seleksi calon siswa (lulus jika nilai ≥ {NILAI_LULUS})</p>
        </div>
      </div>

      <div className="toolbar" style={{ justifyContent: "space-between" }}>
        <div className="toolbar" style={{ margin: 0 }}>
          {(["Semua", "Lulus", "Tidak Lulus"] as const).map((f) => (
            <button
              key={f}
              className={`btn-out ${filter === f ? "on" : ""}`}
              onClick={() => { setFilter(f); setHal(1); }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="pager">
          <button className="arrow" onClick={() => setHal((h) => Math.max(1, h - 1))} aria-label="Sebelumnya">‹</button>
          {Array.from({ length: totalHal }, (_, i) => i + 1).map((n) => (
            <button key={n} className={hal === n ? "on" : ""} onClick={() => setHal(n)}>{n}</button>
          ))}
          <button className="arrow" onClick={() => setHal((h) => Math.min(totalHal, h + 1))} aria-label="Berikutnya">›</button>
        </div>
      </div>

      <section className="card">
        <table className="soft">
          <thead>
            <tr><th>No</th><th>Nama</th><th>Nilai</th><th>Status</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {tampil.map((h, i) => {
              const lulus = h.nilai >= NILAI_LULUS;
              return (
                <tr key={h.no}>
                  <td>{(hal - 1) * PER_HALAMAN + i + 1}</td>
                  <td>{h.nama}</td>
                  <td>{h.nilai}</td>
                  <td><span className={`badge ${lulus ? "ok" : "no"}`}>{lulus ? "Lulus" : "Tidak Lulus"}</span></td>
                  <td><button className="tag-btn edit" onClick={() => setDetail(h)}>Lihat</button></td>
                </tr>
              );
            })}
            {tampil.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: "center" }}>Tidak ada data.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {detail && (
        <Modal
          title="Detail Hasil Seleksi"
          onClose={() => setDetail(null)}
          actions={<button className="btn" onClick={() => setDetail(null)}>Tutup</button>}
        >
          <div className="kv">
            <b>Nama</b><span>{detail.nama}</span>
            <b>Nilai</b><span>{detail.nilai}</span>
            <b>Batas Lulus</b><span>{NILAI_LULUS}</span>
            <b>Status</b>
            <span>
              <span className={`badge sm ${detail.nilai >= NILAI_LULUS ? "ok" : "no"}`}>
                {detail.nilai >= NILAI_LULUS ? "Lulus" : "Tidak Lulus"}
              </span>
            </span>
          </div>
        </Modal>
      )}
    </>
  );
}
