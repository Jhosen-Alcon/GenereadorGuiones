

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 text-center text-brand-muted text-sm">
      <p>
        Potenciado por IA. Diseñado para creadores de contenido.
      </p>
      <p className="mt-1">
        © {new Date().getFullYear()} Viral Script Generator. Todos los derechos reservados.
      </p>
    </footer>
  );
};
