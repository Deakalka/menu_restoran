import { useState, useCallback } from 'react';
import css from './Reader.module.css';
import PropTypes from 'prop-types';

const Reader = ({ menu }) => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);

  const categories = menu; // Отримуємо категорії з пропсу `menu`
  const currentCategory = categories[categoryIndex]; // Поточна категорія
  const currentItem = currentCategory?.items[itemIndex]; // Поточний елемент

  const isFirstCategory = categoryIndex === 0;
  const isLastCategory = categoryIndex === categories.length - 1;
  const isFirstItem = itemIndex === 0;
  const isLastItem = itemIndex === (currentCategory?.items.length - 1);

  const handleNextCategory = useCallback(() => {
    if (!isLastCategory) {
      setCategoryIndex(prev => prev + 1);
      setItemIndex(0);
    }
  }, [isLastCategory]);

  const handlePrevCategory = useCallback(() => {
    if (!isFirstCategory) {
      setCategoryIndex(prev => prev - 1);
      setItemIndex(0);
    }
  }, [isFirstCategory]);

  const handleNextItem = useCallback(() => {
    if (!isLastItem) {
      setItemIndex(prev => prev + 1);
    } else if (!isLastCategory) {
      // Якщо це останній елемент і не остання категорія, переходимо до наступної категорії
      handleNextCategory();
    }
  }, [isLastItem, isLastCategory, handleNextCategory]);

  const handlePrevItem = useCallback(() => {
    if (!isFirstItem) {
      setItemIndex(prev => prev - 1);
    } else if (!isFirstCategory) {
      // Якщо це перший елемент і не перша категорія, переходимо до попередньої категорії
      setCategoryIndex(prev => prev - 1);
      const prevCategory = categories[categoryIndex - 1];
      setItemIndex(prevCategory.items.length - 1);
    }
  }, [isFirstItem, isFirstCategory, categories, categoryIndex]);

  if (!currentCategory || !currentItem) {
    return <div className={css.error}>Меню не знайдено або порожнє</div>;
  }

  return (
    <div className={css.container}>
      <header className={css.header}>
        <div className={css.controls}>
          <button
            className={`${css.btn} ${isFirstCategory ? css.disabled : ''}`}
            onClick={handlePrevCategory}
            disabled={isFirstCategory}
            aria-label="Попередня категорія"
          >
            ← Попередня категорія
          </button>
          <button
            className={`${css.btn} ${isLastCategory ? css.disabled : ''}`}
            onClick={handleNextCategory}
            disabled={isLastCategory}
            aria-label="Наступна категорія"
          >
            Наступна категорія →
          </button>
        </div>
        <p className={css.progress}>
          Категорія: {categoryIndex + 1}/{categories.length}
        </p>
      </header>

      <article className={css.article}>
        <h2 className={css.title}>{currentCategory.category}</h2>
        <div className={css.itemContent}>
          <div className={css.itemControls}>
            <button
              className={`${css.btn} ${isFirstItem && isFirstCategory ? css.disabled : ''}`}
              onClick={handlePrevItem}
              disabled={isFirstItem && isFirstCategory}
              aria-label="Попередній елемент"
            >
              ← Попередній
            </button>
            <span className={css.itemProgress}>
              {itemIndex + 1}/{currentCategory.items.length}
            </span>
            <button
              className={`${css.btn} ${isLastItem && isLastCategory ? css.disabled : ''}`}
              onClick={handleNextItem}
              disabled={isLastItem && isLastCategory}
              aria-label="Наступний елемент"
            >
              Наступний →
            </button>
          </div>
          <div className={css.itemDetails}>
            <h3 className={css.itemTitle}>{currentItem.name}</h3>
            <p className={css.description}>{currentItem.description}</p>
            <p className={css.price}>Ціна: {currentItem.price} грн</p>
            {currentItem.image && (
              <img
                src={currentItem.image}
                alt={currentItem.name}
                className={css.image}
                loading="lazy"
              />
            )}
            <div className={css.details}>
              {currentItem.isVegetarian ? 
                <span className={css.tag}>🌱 Вегетаріанська страва</span> : 
                <span className={css.tag}>🍖 М'ясна страва</span>
              }
              {currentItem.spiciness > 0 && 
                <span className={css.tag}>
                  🌶️ Гострота: {Array(currentItem.spiciness).fill('🌶️').join('')}
                </span>
              }
              {currentItem.isAlcoholic !== undefined && (
                <span className={css.tag}>
                  {currentItem.isAlcoholic ? "🍹 Алкогольний напій" : "🥤 Безалкогольний напій"}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

Reader.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string,
          price: PropTypes.number.isRequired,
          image: PropTypes.string,
          isVegetarian: PropTypes.bool,
          spiciness: PropTypes.number,
          isAlcoholic: PropTypes.bool,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Reader;