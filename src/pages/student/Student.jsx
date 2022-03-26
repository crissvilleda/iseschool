import StudentForm from "./StudentForm";
import StudentIcon from "../../assets/img/student.png";
import useUpdate from "../../hooks/useUpdate";
import useCreate from "../../hooks/useCreate";
import useDateUtils from "../../hooks/useDateUtils";

export default function Student() {
  const { saveData } = useCreate("users", "/student");
  const { updateData, data, isUpdating } = useUpdate("users", "/student");
  const { dateAsTimestamp } = useDateUtils();

  const onSubmit = (data) => {
    const body = { ...data };
    if (body.bornDate) {
      body.bornDate = dateAsTimestamp(body.bornDate);
    }
    body.type = "Student";
    if (isUpdating) updateData(body);
    else saveData(body);
  };

  return (
    <>
      <div className="is-flex pt-4">
        <img src={StudentIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Estudiantes</h1>
      </div>
      <StudentForm
        onSubmit={onSubmit}
        initialValues={data}
        isUpdating={isUpdating}
      />
    </>
  );
}
