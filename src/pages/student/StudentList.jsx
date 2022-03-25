import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import dayjs from "dayjs";
import StudentIcon from "../../assets/img/student.png";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

async function getStudents(students) {
  let querySet = query(
    collection(db, "users"),
    where("type", "==", "Student"),
    orderBy("name"),
    limit(25)
  );

  const querySnapshot = await getDocs(querySet);
  const result = [];
  querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
  return result;
}
export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents(students).then((data) => {
      console.log(data);
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
        <div className="is-flex">
          <img src={StudentIcon} className="title-icon" />
          <h1 className="title is-3 ml-2">Estudiantes</h1>
        </div>
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
