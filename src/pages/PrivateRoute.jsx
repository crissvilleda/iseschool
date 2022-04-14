import { useEffect } from "react";
import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import LoadMask from "../components/LoadMask";
import { useNavigate } from "react-router-dom";

export default function PrivateRoutes(props) {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth, {
    onUserChanged: (user) => {
      if (!user) navigate("/login");
    },
  });

  return (
    <>
      {!loading && user ? (
        <div className="app-main-container">
          <SideBar className="column is-3 is-hidden-mobile p-2" />
          <div className="m-0">
            <Navbar />
            <main className="column is-9 p-4">{props.children}</main>
          </div>
        </div>
      ) : (
        <LoadMask loading={loading}>
          <div style={{ height: "100vh" }} />
        </LoadMask>
      )}
    </>
  );
}
