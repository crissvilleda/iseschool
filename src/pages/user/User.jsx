import UserForm from "./UserForm";
import UserIcon from "../../assets/img/user.png";

export default function User() {
  return (
  <>
    <div className="is-flex pt-4">
        <img src={UserIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Usuarios</h1>
      </div>
    <UserForm />
  </>
  );
}
