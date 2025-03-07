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
    dishCategory: Yup.string().required("Категорія страви обов'язкова"),
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
        <div className={css.formContainer}>
          <h2 className={css.formTitle}>Додати нову страву</h2>
          <Form className={css.formGrid}>
            <div className={css.formGroup}>
              <label className={css.formLabel}>
                Назва
                <Field type="text" name="dishName" className={css.formInput} />
                {errors.dishName && touched.dishName ? (
                  <div className={css.formError}>{errors.dishName}</div>
                ) : null}
              </label>
            </div>
            
            <div className={css.formGroup}>
              <label className={css.formLabel}>
                Оберіть категорію
                <Field as="select" name="dishCategory" className={css.formSelect}>
                  <option value="">Оберіть категорію</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                {errors.dishCategory && touched.dishCategory ? (
                  <div className={css.formError}>{errors.dishCategory}</div>
                ) : null}
              </label>
            </div>
            
            <div className={css.formGroup}>
              <label className={css.formLabel}>
                Ціна
                <Field type="number" name="dishPrice" className={css.formInput} />
                {errors.dishPrice && touched.dishPrice ? (
                  <div className={css.formError}>{errors.dishPrice}</div>
                ) : null}
              </label>
            </div>
            
            <div className={css.formGroup + ' ' + css.fullWidth}>
              <label className={css.formLabel}>
                Опис страви
                <Field
                  as="textarea"
                  cols="20"
                  rows="5"
                  name="dishDescription"
                  className={css.formTextarea}
                />
                {errors.dishDescription && touched.dishDescription ? (
                  <div className={css.formError}>{errors.dishDescription}</div>
                ) : null}
              </label>
            </div>
            
            <div className={css.formGroup + ' ' + css.fullWidth}>
              <label className={css.formLabel}>Особливості</label>
              <div className={css.checkboxGroup}>
                <Field type="checkbox" name="selectedOptions" value="Vegan" className={css.checkboxInput} />
                <label className={css.checkboxLabel}>Вегетаріанська</label>
              </div>
              <div className={css.checkboxGroup}>
                <Field type="checkbox" name="selectedOptions" value="Alco" className={css.checkboxInput} />
                <label className={css.checkboxLabel}>Алкоголь</label>
              </div>
              <div className={css.checkboxGroup}>
                <Field type="checkbox" name="selectedOptions" value="Hot" className={css.checkboxInput} />
                <label className={css.checkboxLabel}>Гостра</label>
              </div>
              {errors.selectedOptions && touched.selectedOptions ? (
                <div className={css.formError}>{errors.selectedOptions}</div>
              ) : null}
            </div>
            
            <div className={css.formActions}>
              <button type="submit" className={css.submitButton}>
                Надіслати
              </button>
              <button type="reset" className={css.cancelButton}>
                Скасувати
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

AddDishForm.propTypes = {
  onAddDish: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddDishForm;
