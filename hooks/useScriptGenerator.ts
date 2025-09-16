import { useState, useCallback } from 'react';
import { fetchScriptFromGemini, Source } from '../services/geminiService';
import { Category } from '../components/CategorySelector';

export const useScriptGenerator = () => {
  const [newsTopic, setNewsTopic] = useState<string>('');
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateScript = useCallback(async (category: Category) => {
    if (!newsTopic.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedScript('');
    setSources([]);

    try {
      const { script, sources } = await fetchScriptFromGemini(newsTopic, category);
      setGeneratedScript(script);
      setSources(sources);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [newsTopic]);

  return {
    newsTopic,
    setNewsTopic,
    generatedScript,
    sources,
    isLoading,
    error,
    generateScript,
  };
};