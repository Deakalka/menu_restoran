import css from "./UserForm.module.css"
import PropTypes from 'prop-types';

const UserForm = ({user, setUser}) => {

  return (
    <form className={css.form}>
      <div className={css.formGroup}>
        <label className={css.label}>Назва страви</label>
        <input type="text" className={css.input} 
        onChange={(e) => setUser({ ...user, dish: e.target.value })}
        value={user.dish}/>
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Категорія</label>
        <select className={css.select}
        value={user.category}
        onChange={(e) => setUser({ ...user, category: e.target.value })}>
          <option value="">Оберіть категорію</option>
          <option value="Гарячі страви">Гарячі страви</option>
          <option value="Салати">Салати</option>
          <option value="Напої">Напої</option>
        </select>
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Ціна</label>
        <input type="number" 
        className={css.input} 
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
          value={user.age} 
          placeholder="Вік" 
          min="0"
          onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
        />
      </div>
    </form>
  )
}

UserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    dish: PropTypes.string,
    category: PropTypes.string.isRequired,
    price: PropTypes.number
  }).isRequired,
  setUser: PropTypes.func.isRequired
};

export default UserForm;