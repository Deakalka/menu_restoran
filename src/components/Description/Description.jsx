import { useLanguage } from '../../context/LanguageContext';
import styles from './Description.module.css';

const Description = () => {
  const { t } = useLanguage();
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('menu_title')}</h1>
      <p className={styles.text}>
        {t('description_text').split(t('freshest_ingredients')).map((part, index, array) => {
          if (index < array.length - 1) {
            return (
              <span key={index}>
                {part}<span className={styles.accent}> {t('freshest_ingredients')}</span>
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </p>
    </div>
  );
};

export default Description;