import { useContext } from "react";
import ActivityForm from "./ActivityForm";
import ActivityIcon from "../../assets/img/activities.png";
import useUpdate from "../../hooks/useUpdate";
import useCreate from "../../hooks/useCreate";
import useDateUtils from "../../hooks/useDateUtils";
import LoadingContext from "../../context/LoadingContext";
import LoadMask from "../../components/LoadMask";
import { useNavigate } from "react-router-dom";
import { SwalError } from "../../components/SwalAlerts";
import { notification } from "antd";

export default function Activity() {
  const { data, isUpdating, updateData } = useUpdate("activities", "/activity");
  const { saveData } = useCreate("activities", "/activity");
  const { dateAsTimestamp } = useDateUtils();
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const body = { ...data };
      body.createdAt = new Date();
      if (body.expirationDate)
        body.expirationDate = dateAsTimestamp(body.expirationDate);
      const msg = isUpdating
        ? "Los datos se an actualizado."
        : "Los datos se an registrado.";

      console.log(body);
      if (isUpdating) await updateData(body);
      else await saveData(body);
      notification.success({
        message: "Éxito",
        description: msg,
      });
    } catch (e) {
      console.log(e);
      let msg = `No se pudo ${
        isUpdating ? "actualizar" : "crear"
      } el registro.`;
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
