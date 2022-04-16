import { useContext } from "react";
import ActivityForm from "./ActivityForm";
import ActivityIcon from "../../assets/img/activities.png";
import useUpdate from "../../hooks/useUpdate";
import useDateUtils from "../../hooks/useDateUtils";
import LoadingContext from "../../context/LoadingContext";
import LoadMask from "../../components/LoadMask";
import { useNavigate } from "react-router-dom";
import { SwalError, SwalSuccess } from "../../components/SwalAlerts";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";

export default function Activity() {
  const { data, isUpdating } = useUpdate("users", "/student");
  const { dateAsTimestamp } = useDateUtils();
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const body = { ...data };
      if (body.bornDate) {
        body.bornDate = dateAsTimestamp(body.bornDate);
      }
      body.type = "Student";
      const msg = isUpdating
        ? "Los datos se an actualizado."
        : "Los datos se an registrado.";
      body.isUpdating = isUpdating;
      await httpsCallable(functions, "addUser")(body);
      SwalSuccess("Éxito", msg);
      navigate("/user");
    } catch (e) {
      let msg = `No se pudo ${
        isUpdating ? "actualizar" : "crear"
      } al estudiante.`;
      if (e && e.code === "functions/already-exists") msg = e.message;
      SwalError("Error", `${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="is-flex pt-4">
        <img src={ActivityIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Actividad Interactiva</h1>
      </div>
      <LoadMask loading={loading}>
        <ActivityForm
          onSubmit={onSubmit}
          initialValues={data}
          isUpdating={isUpdating}
        />
      </LoadMask>
    </>
  );
}
