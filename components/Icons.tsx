type IconProps = { size?: number; className?: string };

export function ArrowRight({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function BoltIcon({ size = 60 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M36 4 14 36h14l-6 24 28-34H35z"
        fill="#4a6fe0"
        stroke="#4a6fe0"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon({ size = 60 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M32 4 10 12v18c0 14 9 24 22 30 13-6 22-16 22-30V12z"
        fill="#4a6fe0"
      />
      <rect x="22" y="28" width="20" height="16" rx="3" fill="#fff" />
      <path
        d="M26 28v-4a6 6 0 0 1 12 0v4"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
      />
    </svg>
  );
}

export function HeadsetIcon({ size = 60 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M10 36V30a22 22 0 0 1 44 0v6"
        fill="none"
        stroke="#4a6fe0"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="6" y="32" width="10" height="18" rx="5" fill="#4a6fe0" />
      <rect x="48" y="32" width="10" height="18" rx="5" fill="#4a6fe0" />
      <path
        d="M52 50c0 6-6 8-14 8"
        fill="none"
        stroke="#4a6fe0"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const stepStroke = {
  fill: "none",
  stroke: "#2f7cf0",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function UserPlusIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <circle cx="14" cy="11" r="4.5" {...stepStroke} />
      <path d="M6 27c0-5 3.5-8 8-8s8 3 8 8z" {...stepStroke} />
      <path d="M27 11v8M23 15h8" {...stepStroke} strokeWidth={2.4} />
    </svg>
  );
}

export function FormIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <rect x="8" y="7" width="18" height="20" rx="2" {...stepStroke} />
      <path d="M12 13h10M12 17h10M12 21h10M8 12h18" {...stepStroke} />
    </svg>
  );
}

export function UploadIcon() {
  return (
    <svg width="38" height="34" viewBox="0 0 38 34" aria-hidden="true">
      <path
        d="M10 24a5 5 0 0 1 0-10 7 7 0 0 1 13-2"
        {...stepStroke}
        stroke="#b6c3dc"
      />
      <path d="M27 26V12M21 18l6-6 6 6" {...stepStroke} strokeWidth={2.4} />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <path d="M9 17.5l5.5 5.5L25 12" {...stepStroke} strokeWidth={2.6} />
    </svg>
  );
}

export function CheckCircle({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#2f7cf0" />
      <path
        d="M7 12.5l3.2 3.2L17 9"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" fill="#fff" />
      <path d="M10 9l5 3-5 3z" fill="#3674ad" />
    </svg>
  );
}

export function XIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}
