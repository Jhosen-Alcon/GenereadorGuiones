import React from 'react';
import { Category } from './CategorySelector';

interface ViralNewsProps {
  onTopicSelect: (topic: string) => void;
  isLoading: boolean;
  category: Category;
}

const viralTopics: Record<Category, string[]> = {
  football: [
    "El último récord de Cristiano Ronaldo",
    "Declaraciones de Mbappé sobre su futuro",
    "El fichaje más caro de la Premier League",
    "Crisis en el FC Barcelona",
    "¿Quién ganará el próximo Balón de Oro?",
  ],
  news: [
    "Última hora sobre las elecciones en EEUU",
    "El impacto de la inteligencia artificial en el trabajo",
    "Resumen de la situación económica mundial",
    "Avances en la carrera espacial",
    "Debate sobre el cambio climático",
  ],
  entertainment: [
    "La nueva relación de una estrella de Hollywood",
    "Polémica en la última gala de premios",
    "El próximo gran estreno de Marvel o DC",
    "La canción que está rompiendo récords",
    "¿Qué famoso ha dicho qué en redes sociales?",
  ],
  funFacts: [
    "Un dato increíble sobre el cuerpo humano",
    "El origen secreto de una marca famosa",
    "Hechos históricos que suenan falsos pero son reales",
    "Curiosidades sobre animales que no conocías",
    "¿Por qué los presidentes de EEUU envejecen tan rápido?",
  ],
  movie: [
    "Resumen de la última película de Nolan",
    "Final explicado de la serie 'Dark'",
    "Personajes que merecían un final mejor",
    "La película más aterradora del año",
    "Análisis del trailer de la nueva serie de HBO",
  ],
  darkPsychology: [
    "La técnica del espejo: cómo te imitan para ganar tu confianza",
    "¿Qué es el refuerzo intermitente y por qué es tan adictivo?",
    "Detecta el 'bombardeo de amor' (love bombing) en 3 pasos",
    "El poder del 'negging': el insulto disfrazado de cumplido",
    "La tríada oscura: Narcisismo, Maquiavelismo y Psicopatía",
    "Persuasión encubierta: ¿te están convenciendo sin que te des cuenta?"
  ],
  motivation: [
    "Cómo superar el miedo al fracaso",
    "La disciplina vs. la motivación",
    "Frase para empezar el día con energía",
    "El poder de los hábitos atómicos",
    "Deja de procrastinar con esta técnica",
  ],
  religion: [
    "Un versículo bíblico para momentos difíciles",
    "Enseñanza de Buda sobre el desapego",
    "Una reflexión sobre el perdón",
    "El significado espiritual de los sueños",
    "Cómo encontrar paz interior",
  ],
};

const categoryTitles: Record<Category, string> = {
    football: "Fútbol",
    news: "Noticias",
    entertainment: "Farándula",
    funFacts: "Datos Curiosos",
    movie: "Películas y Series",
    darkPsychology: "Psicología Oscura",
    motivation: "Motivación",
    religion: "Religión",
};

export const ViralNews: React.FC<ViralNewsProps> = ({ onTopicSelect, isLoading, category }) => {
  const currentTopics = viralTopics[category];

  return (
    <section className="mt-12 w-full">
      <h2 className="text-2xl font-bold text-brand-primary mb-6 text-center sm:text-left">
        ¿Sin ideas? Prueba con un tema de {categoryTitles[category]}
      </h2>
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {currentTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicSelect(topic)}
            disabled={isLoading}
            className="px-4 py-2 bg-brand-surface border-2 border-gray-600 text-brand-light rounded-full text-sm font-medium hover:bg-brand-primary/20 hover:border-brand-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {topic}
          </button>
        ))}
      </div>
    </section>
  );
};