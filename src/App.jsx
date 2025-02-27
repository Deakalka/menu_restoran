import { useState, useEffect } from 'react';
import Description from './components/Description/Description';
import UserForm from './components/UserForm/UserForm';
import MenuList from './components/MenuList/MenuList';
import Reader from './components/Reader/Reader.jsx';
import menuItem from './menu.json';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { name: "", age: "", dish: "", price: 0, category: "" };
  });

  const [curCategory, setCurCategory] = useState("Оберіть категорію"); 

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const allMenuItems = menuItem.menu.flatMap((category) => category.items);
  

  return (
    <>
      <h1>Меню ресторану</h1>
      <Description />
      <Reader menu={menuItem.menu}/>
      <UserForm
        user={user}
        setUser={setUser}
        categories={menuItem.menu.map((cat) => cat.category)}
        setCurCategory={setCurCategory}
        
      />
      <MenuList menuItems={allMenuItems} userAge={user.age} userDish={user.dish} curCategory={curCategory} />
      
    </>
  );
}

export default App;