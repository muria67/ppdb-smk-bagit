// Fungsi bantu murni (tanpa database) untuk Kelola Akun.

export const ROLES = ["admin", "kepsek", "calon_siswa"];

export const LABEL_ROLE = {
  admin: "Admin",
  kepsek: "Kepala Sekolah",
  calon_siswa: "Calon Siswa",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN = 8;

export function formatTanggal(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Hanya kolom aman. Kolom password TIDAK PERNAH dikirim ke browser.
export function toPublic(row) {
  return {
    id: row.id,
    nama: row.nama,
    email: row.email,
    role: row.role,
    dibuat: formatTanggal(row.created_at),
  };
}

// Mengembalikan { error } atau { data }.
export function validasi(body, { passwordWajib }) {
  const nama = String(body?.nama ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const role = String(body?.role ?? "");
  const password = typeof body?.password === "string" ? body.password : "";

  if (nama.length < 2 || nama.length > 100) {
    return { error: "Nama harus 2-100 karakter." };
  }
  if (!EMAIL_RE.test(email) || email.length > 150) {
    return { error: "Format email tidak valid." };
  }
  if (!ROLES.includes(role)) {
    return { error: "Role tidak dikenal." };
  }
  if (passwordWajib || password !== "") {
    if (password.length < PASSWORD_MIN) {
      return { error: `Password minimal ${PASSWORD_MIN} karakter.` };
    }
    if (password.length > 72) {
      return { error: "Password maksimal 72 karakter." };
    }
  }

  return { data: { nama, email, role, password } };
}
