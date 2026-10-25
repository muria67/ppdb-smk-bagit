"use client";

import { useRef, useState } from "react";
import { jurusan, namaJurusan, resi as dataAwal } from "../data";
import Modal from "../Modal";

type Item = (typeof dataAwal)[number];

const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

export default function PembayaranPage() {
  const [list, setList] = useState<Item[]>(dataAwal);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ reg: "", nama: "", jurusan: jurusan[0].kode, jumlah: "152500" });
  const [resiModal, setResiModal] = useState<Item | null>(null);
  const [detail, setDetail] = useState<Item | null>(null);
  const [kuitansi, setKuitansi] = useState<Item | null>(null);
  const regRef = useRef<HTMLInputElement>(null);

  const rows = list.filter(
    (r) => r.siswa.toLowerCase().includes(q.toLowerCase()) || r.reg.toLowerCase().includes(q.toLowerCase())
  );

  const menunggu = list.filter((r) => r.status === "Pending").length;
  const disetujui = list.filter((r) => r.status === "Disetujui");
  const ditolak = list.filter((r) => r.status === "Ditolak").length;
  const totalOk = disetujui.reduce((a, r) => a + r.nominal, 0);

  function ubah(reg: string, status: string) {
    setList((l) => l.map((r) => (r.reg === reg ? { ...r, status } : r)));
    setResiModal(null);
    setDetail(null);
  }

  function inputOffline() {
    document.getElementById("form-tunai")?.scrollIntoView({ behavior: "smooth" });
    regRef.current?.focus();
  }

  function simpanTunai() {
    if (!form.reg.trim() || !form.nama.trim()) return alert("Nomor pendaftaran dan nama wajib diisi.");
    const baru: Item = {
      reg: form.reg,
      siswa: form.nama,
      jurusan: form.jurusan,
      metode: "Tunai (Loket)",
      nominal: Number(form.jumlah) || 0,
      status: "Disetujui",
      buram: false,
    };
    setList((l) => [...l, baru]);
    setKuitansi(baru);
    setForm({ reg: "", nama: "", jurusan: jurusan[0].kode, jumlah: "152500" });
  }

  const stats = [
    { label: "Menunggu Verifikasi", value: `${menunggu} Resi`, cls: "orange" },
    { label: "Disetujui Hari Ini", value: `${disetujui.length} Transaksi`, cls: "good" },
    { label: "Ditolak / Invalid", value: `${ditolak} Resi`, cls: "bad" },
    { label: "Total Terverifikasi", value: rupiah(totalOk), cls: "money" },
  ];

  return (
    <>
      <div className="pg-head">
        <div>
          <h1 className="pg-title">Verifikasi Pembayaran Pendaftaran</h1>
          <p className="pg-sub">Periksa bukti resi transfer atau catat transaksi tunai calon siswa baru.</p>
        </div>
        <button className="btn" onClick={inputOffline}>+ Input Pembayaran Offline</button>
      </div>

      <section className="stats">
        {stats.map((s) => (
          <article key={s.label} className={`stat ${s.cls}`}>
            <p>{s.label}</p>
            <h3>{s.value}</h3>
          </article>
        ))}
      </section>

      <div className="pay-grid">
        <section className="card">
          <div className="card-head">
            <h2>Daftar Resi Masuk</h2>
            <input className="field" style={{ maxWidth: 260 }} placeholder="🔍 Cari Nama / No. Reg..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="tbl-wrap">
            <table className="soft" style={{ fontSize: 13 }}>
              <thead>
                <tr><th>No. Reg</th><th>Siswa</th><th>Metode</th><th>Nominal</th><th>Resi</th><th>Status</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.reg}>
                    <td><b>{r.reg}</b></td>
                    <td>{r.siswa}<br /><small>{r.jurusan}</small></td>
                    <td>{r.metode}</td>
                    <td><b>{rupiah(r.nominal)}</b></td>
                    <td>
                      {r.buram ? (
                        <button className="lnk st-no" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }} onClick={() => setResiModal(r)}>⚠ Buram</button>
                      ) : (
                        <button className="lnk" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }} onClick={() => setResiModal(r)}>📎 Lihat Resi</button>
                      )}
                    </td>
                    <td>
                      <span className={`badge sm ${r.status === "Disetujui" ? "ok" : r.status === "Ditolak" ? "no" : "warn"}`}>{r.status}</span>
                    </td>
                    <td>
                      {r.status === "Pending" ? (
                        <div className="acts">
                          <button className="round g" title="Setujui" onClick={() => ubah(r.reg, "Disetujui")}>✓</button>
                          <button className="round r" title="Tolak" onClick={() => ubah(r.reg, "Ditolak")}>✕</button>
                        </div>
                      ) : (
                        <button className="tag-btn" onClick={() => setDetail(r)}>{r.status === "Disetujui" ? "Detail" : "Cek"}</button>
                      )}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: "center" }}>Data tidak ditemukan.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card" id="form-tunai">
          <h2>Input Pembayaran Loket (Tunai)</h2>
          <p className="pg-sub">Gunakan form ini jika calon siswa membayar langsung di sekolah.</p>

          <label className="lbl">Nomor Pendaftaran / NISN</label>
          <input ref={regRef} className="field" placeholder="SPMB-2026-00130" value={form.reg} onChange={(e) => setForm({ ...form, reg: e.target.value })} />

          <label className="lbl">Nama Calon Siswa</label>
          <input className="field" placeholder="Nama lengkap" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />

          <label className="lbl">Pilih Jurusan</label>
          <select className="field" value={form.jurusan} onChange={(e) => setForm({ ...form, jurusan: e.target.value })}>
            {jurusan.map((j) => (
              <option key={j.kode} value={j.kode}>{j.kode} - {j.nama}</option>
            ))}
          </select>

          <label className="lbl">Jenis Tagihan</label>
          <input className="field" value="Biaya Pendaftaran & Formulir (Gel. 1)" readOnly />

          <label className="lbl">Jumlah Diterima (Rp)</label>
          <input className="field" type="number" value={form.jumlah} onChange={(e) => setForm({ ...form, jumlah: e.target.value })} />

          <button className="btn wide" style={{ marginTop: 22 }} onClick={simpanTunai}>
            💾 Simpan &amp; Cetak Kuitansi
          </button>
        </section>
      </div>

      {resiModal && (
        <Modal
          title={`Bukti Resi: ${resiModal.reg}`}
          onClose={() => setResiModal(null)}
          actions={
            <>
              <button className="btn soft" onClick={() => setResiModal(null)}>Tutup</button>
              {resiModal.status === "Pending" && (
                <>
                  <button className="btn" style={{ background: "#ef4444" }} onClick={() => ubah(resiModal.reg, "Ditolak")}>Tolak</button>
                  <button className="btn" style={{ background: "#10b981" }} onClick={() => ubah(resiModal.reg, "Disetujui")}>Setujui</button>
                </>
              )}
            </>
          }
        >
          <div className="resi-box">{resiModal.buram ? "⚠ Gambar resi buram / tidak terbaca" : "Pratinjau gambar resi (belum terhubung ke upload)"}</div>
          <div className="kv" style={{ marginTop: 14 }}>
            <b>Siswa</b><span>{resiModal.siswa}</span>
            <b>Metode</b><span>{resiModal.metode}</span>
            <b>Nominal</b><span>{rupiah(resiModal.nominal)}</span>
          </div>
        </Modal>
      )}

      {detail && (
        <Modal
          title={`Detail Pembayaran: ${detail.reg}`}
          onClose={() => setDetail(null)}
          actions={
            <>
              <button className="btn soft" onClick={() => setDetail(null)}>Tutup</button>
              {detail.status === "Ditolak" && (
                <button className="btn" style={{ background: "#10b981" }} onClick={() => ubah(detail.reg, "Disetujui")}>Setujui Ulang</button>
              )}
            </>
          }
        >
          <div className="kv">
            <b>Siswa</b><span>{detail.siswa}</span>
            <b>Jurusan</b><span>{detail.jurusan} - {namaJurusan(detail.jurusan)}</span>
            <b>Metode</b><span>{detail.metode}</span>
            <b>Nominal</b><span>{rupiah(detail.nominal)}</span>
            <b>Status</b><span>{detail.status}</span>
            {detail.buram && (<><b>Catatan</b><span className="st-no">Resi buram, mohon minta unggah ulang.</span></>)}
          </div>
        </Modal>
      )}

      {kuitansi && (
        <Modal
          className="print-area"
          title="Kuitansi Pembayaran"
          onClose={() => setKuitansi(null)}
          actions={
            <>
              <button className="btn soft" onClick={() => setKuitansi(null)}>Tutup</button>
              <button className="btn" onClick={() => window.print()}>🖨 Cetak</button>
            </>
          }
        >
          <p style={{ marginTop: 0 }}>SMK BAGIT Balikpapan · Sistem Penerimaan Murid Baru</p>
          <div className="kv">
            <b>No. Pendaftaran</b><span>{kuitansi.reg}</span>
            <b>Nama</b><span>{kuitansi.siswa}</span>
            <b>Jurusan</b><span>{kuitansi.jurusan} - {namaJurusan(kuitansi.jurusan)}</span>
            <b>Keterangan</b><span>Biaya Pendaftaran &amp; Formulir (Gel. 1)</span>
            <b>Diterima</b><span><b>{rupiah(kuitansi.nominal)}</b></span>
            <b>Tanggal</b><span>{new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </Modal>
      )}
    </>
  );
}
