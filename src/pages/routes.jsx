import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/App";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
