import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import User from "./user";
import Student from "./student";
import Group from "./group";
import PrivateRoute from "./PrivateRoute";
import LoadingContext from "../context/LoadingContext";
import UserContext from "../context/UserContext";
import Login from "./login";
import Resource from "./material";
import ResourceStudent from "./materialStudent";
import Activity from "./activity";
import ActivityStudent from "./activityStudent";
import NotFound from "./404";
import { registerSW } from "virtual:pwa-register";
import { get } from "../helpers";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const contextLoading = useMemo(() => ({ loading, setLoading }), [loading]);
  const contextUser = useMemo(() => ({ user, setUser }), [user]);

  const updateSW = registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
  });

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
                  {get(user, "type", undefined) === "Student" ? (
                    <ActivityStudent />
                  ) : (
                    <Home />
                  )}
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
              path="/resource-student/*"
              element={
                <PrivateRoute>
                  <ResourceStudent />
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
            <Route
              path="/activity/*"
              element={
                <PrivateRoute>
                  <Activity />
                </PrivateRoute>
              }
            />
            <Route
              path="/activity-student/*"
              element={
                <PrivateRoute>
                  <ActivityStudent />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </>
  );
}
