
import React from 'react';

export type Category = 'football' | 'news' | 'entertainment' | 'funFacts' | 'movie' | 'darkPsychology' | 'motivation' | 'religion';

interface CategorySelectorProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const categories: { id: Category; label: string; icon: JSX.Element, color: string }[] = [
  {
    id: 'football',
    label: 'Fútbol',
    icon: <span className="text-2xl">⚽</span>,
    color: 'bg-green-500/20'
  },
  {
    id: 'news',
    label: 'Noticias',
    icon: <span className="text-2xl">📰</span>,
    color: 'bg-blue-500/20'
  },
  {
    id: 'entertainment',
    label: 'Farándula',
    icon: <span className="text-2xl">🎭</span>,
    color: 'bg-pink-500/20'
  },
  {
    id: 'funFacts',
    label: 'Datos Curiosos',
    icon: <span className="text-2xl">💡</span>,
    color: 'bg-yellow-500/20'
  },
  {
    id: 'movie',
    label: 'Películas',
    icon: <span className="text-2xl">🎬</span>,
    color: 'bg-red-500/20'
  },
  {
    id: 'darkPsychology',
    label: 'Psicología O.',
    icon: <span className="text-2xl">🧠</span>,
    color: 'bg-purple-500/20'
  },
  {
    id: 'motivation',
    label: 'Motivación',
    icon: <span className="text-2xl">💪</span>,
    color: 'bg-orange-500/20'
  },
  {
    id: 'religion',
    label: 'Religión',
    icon: <span className="text-2xl">🙏</span>,
    color: 'bg-teal-500/20'
  },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
      {categories.map(({ id, label, icon, color }) => (
        <button
          key={id}
          onClick={() => onSelectCategory(id)}
          className="flex flex-col items-center gap-2 text-brand-light font-medium transition-transform duration-200 transform hover:scale-110 focus:outline-none"
          aria-pressed={selectedCategory === id}
        >
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center
            transition-all duration-200
            ${color}
            ${selectedCategory === id ? 'ring-2 ring-brand-primary ring-offset-2 ring-offset-brand-dark' : 'ring-2 ring-transparent'}
          `}>
            {icon}
          </div>
          <span className="text-xs sm:text-sm text-center">{label}</span>
        </button>
      ))}
    </div>
  );
};
