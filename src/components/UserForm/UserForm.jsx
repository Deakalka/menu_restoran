import css from "./UserForm.module.css";
import PropTypes from 'prop-types';

const UserForm = ({ user, setUser, categories, setCurCategory }) => {
  const allCategories = () => {
    return categories
      .filter((category) => {
        if (category === "Алкогольні напої" && user.age < 18) {
          return false;
        }
        return true;
      })
      .map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ));
  };
  return (
    <form className={css.form}>
      <div className={css.formGroup}>
        <label className={css.label}>Назва страви</label>
        <input
          type="text"
          key="dish"
          className={css.input}
          onChange={(e) => setUser({ ...user, dish: e.target.value })}
          value={user.dish}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Категорія</label>
        <select
          className={`${css.select} ${user.dish.trim().length > 0 ? css.dimmed : ''}` }
          value={user.category}
          onChange={(e) => {
            setUser({ ...user, category: e.target.value });
            setCurCategory(e.target.value); 
          }}
        >
          <option value="">Оберіть категорію</option>
          {allCategories()}
        </select>
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Ціна</label>
        <input
          type="number"
          className={css.input}
          key="price"
          value={user.price}
          placeholder="Виберіть діапазон цін"
          min="0"
          onChange={(e) => setUser({ ...user, price: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Дані клієнта</label>
        <input
          type="text"
          key="name"
          className={css.input}
          value={user.name}
          placeholder="Ім'я"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="number"
          key="age"
          className={css.input}
          value={user.age === 0 ? "" : user.age}
          placeholder="Вік"

          onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
        />
      </div>
    </form>
  );
};

UserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    dish: PropTypes.string,
    category: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurCategory: PropTypes.func.isRequired, 
};

export default UserForm;