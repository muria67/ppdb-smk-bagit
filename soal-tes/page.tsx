"use client";

import { useState } from "react";
import { soal as dataAwal } from "../data";
import Modal from "../Modal";

const KATEGORI = ["Umum", "Matematika", "PPKn", "Bahasa Indonesia", "IPA"];
const kosong = { pertanyaan: "", kategori: "Umum", tipe: "Pilihan Ganda" };

export default function SoalTesPage() {
  const [list, setList] = useState(dataAwal);
  const [open, setOpen] = useState(false);
  const [editNo, setEditNo] = useState<number | null>(null);
  const [form, setForm] = useState(kosong);

  function tambah() {
    setEditNo(null);
    setForm(kosong);
    setOpen(true);
  }

  function edit(no: number) {
    const s = list.find((x) => x.no === no);
    if (!s) return;
    setEditNo(no);
    setForm({ pertanyaan: s.pertanyaan, kategori: s.kategori, tipe: s.tipe });
    setOpen(true);
  }

  function simpan() {
    if (!form.pertanyaan.trim()) return alert("Pertanyaan wajib diisi.");
    if (editNo === null) {
      setList((l) => [...l, { no: l.length + 1, ...form }]);
    } else {
      setList((l) => l.map((s) => (s.no === editNo ? { ...s, ...form } : s)));
    }
    setOpen(false);
  }

  function hapus(no: number) {
    if (!confirm("Hapus soal ini?")) return;
    setList((l) => l.filter((s) => s.no !== no).map((s, i) => ({ ...s, no: i + 1 })));
  }

  return (
    <>
      <div className="pg-head">
        <div>
          <h1 className="pg-title">Soal Tes</h1>
          <p className="pg-sub">Tambah, Edit, dan Hapus Soal</p>
        </div>
        <button className="btn" onClick={tambah}>＋ Tambah Soal</button>
      </div>

      <section className="card">
        <table className="soft">
          <thead>
            <tr><th>No</th><th>Pertanyaan</th><th>Kategori</th><th>Tipe</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.no}>
                <td>{s.no}</td>
                <td>{s.pertanyaan}</td>
                <td>{s.kategori}</td>
                <td>{s.tipe}</td>
                <td>
                  <div className="acts">
                    <button className="tag-btn edit" onClick={() => edit(s.no)}>Edit</button>
                    <button className="tag-btn del" onClick={() => hapus(s.no)}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: "center" }}>Belum ada soal.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {open && (
        <Modal
          title={editNo === null ? "Tambah Soal" : "Edit Soal"}
          onClose={() => setOpen(false)}
          actions={
            <>
              <button className="btn soft" onClick={() => setOpen(false)}>Batal</button>
              <button className="btn" onClick={simpan}>Simpan</button>
            </>
          }
        >
          <label className="lbl">Pertanyaan</label>
          <textarea
            className="field"
            value={form.pertanyaan}
            onChange={(e) => setForm({ ...form, pertanyaan: e.target.value })}
          />
          <label className="lbl">Kategori</label>
          <select className="field" value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })}>
            {KATEGORI.map((k) => <option key={k}>{k}</option>)}
          </select>
          <label className="lbl">Tipe</label>
          <select className="field" value={form.tipe} onChange={(e) => setForm({ ...form, tipe: e.target.value })}>
            <option>Pilihan Ganda</option>
            <option>Essay</option>
          </select>
        </Modal>
      )}
    </>
  );
}
