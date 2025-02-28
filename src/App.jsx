import  { useState, useEffect, useCallback } from 'react';
import UserForm from './components/UserForm/UserForm';
import MenuList from './components/MenuList/MenuList';
import Cart from './components/Cart/Cart';
import css from './App.module.css';
import DishModal from './components/DishModal/DishModal'; // імпортуйте новий компонент
import sampleMenuItems  from './menu-data.json';

const App = () => {
  const [menuItems, setMenuItems] = useState(sampleMenuItems);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({
    name: '',
    age: '',
    dish: '',
    category: '',
    price: '',
  });
  const [curCategory, setCurCategory] = useState('');
  const [cartItems, setCartItems] = useState([]);
  
  // Ініціалізація категорій з меню
  useEffect(() => {
    const uniqueCategories = [...new Set(menuItems.map(item => item.category))];
    setCategories(uniqueCategories);
  }, [menuItems]);
  
  const handleAddToCart = useCallback((item) => {
    setCartItems(prevItems => {
      // Перевіряємо, чи є вже така страва в чеку
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Якщо страва вже є, збільшуємо її кількість
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Якщо страви ще нема, додаємо її з кількістю 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }, []);
  
  const handleRemoveFromCart = useCallback((itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);
  
  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  
  // const [openDishId, setOpenDishId] = useState(null);

  // const handleOpenDish = (id) => {
  //   setOpenDishId(id);
  // };

  // const handleCloseDish = () => {
  //   setOpenDishId(null);
  // };


  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Можна опціонально очистити selectedDish після затримки
    // setTimeout(() => setSelectedDish(null), 300);
  };

  return (
    <div className={css.app}>
      <header className={css.header}>
        <h1>Меню ресторану</h1>
        <Cart 
          cartItems={cartItems} 
          onRemoveItem={handleRemoveFromCart} 
          onClearCart={handleClearCart} 
        />
      </header>
      
      <div className={css.container}>
        <aside className={css.sidebar}>
          <UserForm 
            user={user}
            setUser={setUser}
            categories={categories}
            setCurCategory={setCurCategory}
          />
        </aside>
        
        <main className={css.content}>
          <MenuList 
            menuItems={menuItems}
            userAge={user.age}
            curCategory={curCategory}
            userDish={user.dish}
            onAddToCart={handleAddToCart}
            onOpenDishModal={handleOpenModal}
          />
        </main>
      </div>
      <DishModal 
        dish={selectedDish || {}} 
        isOpen={isModalOpen && selectedDish !== null} 
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default App;
