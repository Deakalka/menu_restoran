import { useState, useEffect, useCallback } from "react";
import UserForm from "./components/UserForm/UserForm";
import MenuList from "./components/MenuList/MenuList";
import Cart from "./components/Cart/Cart";
import css from "./App.module.css";
import DishModal from "./components/DishModal/DishModal";
import sampleMenuItems from "./menu-data.json";
import AddDishForm from "./components/AddDishForm/AddDishForm";
import { nanoid } from "nanoid";

const App = () => {
  const [menuItems, setMenuItems] = useState(sampleMenuItems);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({
    name: "",
    age: "",
    dish: "",
    category: "",
    price: "",
  });
  const [curCategory, setCurCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ініціалізація категорій з меню
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(menuItems.map((item) => item.category)),
    ];
    setCategories(uniqueCategories);
  }, [menuItems]);

  // Додавання страви до кошика
  const handleAddToCart = useCallback((item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }, []);

  // Видалення страви з кошика
  const handleRemoveFromCart = useCallback((itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  // Очищення кошика
  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Відкриття модального вікна для страви
  const handleOpenModal = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  // Закриття модального вікна
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDish(null), 300);
  };

  // Додавання нової страви до списку страв
  const handleAddDish = (newDish) => {
    const dishToAdd = {
      id: nanoid(), // Генеруємо унікальний ID
      name: newDish.dishName,
      title: newDish.dishName,
      category: newDish.dishCategory,
      price: Number(newDish.dishPrice),
      description: newDish.dishDescription,
      isVegetarian: newDish.selectedOptions.includes("Vegan"),
      isAlcoholic: newDish.selectedOptions.includes("Alco"),
      spiciness: newDish.selectedOptions.includes("Hot") ? 1 : 0,
      ingredients: [], // Можна додати логіку для введення інгредієнтів
      recipe: "", // Можна додати логіку для введення рецепту
    };
    setMenuItems((prevItems) => [...prevItems, dishToAdd]);
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

      <div
        className={`${css.container} ${css.scrollbar} ${css.overflowYAuto} ${css.maxH64}`}
      >
        <aside className={css.sidebar}>
          <UserForm
            user={user}
            setUser={setUser}
            categories={categories}
            setCurCategory={setCurCategory}
          />
          <AddDishForm
            onAddDish={handleAddDish}
            categories={categories}
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
