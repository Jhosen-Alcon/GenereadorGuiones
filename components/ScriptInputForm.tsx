import React, { useState, useMemo } from 'react';
import { Category } from './CategorySelector';

interface ScriptInputFormProps {
  newsTopic: string;
  setNewsTopic: (topic: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  category: Category;
}

const GenerateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
    </svg>
);

const MIN_LENGTH = 10;

const placeholders: Record<Category, string> = {
    football: "Ej: 'Declaraciones polémicas de Mbappé sobre el Real Madrid' o 'El fichaje sorpresa de la Premier League'",
    news: "Ej: 'Últimas noticias sobre las elecciones en EE.UU.' o 'Resumen del conflicto en...'",
    entertainment: "Ej: 'La nueva pareja sorpresa de Hollywood' o 'El último escándalo de una estrella del pop'",
    funFacts: "Ej: 'Un dato curioso sobre Albert Einstein' o 'La historia secreta detrás del logo de Apple'",
    movie: "Ej: 'Resumen y análisis de la película Oppenheimer' o 'Final de la serie 'Juego de Tronos' explicado'",
    darkPsychology: "Ej: 'Explica el 'refuerzo intermitente' con un ejemplo' o pide 'un tema impactante de psicología oscura'",
    motivation: "Ej: 'Una frase sobre la perseverancia' o 'Inspiración para superar un mal día'",
    religion: "Ej: 'El concepto del amor al prójimo en el cristianismo' o 'Una enseñanza de Buda sobre la paz interior'"
};

export const ScriptInputForm: React.FC<ScriptInputFormProps> = ({ newsTopic, setNewsTopic, onSubmit, isLoading, category }) => {
  const [isTouched, setIsTouched] = useState(false);

  const validationError = useMemo(() => {
    if (!isTouched) return null;

    const trimmedTopic = newsTopic.trim();
    if (trimmedTopic.length === 0) {
      return 'El campo no puede estar vacío.';
    }
    if (trimmedTopic.length < MIN_LENGTH) {
      return `La descripción debe tener al menos ${MIN_LENGTH} caracteres.`;
    }
    return null;
  }, [newsTopic, isTouched]);

  const isValid = useMemo(() => {
    return newsTopic.trim().length >= MIN_LENGTH;
  }, [newsTopic]);

  const handleBlur = () => {
    setIsTouched(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTouched(true);
    if (isValid) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-brand-surface rounded-lg p-6 shadow-lg h-full flex flex-col">
      <div className="flex-grow">
        <label htmlFor="news-topic" className="block text-sm font-medium text-brand-muted mb-2">
          Pega un titular, un enlace, o describe el tema:
        </label>
        <textarea
          id="news-topic"
          value={newsTopic}
          onChange={(e) => setNewsTopic(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholders[category]}
          className={`w-full h-48 p-3 bg-brand-dark border-2 rounded-md focus:ring-2 focus:ring-brand-primary transition-all duration-200 resize-none text-brand-light placeholder-gray-500 ${validationError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-600 focus:border-brand-primary'}`}
          disabled={isLoading}
          aria-invalid={!!validationError}
          aria-describedby="news-topic-error"
        />
        {validationError && <p id="news-topic-error" className="text-red-400 text-sm mt-2">{validationError}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading || !isValid}
        className="mt-6 w-full flex items-center justify-center bg-brand-primary text-brand-dark font-bold py-3 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando...
          </>
        ) : (
            <>
                <GenerateIcon />
                Generar Guion
            </>
        )}
      </button>
    </form>
  );
};