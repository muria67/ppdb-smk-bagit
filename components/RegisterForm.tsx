
"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const nama = String(data.get("nama") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");

    if (!nama || !email || !password || !confirm) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    if (password !== confirm) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Pendaftaran gagal.");
        return;
      }

      setSuccess(
        result.message || "Registrasi berhasil! Silakan login."
      );

      form.reset();
    } catch (err) {
      console.error("Register error:", err);
      setError(
        "Tidak dapat terhubung ke server. Pastikan server Next.js berjalan."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form-wrap register">
      <h1 className="auth-title register-title">
        Daftar Akun
      </h1>

      <p className="register-sub">
        Buat akun untuk memulai pendaftaran SPMB.
      </p>

      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="nama">Nama Lengkap Siswa</label>
        <input
          id="nama"
          name="nama"
          type="text"
          autoComplete="name"
          maxLength={100}
          required
        />

        <label htmlFor="email">Email aktif</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={150}
          required
        />

        <label htmlFor="wa">Nomor WhatsApp</label>
        <input
          id="wa"
          name="wa"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <label htmlFor="confirm">Konfirmasi Password</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <label className="register-check">
          <input type="checkbox" name="setuju" required />
          <span>
            Saya menyetujui ketentuan pendaftaran SPMB.
          </span>
        </label>

        {error && (
          <p className="register-error" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            style={{ color: "green", marginTop: "12px" }}
          >
            {success}
            {" "}
            <Link href="/login/siswa">
              Login sekarang
            </Link>
          </p>
        )}

        <button
          type="submit"
          className="auth-submit"
          disabled={loading}
        >
          {loading ? "MEMPROSES..." : "REGISTER"}
        </button>

        <p className="auth-switch">
          Sudah Punya Akun?{" "}
          <Link href="/login/siswa">Login</Link>
        </p>
      </form>
    </div>
  );
}
