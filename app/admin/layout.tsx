import { requireRole } from "@/lib/auth";
import AdminShell from "./AdminShell";
import "./admin.css";

export const metadata = {
  title: "Admin | SPMB SMK BAGIT",
};

// Layout ini membungkus SEMUA halaman di /admin/*.
// Pemeriksaan login + role dilakukan di server satu kali di sini.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole("admin");

  return <AdminShell nama={session.nama}>{children}</AdminShell>;
}
