import { ArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section className="hero" id="beranda">
      <div className="hero-inner">
        <div>
          <span className="badge">Sistem Penerimaan Peserta Didik Baru</span>
          <h1>
            Selamat Datang di
            <br />
            SPMB <span>SMK BAGIT</span>
          </h1>
          <p>
            Pendaftaran siswa baru kini lebih mudah, cepat dan transparan
            melalui sistem online. Raih masa depan terbaik bersama kami!
          </p>
          <div className="hero-actions">
            <a href="/daftar" className="btn btn-primary">
              Daftar Sekarang <ArrowRight />
            </a>
            <a href="#informasi" className="btn btn-outline-dark">
              Pelajari Panduan
            </a>
          </div>
        </div>
        <div className="hero-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero.png" alt="Siswa SMK BAGIT di depan gedung sekolah" />
        </div>
      </div>
    </section>
  );
}
