"use client";

import { useMemo, useState } from "react";
import Modal from "../Modal";

type User = { id: number; nama: string; email: string; role: string; dibuat: string };

const LABEL: Record<string, string> = {
  admin: "Admin",
  kepsek: "Kepala Sekolah",
  calon_siswa: "Calon Siswa",
};
const BADGE: Record<string, string> = {
  admin: "warn",
  kepsek: "ok",
  calon_siswa: "blue",
};

type Form = { id: number | null; nama: string; email: string; role: string; password: string };
const kosong: Form = { id: null, nama: "", email: "", role: "calon_siswa", password: "" };

async function kirim(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Permintaan gagal.");
  return json;
}

export default function AkunClient({ awal, meId }: { awal: User[]; meId: number }) {
  const [list, setList] = useState<User[]>(awal);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [form, setForm] = useState<Form | null>(null);
  const [lihatPw, setLihatPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const rows = useMemo(() => {
    const k = q.toLowerCase().trim();
    return list.filter(
      (u) =>
        (filter === "Semua" || u.role === filter) &&
        (u.nama.toLowerCase().includes(k) || u.email.toLowerCase().includes(k))
    );
  }, [list, q, filter]);

  const hitung = (r: string) => list.filter((u) => u.role === r).length;

  function info(t: string) {
    setToast(t);
    setTimeout(() => setToast(""), 2500);
  }

  function buka(u?: User) {
    setError("");
    setLihatPw(false);
    setForm(u ? { id: u.id, nama: u.nama, email: u.email, role: u.role, password: "" } : kosong);
  }

  async function simpan() {
    if (!form) return;
    setError("");
    setLoading(true);
    try {
      const baru = form.id === null;
      const json = await kirim(
        baru ? "/api/admin/akun" : `/api/admin/akun/${form.id}`,
        baru ? "POST" : "PATCH",
        { nama: form.nama, email: form.email, role: form.role, password: form.password }
      );
      const user: User = json.user;
      setList((l) => (baru ? [...l, user] : l.map((x) => (x.id === user.id ? user : x))));
      setForm(null);
      info(baru ? "Akun berhasil ditambahkan." : "Akun berhasil diperbarui.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  async function hapus(u: User) {
    if (!confirm(`Hapus akun "${u.nama}" (${u.email})? Tindakan ini tidak bisa dibatalkan.`)) return;
    try {
      await kirim(`/api/admin/akun/${u.id}`, "DELETE");
      setList((l) => l.filter((x) => x.id !== u.id));
      info("Akun dihapus.");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menghapus akun.");
    }
  }

  const edit = form !== null && form.id !== null;

  return (
    <>
      <div className="pg-head">
        <div>
          <h1 className="pg-title">Kelola Akun</h1>
          <p className="pg-sub">Atur akun Admin, Kepala Sekolah, dan Calon Siswa yang bisa login</p>
        </div>
        <button className="btn" onClick={() => buka()}>＋ Tambah Akun</button>
      </div>

      <section className="stats">
        <article className="stat"><p>Total Akun</p><h3>{list.length}</h3></article>
        <article className="stat"><p>Admin</p><h3>{hitung("admin")}</h3></article>
        <article className="stat"><p>Kepala Sekolah</p><h3>{hitung("kepsek")}</h3></article>
        <article className="stat"><p>Calon Siswa</p><h3>{hitung("calon_siswa")}</h3></article>
      </section>

      <section className="card">
        <div className="toolbar">
          <input
            className="input grow"
            placeholder="🔍  Cari nama atau email..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter role">
            <option value="Semua">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="kepsek">Kepala Sekolah</option>
            <option value="calon_siswa">Calon Siswa</option>
          </select>
        </div>

        <table className="soft">
          <thead>
            <tr><th>No</th><th>Nama</th><th>Email</th><th>Role</th><th>Dibuat</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {rows.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>
                  <b>{u.nama}</b>
                  {u.id === meId && <small> (akun kamu)</small>}
                </td>
                <td>{u.email}</td>
                <td><span className={`badge sm ${BADGE[u.role] ?? "blue"}`}>{LABEL[u.role] ?? u.role}</span></td>
                <td>{u.dibuat}</td>
                <td>
                  <div className="acts">
                    <button className="tag-btn edit" onClick={() => buka(u)}>Edit</button>
                    <button
                      className="tag-btn del"
                      disabled={u.id === meId}
                      title={u.id === meId ? "Tidak bisa menghapus akun sendiri" : "Hapus akun"}
                      onClick={() => hapus(u)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center" }}>Akun tidak ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {form && (
        <Modal
          title={edit ? "Edit Akun" : "Tambah Akun"}
          onClose={() => !loading && setForm(null)}
          actions={
            <>
              <button className="btn soft" disabled={loading} onClick={() => setForm(null)}>Batal</button>
              <button className="btn" disabled={loading} onClick={simpan}>
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </>
          }
        >
          <label className="lbl" style={{ marginTop: 0 }}>Nama</label>
          <input className="field" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />

          <label className="lbl">Email</label>
          <input className="field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <label className="lbl">Role</label>
          <select
            className="field"
            value={form.role}
            disabled={form.id === meId}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="kepsek">Kepala Sekolah</option>
            <option value="calon_siswa">Calon Siswa</option>
          </select>
          {form.id === meId && <small>Role akun kamu sendiri tidak bisa diubah.</small>}

          <label className="lbl">{edit ? "Password Baru (kosongkan jika tidak diubah)" : "Password"}</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="field"
              type={lihatPw ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Minimal 8 karakter"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" className="btn soft" onClick={() => setLihatPw((v) => !v)}>
              {lihatPw ? "Sembunyi" : "Lihat"}
            </button>
          </div>

          {error && <p className="st-no" role="alert" style={{ marginBottom: 0 }}>{error}</p>}
        </Modal>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
