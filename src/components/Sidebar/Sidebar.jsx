import { NavLink } from "react-router-dom";
import "./sidebar.css";
import UserIcon from "../../assets/img/user.png";
import StudentIcon from "../../assets/img/student.png";
import HomeIcon from "../../assets/img/home.png";
import GroupIcon from "../../assets/img/group.png";
import ResourceIcon from "../../assets/img/books.png";
import ActivityIcon from "../../assets/img/activities.png";

function MenuItem({ icon, title, to }) {
  return (
    <li className="menu-item my-2">
      <NavLink
        to={to || "/"}
        end
        className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}
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
  return (
    <>
      <aside className={`${className || ""} sidebar-container`}>
        <br />
        <br />
        <br />
        <div className="menu">
          <ul>
            <MenuItem title="Inicio" to="/" icon={HomeIcon} />
            <MenuItem title="Usuarios" to="/user" icon={UserIcon} />
            <MenuItem title="Estudiantes" to="/student" icon={StudentIcon} />
            <MenuItem title="Grupos" to="/group" icon={GroupIcon} />
            <MenuItem title="Actividades" to="/activity" icon={ActivityIcon} />
            <MenuItem title="Material" to="/resource" icon={ResourceIcon} />
          </ul>
        </div>
      </aside>
    </>
  );
}
