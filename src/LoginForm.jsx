// const LoginForm = () => {

//   const handleSubmit = (evt) => {
//     evt.preventDefault();

//     const form = evt.target;
//     const { login, password } = form.elements;

// 		// Посилання на DOM-елементи
//     console.log(login, password);

// 		// Значення полів
// 		console.log(login.value, password.value)

// 		// Скидаємо значення полів після відправки
// 		form.reset();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="login" />
//       <input type="password" name="password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// };
// export default LoginForm;