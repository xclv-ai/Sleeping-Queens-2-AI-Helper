
import React from 'https://esm.sh/react@18.3.1';
import { XIcon } from './icons/XIcon';

interface HelpGuideProps {
  onClose: () => void;
}

const HelpGuide: React.FC<HelpGuideProps> = ({ onClose }) => {
  return (
    <div className="mb-8 bg-slate-800/80 backdrop-blur-sm border border-purple-700/50 rounded-2xl p-6 shadow-lg relative animate-fade-in-down">
      <button 
        onClick={onClose} 
        className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
        aria-label="Закрыть руководство"
      >
        <XIcon className="w-6 h-6" />
      </button>
      
      <h2 className="font-title text-2xl text-amber-200 mb-4">Финальное исправление</h2>
      
      <div className="space-y-8">
        <div className="bg-green-900/30 border border-green-500 p-4 rounded-lg">
            <h3 className="font-bold text-green-300">Решение: Упрощение архитектуры</h3>
            <p className="text-green-300 mt-1">Постоянная ошибка "Script error" была вызвана конфликтом между Service Worker (оффлайн-режим) и системой транспиляции кода в браузере. Чтобы гарантировать стабильную работу, оффлайн-функциональность была отключена. Приложение по-прежнему можно будет установить на главный экран.</p>
        </div>

        <div className="border-2 border-amber-400 rounded-lg p-4 shadow-lg shadow-amber-500/20">
          <h3 className="font-title text-xl text-amber-300 mb-3">🚀 Ваш финальный шаг</h3>
          <ol className="list-decimal list-inside space-y-3 text-slate-300">
            <li>
              <strong>Обновите `index.tsx`:</strong> Замените содержимое файла `index.tsx` в вашем GitHub репозитории на новый код, который я предоставил.
            </li>
            <li>
              <strong>Отправьте изменения в GitHub:</strong> После обновления файла отправьте изменения в ваш репозиторий.
            </li>
            <li>
              <strong>Vercel сделает все остальное:</strong> Vercel автоматически обнаружит изменения и развернет новую, рабочую версию вашего приложения.
            </li>
            <li>
              <strong>Проверьте приложение:</strong> Откройте ссылку на ваше приложение. Белый экран и ошибки должны исчезнуть.
            </li>
          </ol>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HelpGuide;
