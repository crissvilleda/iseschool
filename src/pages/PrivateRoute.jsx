import { useContext } from "react";
import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import LoadMask from "../components/LoadMask";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function PrivateRoutes(props) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loading] = useAuthState(auth, {
    onUserChanged: (user) => {
      if (!user) navigate("/login");
      if (user && user.uid) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUser({ ...docSnap.data(), uid: docSnap.id });
          } else {
            signOut(auth);
          }
        });
      }
    },
  });

  return (
    <>
      {user && user.uid ? (
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
