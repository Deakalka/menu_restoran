import { useState, useEffect } from 'react';
import MenuList from './components/MenuList/MenuList';
import DishModal from './components/DishModal/DishModal';
import Cart from './components/Cart/Cart';
import Description from './components/Description/Description';
import AddDishForm from './components/AddDishForm/AddDishForm';
import ThemeToggle from './components/UI/ThemeToggle/ThemeToggle';
import LanguageSwitch from './components/UI/LanguageSwitch/LanguageSwitch';
import Filters from './components/UI/Filters/Filters';
import Favorites from './components/UI/Favorites/Favorites';
import { useCart } from './context/CartContext';
import { useFilter } from './context/FilterContext';
import { useLanguage } from './context/LanguageContext';
import styles from './App.module.css';
import menuData from './menu-data.json';

const App = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddDishFormVisible, setIsAddDishFormVisible] = useState(false);
  
  // Отримуємо функції з контексту кошика
  const { addItemToCart } = useCart();
  
  // Отримуємо функції з контексту фільтрів
  const { applyFilters } = useFilter();
  
  // Отримуємо функції з контексту мови
  const { t } = useLanguage();
  
  // При завантаженні додатку отримуємо страви та категорії
  useEffect(() => {
    setDishes(menuData);
    
    // Витягуємо унікальні категорії
    const uniqueCategories = [...new Set(menuData.map(dish => dish.category))];
    setCategories(uniqueCategories);
  }, []);
  
  // Відфільтровані страви
  const filteredDishes = applyFilters(dishes);
  
  // Функція для відкриття модального вікна при кліку на страву
  const handleOpenModal = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };
  
  // Функція для закриття модального вікна
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };
  
  // Функція для додавання нової страви
  const handleAddDish = (newDish) => {
    // Генеруємо ID для нової страви
    const newId = Math.max(...dishes.map(dish => dish.id), 0) + 1;
    const dishWithId = { ...newDish, id: newId };
    
    // Додаємо страву до масиву
    setDishes(prevDishes => [...prevDishes, dishWithId]);
    
    // Оновлюємо список категорій, якщо потрібно
    if (!categories.includes(newDish.category)) {
      setCategories(prevCategories => [...prevCategories, newDish.category]);
    }
    
    // Приховуємо форму після успішного додавання
    setIsAddDishFormVisible(false);
  };
  
  // Перемикач видимості форми додавання страви
  const toggleAddDishForm = () => {
    setIsAddDishFormVisible(prevState => !prevState);
  };
  
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>{t('menu_title')}</h1>
        <div className={styles.headerControls}>
          <LanguageSwitch />
          <ThemeToggle />
          <Cart />
        </div>
      </header>
      
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <button 
            className={styles.addDishButton} 
            onClick={toggleAddDishForm}
          >
            {isAddDishFormVisible ? t('hide_form') : t('add_dish')}
          </button>
          
          <Favorites dishes={dishes} onOpenModal={handleOpenModal} />
          
          <Filters categories={categories} />
        </aside>
        
        <main className={styles.content}>
          {isAddDishFormVisible && (
            <AddDishForm onAddDish={handleAddDish} categories={categories} />
          )}
          
          <Description />
          
          <MenuList 
            dishes={filteredDishes} 
            onOpenModal={handleOpenModal} 
          />
        </main>
      </div>
      
      {isModalOpen && selectedDish && (
        <DishModal 
          dish={selectedDish} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onAddToCart={addItemToCart} 
        />
      )}
    </div>
  );
};

export default App;
