import { memo, useMemo } from 'react';
import MenuCard from '../MenuCard/MenuCard';
import css from './MenuList.module.css';
import PropTypes from 'prop-types';

const MenuList = memo(({ menuItems, userAge, curCategory, userDish }) => {
  const filteredItems = useMemo(() => {
    // Спочатку фільтруємо по віку
    const ageFiltered = menuItems.filter(item => !(item.isAlcoholic && userAge < 18));
    
    // Потім застосовуємо фільтр за назвою або категорією
    if (userDish?.trim()) {
      return ageFiltered.filter(item => 
        item.name.toLowerCase().includes(userDish.toLowerCase())
      );
    } else if (curCategory && curCategory !== "Оберіть категорію") {
      return ageFiltered.filter(item => item.category === curCategory);
    }
    
    return ageFiltered;
  }, [menuItems, userAge, curCategory, userDish]);

  if (filteredItems.length === 0) {
    return <p className={css.noResults}>Нічого не знайдено. Спробуйте змінити параметри пошуку.</p>;
  }

  return (
    <ul className={css.list}>
      {filteredItems.map((menuItem) => (
        <li key={menuItem.id} className={css.card}>
          <MenuCard menuItem={menuItem} />
        </li>
      ))}
    </ul>
  );
});

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isAlcoholic: PropTypes.bool,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  userAge: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  curCategory: PropTypes.string,
  userDish: PropTypes.string,
};

MenuList.defaultProps = {
  userAge: 0,
  curCategory: '',
  userDish: '',
};

MenuList.displayName = 'MenuList';

export default MenuList;