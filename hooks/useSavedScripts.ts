import { useState, useEffect, useCallback } from 'react';
import { Source } from '../services/geminiService';

export interface SavedScript {
  id: number;
  topic: string;
  script: string;
  sources: Source[];
  createdAt: string;
}

const STORAGE_KEY = 'tiktok-football-scripts';

export const useSavedScripts = () => {
  const [savedScripts, setSavedScripts] = useState<SavedScript[]>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedScripts));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [savedScripts]);

  const addScript = useCallback(({ topic, script, sources }: { topic: string; script: string, sources: Source[] }) => {
    const newScript: SavedScript = {
      id: Date.now(),
      topic,
      script,
      sources,
      createdAt: new Date().toISOString(),
    };
    setSavedScripts(prevScripts => [newScript, ...prevScripts]);
  }, []);

  const deleteScript = useCallback((id: number) => {
    setSavedScripts(prevScripts => prevScripts.filter(script => script.id !== id));
  }, []);

  return { savedScripts, addScript, deleteScript };
};