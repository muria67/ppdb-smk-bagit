import { BoltIcon, ShieldIcon, HeadsetIcon } from "./Icons";

const items = [
  {
    icon: <BoltIcon />,
    title: "Proses Cepat",
    desc: "Daftar kapan dan dimana saja",
  },
  {
    icon: <ShieldIcon />,
    title: "Aman & Terpercaya",
    desc: "Data anda terlinfungi dengan sistem keamanan berlapis",
  },
  {
    icon: <HeadsetIcon />,
    title: "Dukungan 24/7",
    desc: "Tim kami siap membantu kapan saja",
  },
];

export default function Features() {
  return (
    <section className="features" id="fitur">
      <div className="container features-grid">
        <div>
          <span className="badge">Keunggulan</span>
          <h2>Mengapa Memilih PPDB Online?</h2>
          <p className="lead">
            Kami menghadirkan sistem pendaftaran yang mudah digunakan, aman, dan
            didukung teknologi terbaru
          </p>
        </div>
        <div className="feature-cards">
          {items.map((it) => (
            <div className="feature-card" key={it.title}>
              {it.icon}
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
