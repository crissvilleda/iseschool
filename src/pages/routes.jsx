import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import User from "./user";
import Student from "./student";
import PrivateRoute from "./PrivateRoute";
import LoadingContext from "../context/LoadingContext";
import UserContext from "../context/UserContext";
import Login from "./login";
import Resource from "./material";
import Activity from "./activity";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const contextLoading = useMemo(() => ({ loading, setLoading }), [loading]);
  const contextUser = useMemo(() => ({ user, setUser }), [user]);

  return (
    <>
      <LoadingContext.Provider value={contextLoading}>
        <UserContext.Provider value={contextUser}>
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
              path="/resource/*"
              element={
                <PrivateRoute>
                  <Resource />
                </PrivateRoute>
              }
            />
            <Route
              path="/activity/*"
              element={
                <PrivateRoute>
                  <Activity />
                </PrivateRoute>
              }
            />
          </Routes>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </>
  );
}
