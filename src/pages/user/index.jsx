import {Routes, Route } from "react-router-dom";
import User from "./User";

export default function App() {
  return (
    <Routes>
      <Route path="/create" element={<User />} />
    </Routes>

  );
}
