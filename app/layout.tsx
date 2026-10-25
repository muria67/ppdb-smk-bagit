import type { Metadata } from "next";
// @ts-expect-error CSS is handled by the Next.js bundler.
import "./globals.css";

export const metadata: Metadata = {
  title: "SPMB SMK BAGIT Balikpapan",
  description:
    "Sistem Penerimaan Peserta Didik Baru SMK BAGIT Balikpapan. Pendaftaran siswa baru lebih mudah, cepat dan transparan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Fredoka:wght@500;600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
