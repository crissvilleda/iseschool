import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/App";
import User from "./user";
import Student from "./student";
import PrivateRoute from "./PrivateRoute";
import LoadingContext from "../context/LoadingContext";

export default function App() {
  const [loading, setLoading] = useState(false);
  const contextLoading = useMemo(() => ({ loading, setLoading }), [loading]);

  return (
    <>
      <LoadingContext.Provider value={contextLoading}>
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
      </LoadingContext.Provider>
    </>
  );
}
