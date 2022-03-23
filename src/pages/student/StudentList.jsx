import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { useList } from "../../hooks";
import dayjs from "dayjs";
import StudentIcon from "../../assets/img/student.png";

export default function StudentList() {
  const { getData } = useList("users", "name");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      if (data) setStudents(data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: "id",
      },
      {
        Header: "Nombres",
        accessor: "name",
      },
      {
        Header: "Apellidos",
        accessor: "lastName",
      },
      {
        Header: "Fecha Nacimiento",
        accessor: (row) => {
          if (row.bornDate) {
            const bornDate = row.bornDate.toDate();
            if (!dayjs(bornDate).isValid()) return "";
            return dayjs(bornDate).format("DD-MM-YYYY");
          }
          return "";
        },
      },
      {
        Header: "Genero",
        accessor: "gender",
      },
    ],
    []
  );

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4">
        <h1 className="title is-3">Estudiantes</h1>
        <Link to="/student/create" className="button is-secondary">
          Agregar nuevo
        </Link>
      </div>
      <br />
      <br />
      <Table columns={columns} data={students} />
    </>
  );
}
