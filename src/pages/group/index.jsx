import { Routes, Route } from "react-router-dom";
import Group from "./Group";
import GroupList from "./GroupList";
import NotFound from "../404";

export default function GroupView() {
  return (
    <Routes>
      <Route path="/" element={<GroupList />} />
      <Route path="/create" element={<Group />} />
      <Route path="/:id" element={<Group />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
