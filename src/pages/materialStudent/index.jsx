import { Routes, Route } from "react-router-dom";
import Material from "./Material";
import MaterialList from "./MaterialList";

export default function MaterialRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MaterialList />} />
      <Route path="/:id" element={<Material />} />
    </Routes>
  );
}
