"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({
  className = "dash-logout",
  children = "Logout",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button type="button" className={className} onClick={handleLogout}>
      {children}
    </button>
  );
}
