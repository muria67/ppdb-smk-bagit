"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { pendaftar } from "../data";
import Modal from "../Modal";

const NAMA_BERKAS = ["Kartu Keluarga", "Akta Kelahiran", "Ijazah / SKL", "Pas Foto"];

export default function PendaftarPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("Semua Status");
  const [detail, setDetail] = useState<(typeof pendaftar)[number] | null>(null);

  // Terima kata kunci dari kolom cari di bagian atas (global)
  useEffect(() => {
    setQ(new URLSearchParams(window.location.search).get("q") ?? "");
    const h = (e: Event) => setQ((e as CustomEvent<string>).detail ?? "");
    window.addEventListener("admin-search", h);
    return () => window.removeEventListener("admin-search", h);
  }, []);

  const rows = useMemo(() => {
    const k = q.toLowerCase().trim();
    return pendaftar.filter(
      (p) =>
        (status === "Semua Status" || p.status === status) &&
        (p.nama.toLowerCase().includes(k) || p.nisn.includes(k))
    );
  }, [q, status]);

  function exportCsv() {
    const header = "No,Nama,NISN,Tanggal Daftar,Status";
    const lines = rows.map((p) => `${p.no},"${p.nama}",'${p.nisn},${p.tanggal},${p.status}`);
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data-pendaftar.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <>
      <div className="pg-head">
        <div>
          <h1 className="pg-title">Data Pendaftar</h1>
          <p className="pg-sub">Kelola data seluruh calon siswa yang mendaftar</p>
        </div>
      </div>

      <section className="card">
        <div className="toolbar">
          <input
            className="input grow"
            placeholder="🔍  Cari nama / NISN..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Semua Status</option>
            <option>Terverifikasi</option>
            <option>Pending</option>
            <option>Ditolak</option>
          </select>
          <button className="btn" onClick={exportCsv}>Export</button>
        </div>

        <div className="tbl-wrap">
          <table className="grid">
            <thead>
              <tr>
                <th>No</th><th>Nama</th><th>NISN</th><th>Tanggal Daftar</th><th>Status</th><th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={p.no}>
                  <td>{i + 1}</td>
                  <td>{p.nama}</td>
                  <td>{p.nisn}</td>
                  <td>{p.tanggal}</td>
                  <td className={p.status === "Terverifikasi" ? "st-ok" : p.status === "Pending" ? "st-wait" : "st-no"}>
                    {p.status}
                  </td>
                  <td><button className="tag-btn" onClick={() => setDetail(p)}>Lihat</button></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center" }}>Data tidak ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {detail && (
        <Modal
          title="Detail Pendaftar"
          onClose={() => setDetail(null)}
          actions={
            <>
              <button className="btn soft" onClick={() => setDetail(null)}>Tutup</button>
              <Link className="btn" href="/admin/verifikasi">Buka Verifikasi</Link>
            </>
          }
        >
          <div className="kv">
            <b>Nama</b><span>{detail.nama}</span>
            <b>NISN</b><span>{detail.nisn}</span>
            <b>Tanggal Daftar</b><span>{detail.tanggal}</span>
            <b>Status</b><span>{detail.status}</span>
          </div>
          <h3 style={{ margin: "16px 0 4px" }}>Berkas</h3>
          {NAMA_BERKAS.map((n, i) => (
            <div className="berkas-row" key={n}>
              <span>{n}</span>
              <span className={detail.berkas[i] === "ok" ? "st-ok" : detail.berkas[i] === "no" ? "st-no" : "st-wait"}>
                {detail.berkas[i] === "ok" ? "Valid" : detail.berkas[i] === "no" ? "Ditolak" : "Menunggu"}
              </span>
            </div>
          ))}
        </Modal>
      )}
    </>
  );
}
