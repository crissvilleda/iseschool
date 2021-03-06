import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./sidebar.css";
import UserIcon from "../../assets/img/user.png";
import StudentIcon from "../../assets/img/student.png";
import HomeIcon from "../../assets/img/home.svg";
import GroupIcon from "../../assets/img/group.png";
import ResourceIcon from "../../assets/img/books.png";
import ActivityIcon from "../../assets/img/activities.png";
import LogOut from "../../assets/img/logout.png";
import UserContext from "../../context/UserContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

function MenuItem({ icon, title, to, user, allowTo = [], location }) {
  const onClickItem = () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.remove("open");
    const burgerMenu = document.getElementById("burger-menu");
    if (burgerMenu) burgerMenu.classList.remove("change");
  };

  if (!allowTo.includes(user.type)) return <></>;
  const isActive = location.pathname.includes(to) && to != "/";
  return (
    <li className="menu-item my-2" onClick={onClickItem}>
      <NavLink
        to={to || "/"}
        end
        className={`menu-link ${isActive ? "active" : ""}`}
      >
        <div className="menu-icon">
          {icon && <img src={icon} className="" />}
        </div>
        <span className="pl-2 is-align-self-center">{title}</span>
      </NavLink>
    </li>
  );
}

export default function SideBar({ className }) {
  const { user } = useContext(UserContext);
  const location = useLocation();
  return (
    <>
      <aside
        id="sidebar"
        className={`${className || ""} sidebar-container pt-5`}
      >
        <div className="menu mt-4 w-100">
          <ul className="p-0">
            <>
              <MenuItem
                title="Inicio"
                to="/"
                icon={HomeIcon}
                user={user}
                allowTo={["Admin", "Teacher"]}
                location={location}
              />
              <MenuItem
                title="Usuarios"
                to="/user"
                icon={UserIcon}
                user={user}
                allowTo={["Admin"]}
                location={location}
              />
              <MenuItem
                title="Estudiantes"
                to="/student"
                icon={StudentIcon}
                user={user}
                allowTo={["Admin", "Teacher"]}
                location={location}
              />
              <MenuItem
                title="Grupos"
                to="/group"
                icon={GroupIcon}
                user={user}
                allowTo={["Admin", "Teacher"]}
                location={location}
              />
              <MenuItem
                title="Actividades"
                to="/activity"
                icon={ActivityIcon}
                user={user}
                allowTo={["Admin", "Teacher"]}
                location={location}
              />
              <MenuItem
                title="Mis Actividades"
                to="/activity-student"
                icon={ActivityIcon}
                user={user}
                allowTo={["Student"]}
                location={location}
              />
              <MenuItem
                title="Material"
                to="/resource"
                icon={ResourceIcon}
                user={user}
                allowTo={["Admin", "Teacher"]}
                location={location}
              />
              <MenuItem
                title="Mis Materiales"
                to="/resource-student"
                icon={ResourceIcon}
                user={user}
                allowTo={["Student"]}
                location={location}
              />

              <li
                className="menu-item my-2"
                onClick={() => {
                  signOut(auth).then();
                }}
              >
                <div className={`menu-link`}>
                  <div className="menu-icon">
                    <img src={LogOut} className="" />
                  </div>
                  <span className="pl-2 is-align-self-center">Salir</span>
                </div>
              </li>
            </>
          </ul>
        </div>
      </aside>
    </>
  );
}
