
import React from 'react';
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
      
      <h2 className="font-title text-2xl text-amber-200 mb-4">Руководство по запуску и использованию</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="font-title text-xl text-amber-300 mb-2">Шаг 1: Загрузка кода на GitHub</h3>
          <p className="text-slate-300 mb-3">Я — AI и не могу получить доступ к вашему репозиторию. Чтобы загрузить код, выполните следующие команды в вашем терминале:</p>
          <div className="space-y-2 bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300">
            <p><span className="text-green-400"># 1. Клонируйте ваш репозиторий</span><br/>$ git clone https://github.com/xclv-ai/Sleeping-Queens-2-AI-Helper.git</p>
            <p><span className="text-green-400"># 2. Перейдите в папку</span><br/>$ cd Sleeping-Queens-2-AI-Helper</p>
            <p className="text-green-400"># 3. Скопируйте все файлы приложения в эту папку.</p>
            <p><span className="text-green-400"># 4. Добавьте, закоммитьте и отправьте файлы</span><br/>$ git add .<br/>$ git commit -m "feat: Add initial PWA application files"<br/>$ git push origin main</p>
          </div>
        </div>

        <div>
          <h3 className="font-title text-xl text-amber-300 mb-2">Шаг 2: Развертывание с помощью Netlify</h3>
          <p className="text-slate-300 mb-3">Теперь, когда код находится в вашем репозитории, вы можете легко его развернуть.</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 bg-slate-900/50 p-4 rounded-lg">
            <li>Зарегистрируйтесь на <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Netlify</a>, используя вашу учетную запись GitHub.</li>
            <li>Нажмите "Add new site" → "Import an existing project".</li>
            <li>Выберите ваш репозиторий: `xclv-ai/Sleeping-Queens-2-AI-Helper`.</li>
            <li>Настройки сборки можно оставить пустыми. Просто нажмите "Deploy site".</li>
            <li><strong>Важно:</strong> Настройте API-ключ. В настройках сайта на Netlify (`Site configuration` → `Build & deploy` → `Environment`), добавьте переменную окружения с именем `API_KEY` и вашим ключом Gemini в качестве значения.</li>
            <li>После этого Netlify предоставит вам публичную ссылку на ваше рабочее приложение!</li>
          </ol>
        </div>

        <div>
          <h3 className="font-title text-xl text-amber-300 mb-2">Шаг 3: Установка на iPhone</h3>
          <p className="text-slate-300 mb-3">Откройте полученную от Netlify ссылку в Safari на вашем iPhone.</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 bg-slate-900/50 p-4 rounded-lg">
            <li>Нажмите на иконку "Поделиться" (квадрат со стрелкой вверх).</li>
            <li>Пролистайте вниз и выберите "На экран «Домой»" (Add to Home Screen).</li>
            <li>Нажмите "Добавить" (Add). Иконка появится на вашем рабочем столе.</li>
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
