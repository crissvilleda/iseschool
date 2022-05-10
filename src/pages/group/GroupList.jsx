import { useMemo, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table, { tableActions } from "../../components/Table";
import dayjs from "dayjs";
import GroupIcon from "../../assets/img/group.png";
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
import { db  } from "../../firebase";

async function getGroups(groups) {
  let querySet = query(
    collection(db, "groups"),
    limit(25)
  );

  const querySnapshot = await getDocs(querySet);
  const result = [];
  querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
  return result;
}
export default function GroupList() {
  const [students, setStudents] = useState([]);
  const { deleteData } = useDelete("users");
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getGroups(students)
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
        Header: "Grupo",
        accessor: "name",
      },
    
      {
        Header: "Año",
        accessor: (row) => {
          if (row.bornDate) {
            const bornDate = row.bornDate.toDate();
            if (!dayjs(bornDate).isValid()) return "";
            return dayjs(bornDate).format("DD-MM-YYYY");
          }
          return "";
        },
      },
     
    ],
    []
  );

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4">
        <div className="is-flex">
          <img src={GroupIcon} className="title-icon" />
          <h1 className="title is-3 ml-2">Grupos</h1>
        </div>
        <Link to="/group/create" className="button is-secondary">
          Agregar nuevo
        </Link>
      </div>

      <br />
      <br />
      <Table columns={columns} data={students} loading={loading} />
    </>
  );
}
