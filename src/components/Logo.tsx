import * as React from 'react';

export const Logo = ({ className }: { className?: string }) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
    <path
      d="M35 65 L45 35 L55 65 M40 55 L50 55"
      stroke="hsl(var(--primary-foreground))"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);