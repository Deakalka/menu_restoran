import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Dish, DishFilters } from '../types';
import menuData from '../menu-data.json';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

interface DishContextType {
  dishes: Dish[];
  filteredDishes: Dish[];
  categories: string[];
  filters: DishFilters;
  sortOption: SortOption;
  addDish: (dish: Dish) => void;
  updateDish: (id: number, dish: Dish) => void;
  deleteDish: (id: number) => void;
  setFilters: (filters: DishFilters) => void;
  clearFilters: () => void;
  setSortOption: (option: SortOption) => void;
  getFavorites: () => Dish[];
  toggleFavorite: (id: number) => void;
}

const defaultValue: DishContextType = {
  dishes: [],
  filteredDishes: [],
  categories: [],
  filters: {},
  sortOption: 'name-asc',
  addDish: () => {},
  updateDish: () => {},
  deleteDish: () => {},
  setFilters: () => {},
  clearFilters: () => {},
  setSortOption: () => {},
  getFavorites: () => [],
  toggleFavorite: () => {},
};

const DishContext = createContext<DishContextType>(defaultValue);

export const useDishes = () => useContext(DishContext);

interface DishProviderProps {
  children: ReactNode;
}

export const DishProvider: React.FC<DishProviderProps> = ({ children }) => {
  const [dishes, setDishes] = useState<Dish[]>(menuData as Dish[]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(menuData as Dish[]);
  const [filters, setFilters] = useState<DishFilters>({});
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [favorites, setFavorites] = useState<number[]>([]);

  // Отримати унікальні категорії
  const categories = [...new Set(dishes.map(dish => dish.category))];

  // Додати нову страву
  const addDish = (dish: Dish) => {
    const newDish = {
      ...dish,
      id: Math.max(0, ...dishes.map(d => d.id)) + 1
    };
    setDishes([...dishes, newDish]);
  };

  // Оновити існуючу страву
  const updateDish = (id: number, updatedDish: Dish) => {
    setDishes(dishes.map(dish => dish.id === id ? { ...updatedDish, id } : dish));
  };

  // Видалити страву
  const deleteDish = (id: number) => {
    setDishes(dishes.filter(dish => dish.id !== id));
  };

  // Очистити фільтри
  const clearFilters = () => {
    setFilters({});
  };

  // Отримати улюблені страви
  const getFavorites = () => {
    return dishes.filter(dish => favorites.includes(dish.id));
  };

  // Додати/видалити з улюблених
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Фільтрація і сортування страв
  useEffect(() => {
    let result = [...dishes];
    
    // Застосування фільтрів
    if (filters.category) {
      result = result.filter(dish => dish.category === filters.category);
    }
    
    if (filters.isVegetarian !== undefined) {
      result = result.filter(dish => dish.isVegetarian === filters.isVegetarian);
    }
    
    if (filters.isAlcoholic !== undefined) {
      result = result.filter(dish => dish.isAlcoholic === filters.isAlcoholic);
    }
    
    if (filters.spiciness !== undefined) {
      result = result.filter(dish => dish.spiciness === filters.spiciness);
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(dish => dish.price >= min && dish.price <= max);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(dish => 
        dish.name.toLowerCase().includes(query) || 
        dish.description.toLowerCase().includes(query)
      );
    }
    
    // Сортування результатів
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    
    setFilteredDishes(result);
  }, [dishes, filters, sortOption]);

  return (
    <DishContext.Provider value={{ 
      dishes, 
      filteredDishes, 
      categories, 
      filters, 
      sortOption, 
      addDish, 
      updateDish, 
      deleteDish, 
      setFilters, 
      clearFilters, 
      setSortOption, 
      getFavorites, 
      toggleFavorite 
    }}>
      {children}
    </DishContext.Provider>
  );
}; 