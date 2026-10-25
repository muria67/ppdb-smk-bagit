"use client";

import { useState } from "react";
import { jadwal as dataAwal } from "../data";
import Modal from "../Modal";

type Item = (typeof dataAwal)[number];

const NAMA_HARI = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const NAMA_BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const fmt = (s: string) =>
  new Date(s + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

export default function JadwalTesPage() {
  const [list, setList] = useState<Item[]>(dataAwal);
  const [tahun, setTahun] = useState(2025);
  const [bulan, setBulan] = useState(3); // 0 = Januari -> 3 = April
  const [sel, setSel] = useState("2025-04-20");
  const [form, setForm] = useState<Item | null>(null);

  const offset = (new Date(tahun, bulan, 1).getDay() + 6) % 7; // Senin = 0
  const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
  const diTanggal = list.filter((j) => j.tanggal === sel);

  function geser(n: number) {
    const d = new Date(tahun, bulan + n, 1);
    setTahun(d.getFullYear());
    setBulan(d.getMonth());
  }

  function tambah(tanggal = sel) {
    setForm({ no: 0, nama: "", tanggal, mulai: "08:00", selesai: "11:00", lokasi: "" });
  }

  function simpan() {
    if (!form) return;
    if (!form.nama.trim() || !form.tanggal || !form.lokasi.trim()) {
      return alert("Nama tes, tanggal, dan lokasi wajib diisi.");
    }
    if (form.no === 0) {
      setList((l) => [...l, { ...form, no: l.length + 1 }]);
    } else {
      setList((l) => l.map((j) => (j.no === form.no ? form : j)));
    }
    setSel(form.tanggal);
    setForm(null);
  }

  function hapus(no: number) {
    if (!confirm("Hapus jadwal ini?")) return;
    setList((l) => l.filter((j) => j.no !== no).map((j, i) => ({ ...j, no: i + 1 })));
  }

  return (
    <>
      <div className="pg-head">
        <div>
          <h1 className="pg-title">Jadwal Tes</h1>
          <p className="pg-sub">Atur jadwal pelaksanaan tes seleksi</p>
        </div>
        <button className="btn" onClick={() => tambah()}>＋ Tambah Jadwal</button>
      </div>

      <section className="card">
        <table className="soft">
          <thead>
            <tr><th>No</th><th>Nama Tes</th><th>Tanggal</th><th>Waktu</th><th>Lokasi</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {list.map((j) => (
              <tr key={j.no}>
                <td>{j.no}</td>
                <td><b>{j.nama}</b></td>
                <td>{fmt(j.tanggal)}</td>
                <td>{j.mulai} - {j.selesai}</td>
                <td>{j.lokasi}</td>
                <td>
                  <div className="acts">
                    <button className="tag-btn edit" onClick={() => setForm(j)}>Edit</button>
                    <button className="tag-btn del" onClick={() => hapus(j.no)}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center" }}>Belum ada jadwal.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      <div className="two-col">
        <section className="card">
          <h2>Kalender Jadwal</h2>
          <div className="card-head" style={{ marginBottom: 12 }}>
            <button className="btn soft" onClick={() => geser(-1)} aria-label="Bulan sebelumnya">‹</button>
            <div className="cal-title" style={{ margin: 0 }}>{NAMA_BULAN[bulan]} {tahun}</div>
            <button className="btn soft" onClick={() => geser(1)} aria-label="Bulan berikutnya">›</button>
          </div>
          <div className="cal">
            {NAMA_HARI.map((h) => <b key={h}>{h}</b>)}
            {Array.from({ length: offset }).map((_, i) => <span key={`k${i}`} />)}
            {Array.from({ length: jumlahHari }, (_, i) => i + 1).map((d) => {
              const t = iso(tahun, bulan, d);
              const ada = list.some((j) => j.tanggal === t);
              return (
                <button key={d} className={`${ada ? "has" : ""} ${sel === t ? "sel" : ""}`} onClick={() => setSel(t)}>
                  {d}
                </button>
              );
            })}
          </div>
        </section>

        <section className="card">
          <h2>Detail Jadwal</h2>
          {diTanggal.length > 0 ? (
            diTanggal.map((j) => (
              <div className="detail-box" key={j.no} style={{ marginBottom: 12 }}>
                <h3>{j.nama}</h3>
                <div>📅 {fmt(j.tanggal)}</div>
                <div>🕗 {j.mulai} - {j.selesai}</div>
                <div>📍 {j.lokasi}</div>
                <button className="btn wide" style={{ marginTop: 12 }} onClick={() => setForm(j)}>Edit Jadwal</button>
              </div>
            ))
          ) : (
            <div className="detail-box">
              <p style={{ margin: 0 }}>Tidak ada jadwal pada {fmt(sel)}.</p>
              <button className="btn wide" style={{ marginTop: 12 }} onClick={() => tambah()}>＋ Tambah Jadwal di Tanggal Ini</button>
            </div>
          )}
        </section>
      </div>

      {form && (
        <Modal
          title={form.no === 0 ? "Tambah Jadwal" : "Edit Jadwal"}
          onClose={() => setForm(null)}
          actions={
            <>
              <button className="btn soft" onClick={() => setForm(null)}>Batal</button>
              <button className="btn" onClick={simpan}>Simpan</button>
            </>
          }
        >
          <label className="lbl">Nama Tes</label>
          <input className="field" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
          <label className="lbl">Tanggal</label>
          <input className="field" type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} />
          <div className="g2">
            <div>
              <label className="lbl">Mulai</label>
              <input className="field" type="time" value={form.mulai} onChange={(e) => setForm({ ...form, mulai: e.target.value })} />
            </div>
            <div>
              <label className="lbl">Selesai</label>
              <input className="field" type="time" value={form.selesai} onChange={(e) => setForm({ ...form, selesai: e.target.value })} />
            </div>
          </div>
          <label className="lbl">Lokasi</label>
          <input className="field" value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} />
        </Modal>
      )}
    </>
  );
}
