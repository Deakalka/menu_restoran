import MenuCard from '../MenuCard/MenuCard';
import css from './MenuList.module.css';
import PropTypes from 'prop-types';

const MenuList = ({ menuItems, userAge, curCategory }) => {
  // Фільтруємо страви за віком користувача
  const filteredMenuItems = menuItems.filter((item) => {
    if (item.isAlcoholic && userAge < 18) {
      return false; // Приховуємо алкогольні напої для неповнолітніх
    }
    return true;
  });

  // Фільтруємо страви за обраною категорією
  const categoryDish = filteredMenuItems.filter((item) => item.category === curCategory);

  return (
    <ul className={css.list}>
      {categoryDish.map((menuItem) => (
        <li key={menuItem.id} className={css.item}>
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
      isAlcoholic: PropTypes.bool,
      category: PropTypes.string.isRequired, // Перевірка на наявність категорії
    })
  ).isRequired,
  userAge: PropTypes.number.isRequired,
  curCategory: PropTypes.string.isRequired,
};

export default MenuList;