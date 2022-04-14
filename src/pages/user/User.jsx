import { useContext } from "react";
import UserForm from "./UserForm";
import UserIcon from "../../assets/img/user.png";
import useDateUtils from "../../hooks/useDateUtils";
import LoadMask from "../../components/LoadMask";
import LoadingContext from "../../context/LoadingContext";
import useUpdate from "../../hooks/useUpdate";
import { useNavigate } from "react-router-dom";
import { SwalError, SwalSuccess } from "../../components/SwalAlerts";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";

export default function User() {
  const { dateAsTimestamp } = useDateUtils();
  const { data, isUpdating, id } = useUpdate("users");
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const body = { ...data, id: id };
      if (body.bornDate) {
        body.bornDate = dateAsTimestamp(body.bornDate);
      }
      const msg = isUpdating
        ? "Los datos se an actualizado."
        : "Los datos se an registrado.";
      body.isUpdating = isUpdating;
      const addUser = await httpsCallable(functions, "addUser")(body);
      SwalSuccess("Éxito", msg);
      navigate("/user");
    } catch (e) {
      let msg = `No se pudo ${isUpdating ? "actualizar" : "crear"} al usuario.`;
      if (e && e.code === "functions/already-exists") msg = e.message;
      SwalError("Error", `${msg}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="is-flex pt-4">
        <img src={UserIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Usuarios</h1>
      </div>
      <LoadMask loading={loading}>
        <UserForm
          onSubmit={onSubmit}
          initialValues={data}
          isUpdating={isUpdating}
        />
      </LoadMask>
    </>
  );
}
