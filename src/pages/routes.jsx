import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/App";
import User from "./user";
import Student from "./student";
import Group from "./group";
import PrivateRoute from "./PrivateRoute";
import LoadingContext from "../context/LoadingContext";
import Login from "./login";

export default function App() {
  const [loading, setLoading] = useState(false);
  const contextLoading = useMemo(() => ({ loading, setLoading }), [loading]);

  return (
    <>
      <LoadingContext.Provider value={contextLoading}>
        <Routes>
          <Route path="/login" element={<Login />} />
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
           <Route
            path="/group/*"
            element={
              <PrivateRoute>
                <Group />
              </PrivateRoute>
            }
          />
          
        </Routes>
      </LoadingContext.Provider>
    </>
  );
}
