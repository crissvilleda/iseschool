import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/App";
import User from "./user";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
    </Routes>

  );
}
