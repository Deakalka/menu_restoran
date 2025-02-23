import PropTypes from 'prop-types';
import css from './MenuCard.module.css';

const MenuCard = ({ menuItem }) => {
  return (
    <div className={css.card}>
      <img src={menuItem.image} alt={menuItem.title} className={css.image} />
      <div className={css.info}>
        <h3 className={css.title}>{menuItem.name}</h3>
        <p className={css.price}>{menuItem.price} грн</p>
      </div>
      <p className={css.description}>{menuItem.description}</p>
      <div className={css.tags}>
        {menuItem.spiciness > 0 && <span className={css.tag}>🌶️ Spicy {menuItem.spiciness}</span>}
        {menuItem.isVegetarian && <span className={css.tag}>🥦 Vegetarian</span>}
      </div>
    </div>

  );
};

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

export default MenuCard;