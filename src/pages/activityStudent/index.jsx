import { Routes, Route } from "react-router-dom";
import Activity from "./Activity";
import ActivityList from "./ActivityList";
import ActivityResponse from "./ActivityResponse";

export default function ActivityRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ActivityList />} />
      <Route path="/:id/description" element={<Activity />} />
      <Route path="/:id/response" element={<ActivityResponse />} />
    </Routes>
  );
}
