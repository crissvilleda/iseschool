import { useContext } from "react";
import UserForm from "./UserForm";
import UserIcon from "../../assets/img/user.png";
import useUpdate from "../../hooks/useUpdate";
import useCreate from "../../hooks/useCreate";
import useDateUtils from "../../hooks/useDateUtils";
import LoadMask from "../../components/LoadMask";
import LoadingContext from "../../context/LoadingContext"

export default function User() {
  const { saveData } = useCreate("users", "/user");
  const { updateData, data, isUpdating } = useUpdate("users", "/user");
  const { dateAsTimestamp } = useDateUtils();
  const {loading} = useContext(LoadingContext)

  const onSubmit = (data) => {
    const body = { ...data };
    if (body.bornDate) {
      body.bornDate = dateAsTimestamp(body.bornDate);
    }
    if (isUpdating) updateData(body);
    else saveData(body);
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
