import PropTypes from 'prop-types';
import css from './MenuCard.module.css';
import { memo } from 'react';

const MenuCard = memo(({ menuItem }) => {
  const { name, price, image, title, description, spiciness, isVegetarian, isAlcoholic } = menuItem;
  
  return (
    <div className={css.card}>
      <img src={image} alt={title} className={css.image} />
      <div className={css.info}>
        <h3 className={css.title}>{name}</h3>
        <p className={css.price}>{price} грн</p>
      </div>
      <p className={css.description}>{description}</p>
      <div className={css.tags}>
        {spiciness > 0 && (
          <span className={`${css.tag} ${css.spicy}`}>
            {Array(spiciness).fill('🌶️').join('')}
          </span>
        )}
        {isVegetarian && <span className={`${css.tag} ${css.vegetarian}`}>🥦 Вегетаріанська</span>}
        {isAlcoholic && <span className={`${css.tag} ${css.alcoholic}`}>🍸 Містить алкоголь</span>}
      </div>
    </div>
  );
});

MenuCard.propTypes = {
  menuItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    isVegetarian: PropTypes.bool,
    spiciness: PropTypes.number,
    isAlcoholic: PropTypes.bool,
  }).isRequired,
};

MenuCard.displayName = 'MenuCard';

export default MenuCard;