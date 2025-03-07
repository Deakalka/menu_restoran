import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Створення контексту фільтрів
const FilterContext = createContext();

// Hook для використання контексту фільтрів
export const useFilter = () => {
  return useContext(FilterContext);
};

// Доступні типи сортування
export const SORT_TYPES = {
  PRICE_ASC: 'price-asc',
  PRICE_DESC: 'price-desc',
  NAME_ASC: 'name-asc',
  NAME_DESC: 'name-desc',
};

// Провайдер контексту фільтрів
export const FilterProvider = ({ children }) => {
  // Стан для активної категорії
  const [activeCategory, setActiveCategory] = useState('Всі');
  
  // Стан для фільтрів за тегами
  const [filters, setFilters] = useState({
    isVegetarian: false,
    hasSpicy: false,
    isAlcoholic: false,
  });
  
  // Стан для цінового діапазону
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000,
  });
  
  // Стан для пошуку
  const [searchQuery, setSearchQuery] = useState('');
  
  // Стан для сортування
  const [sortType, setSortType] = useState(SORT_TYPES.NAME_ASC);
  
  // Встановлення активної категорії
  const changeCategory = useCallback((category) => {
    setActiveCategory(category);
  }, []);
  
  // Зміна фільтрів
  const toggleFilter = useCallback((filterName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  }, []);
  
  // Оновлення діапазону цін
  const updatePriceRange = useCallback((min, max) => {
    setPriceRange({ min, max });
  }, []);
  
  // Оновлення пошукового запиту
  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, []);
  
  // Зміна типу сортування
  const changeSortType = useCallback((type) => {
    if (Object.values(SORT_TYPES).includes(type)) {
      setSortType(type);
    }
  }, []);
  
  // Скидання всіх фільтрів
  const resetFilters = useCallback(() => {
    setActiveCategory('Всі');
    setFilters({
      isVegetarian: false,
      hasSpicy: false,
      isAlcoholic: false,
    });
    setPriceRange({ min: 0, max: 1000 });
    setSearchQuery('');
    setSortType(SORT_TYPES.NAME_ASC);
  }, []);
  
  // Функція для застосування фільтрів та сортування до страв
  const applyFilters = useCallback((dishes) => {
    // Фільтрація за категорією
    let filteredDishes = dishes;
    if (activeCategory !== 'Всі') {
      filteredDishes = filteredDishes.filter(dish => dish.category === activeCategory);
    }
    
    // Фільтрація за тегами
    if (filters.isVegetarian) {
      filteredDishes = filteredDishes.filter(dish => dish.isVegetarian);
    }
    
    if (filters.hasSpicy) {
      filteredDishes = filteredDishes.filter(dish => dish.spiciness > 0);
    }
    
    if (filters.isAlcoholic) {
      filteredDishes = filteredDishes.filter(dish => dish.isAlcoholic);
    }
    
    // Фільтрація за ціновим діапазоном
    filteredDishes = filteredDishes.filter(
      dish => dish.price >= priceRange.min && dish.price <= priceRange.max
    );
    
    // Фільтрація за пошуковим запитом
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredDishes = filteredDishes.filter(
        dish => 
          dish.name.toLowerCase().includes(query) || 
          dish.description.toLowerCase().includes(query)
      );
    }
    
    // Сортування страв
    filteredDishes.sort((a, b) => {
      switch (sortType) {
        case SORT_TYPES.PRICE_ASC:
          return a.price - b.price;
        case SORT_TYPES.PRICE_DESC:
          return b.price - a.price;
        case SORT_TYPES.NAME_ASC:
          return a.name.localeCompare(b.name);
        case SORT_TYPES.NAME_DESC:
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    
    return filteredDishes;
  }, [activeCategory, filters, priceRange, searchQuery, sortType]);
  
  const value = {
    activeCategory,
    filters,
    priceRange,
    searchQuery,
    sortType,
    changeCategory,
    toggleFilter,
    updatePriceRange,
    updateSearchQuery,
    changeSortType,
    resetFilters,
    applyFilters,
  };
  
  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 