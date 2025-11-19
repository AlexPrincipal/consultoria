'use client';

import React from 'react';

export default function CookiePreferencesLink({ className }: { className?: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cookie-consent'));
    }
  };

  return (
    <a href="#" onClick={handleClick} className={className}>
      Preferencias de Cookies
    </a>
  );
}
