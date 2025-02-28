import PropTypes from 'prop-types';
import css from './MenuCard.module.css';
import { memo } from 'react';

const MenuCard = memo(({ menuItem, onAddToCart, onOpenDishModal }) => {
  const { name, price, image, description, spiciness, isVegetarian, isAlcoholic } = menuItem;

  return (
    <div className={css.card} onClick={() => onOpenDishModal(menuItem)}>
      <img src={image} alt={name} className={css.image} />
      <div className={css.info}>
        <h3 className={css.title}>{name}</h3>
        <p className={css.price}>{price} грн</p>
      </div>
      <p className={css.description}>{description}</p>
      <div className={css.tags}>
        {spiciness > 0 && (
          <span key="spicy-tag" className={`${css.tag} ${css.spicy}`}>
            {Array(spiciness).fill('🌶️').join('')}
          </span>
        )}
        {isVegetarian && (
          <span key="vegetarian-tag" className={`${css.tag} ${css.vegetarian}`}>
            🥦 Вегетаріанська
          </span>
        )}
        {isAlcoholic && (
          <span key="alcoholic-tag" className={`${css.tag} ${css.alcoholic}`}>
            🍸 Містить алкоголь
          </span>
        )}
      </div>
      <button 
        className={css.favoriteBtn} 
        onClick={(e) => {
          e.stopPropagation(); // Зупиняємо спливання події
          onAddToCart(menuItem);
        }}
      >
        ❤️ Додати до чеку
      </button>
    </div>
  );
});


MenuCard.propTypes = {
  menuItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired, 
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    isVegetarian: PropTypes.bool,
    spiciness: PropTypes.number,
    isAlcoholic: PropTypes.bool,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onOpenDishModal: PropTypes.func.isRequired,
};

MenuCard.displayName = 'MenuCard';

export default MenuCard;