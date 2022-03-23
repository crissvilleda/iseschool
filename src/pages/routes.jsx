import { Routes, Route } from "react-router-dom";
import Home from "./home/App";
import User from "./user";
import Student from "./student";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/*"
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/*"
        element={
          <PrivateRoute>
            <Student />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
