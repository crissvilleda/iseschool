import { Routes, Route } from "react-router-dom";
import Group from "./group";
import GroupList from "./GroupList";

export default function GroupView() {
  return (
    <Routes>
      <Route path="/" element={<GroupList />} />
      <Route path="/create" element={<Group />} />
      <Route path="/:id" element={<Group />} />
    </Routes>
  );
}