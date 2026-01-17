
import React, { useState, useCallback } from 'react';
import CameraView from './components/CameraView';
import SuggestionDisplay from './components/SuggestionDisplay';
import { getGameSuggestion } from './services/geminiService';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { InfoIcon } from './components/icons/InfoIcon';
import HelpGuide from './components/HelpGuide';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleCapture = useCallback(async (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await getGameSuggestion(imageDataUrl);
      setSuggestion(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get suggestion. Please check your API key and try again. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900/50 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-title text-amber-300 tracking-wider">
            Sleeping Queens 2
          </h1>
          <p className="text-lg sm:text-xl text-purple-300 mt-2 font-title flex items-center justify-center gap-2">
            <SparklesIcon />
            AI Game Helper
            <SparklesIcon />
          </p>
          <button
            onClick={() => setShowHelp(s => !s)}
            className="absolute top-0 right-0 p-2 text-slate-400 hover:text-amber-300 transition-colors duration-200"
            title="Помощь и руководство по развертыванию"
            aria-label="Показать/скрыть руководство"
          >
            <InfoIcon className="w-8 h-8" />
          </button>
        </header>

        {showHelp && <HelpGuide onClose={() => setShowHelp(false)} />}

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className="bg-slate-800/50 border border-purple-700/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
              <h2 className="text-2xl font-title text-amber-200 mb-4">1. Scan Your Hand</h2>
              <p className="text-slate-300 mb-4">
                Point your camera at your cards. Ensure they are well-lit and clearly visible. Click 'Scan Hand' to get a move suggestion.
              </p>
              <CameraView onCapture={handleCapture} isLoading={isLoading} />
            </div>
            {capturedImage && (
              <div className="bg-slate-800/50 border border-purple-700/50 rounded-2xl p-4 shadow-lg">
                <h3 className="text-lg font-title text-amber-200 mb-2">Captured Image</h3>
                <img src={capturedImage} alt="Captured player hand" className="rounded-lg w-full" />
              </div>
            )}
          </div>

          <div className="bg-slate-800/50 border border-purple-700/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-2xl font-title text-amber-200 mb-4">2. AI Suggestion</h2>
            <SuggestionDisplay
              suggestion={suggestion}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </main>
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Powered by Gemini. This is an unofficial helper tool.</p>
        </footer>
      </div>
    </div>
  );
}
