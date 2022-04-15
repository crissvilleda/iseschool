import { Routes, Route } from "react-router-dom";
import Resource from "./Material";
import ResourceList from "./MaterialList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ResourceList />} />
      <Route path="/create" element={<Resource />} />
      <Route path="/:id" element={<Resource />} />
    </Routes>
  );
}
