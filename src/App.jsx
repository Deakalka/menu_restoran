import { useState, useEffect } from 'react';
import Description from './components/Description/Description';
import UserForm from './components/UserForm/UserForm';
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


  return (
    <>
      <h1>asd</h1>
      <Description />
      <UserForm user={user} setUser={setUser} />
    </>
  );
}

export default App;