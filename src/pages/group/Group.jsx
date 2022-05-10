import GroupForm from "./GroupForm";
import GroupIcon from "../../assets/img/group.png";
import useUpdate from "../../hooks/useUpdate";
import useCreate from "../../hooks/useCreate";
import useDateUtils from "../../hooks/useDateUtils";

export default function group() {
  const { saveData } = useCreate("groups", "/group");
  const { updateData, data, isUpdating } = useUpdate("groups", "/group");
  const { dateAsTimestamp } = useDateUtils();

  const onSubmit = (data) => {
    const body = { ...data };
    if (body.bornDate) {
      body.bornDate = dateAsTimestamp(body.bornDate);
    }
    body.type = "Group";
    if (isUpdating) updateData(body);
    else saveData(body);
  };

  return (
    <>
      <div className="is-flex pt-4">
        <img src={GroupIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Grupos</h1>
      </div>
      <GroupForm
        onSubmit={onSubmit}
        initialValues={data}
        isUpdating={isUpdating}
      />
    </>
  );
}
