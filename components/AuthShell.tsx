import Link from "next/link";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <aside className="auth-side">
          {/* dekorasi gelombang kiri */}
          <svg
            className="auth-blob"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 0 H8 C14 30 4 55 0 70 Z" fill="#bcd9ff" />
            <path d="M0 26 C14 48 8 72 0 100 H14 C0 82 -4 56 0 26 Z" fill="#79c4ff" />
          </svg>
          {/* gelombang pemisah ke panel putih */}
          <svg
            className="auth-wave"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M100 0 V100 H35 C8 78 40 62 22 42 C8 26 34 10 52 0 Z"
              fill="#fff"
            />
          </svg>

          <div className="auth-side-inner">
            <Link href="/" aria-label="Kembali ke beranda">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="auth-logo"
                src="/images/logo.svg"
                alt="Logo SMK BAGIT Balikpapan"
              />
            </Link>
            <h2 className="auth-abbr">SPMB</h2>
            <p className="auth-fullname">
              Sistem Penerimaan
              <br />
              Murid Baru
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="auth-school"
              src="/images/school.svg"
              alt="Ilustrasi gedung sekolah"
            />
          </div>
        </aside>

        <section className="auth-main">{children}</section>
      </div>
    </main>
  );
}
