
import React from 'https://esm.sh/react@18.3.1';

interface SuggestionDisplayProps {
  suggestion: string | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-slate-700 rounded w-1/3"></div>
    <div className="h-3 bg-slate-700 rounded w-full"></div>
    <div className="h-3 bg-slate-700 rounded w-5/6"></div>
    <div className="h-4 bg-slate-700 rounded w-1/4 mt-4"></div>
    <div className="h-3 bg-slate-700 rounded w-full"></div>
    <div className="h-3 bg-slate-700 rounded w-4/6"></div>
  </div>
);

const FormattedMarkdown: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');
    return (
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
            {lines.map((line, index) => {
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="font-title text-amber-200 !mt-6 !mb-2">{line.substring(4)}</h3>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="font-title text-amber-300 !mt-8 !mb-3">{line.substring(3)}</h2>;
                }
                if (line.startsWith('* ')) {
                    return <li key={index} className="!my-1">{line.substring(2)}</li>;
                }
                if (line.trim() === '') {
                    return <br key={index} />;
                }
                // Basic bold support
                const parts = line.split('**');
                return (
                    <p key={index} className="!my-2">
                        {parts.map((part, i) => 
                            i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                        )}
                    </p>
                );
            })}
        </div>
    );
};


const SuggestionDisplay: React.FC<SuggestionDisplayProps> = ({ suggestion, isLoading, error }) => {
  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!suggestion) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
        <div className="w-16 h-16 mb-4 border-4 border-dashed border-slate-600 rounded-full"></div>
        <p>Your move suggestion will appear here after scanning your cards.</p>
      </div>
    );
  }

  return (
    <div className="text-slate-200 space-y-4">
      <FormattedMarkdown text={suggestion} />
    </div>
  );
};

export default SuggestionDisplay;
