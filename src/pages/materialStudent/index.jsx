import { Routes, Route } from "react-router-dom";
import Material from "./Material";
import MaterialList from "./MaterialList";
import NotFound from "../404";

export default function MaterialRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MaterialList />} />
      <Route path="/:id" element={<Material />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
