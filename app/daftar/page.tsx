import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Daftar Akun | SPMB SMK BAGIT Balikpapan",
};

export default function DaftarPage() {
  return (
    <AuthShell>
      <RegisterForm />
    </AuthShell>
  );
}
