import React from 'react';
import { CopyButton } from './CopyButton';
import { Source } from '../services/geminiService';

interface ScriptOutputProps {
  script: string;
  sources: Source[];
  isLoading: boolean;
  error: string | null;
}

const SourceLinks: React.FC<{ sources: Source[] }> = ({ sources }) => {
  if (sources.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-700">
      <h3 className="text-base font-semibold text-brand-secondary mb-2">Fuentes Consultadas</h3>
      <ul className="space-y-2">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-muted flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a 
              href={source.uri} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-blue-400 hover:underline hover:text-blue-300 transition-colors"
              title={source.title}
            >
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ScriptOutput: React.FC<ScriptOutputProps> = ({ script, sources, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-brand-muted">
          <svg className="animate-spin h-8 w-8 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="font-semibold">Buscando noticias y creando un guion...</p>
          <p className="text-sm">Analizando el ángulo más impactante.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          <p className="font-bold text-center">Error al generar el guion</p>
          <p className="text-sm text-center mt-1">{error}</p>
        </div>
      );
    }

    if (script) {
      const wordCount = script.split(/\s+/).filter(Boolean).length;
      return (
        <div className="relative h-full flex flex-col">
            <div className="absolute top-3 left-3 text-xs bg-gray-800/60 px-2 py-1 rounded-full text-brand-muted">
              <span className="font-bold text-brand-secondary">{wordCount}</span> palabras
            </div>
            <CopyButton textToCopy={script} className="absolute top-3 right-3" />
            <div className="flex-grow overflow-y-auto pt-12">
              <pre className="whitespace-pre-wrap font-sans text-brand-light text-base leading-relaxed pr-4">
                  {script}
              </pre>
              <SourceLinks sources={sources} />
            </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-brand-muted text-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <p className="font-semibold">Tu guion aparecerá aquí.</p>
        <p className="text-sm mt-1">Listo para capturar la atención de tu audiencia.</p>
      </div>
    );
  };
  
  return (
    <div className="bg-brand-surface rounded-lg shadow-lg min-h-[334px] p-2 relative">
      <div className="w-full h-full bg-brand-dark rounded-md p-4">
         {renderContent()}
      </div>
    </div>
  );
};