import { useState, useRef, useEffect } from 'react';
import { useLanguage, LANGUAGES } from '../../../context/LanguageContext';
import styles from './LanguageSwitch.module.css';

const LanguageSwitch = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Закриваємо випадаюче меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Функція для визначення відображуваного тексту поточної мови
  const getCurrentLanguageText = () => {
    switch (currentLanguage) {
      case LANGUAGES.EN:
        return t('en_lang');
      case LANGUAGES.UK:
        return t('uk_lang');
      case LANGUAGES.ES:
        return t('es_lang');
      default:
        return t('language');
    }
  };

  // Функція для отримання кода країни з мови
  const getCountryCode = (lang) => {
    switch (lang) {
      case LANGUAGES.EN:
        return 'gb';
      case LANGUAGES.UK:
        return 'ua';
      case LANGUAGES.ES:
        return 'es';
      default:
        return 'ua';
    }
  };

  return (
    <div className={styles.languageSwitch} ref={dropdownRef}>
      <button
        className={styles.langButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language')}
      >
        <span className={`${styles.flag} ${styles[`flag-${getCountryCode(currentLanguage)}`]}`}></span>
        <span className={styles.langText}>{getCurrentLanguageText()}</span>
        <span className={styles.arrow}>▼</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={`${styles.langOption} ${currentLanguage === LANGUAGES.UK ? styles.active : ''}`}
            onClick={() => {
              changeLanguage(LANGUAGES.UK);
              setIsOpen(false);
            }}
          >
            <span className={`${styles.flag} ${styles['flag-ua']}`}></span>
            {t('uk_lang')}
          </button>
          <button
            className={`${styles.langOption} ${currentLanguage === LANGUAGES.EN ? styles.active : ''}`}
            onClick={() => {
              changeLanguage(LANGUAGES.EN);
              setIsOpen(false);
            }}
          >
            <span className={`${styles.flag} ${styles['flag-gb']}`}></span>
            {t('en_lang')}
          </button>
          <button
            className={`${styles.langOption} ${currentLanguage === LANGUAGES.ES ? styles.active : ''}`}
            onClick={() => {
              changeLanguage(LANGUAGES.ES);
              setIsOpen(false);
            }}
          >
            <span className={`${styles.flag} ${styles['flag-es']}`}></span>
            {t('es_lang')}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch; 