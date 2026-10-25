import LogoutButton from "./LogoutButton";
import {
  HomeIcon,
  IdCardIcon,
  ClipboardIcon,
  CalcIcon,
  FileSearchIcon,
  FileIcon,
  MegaphoneIcon,
  WalletIcon,
  LogoutIcon,
  SearchIcon,
  StatusIcon,
  CheckBig,
  ArrowMini,
  UserTile,
  SquareTile,
  PenTile,
  FlagTile,
} from "./DashIcons";

const menu = [
  { label: "Dashboard", icon: <HomeIcon />, active: true },
  { label: "Biodata", icon: <IdCardIcon /> },
  { label: "Berkas", icon: <ClipboardIcon /> },
  { label: "Tes Online", icon: <CalcIcon /> },
  { label: "Jadwal Tes", icon: <FileSearchIcon /> },
  { label: "Hasil Tes", icon: <FileIcon /> },
  { label: "Pengumuman", icon: <MegaphoneIcon /> },
  { label: "Pembayaran", icon: <WalletIcon /> },
];

// TODO: ganti data statis ini dengan data dari database
const steps = [
  { no: 1, label: "Biodata", status: "Selesai", state: "done" },
  { no: 2, label: "Berkas", status: "Selesai", state: "done" },
  { no: 3, label: "Tes Online", status: "Saat Ini", state: "current" },
  { no: 4, label: "Pengumuman", status: "Belum Tersedia", state: "next" },
] as const;

const cards = [
  {
    title: "Biodata",
    desc: "Lengkapi data diri kamu.",
    tag: "Belum lengkap",
    tone: "muted",
    action: "Lengkapi",
    icon: <UserTile />,
  },
  {
    title: "Berkas",
    desc: "Upload dokumen persyaratan.",
    tag: "2 belum",
    tone: "pink",
    action: "Upload",
    icon: <SquareTile />,
  },
  {
    title: "Tes Online",
    desc: "Kerjakan tes sesuai jadwal.",
    tag: "Tersedia",
    tone: "green",
    action: "Mulai",
    icon: <PenTile />,
  },
  {
    title: "Pengumuman",
    desc: "Lihat informasi terbaru.",
    tag: "1 baru",
    tone: "blue",
    action: "Lihat",
    icon: <FlagTile />,
  },
] as const;

function initials(nama: string) {
  return (
    nama
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((k) => k[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

export default function StudentDashboard({ nama }: { nama: string }) {
  return (
    <div className="sd-page">
      {/* ---------- Sidebar ---------- */}
      <aside className="sd-side">
        <svg
          className="sd-side-wave"
          viewBox="0 0 60 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 0H38C58 110 8 210 24 330C40 440 18 520 56 600H0Z"
            fill="#0a5b86"
          />
        </svg>

        <div className="sd-brand">
          <h2>SPMB</h2>
          <p>
            Sistem Penerimaan Murid
            <br />
            Baru
          </p>
        </div>

        <nav className="sd-nav" aria-label="Menu calon siswa">
          {menu.map((m) => (
            <a
              key={m.label}
              href="#"
              className={`sd-nav-item${m.active ? " active" : ""}`}
              aria-current={m.active ? "page" : undefined}
            >
              {m.icon}
              <span>{m.label}</span>
            </a>
          ))}
        </nav>

        <LogoutButton className="sd-nav-item sd-logout">
          <LogoutIcon />
          <span>Keluar</span>
        </LogoutButton>
      </aside>

      {/* ---------- Konten ---------- */}
      <div className="sd-main">
        <header className="sd-top">
          <label className="sd-search">
            <SearchIcon />
            <input type="search" placeholder="Cari data..." />
          </label>

          <div className="sd-user">
            <span className="sd-avatar" aria-hidden="true">
              {initials(nama)}
            </span>
            <div>
              <strong>{nama}</strong>
              <small>Calon Siswa</small>
            </div>
          </div>
        </header>

        <section className="sd-banner">
          <div className="sd-banner-text">
            <h1>Dashboard</h1>
            <p>Selamat datang kembali, {nama}!</p>
          </div>

          <svg
            className="sd-banner-art"
            viewBox="0 0 340 110"
            aria-hidden="true"
          >
            <g fill="#cfe6f8">
              <ellipse cx="60" cy="86" rx="46" ry="16" />
              <ellipse cx="300" cy="70" rx="50" ry="22" />
              <ellipse cx="258" cy="50" rx="30" ry="14" />
            </g>
            <g fill="#b4d5f0">
              <rect x="110" y="48" width="110" height="52" rx="2" />
              <polygon points="102,50 165,22 228,50" />
              <rect x="150" y="14" width="30" height="16" rx="2" />
              <rect x="161" y="2" width="8" height="14" />
              <rect x="86" y="68" width="32" height="32" rx="2" />
              <rect x="212" y="68" width="32" height="32" rx="2" />
            </g>
            <g fill="#e6f3fd">
              <rect x="122" y="58" width="12" height="14" />
              <rect x="142" y="58" width="12" height="14" />
              <rect x="176" y="58" width="12" height="14" />
              <rect x="196" y="58" width="12" height="14" />
              <rect x="157" y="76" width="16" height="24" />
            </g>
            <g fill="#9cc7ea">
              <circle cx="40" cy="70" r="14" />
              <circle cx="320" cy="84" r="12" />
            </g>
          </svg>
          <p className="sd-slogan">
            Raih Masa Depan
            <br />
            Bersama Kami
          </p>
        </section>

        <section className="sd-status">
          <div className="sd-status-icon">
            <StatusIcon />
          </div>

          <div className="sd-status-info">
            <h2>Status Pendaftaran</h2>
            <span className="sd-active">Aktif</span>
            <p>
              Kamu sedang dalam proses pendaftaran.
              <br />
              Pastikan semua tahapan telah diselesaikan.
            </p>
          </div>

          <ol className="sd-steps">
            {steps.map((s) => (
              <li key={s.no} className={`sd-step ${s.state}`}>
                <span className="sd-step-dot">
                  {s.state === "done" ? <CheckBig /> : s.no}
                </span>
                <strong>{s.label}</strong>
                <small>{s.status}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className="sd-cards">
          {cards.map((c) => (
            <article className="sd-card" key={c.title}>
              <span className="sd-card-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="sd-card-foot">
                <span className={`sd-tag ${c.tone}`}>{c.tag}</span>
                <a href="#" className="sd-btn">
                  {c.action} <ArrowMini />
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
