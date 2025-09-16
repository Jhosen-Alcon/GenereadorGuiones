
import React from 'react';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L13 12l-1.293 1.293a1 1 0 01-1.414 0L8 10.414a1 1 0 010-1.414L10.293 6.707a1 1 0 011.414 0L13 8l2.293-2.293a1 1 0 011.414 0L18 7.414m-5 9.586l-2.293-2.293a1 1 0 010-1.414L12 13l1.293-1.293a1 1 0 011.414 0L16 13.414a1 1 0 010 1.414L13.707 17.293a1 1 0 01-1.414 0L11 16z" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="text-center py-6">
      <div className="flex items-center justify-center gap-4 mb-2">
        <SparklesIcon />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Generador de Guiones Virales para <span className="text-brand-secondary">TikTok</span>
        </h1>
      </div>
      <p className="max-w-3xl mx-auto mt-4 text-lg text-brand-muted">
        Transforma cualquier tema en un guion viral. Elige una categoría, describe el tema y obtén un script de alto impacto listo para grabar.
      </p>
    </header>
  );
};