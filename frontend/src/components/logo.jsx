function Logo({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#2563EB" />
      <rect
        x="6"
        y="18"
        width="4"
        height="8"
        rx="1"
        fill="white"
        opacity="0.4"
      />
      <rect x="6" y="14" width="4" height="4" rx="0.5" fill="white" />
      <rect
        x="12"
        y="12"
        width="4"
        height="14"
        rx="1"
        fill="white"
        opacity="0.4"
      />
      <rect x="12" y="7" width="4" height="5" rx="0.5" fill="white" />
      <rect
        x="18"
        y="15"
        width="4"
        height="11"
        rx="1"
        fill="white"
        opacity="0.4"
      />
      <rect x="18" y="10" width="4" height="5" rx="0.5" fill="white" />
      <path
        d="M24 14 L26 10 L28 14"
        stroke="#4ADE80"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="26"
        y1="10"
        x2="26"
        y2="22"
        stroke="#4ADE80"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Logo;
