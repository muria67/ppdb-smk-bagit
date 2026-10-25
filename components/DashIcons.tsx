// Ikon untuk dashboard calon siswa (SVG sederhana, warna mengikuti `currentColor`)
type P = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const HomeIcon = ({ size = 20 }: P) => (
  <svg {...base(size)} fill="currentColor" stroke="none">
    <path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z" />
  </svg>
);

export const IdCardIcon = ({ size = 20 }: P) => (
  <svg {...base(size)} fill="currentColor" stroke="none">
    <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-5 11h10c0-2.6-3-4-5-4s-5 1.4-5 4z" />
  </svg>
);

export const ClipboardIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V3h6v1M9 11h6M9 15h6" />
  </svg>
);

export const CalcIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
  </svg>
);

export const FileSearchIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4M14 3l5 5v3M14 3v5h5" />
    <circle cx="16" cy="16" r="3" />
    <path d="m18.2 18.2 2.3 2.3" />
  </svg>
);

export const FileIcon = ({ size = 20 }: P) => (
  <svg {...base(size)} fill="currentColor" stroke="none">
    <path d="M7 2h7l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm6 1.5V9h5.5zM8 13h8v1.6H8zm0 3.4h8V18H8z" />
  </svg>
);

export const MegaphoneIcon = ({ size = 20 }: P) => (
  <svg {...base(size)} fill="currentColor" stroke="none">
    <path d="M3 10v4a1 1 0 0 0 1 1h2l4 4h2v-4l8 3V6l-8 3H4a1 1 0 0 0-1 1z" />
  </svg>
);

export const WalletIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18M16 14.5h2" />
  </svg>
);

export const LogoutIcon = ({ size = 20 }: P) => (
  <svg {...base(size)} fill="currentColor" stroke="none">
    <path d="M4 3h9a2 2 0 0 1 2 2v3h-2V5H4v14h9v-3h2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm12.5 5.5L21 12l-4.5 3.5v-2.2H9v-2.6h7.5z" />
  </svg>
);

export const SearchIcon = ({ size = 22 }: P) => (
  <svg {...base(size)} strokeWidth={2.4}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const StatusIcon = ({ size = 30 }: P) => (
  <svg {...base(size)} fill="currentColor" stroke="none">
    <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 5h14V5H5zm3.2 5.2 1.4-1.4 2 2 4.2-4.2 1.4 1.4-5.6 5.6z" />
  </svg>
);

export const CheckBig = ({ size = 18 }: P) => (
  <svg {...base(size)} stroke="#fff" strokeWidth={3.4}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const ArrowMini = ({ size = 12 }: P) => (
  <svg {...base(size)} strokeWidth={2.8}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// ikon kecil di kartu menu
export const UserTile = ({ size = 18 }: P) => (
  <svg {...base(size)} fill="#5b6f95" stroke="none">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
  </svg>
);

export const SquareTile = ({ size = 18 }: P) => (
  <svg {...base(size)} stroke="#3563d8" strokeWidth={2.2}>
    <rect x="4" y="4" width="16" height="16" rx="2.5" />
    <rect x="9.5" y="9.5" width="5" height="5" fill="#3563d8" stroke="none" />
  </svg>
);

export const PenTile = ({ size = 18 }: P) => (
  <svg {...base(size)} stroke="#5b6f95" strokeWidth={2}>
    <path d="m4 20 1-4L16 5l3 3L8 19zM14 7l3 3" />
  </svg>
);

export const FlagTile = ({ size = 18 }: P) => (
  <svg {...base(size)} fill="#3563d8" stroke="none">
    <path d="M6 3h1.8v18H6zM9.5 4h10l-2.6 4 2.6 4h-10z" />
  </svg>
);
