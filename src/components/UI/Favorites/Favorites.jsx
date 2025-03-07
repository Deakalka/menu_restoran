import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuCard from '../../MenuCard/MenuCard';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './Favorites.module.css';

const Favorites = ({ dishes, onOpenModal }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const { t } = useLanguage();
  
  // Завантаження улюблених при першому рендері
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);
  
  // Фільтрація страв при зміні favorites або dishes
  useEffect(() => {
    if (favorites.length && dishes.length) {
      const filtered = dishes.filter(dish => favorites.includes(dish.id));
      setFavoriteDishes(filtered);
    } else {
      setFavoriteDishes([]);
    }
  }, [favorites, dishes]);
  
  // Функція для переключення видимості
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };
  
  // Оновлення favorites при зміні localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(savedFavorites);
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('favoritesUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, []);
  
  // Якщо немає улюблених, повертаємо кнопку без випадаючого вікна
  if (favoriteDishes.length === 0) {
    return (
      <button className={styles.favoritesButton} onClick={toggleVisibility} disabled>
        <span className={styles.starIcon}>☆</span>
        {t('favorites')}
      </button>
    );
  }
  
  return (
    <div className={styles.favoritesContainer}>
      <button className={styles.favoritesButton} onClick={toggleVisibility}>
        <span className={styles.starIcon}>★</span>
        {t('favorites')} ({favoriteDishes.length})
      </button>
      
      {isVisible && (
        <div className={styles.favoritesDropdown}>
          <div className={styles.favoritesHeader}>
            <h3>{t('your_favorites')}</h3>
            <button 
              className={styles.closeButton} 
              onClick={() => setIsVisible(false)}
              aria-label={t('close')}
            >
              &times;
            </button>
          </div>
          
          <div className={styles.favoritesList}>
            {favoriteDishes.map(dish => (
              <div key={dish.id} className={styles.favoriteItem}>
                <MenuCard 
                  dish={dish} 
                  onClick={() => {
                    onOpenModal(dish);
                    setIsVisible(false);
                  }} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Favorites.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Favorites; 