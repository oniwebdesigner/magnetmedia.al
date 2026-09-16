/* Ikonat e përbashkëta — LogoM zëvendësohet me SVG-në reale të logos */

export function LogoM({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M8 32V10l12 14 12-14v22" />
      <circle cx="32" cy="7" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}
