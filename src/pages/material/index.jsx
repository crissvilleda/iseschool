import { Routes, Route } from "react-router-dom";
import Material from "./Material";
import MaterialList from "./MaterialList";

export default function MaterialView() {
  return (
    <Routes>
      <Route path="/" element={<MaterialList />} />
      <Route path="/create" element={<Material />} />
      <Route path="/:id" element={<Material />} />
    </Routes>
  );
}
