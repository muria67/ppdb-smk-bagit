// Role di URL halaman login (tampilan)
export const roles = {
  admin: {
    label: "Admin",
    greeting: "Selamat Datang, Admin!",
    showRegister: false,
  },
  siswa: {
    label: "Calon Siswa",
    greeting: "Silahkan Masuk Ke Akun Anda",
    showRegister: true,
  },
  kepsek: {
    label: "Kepala Sekolah",
    greeting: "Selamat Datang, Kepala Sekolah!",
    showRegister: false,
  },
} as const;

export type RoleKey = keyof typeof roles;

export const roleKeys = Object.keys(roles) as RoleKey[];

// Role di database (kolom users.role)
export const dbRoles = ["siswa", "admin", "kepsek"] as const;

export type DbRole = (typeof dbRoles)[number];

export function isDbRole(value: unknown): value is DbRole {
  return typeof value === "string" && (dbRoles as readonly string[]).includes(value);
}

// Tujuan setelah login, sesuai role dari database
export const dashboardPaths: Record<DbRole, string> = {
  siswa: "/app/siswa",
  admin: "/dashboard/admin",
  kepsek: "/dashboard/kepsek",
};
