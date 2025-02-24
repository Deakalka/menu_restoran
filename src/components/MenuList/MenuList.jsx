import MenuCard from '../MenuCard/MenuCard';
import css from './MenuList.module.css';
import PropTypes from 'prop-types';

const MenuList = ({ menuItems, userAge, curCategory, userDish }) => {
  const filteredMenuItems = menuItems.filter((item) => !(item.isAlcoholic && userAge < 18));

  const categoryDish = filteredMenuItems.filter((item) => item.category === curCategory);

  const filteredDish = filteredMenuItems.filter((item) =>
    item.name.toLowerCase().includes(userDish?.toLowerCase() || "")
  );

  const itemsToShow = userDish.trim() === "" ? categoryDish : filteredDish;

  return (
    <ul className={css.list}>
      {itemsToShow.map((menuItem) => (
        <li key={menuItem.id} className={css.card}>
          <MenuCard menuItem={menuItem} />
        </li>
      ))}
    </ul>
  );
};

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isAlcoholic: PropTypes.bool,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  userAge: PropTypes.number.isRequired,
  curCategory: PropTypes.string.isRequired,
  userDish: PropTypes.string,
};

export default MenuList;
