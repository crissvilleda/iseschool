import { Routes, Route } from "react-router-dom";
import ActivityList from "./ActivityList";

export default function ActivityRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ActivityList />} />
    </Routes>
  );
}
