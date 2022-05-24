import { Routes, Route } from "react-router-dom";
import Student from "./Student";
import StudentList from "./StudentList";
import NotFound from "../404";

export default function StudentView() {
  return (
    <Routes>
      <Route path="/" element={<StudentList />} />
      <Route path="/create" element={<Student />} />
      <Route path="/:id" element={<Student />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
