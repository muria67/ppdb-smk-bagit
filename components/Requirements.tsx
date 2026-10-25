import { CheckCircle } from "./Icons";

const docs = [
  "Ijazah atau Surat Keterangan Lulus (SKL) SMP/MTs",
  "Akta Kelahiran",
  "Kartu Keluarga (KK)",
  "Kartu Tanda Penduduk (KTP) Orang Tua/Wali",
  "Pas Foto Terbaru (latar belakang biru)",
  "Dokumen tambahan sesuai jurusan yang dipilih (jika diperlukan)",
];

export default function Requirements() {
  return (
    <section className="requirements">
      <div className="container">
        <div className="req-card">
          <div>
            <span className="badge">Informasi Penting</span>
            <h2>Persyaratan Pendaftaran</h2>
            <p className="lead">
              Pastikan Anda telah menyiapkan dokumen berikut sebelum melakukan
              pendaftaran.
            </p>
          </div>
          <ul className="req-list">
            {docs.map((d) => (
              <li key={d}>
                <CheckCircle />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
