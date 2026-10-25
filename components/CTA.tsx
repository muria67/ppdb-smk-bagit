import { ArrowRight } from "./Icons";

export default function CTA() {
  return (
    <section className="cta-wrap">
      <div className="container">
        <div className="cta">
          <div className="cta-icon" aria-hidden="true">
            🎓
          </div>
          <div className="cta-text">
            <h2>
              Siap Bergabung dengan
              <br />
              SMK BAGIT?
            </h2>
            <p>
              Jangan lewatkan kesempatan untuk menjadi bagian dari keluarga
              besar SMK BAGI Balikpapan.
            </p>
          </div>
          <a href="/daftar" className="btn btn-white">
            Daftar Sekarang <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
