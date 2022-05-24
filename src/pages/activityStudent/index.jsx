import { Routes, Route } from "react-router-dom";
import Activity from "./Activity";
import ActivityList from "./ActivityList";
import ActivityResponse from "./ActivityResponse";
import NotFound from "../404";

export default function ActivityRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ActivityList />} />
      <Route path="/:id" element={<Activity />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
