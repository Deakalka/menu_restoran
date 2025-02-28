// DishModal.jsx
import  { useState } from 'react';
import PropTypes from 'prop-types';
import css from './DishModal.module.css'; // Ви можете використовувати стилі з DishReader

const DishModal = ({ dish, isOpen, onClose, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('description');
  
  if (!isOpen) return null;
  
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <h2>{dish.name}</h2>
          <button className={css.closeBtn} onClick={onClose}>✕</button>
        </div>
        
        <div className={css.modalContent}>
          <div className={css.imageContainer}>
            <img src={dish.image} alt={dish.name} className={css.dishImage} />
          </div>
          <div className={css.dishInfo}>
              <div className={css.tags}>
                {dish.spiciness > 0 && (
                  <span key="modal-spicy" className={css.tag}>
                    Гострота: {Array(dish.spiciness).fill('🌶️').join('')}
                  </span>
                )}
                {dish.isVegetarian && (
                  <span key="modal-vegetarian" className={css.tag}>
                    🥦 Вегетаріанська
                  </span>
                )}
                {dish.isAlcoholic && (
                  <span key="modal-alcoholic" className={css.tag}>
                    🍸 Містить алкоголь
                  </span>
                )}
              </div>
              <p className={css.price}>{dish.price} грн</p>
            </div>
          
          <div className={css.tabs}>
            <button 
              className={`${css.tabBtn} ${activeTab === 'description' ? css.active : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Опис
            </button>
            <button 
              className={`${css.tabBtn} ${activeTab === 'ingredients' ? css.active : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Інгредієнти
            </button>
            <button 
              className={`${css.tabBtn} ${activeTab === 'recipe' ? css.active : ''}`}
              onClick={() => setActiveTab('recipe')}
            >
              Рецепт
            </button>
          </div>
          
          <div className={css.tabContent}>
            {activeTab === 'description' && (
              <div className={css.description}>
                <p>{dish.description || 'Опис відсутній'}</p>
              </div>
            )}
            
            {activeTab === 'ingredients' && (
              <div className={css.ingredients}>
                <h3>Інгредієнти:</h3>
                {dish.ingredients && dish.ingredients.length > 0 ? (
                  <ul>
                    {dish.ingredients.map((ingredient, index) => (
                      <li key={`ingredient-${index}`}>{ingredient}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Інформація про інгредієнти відсутня</p>
                )}
              </div>
            )}
            
            {activeTab === 'recipe' && (
              <div className={css.recipe}>
                <h3>Спосіб приготування:</h3>
                {dish.recipe ? (
                  <p>{dish.recipe}</p>
                ) : (
                  <p>Рецепт приготування відсутній</p>
                )}
              </div>
            )}
          </div>
          
          <div className={css.actions}>
            <button className={css.addToCartBtn} onClick={() => onAddToCart(dish)}>
              Додати до чеку
            </button>
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
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    isVegetarian: PropTypes.bool,
    spiciness: PropTypes.number,
    isAlcoholic: PropTypes.bool,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    recipe: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default DishModal;