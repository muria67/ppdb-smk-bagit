import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import LoginForm from "@/components/LoginForm";
import { roles, roleKeys, type RoleKey } from "@/lib/roles";

export const dynamicParams = false;

export function generateStaticParams() {
  return roleKeys.map((role) => ({ role }));
}

export function generateMetadata({
  params,
}: {
  params: { role: string };
}): Metadata {
  const cfg = roles[params.role as RoleKey];
  return {
    title: cfg
      ? `Login ${cfg.label} | PPDB SMK BAGIT Balikpapan`
      : "Login | PPDB SMK BAGIT Balikpapan",
  };
}

export default function LoginRolePage({
  params,
}: {
  params: { role: string };
}) {
  if (!(params.role in roles)) notFound();

  return (
    <AuthShell>
      <LoginForm role={params.role as RoleKey} />
    </AuthShell>
  );
}
