import css from "./UserForm.module.css";
import PropTypes from 'prop-types';
import { memo } from 'react';

const UserForm = memo(({ user, setUser, categories, setCurCategory }) => {
  const handleInputChange = (field, value) => {
    setUser(prevUser => ({ ...prevUser, [field]: value }));
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setUser(prevUser => ({ ...prevUser, category: newCategory }));
    setCurCategory(newCategory);
  };

  const filteredCategories = categories.filter(category => 
    !(category === "Алкогольні напої" && user.age < 18)
  );

  return (
    <form className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="dish" className={css.label}>Назва страви</label>
        <input
          id="dish"
          type="text"
          className={css.input}
          onChange={(e) => handleInputChange('dish', e.target.value)}
          value={user.dish}
          placeholder="Введіть назву страви"
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="category" className={css.label}>Категорія</label>
        <select
          id="category"
          className={`${css.select} ${user.dish.trim().length > 0 ? css.dimmed : ''}`}
          value={user.category}
          onChange={handleCategoryChange}
        >
          <option value="">Оберіть категорію</option>
          {filteredCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="price" className={css.label}>Ціна</label>
        <input
          id="price"
          type="number"
          className={css.input}
          value={user.price || ''}
          placeholder="Виберіть діапазон цін"
          min="0"
          onChange={(e) => handleInputChange('price', Number(e.target.value))}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Дані клієнта</label>
        <input
          id="name"
          type="text"
          className={css.input}
          value={user.name}
          placeholder="Ім'я"
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <input
          id="age"
          type="number"
          className={css.input}
          value={user.age || ''}
          placeholder="Вік"
          min="0"
          max="120"
          onChange={(e) => handleInputChange('age', Number(e.target.value))}
        />
      </div>
    </form>
  );
});

UserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dish: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurCategory: PropTypes.func.isRequired, 
};

UserForm.displayName = 'UserForm';

export default UserForm;