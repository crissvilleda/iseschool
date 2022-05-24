import { Routes, Route } from "react-router-dom";
import User from "./User";
import UserList from "./UserList";
import NotFound from "../404";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/create" element={<User />} />
      <Route path="/:id" element={<User />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
