import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import styles from './MenuCard.module.css';

const MenuCard = ({ dish, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    // Перевіряємо, чи є страва в улюблених при першому рендері
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(dish.id);
  });
  
  const { addItemToCart } = useCart();
  
  // Обробник додавання/видалення з улюблених
  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Запобігаємо спрацюванню onClick батьківського елемента
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      // Видаляємо з улюблених
      newFavorites = favorites.filter(id => id !== dish.id);
    } else {
      // Додаємо до улюблених
      newFavorites = [...favorites, dish.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    
    // Створюємо та диспатчимо спеціальну подію, щоб сповістити Favorites компонент
    const event = new CustomEvent('favoritesUpdated', { 
      detail: { favorites: newFavorites }
    });
    document.dispatchEvent(event);
  };
  
  // Обробник додавання до кошика
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Запобігаємо спрацюванню onClick батьківського елемента
    addItemToCart(dish);
  };
  
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img 
            src={dish.image || 'https://via.placeholder.com/300x200?text=Немає+зображення'} 
            alt={dish.name} 
            className={styles.image} 
          />
        </div>
        
        <div className={styles.info}>
          <h3 className={styles.title}>{dish.name}</h3>
          
          <div className={styles.price}>
            <span>{dish.price} грн</span>
            <button 
              className={styles.addToCart}
              onClick={handleAddToCart}
              aria-label="Додати до кошика"
            >
              +
            </button>
          </div>
          
          <p className={styles.description}>
            {dish.description.length > 100 
              ? `${dish.description.substring(0, 100)}...` 
              : dish.description
            }
          </p>
          
          <div className={styles.tags}>
            {dish.isVegetarian && (
              <span className={`${styles.tag} ${styles.vegetarian}`}>Вегетаріанське</span>
            )}
            {dish.spiciness > 0 && (
              <span className={`${styles.tag} ${styles.spicy}`}>
                {'🌶️'.repeat(dish.spiciness)}
              </span>
            )}
            {dish.isAlcoholic && (
              <span className={`${styles.tag} ${styles.alcoholic}`}>18+</span>
            )}
          </div>
        </div>
        
        <button 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Видалити з улюблених' : 'Додати до улюблених'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    isVegetarian: PropTypes.bool,
    spiciness: PropTypes.number,
    isAlcoholic: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default memo(MenuCard);



