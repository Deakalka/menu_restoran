import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Створення контексту теми
const ThemeContext = createContext();

// Hook для використання контексту теми
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Доступні теми
export const THEMES = {
  LIGHT: 'theme-light',
  DARK: 'theme-dark',
  GREEN: 'theme-green',
};

// Провайдер контексту теми
export const ThemeProvider = ({ children }) => {
  // Отримуємо збережену тему з localStorage або використовуємо світлу за замовчуванням
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || THEMES.LIGHT;
  };
  
  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);
  
  // Зберігаємо тему в localStorage при зміні
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    // Також оновлюємо клас на документі для глобальних CSS-змін
    document.body.className = currentTheme;
  }, [currentTheme]);
  
  // Перемикання між темами
  const toggleTheme = () => {
    setCurrentTheme(prevTheme => 
      prevTheme === THEMES.LIGHT 
        ? THEMES.DARK 
        : prevTheme === THEMES.DARK 
          ? THEMES.GREEN 
          : THEMES.LIGHT
    );
  };
  
  // Встановлення конкретної теми
  const setTheme = (theme) => {
    if (Object.values(THEMES).includes(theme)) {
      setCurrentTheme(theme);
    }
  };
  
  const value = {
    currentTheme,
    toggleTheme,
    setTheme,
    isLightTheme: currentTheme === THEMES.LIGHT,
    isDarkTheme: currentTheme === THEMES.DARK,
    isGreenTheme: currentTheme === THEMES.GREEN,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 