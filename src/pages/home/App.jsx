import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function loadData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      const arrayUsers = [];
      querySnapshot.forEach((doc) => {
        arrayUsers.push(doc.data());
      });
      setUsers(arrayUsers);
    }
    loadData().then();
  }, []);
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Ise School Start App</p>
        <ul>
          {users.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
