import StudentForm from "./StudentForm";
import StudentIcon from "../../assets/img/student.png";

export default function Student() {
  return (
    <>
      <div className="is-flex pt-4">
        <img src={StudentIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Estudiantes</h1>
      </div>
      <StudentForm />
    </>
  );
}
