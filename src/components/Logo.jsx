export default function Logo({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1d4ed8" />
      <rect x="9" y="18" width="3.5" height="6" rx="1" fill="#93c5fd" />
      <rect x="14.25" y="13" width="3.5" height="11" rx="1" fill="#93c5fd" />
      <rect x="19.5" y="9" width="3.5" height="15" rx="1" fill="#93c5fd" />
      <circle cx="21.25" cy="6" r="2" fill="#ffe099" />
    </svg>
  )
}
