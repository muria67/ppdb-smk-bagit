import {
  ArrowRight,
  UserPlusIcon,
  FormIcon,
  UploadIcon,
  CheckIcon,
} from "./Icons";

const steps = [
  {
    icon: <UserPlusIcon />,
    title: "Buat Akun",
    desc: "Daftarkan diri Anda dengan mengisi data dasar yang valid.",
  },
  {
    icon: <FormIcon />,
    title: "Isi Formulir",
    desc: "Lengkapi formulir pendaftaran sesuai dengan data diri dan pilihan jurusan.",
  },
  {
    icon: <UploadIcon />,
    title: "Unggah Berkas",
    desc: "Upload dokumen yang dibutuhkan dalam format yang telah ditentukan.",
  },
  {
    icon: <CheckIcon />,
    title: "Cek Hasil Seleksi",
    desc: "Pantau hasil seleksi melalui akun Anda secara online.",
  },
];

export default function Steps() {
  return (
    <section className="steps" id="informasi">
      <div className="container">
        <span className="badge">Langkah Mudah</span>
        <h2>Alur Pendaftaran</h2>
        <p className="lead">
          Ikuti langkah-langkah berikut untuk mendaftar sebagai calon peserta
          didik baru di SMK BAGI Balikpapan.
        </p>

        <div className="steps-row">
          {steps.map((s, i) => (
            <div className="step-card" key={s.title}>
              <span className="step-num">{i + 1}</span>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="step-arrow">
                <ArrowRight size={22} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
