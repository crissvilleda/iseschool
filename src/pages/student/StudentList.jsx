import { useMemo, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table, { tableActions } from "../../components/Table";
import dayjs from "dayjs";
import StudentIcon from "../../assets/img/student.png";
import useDelete from "../../hooks/useDelete";
import LoadingContext from "../../context/LoadingContext";
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
    limit(200)
  );

  const querySnapshot = await getDocs(querySet);
  const results = [];
  querySnapshot.forEach((doc) => results.push({ ...doc.data(), id: doc.id }));
  return results;
}
export default function StudentList() {
  const [students, setStudents] = useState([]);
  const { deleteData } = useDelete("users");
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getStudents(students)
      .then((data) => {
        if (data) setStudents(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const removeData = async (id) => {
    setLoading(true);
    await deleteData(id);
    await getStudents(students).then((data) => {
      if (data) setStudents(data);
    });
    setLoading(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/student/${id}`),
          remove: (id) => removeData(id),
        }),
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
        accessor: (row) => (row.gender === "M" ? "Masculino" : "Femenino"),
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
      <Table columns={columns} data={students} loading={loading} />
    </>
  );
}
