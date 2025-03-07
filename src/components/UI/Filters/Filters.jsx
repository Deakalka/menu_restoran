import { useFilter, SORT_TYPES } from '../../../context/FilterContext';
import PropTypes from 'prop-types';
import styles from './Filters.module.css';

const Filters = ({ categories }) => {
  const {
    activeCategory,
    changeCategory,
    filters,
    toggleFilter,
    priceRange,
    updatePriceRange,
    searchQuery,
    updateSearchQuery,
    sortType,
    changeSortType,
    resetFilters
  } = useFilter();
  
  // Обробник зміни мінімальної ціни
  const handleMinPriceChange = (e) => {
    const min = Number(e.target.value);
    updatePriceRange(min, priceRange.max);
  };
  
  // Обробник зміни максимальної ціни
  const handleMaxPriceChange = (e) => {
    const max = Number(e.target.value);
    updatePriceRange(priceRange.min, max);
  };
  
  // Обробник зміни пошукового запиту
  const handleSearchChange = (e) => {
    updateSearchQuery(e.target.value);
  };
  
  return (
    <div className={styles.filters}>
      {/* Пошук */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Пошук страв..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button 
            className={styles.clearSearch} 
            onClick={() => updateSearchQuery('')}
            aria-label="Очистити пошук"
          >
            &times;
          </button>
        )}
      </div>
      
      {/* Фільтрація за категоріями */}
      <div className={styles.categoriesFilter}>
        <h3 className={styles.filterTitle}>Категорії</h3>
        <div className={styles.categoryButtons}>
          <button
            className={`${styles.categoryBtn} ${activeCategory === 'Всі' ? styles.active : ''}`}
            onClick={() => changeCategory('Всі')}
          >
            Всі
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.categoryBtn} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => changeCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Фільтрація за ціною */}
      <div className={styles.priceFilter}>
        <h3 className={styles.filterTitle}>Ціна</h3>
        <div className={styles.priceInputs}>
          <div className={styles.priceInputGroup}>
            <label htmlFor="min-price">Від:</label>
            <input
              id="min-price"
              type="number"
              className={styles.priceInput}
              value={priceRange.min}
              onChange={handleMinPriceChange}
              min="0"
            />
          </div>
          <div className={styles.priceInputGroup}>
            <label htmlFor="max-price">До:</label>
            <input
              id="max-price"
              type="number"
              className={styles.priceInput}
              value={priceRange.max}
              onChange={handleMaxPriceChange}
              min={priceRange.min}
            />
          </div>
        </div>
      </div>
      
      {/* Фільтрація за тегами */}
      <div className={styles.tagFilters}>
        <h3 className={styles.filterTitle}>Фільтри</h3>
        <div className={styles.tagCheckboxes}>
          <div className={styles.checkboxGroup}>
            <input
              id="vegetarian"
              type="checkbox"
              checked={filters.isVegetarian}
              onChange={() => toggleFilter('isVegetarian')}
            />
            <label htmlFor="vegetarian">Вегетаріанське</label>
          </div>
          <div className={styles.checkboxGroup}>
            <input
              id="spicy"
              type="checkbox"
              checked={filters.hasSpicy}
              onChange={() => toggleFilter('hasSpicy')}
            />
            <label htmlFor="spicy">Гостре</label>
          </div>
          <div className={styles.checkboxGroup}>
            <input
              id="alcoholic"
              type="checkbox"
              checked={filters.isAlcoholic}
              onChange={() => toggleFilter('isAlcoholic')}
            />
            <label htmlFor="alcoholic">Алкогольне</label>
          </div>
        </div>
      </div>
      
      {/* Сортування */}
      <div className={styles.sortingOptions}>
        <h3 className={styles.filterTitle}>Сортування</h3>
        <select
          className={styles.sortSelect}
          value={sortType}
          onChange={(e) => changeSortType(e.target.value)}
        >
          <option value={SORT_TYPES.NAME_ASC}>За назвою (А-Я)</option>
          <option value={SORT_TYPES.NAME_DESC}>За назвою (Я-А)</option>
          <option value={SORT_TYPES.PRICE_ASC}>За ціною (зростання)</option>
          <option value={SORT_TYPES.PRICE_DESC}>За ціною (спадання)</option>
        </select>
      </div>
      
      {/* Кнопка скидання фільтрів */}
      <button className={styles.resetButton} onClick={resetFilters}>
        Скинути всі фільтри
      </button>
    </div>
  );
};

Filters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filters; 