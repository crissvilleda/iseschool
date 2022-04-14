import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/App";
import User from "./user";
import Student from "./student";
import PrivateRoute from "./PrivateRoute";
import LoadingContext from "../context/LoadingContext";
import UserContext from "../context/UserContext";
import Login from "./login";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const contextLoading = useMemo(() => ({ loading, setLoading }), [loading]);
  const contextUser = useMemo(() => ({ user, setUser }), [user]);
  const navigate = useNavigate();

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
          </Routes>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </>
  );
}
