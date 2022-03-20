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
    <div>
        <ul>
          {users.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
        <div className="is-flex is-justify-content-space-between">
          <button className="button is-secondary "> Regresar </button>
          <button className="button is-primary "> Registrar </button>
        </div>
        
      
    </div>
  );
}

export default App;
