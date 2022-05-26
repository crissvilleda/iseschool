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
import { db } from "../../firebase";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const { deleteData } = useDelete("groups");
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getGroups(groups).finally(() => setLoading(false));
  }, []);

  async function getGroups() {
    let querySet = query(
      collection(db, "groups"),
      orderBy("createdAt", "desc"),
      limit(25)
    );

    const querySnapshot = await getDocs(querySet);
    const results = [];
    querySnapshot.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
    setGroups(results);
  }
  const removeData = async (id) => {
    setLoading(true);
    try {
      await deleteData(id);
      await getGroups();
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/group/${id}`),
          remove: (id) => removeData(id),
        }),
      },
      {
        Header: "Nombre de grupo",
        accessor: (row) => row.name,
      },
      {
        Header: "Año",
        accessor: "year",
      },
      {
        Header: "Estado",
        accessor: (row) => (row.active ? "Activo" : "Inactivo"),
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
      <Table columns={columns} data={groups} loading={loading} />
    </>
  );
}
