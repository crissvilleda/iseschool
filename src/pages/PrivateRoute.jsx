import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function PrivateRoutes(props) {
  return (
    <>
      <div className="app-main-container">
        <SideBar className="column is-3 is-hidden-mobile p-2" />
        <div className="columns m-0">
          <Navbar />
          <main className="column is-9 p-4">{props.children}</main>
        </div>
      </div>
    </>
  );
}
