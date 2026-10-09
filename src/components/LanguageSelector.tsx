import React, { useState, useEffect } from 'react';
import { currentLanguageState, Language } from '../services/i18n';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const [lang, setLang] = useState<Language>(currentLanguageState.lang);

  useEffect(() => {
    return currentLanguageState.subscribe((newLang) => {
      setLang(newLang);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as Language;
    currentLanguageState.setLang(selected);
  };

  return (
    <div className="relative inline-flex items-center">
      <div className="absolute left-2.5 pointer-events-none text-sky-600">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <select
        value={lang}
        onChange={handleChange}
        className="appearance-none bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 text-xs font-bold rounded-lg pl-8 pr-7 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer transition-colors"
        aria-label="Select Language"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी (Hindi)</option>
        <option value="or">ଓଡ଼ିଆ (Odia)</option>
        <option value="sbp">ସମ୍ବଲପୁରୀ (Sambalpuri)</option>
        <option value="kor">କୋରାପୁଟିଆ (Koraputia)</option>
      </select>
      <div className="absolute right-2 pointer-events-none text-sky-700 text-[10px]">
        ▼
      </div>
    </div>
  );
};
