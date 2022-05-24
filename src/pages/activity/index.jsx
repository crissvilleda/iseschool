import { Routes, Route } from "react-router-dom";
import Activity from "./Activity";
import ActivityList from "./ActivityList";
import ActivityResults from "./ActivityResults";
import NotFound from "../404";

export default function ActivityRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ActivityList />} />
      <Route path="/create" element={<Activity />} />
      <Route path="/:id/results" element={<ActivityResults />} />
      <Route path="/:id" element={<Activity />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
