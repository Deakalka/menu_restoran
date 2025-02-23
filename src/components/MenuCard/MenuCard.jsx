// menuItem: {id: 1, title: "Burger", category: "breakfast", price: 15.99, img: "./images/item-1.jpeg", …}
import PropTypes from 'prop-types';

const MenuCard = ({menuItem}) => {
  return (
    <div className="menu-card">
        <img src={menuItem.image} alt={menuItem.title} className="menu-card__image" />
        <h3 className="menu-card__title">{menuItem.name}</h3>
        <p className="menu-card__price">{menuItem.price}</p>
        <p className="menu-card__description">{menuItem.description}</p>
        <p className="menu-card__spiciness">{menuItem.spiciness}</p>
        <p className="menu-card__isVegetarian">{menuItem.isVegetarian ? 'Vegetarian' : 'Non-vegetarian'}</p>
    </div>
  )
}

MenuCard.propTypes = {
  menuItem: PropTypes.shape({
    name: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    isVegetarian: PropTypes.bool,
    spiciness: PropTypes.number
  }).isRequired
};

export default MenuCard;