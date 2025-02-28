import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Cart.module.css';

const Cart = ({ cartItems, onRemoveItem, onClearCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, [cartItems]);
  
  return (
    <div className={css.cartContainer}>
      <button 
        className={css.cartButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
        🛒 Чек ({cartItems.length})
      </button>
      
      {isOpen && (
        <div className={css.cartDropdown}>
          <div className={css.cartHeader}>
            <h3>Ваш чек</h3>
            <button className={css.closeCart} onClick={() => setIsOpen(false)}>✕</button>
          </div>
          
          {cartItems.length === 0 ? (
            <p className={css.emptyCart}>Ваш чек порожній</p>
          ) : (
            <>
              <ul className={css.cartItems}>
                {cartItems.map((item) => (
                  <li key={`cart-item-${item.id}`} className={css.cartItem}>
                    <div className={css.itemInfo}>
                      <img src={item.image} alt={item.name} className={css.cartItemImage} />
                      <div>
                        <p className={css.itemName}>{item.name}</p>
                        <p className={css.itemPrice}>{item.price} грн × {item.quantity}</p>
                      </div>
                    </div>
                    <div className={css.itemActions}>
                      <span className={css.itemTotal}>{item.price * item.quantity} грн</span>
                      <button 
                        className={css.removeItem} 
                        onClick={() => onRemoveItem(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className={css.cartFooter}>
                <div className={css.cartTotal}>
                  <span>Загальна сума:</span>
                  <span>{totalPrice} грн</span>
                </div>
                <button 
                  className={css.clearCart} 
                  onClick={onClearCart}
                >
                  Очистити чек
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onClearCart: PropTypes.func.isRequired,
};

export default Cart;