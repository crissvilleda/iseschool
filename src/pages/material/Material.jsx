import { useContext } from "react";
import MaterialForm from "./MaterialForm";
import MaterialIcon from "../../assets/img/books.png";
import useUpdate from "../../hooks/useUpdate";
import useCreate from "../../hooks/useCreate";
import useDateUtils from "../../hooks/useDateUtils";
import LoadMask from "../../components/LoadMask";
import LoadingContext from "../../context/LoadingContext";

export default function Material() {
  const { saveData } = useCreate("materials", "/resource");
  const { updateData, data, isUpdating } = useUpdate("materials", "/resource");
  const { dateAsTimestamp } = useDateUtils();
  const { loading } = useContext(LoadingContext);

  const onSubmit = (data) => {
    const body = { ...data };
    body.createdAt = dateAsTimestamp();
    if (isUpdating) updateData(body);
    else saveData(body);
  };

  return (
    <>
      <div className="is-flex pt-4">
        <img src={MaterialIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Agregar Material</h1>
      </div>
      <LoadMask loading={loading}>
        <MaterialForm
          onSubmit={onSubmit}
          initialValues={data}
          isUpdating={isUpdating}
        />
      </LoadMask>
    </>
  );
}
