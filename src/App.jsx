import { useState, useEffect } from 'react';
import Description from './components/Description/Description';
import UserForm from './components/UserForm/UserForm';
import MenuList from './components/MenuList/MenuList';
import menuItem from './menu.json';
import './App.css';

function App() {
  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {name: "", age: 0, dish: "", price: 0, category: ""};
  });
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);



  const categories = menuItem.menu.map((category) => category.category);
  const allMenuItems = menuItem.menu.flatMap((category) => category.items);

  
  return (
    <>
      <h1>Меню ресторану</h1>
      <Description />
      <UserForm user={user} setUser={setUser} categories={categories} />
      <MenuList menuItems={allMenuItems} userAge={user.age} curCategory={user.categories}/>
    </>
  );
}

export default App;