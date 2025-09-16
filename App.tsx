import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ScriptInputForm } from './components/ScriptInputForm';
import { ScriptOutput } from './components/ScriptOutput';
import { Footer } from './components/Footer';
import { SavedScripts } from './components/SavedScripts';
import { useScriptGenerator } from './hooks/useScriptGenerator';
import { useSavedScripts } from './hooks/useSavedScripts';
import { ViralNews } from './components/ViralNews';
import { CategorySelector, Category } from './components/CategorySelector';

function App() {
  const [currentCategory, setCurrentCategory] = useState<Category>('football');

  const {
    newsTopic,
    setNewsTopic,
    generatedScript,
    sources,
    isLoading,
    error,
    generateScript,
  } = useScriptGenerator();

  const { savedScripts, addScript, deleteScript } = useSavedScripts();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateScript(currentCategory);
  };

  useEffect(() => {
    if (generatedScript && newsTopic) {
      addScript({ topic: newsTopic, script: generatedScript, sources });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedScript]); // Only run when a new script is generated

  const handleTopicSelect = (topic: string) => {
    setNewsTopic(topic);
  };

  const handleCategoryChange = (category: Category) => {
    setCurrentCategory(category);
    setNewsTopic(''); // Clear topic when changing category
  };

  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-sans">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />

        <main className="mt-10">
          <CategorySelector 
            selectedCategory={currentCategory} 
            onSelectCategory={handleCategoryChange} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="flex flex-col">
              <ScriptInputForm 
                newsTopic={newsTopic}
                setNewsTopic={setNewsTopic}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                category={currentCategory}
              />
            </div>
            <div className="flex flex-col">
              <ScriptOutput 
                script={generatedScript}
                sources={sources}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>

          <ViralNews 
            onTopicSelect={handleTopicSelect} 
            isLoading={isLoading} 
            category={currentCategory}
          />

          <SavedScripts scripts={savedScripts} onDelete={deleteScript} />

        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;