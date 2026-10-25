// Data contoh. Nanti ganti dengan query ke database spmbb.

export type StatusPendaftar = "Terverifikasi" | "Pending" | "Ditolak";

const pendaftarDasar: {
  no: number;
  nama: string;
  nisn: string;
  tanggal: string;
  status: StatusPendaftar;
  berkas: ("ok" | "no" | "wait")[];
}[] = [
  { no: 1, nama: "Kim Ji-Yeon", nisn: "1234567891011", tanggal: "6 September 2026", status: "Terverifikasi", berkas: ["ok", "ok", "ok", "ok"] },
  { no: 2, nama: "Lee Jaein", nisn: "1234567891231", tanggal: "6 September 2026", status: "Terverifikasi", berkas: ["ok", "ok", "ok", "ok"] },
  { no: 3, nama: "Kim Bongseok", nisn: "1234567432123", tanggal: "6 September 2026", status: "Terverifikasi", berkas: ["ok", "ok", "ok", "ok"] },
  { no: 4, nama: "Asep Bayhaqi", nisn: "1345677654321", tanggal: "5 September 2026", status: "Pending", berkas: ["wait", "wait", "wait", "wait"] },
  { no: 5, nama: "Muria Baikhati", nisn: "1234567432234", tanggal: "4 September 2026", status: "Terverifikasi", berkas: ["ok", "ok", "ok", "ok"] },
  { no: 6, nama: "bayhaqi bay", nisn: "1234567432234", tanggal: "4 September 2026", status: "Pending", berkas: ["ok", "ok", "ok", "ok"] },
  { no: 7, nama: "ubay bay", nisn: "1234567432234", tanggal: "4 September 2026", status: "Pending", berkas: ["wait", "wait", "wait", "wait"] },
  { no: 8, nama: "Kim Minju", nisn: "1234567432238", tanggal: "4 September 2026", status: "Terverifikasi", berkas: ["ok", "ok", "ok", "ok"] },
  { no: 9, nama: "Sakai moka", nisn: "1234567432299", tanggal: "4 September 2026", status: "Terverifikasi", berkas: ["ok", "ok", "ok", "ok"] },
  { no: 10, nama: "Park Minju", nisn: "1234567432256", tanggal: "4 September 2026", status: "Terverifikasi", berkas: ["ok", "ok", "ok", "ok"] },
  { no: 11, nama: "Sung Jinwoo", nisn: "1234567432223", tanggal: "4 September 2026", status: "Terverifikasi", berkas: ["ok", "ok", "ok", "ok"] },
  { no: 12, nama: "Kobo Kanaeru", nisn: "1234567432213", tanggal: "4 September 2026", status: "Terverifikasi", berkas: ["ok", "ok", "ok", "ok"] },
  { no: 13, nama: "Nanirah Gandhi", nisn: "1234567432225", tanggal: "4 September 2026", status: "Ditolak", berkas: ["no", "no", "no", "ok"] },
  { no: 14, nama: "Silvia Valleria", nisn: "1234567432267", tanggal: "4 September 2026", status: "Terverifikasi", berkas: ["ok", "ok", "ok", "ok"] },
];

// Daftar jurusan SMK BAGIT.
export const jurusan = [
  { kode: "PPLG", nama: "Pengembangan Perangkat Lunak dan Gim" },
  { kode: "DKV", nama: "Desain Komunikasi Visual" },
  { kode: "TJKT", nama: "Teknik Jaringan Komputer dan Telekomunikasi" },
  { kode: "MPLB", nama: "Manajemen Perkantoran dan Layanan Bisnis" },
];
export const namaJurusan = (kode: string) => jurusan.find((j) => j.kode === kode)?.nama ?? kode;

// Tiap pendaftar punya jurusan pilihan (data contoh: dibagi berurutan).
export const pendaftar = pendaftarDasar.map((p, i) => ({
  ...p,
  jurusan: jurusan[i % jurusan.length].kode,
}));

export const soal = [
  { no: 1, pertanyaan: "Apa Ibu Kota Indonesia?", kategori: "Umum", tipe: "Pilihan Ganda" },
  { no: 2, pertanyaan: "Diketahui f(1) = 2, f'(1) = -1, g(1) = 0, dan g'(1) = 1. Jika F(x) = f(x) cos (g(x)), maka nilai dari F'(1) adalah ....", kategori: "Matematika", tipe: "Pilihan Ganda" },
  { no: 3, pertanyaan: "Jelaskan pengertian Pancasila...", kategori: "PPKn", tipe: "Pilihan Ganda" },
  { no: 4, pertanyaan: "Siapa penulis novel Laskar Pelangi?", kategori: "Bahasa Indonesia", tipe: "Pilihan Ganda" },
  { no: 5, pertanyaan: "Sebutkan 3 contoh energi...", kategori: "IPA", tipe: "Pilihan Ganda" },
];

export const jadwal = [
  { no: 1, nama: "Tes Akademik", tanggal: "2025-04-20", mulai: "08:00", selesai: "11:00", lokasi: "Lab Komputer" },
  { no: 2, nama: "Tes Ujian", tanggal: "2025-04-21", mulai: "08:00", selesai: "12:00", lokasi: "Ruang Ujian" },
  { no: 3, nama: "Tes Kesehatan", tanggal: "2025-04-22", mulai: "08:00", selesai: "11:00", lokasi: "UKS" },
];

export const hasil = [
  { no: 1, nama: "Kim Ji-Yeon", nilai: 93 },
  { no: 2, nama: "Lee Jaein", nilai: 85 },
  { no: 3, nama: "Kim Bongseok", nilai: 84 },
  { no: 4, nama: "Asep Bayhaqi", nilai: 99 },
  { no: 5, nama: "Nanirah Gandhi", nilai: 70 },
];
export const NILAI_LULUS = 75;

export const pengumuman = [
  { no: 1, judul: "Pengumuman Hasil Seleksi", ringkas: "Hasil seleksi calon siswa tahap akhir", tanggal: "20 Sep 2026", status: "Dipublikasi", diubah: "18 Sep 2026" },
  { no: 2, judul: "Jadwal Wawancara", ringkas: "Jadwal wawancara calon siswa", tanggal: "10 Sep 2026", status: "Dipublikasi", diubah: "08 Sep 2026" },
  { no: 3, judul: "Kelengkapan Berkas", ringkas: "Informasi dokumen pendaftaran", tanggal: "08 Sep 2026", status: "Draft", diubah: "08 Sep 2026" },
];

export const resi = [
  { reg: "SPMB-00125", siswa: "Kim Ji-Yeon", jurusan: "PPLG", metode: "Transfer Mandiri", nominal: 152500, status: "Pending", buram: false },
  { reg: "SPMB-00126", siswa: "Lee Jaein", jurusan: "MPLB", metode: "QRIS GoPay", nominal: 152500, status: "Disetujui", buram: false },
  { reg: "SPMB-00127", siswa: "Nanirah Gandhi", jurusan: "PPLG", metode: "Transfer BCA", nominal: 150000, status: "Ditolak", buram: true },
];
