"use client";

import { useState } from "react";

const links = [
  { href: "#beranda", label: "Beranda", active: true },
  { href: "#informasi", label: "Informasi" },
  { href: "#fitur", label: "Fitur" },
  { href: "#kontak", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <nav className={`nav ${open ? "open" : ""}`}>
        <a href="#beranda" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="Logo SMK BAGIT" />
          <div>
            <div className="brand-name">SMK BAGIT BALIKPAPAN</div>
            <div className="brand-sub">SPMB Online</div>
          </div>
        </a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={l.active ? "active" : ""}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="/login" className="btn btn-outline">
            Login
          </a>
          <a href="/daftar" className="btn btn-primary">
            Daftar
          </a>
        </div>

        <button
          className="menu-toggle"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
