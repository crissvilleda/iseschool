import { Routes, Route } from "react-router-dom";
import Resource from "./Material";
import ResourceList from "./MaterialList";
import NotFound from "../404";

export default function MaterialView() {
  return (
    <Routes>
      <Route path="/" element={<ResourceList />} />
      <Route path="/create" element={<Resource />} />
      <Route path="/:id" element={<Resource />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
