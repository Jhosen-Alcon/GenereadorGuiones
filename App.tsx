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
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

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

  useEffect(() => {
    // Check for API Key on initial load
    if (!process.env.API_KEY) {
      setApiKeyError(
        "Falta la API KEY de Google. La aplicación no funcionará hasta que se configure correctamente en el entorno."
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (apiKeyError) return;
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

  const isUiDisabled = isLoading || !!apiKeyError;

  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-sans">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />

        {apiKeyError && (
          <div className="bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded-lg relative mt-6" role="alert">
            <strong className="font-bold">Error de Configuración: </strong>
            <span className="block sm:inline ml-2">{apiKeyError}</span>
          </div>
        )}

        <main className="mt-10">
          <CategorySelector 
            selectedCategory={currentCategory} 
            onSelectCategory={handleCategoryChange}
            disabled={!!apiKeyError}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="flex flex-col">
              <ScriptInputForm 
                newsTopic={newsTopic}
                setNewsTopic={setNewsTopic}
                onSubmit={handleSubmit}
                isLoading={isUiDisabled}
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
            isLoading={isUiDisabled} 
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