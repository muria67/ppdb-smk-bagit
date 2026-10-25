import type { Metadata } from "next";
import StudentDashboard from "@/components/StudentDashboard";
import { requireRole } from "@/lib/auth";
// @ts-ignore Next.js handles CSS side-effect imports at build time.
import './dashboard.css'


export const metadata: Metadata = {
  title: "Dashboard Calon Siswa | SPMB SMK BAGIT",
};

export default async function DashboardCalonSiswa() {
  const session = await requireRole("siswa");

  return <StudentDashboard nama={session.nama} />;
}
