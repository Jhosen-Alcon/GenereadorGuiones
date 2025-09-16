import React from 'react';
import { SavedScript } from '../hooks/useSavedScripts';
import { CopyButton } from './CopyButton';
import { Source } from '../services/geminiService';


interface SavedScriptsProps {
    scripts: SavedScript[];
    onDelete: (id: number) => void;
}

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

const CardSourceLinks: React.FC<{sources: Source[]}> = ({ sources }) => {
    if (!sources || sources.length === 0) return null;

    return (
        <div className="mt-3 pt-3 border-t border-gray-700/50">
            <h4 className="text-xs font-semibold text-brand-secondary mb-1.5">Fuentes</h4>
            <ul className="space-y-1.5">
                {sources.slice(0, 2).map((source, index) => ( // Show max 2 sources
                    <li key={index} className="flex items-start gap-1.5">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-muted flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline truncate" title={source.title}>
                            {source.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const ScriptCard: React.FC<{ script: SavedScript; onDelete: (id: number) => void; }> = ({ script, onDelete }) => {
    return (
        <div className="bg-brand-surface p-4 rounded-lg shadow-lg flex flex-col justify-between gap-4">
            <div>
                <p className="text-sm text-brand-muted font-medium truncate" title={script.topic}>
                    {script.topic}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    {new Date(script.createdAt).toLocaleString()}
                </p>
                <p className="mt-3 text-brand-light text-sm line-clamp-3">
                    {script.script}
                </p>
                <CardSourceLinks sources={script.sources} />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-700">
                <CopyButton textToCopy={script.script} className="bg-gray-800 hover:bg-gray-700"/>
                <button 
                    onClick={() => onDelete(script.id)}
                    className="p-2 rounded-full bg-gray-800 text-brand-muted hover:bg-red-500 hover:text-white transition-colors duration-200"
                    aria-label="Eliminar guion"
                >
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
};

export const SavedScripts: React.FC<SavedScriptsProps> = ({ scripts, onDelete }) => {
    return (
        <section className="mt-16 w-full">
            <h2 className="text-2xl font-bold text-brand-primary mb-6 text-center sm:text-left">Historial de Guiones</h2>
            {scripts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scripts.map(script => (
                        <ScriptCard key={script.id} script={script} onDelete={onDelete} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-brand-surface rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-brand-light">No hay guiones guardados</h3>
                    <p className="mt-1 text-sm text-brand-muted">
                        Genera un guion y aparecerá aquí para que puedas consultarlo más tarde.
                    </p>
                </div>
            )}
        </section>
    );
};