export default function About() {
  return (
    <section className="about">
      <div className="container about-grid">
        <div>
          <span className="badge">Bersama Kita</span>
          <h2>
            Jadi bagian dari
            <br />
            Masa Depan yang <span>Lebih Baik</span>
          </h2>
        </div>
        <div className="about-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="Logo SMK BAGIT Balikpapan" />
        </div>
      </div>
    </section>
  );
}
