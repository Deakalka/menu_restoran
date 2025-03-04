import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import css from "./AddDishForm.module.css";
import { nanoid } from "nanoid";
import * as Yup from "yup";

const AddDishForm = ({ onAddDish, categories }) => {
  const validationSchema = Yup.object({
    dishName: Yup.string()
      .required("Назва страви обов'язкова")
      .min(3, "Назва страви повинна містити щонайменше 3 символи")
      .max(50, "Назва страви повинна бути не більше 50 символів"),
    dishCategory: Yup.string()
      .required("Категорія страви обов'язкова"),
    dishPrice: Yup.number()
      .required("Ціна страви обов'язкова")
      .positive("Ціна повинна бути додатнім числом")
      .typeError("Ціна повинна бути числом"),
    dishDescription: Yup.string()
      .required("Опис страви обов'язковий")
      .min(10, "Опис страви повинен містити щонайменше 10 символів")
      .max(500, "Опис страви повинен бути не більше 500 символів"),
  });

  const initialValues = {
    dishName: "",
    dishCategory: "",
    dishPrice: "",
    dishDescription: "",
    selectedOptions: [],
  };

  const handleSubmit = (
    { dishName, dishCategory, dishPrice, dishDescription, selectedOptions },
    actions
  ) => {
    onAddDish({
      id: nanoid(),
      dishName: dishName,
      dishCategory: dishCategory,
      dishPrice: dishPrice,
      dishDescription: dishDescription,
      selectedOptions: selectedOptions,
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <h2>Додати нову страву</h2>
          <label className={css.label}>
            Назва
            <Field type="text" name="dishName" className={css.input} />
            {errors.dishName && touched.dishName ? (
              <div className={css.error}>{errors.dishName}</div>
            ) : null}
          </label>
          <label className={css.label}>
            Оберіть категорію
            <Field as="select" name="dishCategory" className={css.input}>
              <option value="">Оберіть категорію</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Field>
            {errors.dishCategory && touched.dishCategory ? (
              <div className={css.error}>{errors.dishCategory}</div>
            ) : null}
          </label>
          <label className={css.label}>
            Ціна
            <Field type="number" name="dishPrice" className={css.input} />
            {errors.dishPrice && touched.dishPrice ? (
              <div className={css.error}>{errors.dishPrice}</div>
            ) : null}
          </label>
          <label className={css.label}>
            Опис страви
            <Field
              as="textarea"
              cols="20"
              rows="5"
              name="dishDescription"
              className={css.input}
            />
            {errors.dishDescription && touched.dishDescription ? (
              <div className={css.error}>{errors.dishDescription}</div>
            ) : null}
          </label>
          <label className={css.label}>Особливості</label>
          <label>
            <Field type="checkbox" name="selectedOptions" value="Vegan" />
            Vegan
          </label>
          <label>
            <Field type="checkbox" name="selectedOptions" value="Alco" />
            Alco
          </label>
          <label>
            <Field type="checkbox" name="selectedOptions" value="Hot" />
            Hot
          </label>
          {errors.selectedOptions && touched.selectedOptions ? (
            <div className={css.error}>{errors.selectedOptions}</div>
          ) : null}
          <button type="submit" className={css.btn}>
            Надіслати
          </button>
        </Form>
      )}
    </Formik>
  );
};

AddDishForm.propTypes = {
  onAddDish: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddDishForm;