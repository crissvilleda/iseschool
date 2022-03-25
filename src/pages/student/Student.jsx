import StudentForm from "./StudentForm";
import StudentIcon from "../../assets/img/student.png";
import useCreate from "../../hooks/useCreate";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

export default function Student() {
  const { saveData } = useCreate("users", "/student");

  const onSubmit = (data) => {
    const body = { ...data };
    if (body.bornDate) {
      body.bornDate = Timestamp.fromDate(dayjs(body.bornDate).toDate());
    }
    body.type = "Student";
    saveData(body);
  };

  return (
    <>
      <div className="is-flex pt-4">
        <img src={StudentIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Estudiantes</h1>
      </div>
      <StudentForm onSubmit={onSubmit} />
    </>
  );
}
