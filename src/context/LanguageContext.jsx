import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { translations } from '../translations';

// Контекст для мови
const LanguageContext = createContext();

// Доступні мови
export const LANGUAGES = {
  EN: 'en',
  UK: 'uk',
  ES: 'es',
};

// Hook для використання контексту мови
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Провайдер контексту мови
export const LanguageProvider = ({ children }) => {
  // Отримуємо мову з localStorage або використовуємо українську за замовчуванням
  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || LANGUAGES.UK;
  };

  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage);

  // Зберігаємо мову в localStorage при зміні
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // Функція для зміни мови
  const changeLanguage = (language) => {
    if (Object.values(LANGUAGES).includes(language)) {
      setCurrentLanguage(language);
    }
  };

  // Функція для отримання перекладу за ключем
  const t = (key) => {
    const langTranslations = translations[currentLanguage] || translations[LANGUAGES.UK];
    return langTranslations[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    languages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 