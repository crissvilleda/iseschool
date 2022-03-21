import { NavLink } from "react-router-dom";
import "./sidebar.css";
import UserIcon from "../../assets/img/user.png";

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
            <MenuItem title="Inicio" to="/" />
            <MenuItem title="Usuarios" to="/user" icon={UserIcon} />
            <MenuItem title="Estudiantes" to="/student" />
            <MenuItem title="Grupos" to="/group" />
            <MenuItem title="Actividades" to="/activity" />
            <MenuItem title="Material" to="/resource" />
          </ul>
        </div>
      </aside>
    </>
  );
}
