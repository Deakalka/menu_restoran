import { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

// Початковий стан кошика
const initialState = {
  items: [],
  totalAmount: 0,
};

// Редюсер для управління станом кошика
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex !== -1) {
        // Якщо товар вже в кошику, збільшуємо кількість
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        
        return {
          ...state,
          items: updatedItems,
          totalAmount: calculateTotalAmount(updatedItems),
        };
      } else {
        // Додаємо новий товар до кошика
        const newItem = { 
          ...action.payload,
          quantity: 1,
        };
        
        const updatedItems = [...state.items, newItem];
        
        return {
          ...state,
          items: updatedItems,
          totalAmount: calculateTotalAmount(updatedItems),
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
      const existingItem = state.items[existingItemIndex];
      
      if (existingItem.quantity === 1) {
        // Видаляємо товар з кошика, якщо кількість = 1
        const updatedItems = state.items.filter(item => item.id !== action.payload);
        
        return {
          ...state,
          items: updatedItems,
          totalAmount: calculateTotalAmount(updatedItems),
        };
      } else {
        // Зменшуємо кількість товару
        const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
        
        return {
          ...state,
          items: updatedItems,
          totalAmount: calculateTotalAmount(updatedItems),
        };
      }
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalAmount: 0,
      };
      
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        const updatedItems = state.items.filter(item => item.id !== id);
        return {
          ...state, 
          items: updatedItems,
          totalAmount: calculateTotalAmount(updatedItems),
        };
      }
      
      const updatedItems = state.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems),
      };
    }
    
    default:
      return state;
  }
};

// Допоміжна функція для розрахунку загальної суми
const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Створення контексту
const CartContext = createContext();

// Hook для використання контексту кошика
export const useCart = () => {
  return useContext(CartContext);
};

// Провайдер контексту кошика
export const CartProvider = ({ children }) => {
  // Отримуємо збережений кошик з localStorage
  const getInitialState = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  };
  
  const [cartState, dispatch] = useReducer(cartReducer, null, getInitialState);
  
  // Зберігаємо стан кошика в localStorage при оновленні
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);
  
  // Функції для роботи з кошиком
  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const value = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    updateItemQuantity,
    itemCount: cartState.items.reduce((total, item) => total + item.quantity, 0),
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 