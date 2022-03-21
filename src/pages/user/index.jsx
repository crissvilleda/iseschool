import { Routes, Route } from "react-router-dom";
import User from "./User";
import UserList from "./UserList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/create" element={<User />} />
    </Routes>
  );
}
