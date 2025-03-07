import { useState, useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Cart.module.css';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef(null);
  
  const { 
    items, 
    totalAmount, 
    removeItemFromCart, 
    clearCart, 
    updateItemQuantity,
    itemCount 
  } = useCart();
  
  const { currentTheme } = useTheme();
  const { t } = useLanguage();
  
  // Закриття кошика при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Функція для форматування суми
  const formatPrice = (price) => {
    return new Intl.NumberFormat('uk-UA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };
  
  // Функція для зміни кількості товару
  const handleQuantityChange = (id, quantity) => {
    updateItemQuantity(id, quantity);
  };
  
  return (
    <div className={styles.cartContainer} ref={cartRef}>
      {/* Кнопка для відкриття кошика */}
      <button 
        className={`${styles.cartButton} ${itemCount > 0 ? styles.hasItems : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('cart')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {itemCount > 0 && (
          <span className={styles.cartBadge}>{itemCount}</span>
        )}
      </button>
      
      {/* Випадаюче вікно кошика */}
      {isOpen && (
        <div className={`${styles.cartDropdown} ${styles[currentTheme]}`}>
          <div className={styles.cartHeader}>
            <h3>{t('your_order')}</h3>
            <button 
              className={styles.closeCart} 
              onClick={() => setIsOpen(false)}
              aria-label={t('close')}
            >
              &times;
            </button>
          </div>
          
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>{t('cart_empty')}</p>
              <small>{t('add_items')}</small>
            </div>
          ) : (
            <>
              <ul className={styles.cartItems}>
                {items.map(item => (
                  <li key={item.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                      <img 
                        src={item.image || 'https://via.placeholder.com/50x50?text=Фото'} 
                        alt={item.name} 
                        className={styles.cartItemImage} 
                      />
                      <div>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <p className={styles.itemPrice}>{formatPrice(item.price)} грн</p>
                      </div>
                    </div>
                    
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControl}>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label="Зменшити кількість"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label="Збільшити кількість"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className={styles.itemTotal}>
                        {formatPrice(item.price * item.quantity)} грн
                      </div>
                      
                      <button 
                        className={styles.removeItem} 
                        onClick={() => removeItemFromCart(item.id)}
                        aria-label="Видалити"
                      >
                        &times;
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className={styles.cartFooter}>
                <div className={styles.cartTotal}>
                  <span>{t('total')}:</span>
                  <span>{formatPrice(totalAmount)} грн</span>
                </div>
                
                <button 
                  className={styles.checkoutButton}
                  onClick={() => {
                    alert(`${t('order_placed')} ${formatPrice(totalAmount)} грн!`);
                    clearCart();
                    setIsOpen(false);
                  }}
                >
                  {t('checkout')}
                </button>
                
                <button 
                  className={styles.clearCart} 
                  onClick={clearCart}
                >
                  {t('clear_cart')}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;