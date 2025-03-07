import { memo } from 'react';
import PropTypes from 'prop-types';
import MenuCard from '../MenuCard/MenuCard';
import { useFilter } from '../../context/FilterContext';
import styles from './MenuList.module.css';

const MenuList = ({ dishes, onOpenModal }) => {
  const { activeCategory, searchQuery } = useFilter();
  
  // Групуємо страви за категоріями для відображення у відсортованому вигляді
  const groupedDishes = dishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {});
  
  // Отримуємо відсортований список категорій
  const sortedCategories = Object.keys(groupedDishes).sort();
  
  // Перевіряємо, чи є страви для відображення
  const hasNoResults = dishes.length === 0;
  
  // Якщо немає результатів, відображаємо відповідне повідомлення
  if (hasNoResults) {
    return (
      <div className={styles.noResults}>
        <h2>Не знайдено жодної страви</h2>
        <p>
          {searchQuery 
            ? `За запитом "${searchQuery}" нічого не знайдено.` 
            : activeCategory !== 'Всі' 
              ? `У категорії "${activeCategory}" немає страв.` 
              : 'Спробуйте змінити параметри фільтрації.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className={styles.menuListContainer}>
      {activeCategory === 'Всі' ? (
        // Якщо обрано "Всі", відображаємо страви, згруповані за категоріями
        sortedCategories.map(category => (
          <div key={category} className={styles.categorySection}>
            <h2 className={styles.categoryHeading}>{category}</h2>
            <div className={styles.list}>
              {groupedDishes[category].map(dish => (
                <MenuCard 
                  key={dish.id} 
                  dish={dish} 
                  onClick={() => onOpenModal(dish)} 
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        // Якщо обрана конкретна категорія, відображаємо тільки страви цієї категорії
        <div className={styles.categorySection}>
          <h2 className={styles.categoryHeading}>{activeCategory}</h2>
          <div className={styles.list}>
            {dishes.map(dish => (
              <MenuCard 
                key={dish.id} 
                dish={dish} 
                onClick={() => onOpenModal(dish)} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

MenuList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      description: PropTypes.string,
      isVegetarian: PropTypes.bool,
      spiciness: PropTypes.number,
      isAlcoholic: PropTypes.bool,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

// Використовуємо memo для оптимізації продуктивності
export default memo(MenuList);