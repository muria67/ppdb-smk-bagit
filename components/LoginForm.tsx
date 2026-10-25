
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { roles, type RoleKey } from "@/lib/roles";
import {
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "./AuthIcons";

export default function LoginForm({
  role,
}: {
  role: RoleKey;
}) {
  const cfg = roles[role];
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const identifier = String(
      form.get("identifier") ?? ""
    ).trim();

    const password = String(
      form.get("password") ?? ""
    );

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
          role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Login gagal.");
        return;
      }

      // Sesuaikan tujuan ini dengan halaman dashboard
      // yang benar-benar tersedia di project kamu.
      const destinations: Record<string, string> = {
        siswa: "/siswa",
        admin: "/admin",
        kepsek: "/kepsek",
      };

      router.push(destinations[role] || "/");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form-wrap">
      <h1 className="auth-title">LOGIN</h1>
      <p className="auth-greeting">{cfg.greeting}</p>

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="identifier" className="login-label">
          Username atau Email
        </label>

        <div className="login-input">
          <span className="login-input-icon">
            <UserIcon />
          </span>
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            placeholder="Masukkan Email"
            required
          />
        </div>

        <label htmlFor="password" className="login-label">
          Password
        </label>

        <div className="login-input">
          <span className="login-input-icon">
            <LockIcon />
          </span>
          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Masukkan Password"
            required
          />
          <button
            type="button"
            className="login-eye"
            aria-label={
              show
                ? "Sembunyikan password"
                : "Tampilkan password"
            }
            onClick={() => setShow((v) => !v)}
          >
            {show ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {error && (
          <p className="register-error" role="alert">
            {error}
          </p>
        )}

        <div className="login-forgot">
          <Link href="#">Lupa Password?</Link>
        </div>

        <button
          type="submit"
          className="auth-submit"
          disabled={loading}
        >
          {loading ? "MEMPROSES..." : "LOGIN"}
        </button>

        {cfg.showRegister && (
          <p className="auth-switch">
            Belum Punya Akun?{" "}
            <Link href="/daftar">Register</Link>
          </p>
        )}
      </form>
    </div>
  );
}
