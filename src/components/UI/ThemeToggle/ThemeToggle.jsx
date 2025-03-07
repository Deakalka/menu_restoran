import { useTheme, THEMES } from '../../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { currentTheme, toggleTheme } = useTheme();
  
  return (
    <div className={styles.themeToggle}>
      <button
        className={`${styles.toggleButton} ${currentTheme === THEMES.LIGHT ? styles.active : ''}`}
        onClick={toggleTheme}
        aria-label="Змінити тему"
      >
        <span className={styles.iconContainer}>
          {currentTheme === THEMES.LIGHT && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          
          {currentTheme === THEMES.DARK && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1582 17.4668C18.1126 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.7479 21.1181 10.0795 20.7461C8.41113 20.3741 6.88717 19.5345 5.68964 18.3265C4.4921 17.1185 3.66371 15.5887 3.30386 13.9203C2.94401 12.2518 3.06805 10.5117 3.6576 8.90379C4.24716 7.29588 5.28535 5.88449 6.64306 4.84817C8.00076 3.81185 9.62309 3.17195 11.325 3.015C10.385 4.3435 9.98 6.04 10.185 7.75C10.39 9.46 11.18 11.0326 12.4 12.2326C13.63 13.4326 15.2 14.2 16.9 14.385C18.6 14.575 20.3 14.145 21.6 13.185C21.55 13.065 21.51 12.93 21.45 12.795" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          
          {currentTheme === THEMES.GREEN && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 9L12 3L6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        <span className={styles.themeName}>
          {currentTheme === THEMES.LIGHT && 'Світла'}
          {currentTheme === THEMES.DARK && 'Темна'}
          {currentTheme === THEMES.GREEN && 'Зелена'}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle; 