"use client";

import { useState } from "react";
import { namaJurusan, pendaftar as dataAwal } from "../data";
import Modal from "../Modal";

type Row = (typeof dataAwal)[number];
type Berkas = Row["berkas"][number];

const tabs = [
  { label: "Semua", value: "" },
  { label: "Menunggu", value: "Pending" },
  { label: "Terverifikasi", value: "Terverifikasi" },
  { label: "Ditolak", value: "Ditolak" },
];
const NAMA_BERKAS = ["Kartu Keluarga", "Akta Kelahiran", "Ijazah / SKL", "Pas Foto"];

export default function VerifikasiPage() {
  const [list, setList] = useState<Row[]>(dataAwal);
  const [tab, setTab] = useState("");
  const [pilih, setPilih] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  const rows = list.filter((p) => !tab || p.status === tab);
  const aktif = list.find((p) => p.no === pilih) ?? null;

  function info(t: string) {
    setToast(t);
    setTimeout(() => setToast(""), 2500);
  }

  function setBerkas(no: number, idx: number, v: Berkas) {
    setList((l) => l.map((p) => (p.no === no ? { ...p, berkas: p.berkas.map((b, i) => (i === idx ? v : b)) } : p)));
  }

  function putuskan(no: number, status: "Terverifikasi" | "Ditolak") {
    setList((l) =>
      l.map((p) =>
        p.no === no
          ? { ...p, status, berkas: p.berkas.map((b) => (status === "Terverifikasi" ? "ok" : b === "ok" ? "ok" : "no")) as Row["berkas"] }
          : p
      )
    );
    setPilih(null);
    info(status === "Terverifikasi" ? "Pendaftar diverifikasi." : "Pendaftar ditolak.");
  }

  return (
    <>
      <div className="pg-head">
        <div>
          <h1 className="pg-title">Verifikasi Data</h1>
          <p className="pg-sub">Periksa dan verifikasi biodata serta berkas pendaftar</p>
        </div>
      </div>

      <section className="card">
        <div className="toolbar">
          {tabs.map((t) => (
            <button
              key={t.label}
              className={`btn-out ${tab === t.value ? "on" : ""}`}
              onClick={() => setTab(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="tbl-wrap">
          <table className="grid">
            <thead>
              <tr>
                <th>No</th><th>Nama</th><th>NISN</th><th>Status</th><th>Berkas</th><th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={p.no}>
                  <td>{i + 1}</td>
                  <td>{p.nama}</td>
                  <td>{p.nisn}</td>
                  <td className={p.status === "Terverifikasi" ? "st-ok" : p.status === "Pending" ? "st-wait" : "st-no"}>
                    {p.status}
                  </td>
                  <td>
                    <div className="docs">
                      {p.berkas.map((b, k) => (
                        <span key={k} className={`doc ${b === "wait" ? "" : b}`} />
                      ))}
                    </div>
                  </td>
                  <td><button className="tag-btn" onClick={() => setPilih(p.no)}>Lihat</button></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center" }}>Tidak ada data.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {aktif && (
        <Modal
          title={`Verifikasi: ${aktif.nama}`}
          onClose={() => setPilih(null)}
          actions={
            <>
              <button className="btn soft" onClick={() => setPilih(null)}>Tutup</button>
              <button className="btn" style={{ background: "#ef4444" }} onClick={() => putuskan(aktif.no, "Ditolak")}>Tolak</button>
              <button className="btn" style={{ background: "#10b981" }} onClick={() => putuskan(aktif.no, "Terverifikasi")}>Verifikasi</button>
            </>
          }
        >
          <div className="kv">
            <b>NISN</b><span>{aktif.nisn}</span>
            <b>Jurusan</b><span>{aktif.jurusan} - {namaJurusan(aktif.jurusan)}</span>
            <b>Tanggal Daftar</b><span>{aktif.tanggal}</span>
            <b>Status</b><span>{aktif.status}</span>
          </div>
          <h3 style={{ margin: "16px 0 4px" }}>Berkas</h3>
          {NAMA_BERKAS.map((n, i) => (
            <div className="berkas-row" key={n}>
              <span>{n}</span>
              <span className="acts">
                <span className={aktif.berkas[i] === "ok" ? "st-ok" : aktif.berkas[i] === "no" ? "st-no" : "st-wait"}>
                  {aktif.berkas[i] === "ok" ? "Valid" : aktif.berkas[i] === "no" ? "Ditolak" : "Menunggu"}
                </span>
                <button className="round g" title="Valid" onClick={() => setBerkas(aktif.no, i, "ok")}>✓</button>
                <button className="round r" title="Tolak" onClick={() => setBerkas(aktif.no, i, "no")}>✕</button>
              </span>
            </div>
          ))}
        </Modal>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
