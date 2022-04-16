import { Routes, Route } from "react-router-dom";
import Activity from "./Activity";
import ActivityList from "./ActivityList";

export default function ActivityRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ActivityList />} />
      <Route path="/create" element={<Activity />} />
      <Route path="/:id" element={<Activity />} />
    </Routes>
  );
}
