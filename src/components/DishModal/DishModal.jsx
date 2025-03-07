// DishModal.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './DishModal.module.css';

const DishModal = ({ dish, isOpen, onClose, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('description');
  const { currentTheme } = useTheme();
  const { t } = useLanguage();
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={`${styles.modalContainer} ${styles[currentTheme]}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>{dish.title || dish.name}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label={t('close')}>
            &times;
          </button>
        </div>
        
        <div className={styles.modalContent}>
          <div className={styles.imageContainer}>
            <img 
              src={dish.image || 'https://via.placeholder.com/400x300?text=Немає+зображення'} 
              alt={dish.name} 
              className={styles.dishImage} 
            />
          </div>
          
          <div className={styles.dishInfo}>
            <div className={styles.tags}>
              {dish.isVegetarian && (
                <span className={`${styles.tag} ${styles.vegetarian}`}>
                  {t('vegetarian')}
                </span>
              )}
              
              {dish.spiciness > 0 && (
                <span className={`${styles.tag} ${styles.spicy}`}>
                  {t('spicy')} {'🌶️'.repeat(dish.spiciness)}
                </span>
              )}
              
              {dish.isAlcoholic && (
                <span className={`${styles.tag} ${styles.alcoholic}`}>
                  {t('alcoholic')}
                </span>
              )}
            </div>
            
            <div className={styles.price}>
              {dish.price} грн
            </div>
            
            <div className={styles.tabs}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'description' ? styles.active : ''}`}
                onClick={() => setActiveTab('description')}
              >
                {t('description')}
              </button>
              
              <button
                className={`${styles.tabBtn} ${activeTab === 'ingredients' ? styles.active : ''}`}
                onClick={() => setActiveTab('ingredients')}
              >
                {t('ingredients')}
              </button>
              
              <button
                className={`${styles.tabBtn} ${activeTab === 'recipe' ? styles.active : ''}`}
                onClick={() => setActiveTab('recipe')}
              >
                {t('recipe')}
              </button>
            </div>
            
            <div className={styles.tabContent}>
              {activeTab === 'description' && (
                <div className={styles.description}>
                  <p>{dish.description}</p>
                </div>
              )}
              
              {activeTab === 'ingredients' && (
                <div className={styles.ingredients}>
                  <ul>
                    {dish.ingredients?.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'recipe' && (
                <div className={styles.recipe}>
                  <p>{dish.recipe}</p>
                </div>
              )}
            </div>
            
            <div className={styles.actions}>
              <button 
                className={styles.addToCartBtn}
                onClick={() => {
                  onAddToCart(dish);
                  onClose();
                }}
              >
                {t('add_to_cart')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DishModal.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    recipe: PropTypes.string,
    isVegetarian: PropTypes.bool,
    spiciness: PropTypes.number,
    isAlcoholic: PropTypes.bool,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default DishModal;